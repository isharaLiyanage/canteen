import prisma from "@/utils/connect";
import { paymentMethod } from "@prisma/client";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
interface Products {
  productId: string;
  quantity: number;
}
interface payment {
  orderID: string;
  payerID: string;
  paymentSource: string;
}
interface product {
  product: Products[];
  map?: string;
  address?: string;
  total: number;
  payment?: payment;
}
enum PaymentMethod {
  Cash_on_delivery = "Cash_on_delivery",
  Paypal = "Paypal",
  Free = "Free",
}

interface IsPay {
  paymentMethod: PaymentMethod;
  payment: boolean;
}
export const POST = async (req: NextRequest) => {
  try {
    const user = await getServerSession();
    const data: product = await req.json();
   
    const isValidData = validateOrderData(data, user); //validation data
    const isValidPrice = validateOrderPrice(data); //validation price
    if (!isValidData || !isValidPrice) {
      return new NextResponse(
        JSON.stringify({ status: 400, message: "Invalid order data or user" })
      );
    } else {
      if (user?.user?.email) {
        const findId = await prisma.user.findFirst({
          where: { email: user.user.email },
        });
        if (findId) {
          const userId = findId.id;

          const isPay = payment(data);
          const res = await prisma.orders.create({
            data: {
              userId,
              map: data.map,
              address: data.address,
              orderItems: { create: data.product },
              price: data.total,
              paymentMethod: isPay.paymentMethod,
              payment: isPay.payment,
              paymentId: data.payment?.orderID,
              paymentSource: data.payment?.paymentSource,
            },
          });
          if (res) {
            return new NextResponse(
              JSON.stringify({
                status: 200,
                id: res.id,
                message: "Order has been crated!",
              })
            );
          }
        } else {
          return new NextResponse(
            JSON.stringify({
              status: 400,
              message: "User not found in database",
            })
          );
        }
      } else {
        return new NextResponse(
          JSON.stringify({ status: 400, message: "Missing user email" })
        );
      }
      return new NextResponse(
        JSON.stringify({ status: 400, message: "created" })
      );
    }
  } catch (err) {
   
    return new NextResponse(
      JSON.stringify({
        err,
        status: 500,
        massage: "Internal Server Error",
      })
    );
  }
};

function validateOrderData(data: product, user: Session | null): boolean {
  if (!user) {
    return false;
  }
  if (!data.product || typeof data !== "object") {
    return false;
  }

  return true;
}
async function validateOrderPrice(data: product): Promise<boolean> {
  const productsId = data.product.map((e) => e.productId);
  const allPrices = await Promise.all(
    productsId.map(async (e) => {
      const product = await prisma.product.findFirst({
        where: { id: e },
      });
      return product ? product.price : 0;
    })
  );
  const totalPrice = allPrices.reduce((total, price) => total + price, 0);

  if (totalPrice === data.total) {
    return true;
  }
  return false;
}

const payment = (data: product) => {
  if (data.payment?.orderID) {
    return {
      payment: true,
      paymentMethod: PaymentMethod.Paypal,
      paymentSource: data.payment.paymentSource,
    };
  } else
    return { payment: false, paymentMethod: PaymentMethod.Cash_on_delivery };
};
