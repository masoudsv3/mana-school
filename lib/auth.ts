// lib/auth.ts
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
        if (!user) {
          user = await prisma.user.create({ data: { phone } });
        }

        // برگرداندن id و آرایه roles
        return { id: user.id, roles: user.roles }; 
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // ۱. اگر کاربر تازه لاگین کرده
      if (user) {
        token.id = user.id;
        token.roles = (user as any).roles;
      }

      // ۲. برای اینکه تغییرات دیتابیس فوری اعمال شوند:
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { roles: true }
        });
        if (dbUser) {
          token.roles = dbUser.roles; // آپدیت توکن با نقش‌های جدید
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).roles = token.roles;
      }
      return session;
    },
  },
});