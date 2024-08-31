import prisma from "@/utils/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });
    return new NextResponse(
      JSON.stringify({ status: 400, product, message: "done" })
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
    const data = await req.json();
    const tag = data.formData.tag;
    const tagArray = tag.split(',')

  try {
    const updatedOrder = await prisma.product.update({
      where: {
        id: params.id,
      },
      data:{...data.formData,tag:tagArray}
      
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
