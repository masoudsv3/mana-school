import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Phone", type: "tel" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const phone = credentials?.phone as string;
        const code = credentials?.code as string;
        if (!phone || !code) return null;

        const otp = await prisma.otpCode.findFirst({
          where: { phone, code, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: "desc" },
        });
        if (!otp) return null;

        await prisma.otpCode.delete({ where: { id: otp.id } });

        let user = await prisma.user.findUnique({ where: { phone } });
        if (!user) user = await prisma.user.create({ data: { phone } });

        return { id: user.id };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
        // {
        // (session.user as any).id = token.id;
        // (session.user as any).phone = token.phone;
      // }
      return session;
    },
  },
});