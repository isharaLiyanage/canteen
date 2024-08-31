import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();

  if (!session?.user?.email)
    return new NextResponse(
      JSON.stringify({ status: 404, massage: "Your Not Authenticated" })
    );
  try {
    const data = await prisma.user.findFirst({
      where: { email: session.user.email },
      select: {
        orders: { include: { orderItems: { include: { product: true } } } },
      },
    });

    return new NextResponse(
      JSON.stringify({ data, status: 200, massage: "Complete" })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        err,
        status: 400,
        massage: "Can not find users",
      })
    );
  }
};
