import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/utils/connect";

export const AuthOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // Define your credential fields here
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findFirst({
            where: { ...(credentials && { email: credentials.email }) },
          });

          if (user) {
            if (user.password !== null && credentials) {
              const isPassword = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPassword) {
                return user;
              } else {
                throw new Error("Wrong password");
              }
            } else {
              throw new Error("Missing credentials");
            }
          } else {
            throw new Error("User Not Found");
          }
        } catch (error: any) {
          const { statusCode, message } = error;
          console.error(message + "sds");
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.name,
          id: token.sub,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };
export const getAuthSession = () => getServerSession(AuthOption);
