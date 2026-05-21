import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Project from "@/models/Project";

// =========================
// GET SINGLE PROJECT
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

        const project =
            await Project.findById(
                id
            )
                .populate(
                    "lead",
                    "name email"
                )
                .populate(
                    "teamMembers",
                    "name email"
                );

        if (!project) {
            return NextResponse.json(
                {
                    success: false,

                    message:
                        "Project not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            success: true,

            project,
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
// UPDATE PROJECT
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
            description,
            status,
            priority,
            progress,
            deadline,
            lead,
            teamMembers,
        } = body;

        const updatedProject =
            await Project.findByIdAndUpdate(
                id,
                {
                    name,
                    description,
                    status,
                    priority,
                    progress,
                    deadline,
                    lead,
                    teamMembers,
                },
                {
                    new: true,
                }
            )
                .populate(
                    "lead",
                    "name email"
                )
                .populate(
                    "teamMembers",
                    "name email"
                );

        return NextResponse.json({
            success: true,

            message:
                "Project updated successfully",

            project:
                updatedProject,
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
// DELETE PROJECT
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

        await Project.findByIdAndDelete(
            id
        );

        return NextResponse.json({
            success: true,

            message:
                "Project deleted successfully",
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