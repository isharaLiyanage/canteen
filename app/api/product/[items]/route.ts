import prisma from "@/utils/connect";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextApiRequest,
  { params }: { params: { items: string } }
) => {
  const items = params.items;
  console.log(items);
  try {
    if (items === "All" || items === "undefined") {
      const product = await prisma.product.findMany();

      return new NextResponse(
        JSON.stringify({ product, status: 200, massage: "Complete" })
      );
    } else {
      const product = await prisma.product.findMany({
        where: { category: items },
      });

      return new NextResponse(
        JSON.stringify({ product, status: 200, massage: "Complete" })
      );
    }
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
