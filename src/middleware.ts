import {
    NextRequest,
    NextResponse,
} from "next/server";

import { verifyToken } from "@/lib/jwt";

export async function middleware(
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

    // Verify Token
    const decoded = token
        ? await verifyToken(token)
        : null;

    // Already Logged In
    if (
        decoded &&
        publicRoutes.includes(
            pathname
        )
    ) {
        switch (
        decoded.role
        ) {
            case "ADMIN":
                return NextResponse.redirect(
                    new URL(
                        "/admin/dashboard",
                        request.url
                    )
                );

            case "LEAD":
                return NextResponse.redirect(
                    new URL(
                        "/lead/dashboard",
                        request.url
                    )
                );

            case "EMPLOYEE":
                return NextResponse.redirect(
                    new URL(
                        "/employee/dashboard",
                        request.url
                    )
                );

            default:
                return NextResponse.redirect(
                    new URL(
                        "/",
                        request.url
                    )
                );
        }
    }

    // Protected Routes
    const protectedRoutes = [
        "/admin",
        "/lead",
        "/employee",
    ];

    const isProtected =
        protectedRoutes.some((route) =>
            pathname.startsWith(route)
        );

    // No Token
    if (
        isProtected &&
        !decoded
    ) {
        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );
    }

    // Role-based Access Control
    if (isProtected && decoded) {
        const role = decoded.role;
        if (pathname.startsWith("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(
                new URL(
                    "/unauthorized",
                    request.url
                )
            );
        }
        if (pathname.startsWith("/lead") && role !== "LEAD") {
            return NextResponse.redirect(
                new URL(
                    "/unauthorized",
                    request.url
                )
            );
        }
        if (pathname.startsWith("/employee") && role !== "EMPLOYEE") {
            return NextResponse.redirect(
                new URL(
                    "/unauthorized",
                    request.url
                )
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/lead/:path*",
        "/employee/:path*",
        "/login",
    ],
};