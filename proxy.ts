// proxy.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  
  console.log("Middleware Check -> Path:", req.nextUrl.pathname, "| Session:", JSON.stringify(req.auth));

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  // اینجا با as any به تایپ‌ها دور می‌زنیم تا مطمئن شویم ارور نمیدهد
  const userRoles = (req.auth?.user as any)?.roles || []; 

  // این لاگ را حتماً در ترمینال (نه کنسول مرورگر) چک کنید
  console.log("--- Middleware ---");
  console.log("Path:", nextUrl.pathname);
  console.log("Is Logged In:", isLoggedIn);
  console.log("User Roles:", userRoles);

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isMentorRoute = nextUrl.pathname.startsWith("/mentor");
  const isStudentRoute = nextUrl.pathname.startsWith("/student");
  const isLoginPage = nextUrl.pathname === "/login";

  // ۱. اگر لاگین است و میخواد بره لاگین، بفرستش خانه
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // ۲. اگر لاگین نیست و میخواد بره پنل‌ها، بفرستش لاگین
  if (!isLoggedIn && (isAdminRoute || isMentorRoute || isStudentRoute)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // ۳. چک دسترسی‌ها
  if (isAdminRoute && !userRoles.includes("ADMIN")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isMentorRoute && !userRoles.includes("MENTOR")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isStudentRoute && !userRoles.includes("STUDENT")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/mentor/:path*", "/student/:path*", "/login"],
};