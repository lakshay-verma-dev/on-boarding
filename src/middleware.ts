import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // Admin trying to access employee-only routes
    if (pathname.startsWith("/dashboard/employee") && role === "admin") {
      return NextResponse.redirect(new URL("/dashboard/admin/employees", req.url));
    }

    // Employee trying to access admin-only routes
    if (pathname.startsWith("/dashboard/admin") && role === "employee") {
      return NextResponse.redirect(new URL("/dashboard/employee/attendance", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run middleware if there's a valid token
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
