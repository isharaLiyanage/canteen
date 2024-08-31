import prisma from "@/utils/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        user: { select: { email: true, id: true } },
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
