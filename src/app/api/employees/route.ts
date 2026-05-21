import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";

export async function POST(
    request: Request
) {
    try {
        await connectDB();

        const body =
            await request.json();

        const {
            name,
            email,
            password,
            role,
            phone,
            department,
            designation,
            address,
            joiningDate,
        } = body;

        // =========================
        // VALIDATION
        // =========================

        if (
            !name ||
            !email ||
            !password
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Required fields are missing",
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // CHECK EXISTING USER
        // =========================

        const existingUser =
            await User.findOne({
                email,
            });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "User already exists with this email",
                },
                {
                    status: 409,
                }
            );
        }

        // =========================
        // HASH PASSWORD
        // =========================

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        // =========================
        // CREATE USER
        // =========================

        const user =
            await User.create({
                name,
                email,
                password:
                    hashedPassword,

                role:
                    role ||
                    "EMPLOYEE",

                phone,

                department,

                designation,

                address,

                joiningDate,

                status: "ACTIVE",
            });

        return NextResponse.json(
            {
                success: true,

                message:
                    "Employee created successfully",

                user,
            },
            {
                status: 201,
            }
        );
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

// =========================
// GET EMPLOYEES
// =========================

export async function GET(
    request: Request
) {
    try {
        await connectDB();

        // =========================
        // QUERY PARAMS
        // =========================

        const { searchParams } =
            new URL(request.url);

        const role =
            searchParams.get("role");

        // =========================
        // QUERY
        // =========================

        const query: any = {
            role: {
                $ne: "ADMIN",
            },
        };

        // Filter By Role
        if (role) {
            query.role = role;
        }

        // =========================
        // FETCH EMPLOYEES
        // =========================

        const employees =
            await User.find(query)
                .select("-password")
                .sort({
                    createdAt: -1,
                });

        return NextResponse.json({
            success: true,
            employees,
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