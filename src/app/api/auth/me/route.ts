import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();

        // Get Token
        const cookieStore =
            await cookies();

        const token =
            cookieStore.get("token")
                ?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        // Verify Token
        const decoded =
            verifyToken(token) as any;

        if (!decoded) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid token",
                },
                {
                    status: 401,
                }
            );
        }

        // Find User
        const user = await User.findById(
            decoded._id
        ).select("-password");

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}