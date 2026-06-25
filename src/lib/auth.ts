import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export interface AuthenticatedUser {
    _id: string;
    email: string;
    role: string;
}

export async function getAuthUser(request?: Request): Promise<AuthenticatedUser | null> {
    if (request) {
        // Read custom headers injected by middleware
        const userId = request.headers.get("x-user-id");
        const userEmail = request.headers.get("x-user-email");
        const userRole = request.headers.get("x-user-role");

        if (userId && userEmail && userRole) {
            return {
                _id: userId,
                email: userEmail,
                role: userRole,
            };
        }

        // Fallback: check Authorization header
        const authHeader = request.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.substring(7);
            const decoded = await verifyToken(token);
            if (decoded) {
                return {
                    _id: (decoded._id as string) || (decoded.sub as string) || "",
                    email: (decoded.email as string) || "",
                    role: (decoded.role as string) || "",
                };
            }
        }
    }

    // Fallback: check cookies
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (token) {
            const decoded = await verifyToken(token);
            if (decoded) {
                return {
                    _id: (decoded._id as string) || (decoded.sub as string) || "",
                    email: (decoded.email as string) || "",
                    role: (decoded.role as string) || "",
                };
            }
        }
    } catch (e) {
        // cookies() might throw if called outside Request context, ignore
    }

    return null;
}
