import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";

import User from "@/models/User";

export async function POST(
    request: Request
) {
    try {
        await connectDB();

        const body = await request.json();

        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Email and password are required",
                },
                {
                    status: 400,
                }
            );
        }

        // Find User
        const user = await User.findOne({
            email,
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials",
                },
                {
                    status: 401,
                }
            );
        }

        // Compare Password
        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials",
                },
                {
                    status: 401,
                }
            );
        }

        // Generate Token
        const token = await generateToken({
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        // Response
        const response = NextResponse.json({
            success: true,

            message: "Login successful",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },

            token,
        });

        // Cookie
        response.cookies.set(
            "token",
            token,
            {
                httpOnly: true,

                secure:
                    process.env.NODE_ENV ===
                    "production",

                sameSite: "lax",

                maxAge:
                    7 * 24 * 60 * 60,

                path: "/",
            }
        );

        return response;
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