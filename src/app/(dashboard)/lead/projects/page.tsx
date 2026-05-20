"use client";

import {
    CalendarDays,
    FolderKanban,
    Users,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

const projects = [
    {
        name: "HRM Dashboard",
        description:
            "Employee management platform with attendance tracking.",
        progress: 78,
        members: 8,
        deadline: "28 May 2026",
        status: "In Progress",
    },
    {
        name: "Client CRM",
        description:
            "Customer management dashboard for internal teams.",
        progress: 52,
        members: 5,
        deadline: "12 June 2026",
        status: "Pending",
    },
    {
        name: "Analytics Platform",
        description:
            "Company analytics and reporting system.",
        progress: 100,
        members: 6,
        deadline: "10 May 2026",
        status: "Completed",
    },
];

export default function LeadProjectsPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Lead Projects"
                description="Manage projects assigned to your team."
                action={
                    <Button>
                        Create Project
                    </Button>
                }
            />

            {/* Grid */}
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
                    >

                        {/* Top */}
                        <div className="flex items-start justify-between">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <FolderKanban size={26} />
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${project.status === "Completed"
                                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                        : project.status === "In Progress"
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                    }`}
                            >
                                {project.status}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="mt-6">

                            <h2 className="text-2xl font-bold text-foreground">
                                {project.name}
                            </h2>

                            <p className="mt-3 leading-7 text-muted-foreground">
                                {project.description}
                            </p>
                        </div>

                        {/* Progress */}
                        <div className="mt-6">

                            <div className="mb-2 flex items-center justify-between">

                                <p className="text-sm font-medium text-foreground">
                                    Progress
                                </p>

                                <p className="text-sm text-primary">
                                    {project.progress}%
                                </p>
                            </div>

                            <div className="h-3 rounded-full bg-muted">
                                <div
                                    className="h-3 rounded-full bg-primary"
                                    style={{
                                        width: `${project.progress}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="mt-6 space-y-4 border-t border-border pt-6">

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Users size={18} />

                                <span>
                                    {project.members} Members
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <CalendarDays size={18} />

                                <span>
                                    Deadline: {project.deadline}
                                </span>
                            </div>

                            <div className="pt-3">

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                >
                                    View Project
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}