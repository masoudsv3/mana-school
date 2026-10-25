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

        // برگرداندن اطلاعات کاربر همراه با نقش
        return { id: user.id, role: user.roles[0] }; 
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // ۱. وقتی کاربر برای اولین بار لاگین می‌کند
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }

      // ۲. وقتی کاربر از دیتابیس آپدیت می‌شود (یا در هر درخواست)
      // برای اینکه در هر درخواست نقش را چک کنیم، باید آیدی داشته باشیم
      if (token.id) {
        // نقش را از دیتابیس می‌خوانیم
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { roles: true }
        });
        
        if (dbUser) {
          token.role = dbUser.roles[0]; // نقش جدید را جایگزین می‌کنیم
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});