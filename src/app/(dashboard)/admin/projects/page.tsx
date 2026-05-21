"use client";

import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";

import {
    CalendarDays,
    FolderKanban,
    Loader2,
    Users,
} from "lucide-react";

import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

import { getProjects } from "@/services/project/project.service";

export default function ProjectsPage() {
    const [projects, setProjects] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    // =========================
    // FETCH PROJECTS
    // =========================

    const fetchProjects =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getProjects();

                setProjects(
                    response.data.projects
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch projects"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Projects"
                description="Manage company projects and teams."
                breadcrumbs={[
                    {
                        label: "Projects",
                    },
                ]}
                action={
                    <Button asChild>
                        <Link href="/admin/projects/create">
                            Create Project
                        </Link>
                    </Button>
                }
            />

            {/* Loading */}
            {loading ? (
                <div className="flex h-[400px] items-center justify-center">

                    <Loader2
                        size={32}
                        className="animate-spin text-primary"
                    />
                </div>
            ) : (

                <>

                    {/* Empty State */}
                    {projects.length ===
                        0 ? (
                        <div className="flex h-[350px] flex-col items-center justify-center rounded-3xl border border-border bg-card">

                            <FolderKanban
                                size={60}
                                className="text-primary"
                            />

                            <h2 className="mt-6 text-2xl font-bold text-foreground">
                                No Projects Found
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Start by creating your first project.
                            </p>

                            <Button
                                asChild
                                className="mt-6"
                            >
                                <Link href="/admin/projects/create">
                                    Create Project
                                </Link>
                            </Button>
                        </div>
                    ) : (

                        <>

                            {/* Grid */}
                            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

                                {projects.map(
                                    (project) => (
                                        <div
                                            key={
                                                project._id
                                            }
                                            className="rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
                                        >

                                            {/* Top */}
                                            <div className="flex items-center justify-between">

                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                    <FolderKanban
                                                        size={26}
                                                    />
                                                </div>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium
                          ${project.status ===
                                                            "COMPLETED"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                            : project.status ===
                                                                "IN_PROGRESS"
                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                        }`}
                                                >
                                                    {project.status.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="mt-6">

                                                <h2 className="text-2xl font-bold text-foreground">
                                                    {
                                                        project.name
                                                    }
                                                </h2>

                                                <p className="mt-3 line-clamp-3 leading-7 text-muted-foreground">
                                                    {
                                                        project.description
                                                    }
                                                </p>
                                            </div>

                                            {/* Progress */}
                                            <div className="mt-6">

                                                <div className="mb-2 flex items-center justify-between">

                                                    <p className="text-sm font-medium text-foreground">
                                                        Progress
                                                    </p>

                                                    <p className="text-sm text-primary">
                                                        {
                                                            project.progress
                                                        }
                                                        %
                                                    </p>
                                                </div>

                                                <div className="h-3 rounded-full bg-muted">

                                                    <div
                                                        className="h-3 rounded-full bg-primary transition-all"
                                                        style={{
                                                            width: `${project.progress}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Bottom */}
                                            <div className="mt-6 space-y-4 border-t border-border pt-6">

                                                {/* Members */}
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">

                                                    <Users
                                                        size={18}
                                                    />

                                                    <span>
                                                        {
                                                            project
                                                                ?.teamMembers
                                                                ?.length
                                                        }{" "}
                                                        Team Members
                                                    </span>
                                                </div>

                                                {/* Deadline */}
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">

                                                    <CalendarDays
                                                        size={18}
                                                    />

                                                    <span>
                                                        Deadline:{" "}
                                                        {project.deadline
                                                            ? new Date(
                                                                project.deadline
                                                            ).toLocaleDateString()
                                                            : "N/A"}
                                                    </span>
                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-3">

                                                    <div>

                                                        <p className="text-xs text-muted-foreground">
                                                            Project Lead
                                                        </p>

                                                        <p className="mt-1 font-medium text-foreground">
                                                            {
                                                                project
                                                                    ?.lead
                                                                    ?.name
                                                            }
                                                        </p>
                                                    </div>

                                                    <Button
                                                        variant="secondary"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/projects/${project._id}`}
                                                        >
                                                            View Details
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}