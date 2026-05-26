import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Task from "@/models/Task";

// =========================
// GET TASK
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

        const task =
            await Task.findById(
                id
            )
                .populate(
                    "project",
                    "name"
                )
                .populate(
                    "assignedTo",
                    "name email"
                );

        return NextResponse.json({
            success: true,
            task,
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
// UPDATE TASK
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

        const updatedTask =
            await Task.findByIdAndUpdate(
                id,
                body,
                {
                    new: true,
                }
            );

        return NextResponse.json({
            success: true,
            message:
                "Task updated successfully",
            task: updatedTask,
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
// DELETE TASK
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

        await Task.findByIdAndDelete(
            id
        );

        return NextResponse.json({
            success: true,
            message:
                "Task deleted successfully",
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