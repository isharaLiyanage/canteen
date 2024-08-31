import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.user.findMany({ include: { orders: true } });
    console.log(data);
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
