import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const { inputValue, image } = data;

  try {
    const upload = await prisma.menu.create({
      data: { manu: inputValue, image: image.url },
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
    const data = await prisma.menu.findMany();

    return new NextResponse(
      JSON.stringify({ data, status: 200, massage: "Complete" })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        err,
        status: 400,
        massage: "Can not upload to database",
      })
    );
  }
};
