import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/utils/connect";

export const POST = async (req: NextRequest) => {
 
  const { name, email, password } = await req.json();

  const hashPassword = await bcrypt.hash(password, 6);
  try {
    const isUser = await prisma.user.findFirst({ where: { email: email } });
    if (isUser) {
      return new NextResponse(
        JSON.stringify({
          massage: "Already has a account please login",
          status: 500,
        })
      );
    } else {
      await prisma.user.create({
        data: { name, email, password: hashPassword },
      });
      return new NextResponse(
        JSON.stringify({ massage: "User has been created", status: 201 })
      );
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ status: 500, massage: "Something missing", err })
    );
  }
};
