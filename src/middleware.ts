import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

export function middleware(
    request: NextRequest
) {
    const token =
        request.cookies.get("token")
            ?.value;

    const pathname =
        request.nextUrl.pathname;

    // Public Routes
    const publicRoutes = [
        "/login",
        "/forgot-password",
        "/reset-password",
    ];

    // Allow Public Routes
    if (
        publicRoutes.includes(pathname)
    ) {
        return NextResponse.next();
    }

    // No Token
    if (!token) {
        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );
    }

    // Verify Token
    const decoded =
        verifyToken(token) as any;

    if (!decoded) {
        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );
    }

    // Role Based Protection

    // Admin
    if (
        pathname.startsWith(
            "/admin"
        ) &&
        decoded.role !== "ADMIN"
    ) {
        return NextResponse.redirect(
            new URL(
                "/unauthorized",
                request.url
            )
        );
    }

    // Lead
    if (
        pathname.startsWith(
            "/lead"
        ) &&
        decoded.role !== "LEAD"
    ) {
        return NextResponse.redirect(
            new URL(
                "/unauthorized",
                request.url
            )
        );
    }

    // Employee
    if (
        pathname.startsWith(
            "/employee"
        ) &&
        decoded.role !==
        "EMPLOYEE"
    ) {
        return NextResponse.redirect(
            new URL(
                "/unauthorized",
                request.url
            )
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/lead/:path*",
        "/employee/:path*",
        "/login",
        "/forgot-password",
        "/reset-password",
    ],
};