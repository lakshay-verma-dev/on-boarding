import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Project from "@/models/Project";

// =========================
// CREATE PROJECT
// =========================

export async function POST(
    request: Request
) {
    try {
        await connectDB();

        const body =
            await request.json();

        const {
            name,
            description,
            status,
            priority,
            deadline,
            lead,
            teamMembers,
        } = body;

        // =========================
        // VALIDATION
        // =========================

        if (
            !name ||
            !lead
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Project name and lead are required",
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // CREATE PROJECT
        // =========================

        const project =
            await Project.create({
                name,

                description,

                status,

                priority,

                deadline,

                lead,

                teamMembers,

                progress: 0,
            });

        return NextResponse.json(
            {
                success: true,

                message:
                    "Project created successfully",

                project,
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
// GET PROJECTS
// =========================

export async function GET() {
    try {
        await connectDB();

        const projects =
            await Project.find()
                .populate(
                    "lead",
                    "name email"
                )
                .populate(
                    "teamMembers",
                    "name email"
                )
                .sort({
                    createdAt: -1,
                });

        return NextResponse.json({
            success: true,

            projects,
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