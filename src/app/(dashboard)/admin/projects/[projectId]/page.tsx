"use client";

import {
    CalendarDays,
    FolderKanban,
    Users,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

export default function ProjectDetailsPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Project Details"
                description="Manage project information, members and progress."
                action={
                    <div className="flex gap-3">

                        <Button variant="secondary">
                            Edit Project
                        </Button>

                        <Button>
                            Assign Task
                        </Button>
                    </div>
                }
            />

            <div className="grid gap-6 xl:grid-cols-3">

                {/* Left */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                        <FolderKanban size={38} />
                    </div>

                    <h2 className="mt-6 text-3xl font-bold text-foreground">
                        HRM Dashboard
                    </h2>

                    <p className="mt-4 leading-8 text-muted-foreground">
                        Complete employee management platform
                        with attendance, projects and task
                        tracking system.
                    </p>

                    {/* Status */}
                    <div className="mt-6">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                            In Progress
                        </span>
                    </div>

                    {/* Info */}
                    <div className="mt-8 space-y-5">

                        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                            <Users
                                size={20}
                                className="text-primary"
                            />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Team Members
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    8 Members
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                            <CalendarDays
                                size={20}
                                className="text-primary"
                            />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Deadline
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    28 May 2026
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-8">

                        <div className="mb-3 flex items-center justify-between">

                            <p className="text-sm font-medium text-foreground">
                                Project Progress
                            </p>

                            <p className="text-sm text-primary">
                                78%
                            </p>
                        </div>

                        <div className="h-3 rounded-full bg-muted">
                            <div className="h-3 w-[78%] rounded-full bg-primary" />
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="space-y-6 xl:col-span-2">

                    {/* Team Members */}
                    <div className="rounded-3xl border border-border bg-card p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Team Members
                                </h2>

                                <p className="mt-2 text-muted-foreground">
                                    Employees working on this project.
                                </p>
                            </div>

                            <Button variant="secondary">
                                Add Member
                            </Button>
                        </div>

                        <div className="mt-8 space-y-4">

                            {[
                                {
                                    name: "Sarah Smith",
                                    role: "Project Lead",
                                },
                                {
                                    name: "John Doe",
                                    role: "Frontend Developer",
                                },
                                {
                                    name: "Alex Johnson",
                                    role: "Backend Developer",
                                },
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                            {member.name
                                                .split(" ")
                                                .map(
                                                    (name) => name[0]
                                                )
                                                .join("")}
                                        </div>

                                        <div>
                                            <p className="font-medium text-foreground">
                                                {member.name}
                                            </p>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant="secondary">
                                        View
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="rounded-3xl border border-border bg-card p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Recent Tasks
                                </h2>

                                <p className="mt-2 text-muted-foreground">
                                    Latest tasks assigned in this project.
                                </p>
                            </div>

                            <Button>
                                Create Task
                            </Button>
                        </div>

                        <div className="mt-8 space-y-4">

                            {[
                                {
                                    title:
                                        "Build Attendance UI",
                                    status: "In Progress",
                                },
                                {
                                    title:
                                        "Create Employee APIs",
                                    status: "Pending",
                                },
                                {
                                    title:
                                        "Fix Dashboard Bugs",
                                    status: "Completed",
                                },
                            ].map((task, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                                >

                                    <div>
                                        <p className="font-medium text-foreground">
                                            {task.title}
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Task #{index + 1}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${task.status ===
                                                "Completed"
                                                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                : task.status ===
                                                    "In Progress"
                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                            }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}