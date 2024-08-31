import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const { formData, image } = data;

  const tagArray = formData.tag.split(",");
  try {
    const upload = await prisma.product.create({
      data: { ...formData, tag: tagArray, image: image },
    });
    return new NextResponse(
      JSON.stringify({ upload, status: 200, massage: "Complete" })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ status: 400, massage: "Can not upload to database" })
    );
  }
};
export const GET = async () => {
  try {
    const product = await prisma.product.findMany();

    return new NextResponse(
      JSON.stringify({ product, status: 200, massage: "Complete" })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        err,
        status: 400,
        massage: "Something Wrong...",
      })
    );
  }
};
