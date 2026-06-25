import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { successResponse, errorResponse } from "@/lib/helpers/response";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, email, password, role } = body;

        // Validation
        if (!name || !email || !password) {
            return errorResponse("Name, email and password are required", 400);
        }

        // Check Existing User
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse("User already exists with this email", 409);
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "EMPLOYEE",
            status: "ACTIVE",
        });

        // Hide password in response
        const userObj = user.toObject();
        delete userObj.password;

        return successResponse(
            {
                message: "User registered successfully",
                user: userObj,
            },
            201
        );
    } catch (error) {
        console.error(error);
        return errorResponse("Something went wrong", 500);
    }
}
