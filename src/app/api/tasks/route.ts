import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Task from "@/models/Task";

// =========================
// CREATE TASK
// =========================

export async function POST(
    request: Request
) {
    try {
        await connectDB();

        const body =
            await request.json();

        const {
            title,
            description,
            status,
            priority,
            deadline,
            project,
            assignedTo,
        } = body;

        // Validation
        if (
            !title ||
            !project ||
            !assignedTo
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Required fields missing",
                },
                {
                    status: 400,
                }
            );
        }

        const task =
            await Task.create({
                title,
                description,
                status,
                priority,
                deadline,
                project,
                assignedTo,
            });

        return NextResponse.json(
            {
                success: true,
                message:
                    "Task created successfully",
                task,
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
// GET TASKS
// =========================

export async function GET(
    request: Request
) {
    try {
        await connectDB();

        const { searchParams } =
            new URL(request.url);

        const project =
            searchParams.get(
                "project"
            );

        const query: any = {};

        if (project) {
            query.project =
                project;
        }

        const tasks =
            await Task.find(query)
                .populate(
                    "project",
                    "name"
                )
                .populate(
                    "assignedTo",
                    "name email"
                )
                .sort({
                    createdAt: -1,
                });

        return NextResponse.json({
            success: true,
            tasks,
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