import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";

// =========================
// GET SINGLE EMPLOYEE
// =========================

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
) {
    try {
        await connectDB();

        const { id } =
            await params;

        const employee =
            await User.findById(
                id
            ).select("-password");

        if (!employee) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Employee not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,
            employee,
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

// =========================
// UPDATE EMPLOYEE
// =========================

export async function PUT(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
) {
    try {
        await connectDB();

        const { id } =
            await params;

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
            status,
        } = body;

        const updateData: any = {
            name,
            email,
            role,
            phone,
            department,
            designation,
            address,
            joiningDate,
            status,
        };

        // Update Password If Exists
        if (password) {
            updateData.password =
                await bcrypt.hash(
                    password,
                    10
                );
        }

        const employee =
            await User.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                }
            ).select("-password");

        return NextResponse.json({
            success: true,

            message:
                "Employee updated successfully",

            employee,
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

// =========================
// DELETE EMPLOYEE
// =========================

export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
) {
    try {
        await connectDB();

        const { id } =
            await params;

        await User.findByIdAndDelete(
            id
        );

        return NextResponse.json({
            success: true,

            message:
                "Employee deleted successfully",
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