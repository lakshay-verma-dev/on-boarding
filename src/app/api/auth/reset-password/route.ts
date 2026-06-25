import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { successResponse, errorResponse } from "@/lib/helpers/response";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { token, password } = body;

        if (!token || !password) {
            return errorResponse("Token and new password are required", 400);
        }

        // Find user by token and verify expiration
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        });

        if (!user) {
            return errorResponse("Invalid or expired password reset token", 400);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and clear token fields
        user.password = hashedPassword;
        user.resetPasswordToken = "";
        user.resetPasswordExpires = undefined;

        await user.save();

        return successResponse({
            message: "Password reset successful",
        });
    } catch (error) {
        console.error(error);
        return errorResponse("Something went wrong", 500);
    }
}
