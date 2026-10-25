import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// استفاده از auth به عنوان تابع پیش‌فرض (همانطور که خودتان نوشته بودید)
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRoles = (req.auth?.user as any)?.roles || [];

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isMentorRoute = nextUrl.pathname.startsWith("/mentor");
  const isStudentRoute = nextUrl.pathname.startsWith("/student");
  const isLoginPage = nextUrl.pathname === "/login";

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  // اگر کاربر لاگین نکرده و میخواد بره تو پنل‌ها
  if (!isLoggedIn && (isAdminRoute || isMentorRoute || isStudentRoute)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // چک کردن دسترسی ادمین
  if (isAdminRoute && !userRoles.includes("ADMIN")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // چک کردن دسترسی مدرس
  if (isMentorRoute && !userRoles.includes("MENTOR")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // چک کردن دسترسی دانشجو
  if (isStudentRoute && !userRoles.includes("STUDENT")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

// تعیین مسیرهایی که باید روی آنها اجرا شود
export const config = {
  matcher: ["/admin/:path*", "/mentor/:path*", "/student/:path*"],
};
