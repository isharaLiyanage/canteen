import prisma from "@/utils/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const orders = await prisma.orders.findUnique({
      where: { id: params.id },
      include: {
        orderItems: { include: { product: { select: { name: true } } } },
      },
    });
    return new NextResponse(
      JSON.stringify({ status: 400, orders, message: "done" })
    );
  } catch (er) {
  
    return new NextResponse(
      JSON.stringify({
        er,
        status: 500,
        massage: "Internal Server Error",
      })
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession();

  try {
    if (session?.user) {
      const updatedOrder = await prisma.orders.update({
        where: {
          id: params.id,
        },
        data: {
          status: "DELIVERED",
        },
      });

      return new NextResponse(
        JSON.stringify({ status: 200, updatedOrder, message: "done" })
      );
    } else
      return new NextResponse(
        JSON.stringify({ status: 400, message: "Your Not Authorized" })
      );
  } catch (er) {

    return new NextResponse(
      JSON.stringify({
        er,
        status: 500,
        massage: "Internal Server Error",
      })
    );
  }
};
