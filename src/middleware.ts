import {
    NextRequest,
    NextResponse,
} from "next/server";

import { verifyToken } from "@/lib/jwt";
import { hasRole } from "@/lib/helpers/roleCheck";
import {
    PROJECT_CREATORS,
    TASK_CREATORS,
    EMPLOYEE_MANAGERS,
    EMPLOYEE_VIEWERS,
    DASHBOARD_ADMINS,
    DASHBOARD_LEADS,
    DASHBOARD_EMPLOYEES,
} from "@/lib/permissions";

export async function middleware(
    request: NextRequest
) {
    const pathname = request.nextUrl.pathname;
    const method = request.method;

    // 1. API ROUTES HANDLING
    if (pathname.startsWith("/api/")) {
        // Public API Routes
        const publicApiRoutes = [
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/forgot-password",
            "/api/auth/reset-password",
        ];

        if (publicApiRoutes.includes(pathname)) {
            return NextResponse.next();
        }

        // Try extracting token from cookies or Auth header
        let token = request.cookies.get("token")?.value;
        if (!token) {
            const authHeader = request.headers.get("Authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Token missing" },
                { status: 401 }
            );
        }

        const decoded = await verifyToken(token) as any;
        if (!decoded) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Invalid token" },
                { status: 401 }
            );
        }

        // Enforce role-based access control on APIs
        const role = decoded.role;

        // Project modifications
        if (pathname.startsWith("/api/projects")) {
            if (["POST", "PUT", "DELETE"].includes(method)) {
                if (!hasRole(role, PROJECT_CREATORS)) {
                    return NextResponse.json(
                        { success: false, message: "Forbidden: Only Admin or Lead can perform this action" },
                        { status: 403 }
                    );
                }
            }
        }

        // Task modifications
        if (pathname.startsWith("/api/tasks")) {
            if (["POST", "PUT", "DELETE"].includes(method)) {
                if (!hasRole(role, TASK_CREATORS)) {
                    return NextResponse.json(
                        { success: false, message: "Forbidden: Only Admin or Lead can perform this action" },
                        { status: 403 }
                    );
                }
            }
        }

        // Employees
        if (pathname.startsWith("/api/employees")) {
            if (["POST", "PUT", "DELETE"].includes(method)) {
                if (!hasRole(role, EMPLOYEE_MANAGERS)) {
                    return NextResponse.json(
                        { success: false, message: "Forbidden: Only Admin can manage employees" },
                        { status: 403 }
                    );
                }
            } else if (method === "GET") {
                if (!hasRole(role, EMPLOYEE_VIEWERS)) {
                    return NextResponse.json(
                        { success: false, message: "Forbidden: Access denied" },
                        { status: 403 }
                    );
                }
            }
        }

        // Admin Dashboard API
        if (pathname.startsWith("/api/dashboard/admin")) {
            if (!hasRole(role, DASHBOARD_ADMINS)) {
                return NextResponse.json(
                    { success: false, message: "Forbidden: Admin access required" },
                    { status: 403 }
                );
            }
        }

        // Lead Dashboard API
        if (pathname.startsWith("/api/dashboard/lead")) {
            if (!hasRole(role, DASHBOARD_LEADS)) {
                return NextResponse.json(
                    { success: false, message: "Forbidden: Lead access required" },
                    { status: 403 }
                );
            }
        }

        // Employee Dashboard API
        if (pathname.startsWith("/api/dashboard/employee")) {
            if (!hasRole(role, DASHBOARD_EMPLOYEES)) {
                return NextResponse.json(
                    { success: false, message: "Forbidden: Access denied" },
                    { status: 403 }
                );
            }
        }

        // Append user context to headers for route handlers to access
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", decoded._id);
        requestHeaders.set("x-user-email", decoded.email);
        requestHeaders.set("x-user-role", decoded.role);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    // 2. PAGE ROUTES HANDLING
    const token = request.cookies.get("token")?.value;

    const publicRoutes = [
        "/login",
        "/forgot-password",
        "/reset-password",
    ];

    const decoded = token
        ? await verifyToken(token) as any
        : null;

    // Already Logged In: redirect public pages to role dashboard
    if (decoded && publicRoutes.includes(pathname)) {
        switch (decoded.role) {
            case "ADMIN":
                return NextResponse.redirect(new URL("/admin/dashboard", request.url));
            case "LEAD":
                return NextResponse.redirect(new URL("/lead/dashboard", request.url));
            case "EMPLOYEE":
                return NextResponse.redirect(new URL("/employee/dashboard", request.url));
            default:
                return NextResponse.redirect(new URL("/", request.url));
        }
    }

    const protectedRoutes = [
        "/admin",
        "/lead",
        "/employee",
    ];

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // No Token: redirect to login
    if (isProtected && !decoded) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Role-based Access Control for pages
    if (isProtected && decoded) {
        const role = decoded.role;
        if (pathname.startsWith("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
        if (pathname.startsWith("/lead") && role !== "LEAD") {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
        if (pathname.startsWith("/employee") && role !== "EMPLOYEE") {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
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
        "/api/:path*",
    ],
};