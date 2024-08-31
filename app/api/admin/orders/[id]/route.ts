import prisma from "@/utils/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

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
    console.log(er);
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
  console.log("dsd");
  try {
    const updatedOrder = await prisma.orders.update({
      where: {
        id: params.id,
      },
      data: {
        status: "ON_THE_WAY",
      },
    });

    return new NextResponse(
      JSON.stringify({ status: 400, updatedOrder, message: "done" })
    );
  } catch (er) {
    console.log(er);
    return new NextResponse(
      JSON.stringify({
        er,
        status: 500,
        massage: "Internal Server Error",
      })
    );
  }
};
