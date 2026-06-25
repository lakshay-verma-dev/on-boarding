import crypto from "crypto";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { successResponse, errorResponse } from "@/lib/helpers/response";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { email } = body;

        if (!email) {
            return errorResponse("Email is required", 400);
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Standard secure practice is to return success even if user not found, 
            // but for easier debugging and as per requirements, we can inform if email is invalid
            return errorResponse("User with this email does not exist", 404);
        }

        // Generate reset token
        const token = crypto.randomBytes(32).toString("hex");

        // Set token expiration (1 hour from now)
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

        await user.save();

        // Get origin from request to build the reset URL
        const { origin } = new URL(request.url);
        const resetLink = `${origin}/reset-password?token=${token}`;

        // In a real application, we would send this link via email using nodemailer.
        // For development/demonstration, we print it to the server console and return it in the response.
        console.log("\n==============================================");
        console.log("PASSWORD RESET REQUEST");
        console.log(`User: ${user.email}`);
        console.log(`Reset Link: ${resetLink}`);
        console.log("==============================================\n");

        return successResponse({
            message: "Password reset link has been generated and logged in console",
            resetLink, // returned for verification/local testing
            token,
        });
    } catch (error) {
        console.error(error);
        return errorResponse("Something went wrong", 500);
    }
}
