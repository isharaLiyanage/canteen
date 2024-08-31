import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export default withAuth(
  async function middleware(req: NextRequest) {
    // Get token from request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If token exists and user is admin, proceed to the requested route
    if (token?.role === "admin") {
      return NextResponse.next();
    }

    // If user is not authorized, redirect to sign-in page
    return NextResponse.redirect(new URL("/", req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        console.log(token?.role + "role");
        return token?.role === "admin";
      },
    },
    pages: {
      signIn: "/", // Redirect to the homepage for sign-in
      error: "/error", // Redirect to the error page
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
