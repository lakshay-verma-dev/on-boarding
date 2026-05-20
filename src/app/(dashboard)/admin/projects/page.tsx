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
            "Complete employee management platform.",
        status: "In Progress",
        progress: 78,
        lead: "Sarah Smith",
        members: 8,
        deadline: "28 May 2026",
    },
    {
        name: "Client CRM System",
        description:
            "Customer relationship management system.",
        status: "Completed",
        progress: 100,
        lead: "John Doe",
        members: 5,
        deadline: "10 May 2026",
    },
    {
        name: "Finance Tracker",
        description:
            "Company finance and analytics platform.",
        status: "Pending",
        progress: 32,
        lead: "Alex Johnson",
        members: 4,
        deadline: "15 June 2026",
    },
];

export default function ProjectsPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Projects"
                description="Manage company projects and teams."
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
                                className={`rounded-full px-3 py-1 text-xs font-medium ${project.status ===
                                        "Completed"
                                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                        : project.status ===
                                            "In Progress"
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
                                    {project.members} Team Members
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <CalendarDays size={18} />

                                <span>
                                    Deadline: {project.deadline}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-3">

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Project Lead
                                    </p>

                                    <p className="mt-1 font-medium text-foreground">
                                        {project.lead}
                                    </p>
                                </div>

                                <Button variant="secondary">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}