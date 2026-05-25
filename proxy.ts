import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isLoggedIn && (req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/register"))) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/auth/login", "/auth/register"],
};
