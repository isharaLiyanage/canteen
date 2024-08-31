import prisma from "@/utils/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      
    });
    return new NextResponse(
      JSON.stringify({ status: 400, products, message: "done" })
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
