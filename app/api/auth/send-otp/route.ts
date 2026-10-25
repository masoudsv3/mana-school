import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtp } from "@/lib/sms";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.length !== 11 || !phone.startsWith("09")) {
      return NextResponse.json({ error: "شماره موبایل نامعتبر است" }, { status: 400 });
    }

    const code = await sendOtp(phone);

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    await prisma.otpCode.deleteMany({ where: { phone } });
    await prisma.otpCode.create({ data: { phone, code, expiresAt } });

    return NextResponse.json({ success: true, message: "کد ارسال شد" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ارسال پیامک" }, { status: 500 });
  }
}