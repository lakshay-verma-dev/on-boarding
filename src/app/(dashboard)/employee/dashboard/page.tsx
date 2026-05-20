"use client";

import {
    CalendarDays,
    ClipboardList,
    FolderKanban,
    Timer,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";
import StatsCard from "@/components/common/cards/StatsCard";

import { Button } from "@/components/ui/button";

export default function EmployeeDashboardPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Employee Dashboard"
                description="Track your attendance, tasks and projects."
            />

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatsCard
                    title="Today's Attendance"
                    value="Present"
                    change="Clocked in at 09:12 AM"
                    icon={CalendarDays}
                />

                <StatsCard
                    title="Assigned Tasks"
                    value="12"
                    change="3 pending today"
                    icon={ClipboardList}
                />

                <StatsCard
                    title="Projects"
                    value="04"
                    change="2 active projects"
                    icon={FolderKanban}
                />

                <StatsCard
                    title="Working Hours"
                    value="07:32"
                    change="Today's progress"
                    icon={Timer}
                />
            </div>

            {/* Attendance Actions */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                {/* Clock In/Out */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <h2 className="text-2xl font-bold text-foreground">
                        Attendance
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Manage your daily attendance.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        <Button className="h-12 px-6">
                            Clock In
                        </Button>

                        <Button
                            variant="secondary"
                            className="h-12 px-6"
                        >
                            Clock Out
                        </Button>
                    </div>

                    <div className="mt-8 space-y-4">

                        <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Clock In Time
                                </p>

                                <p className="mt-1 font-semibold text-foreground">
                                    09:12 AM
                                </p>
                            </div>

                            <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Working Hours
                                </p>

                                <p className="mt-1 font-semibold text-foreground">
                                    07h 32m
                                </p>
                            </div>

                            <div className="h-3 w-3 rounded-full bg-primary" />
                        </div>
                    </div>
                </div>

                {/* Today's Tasks */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-2xl font-bold text-foreground">
                                Today's Tasks
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Your assigned tasks for today.
                            </p>
                        </div>

                        <Button variant="secondary">
                            View All
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
                                    "Fix Dashboard Bugs",
                                status: "Pending",
                            },
                            {
                                title:
                                    "Update API Services",
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
    );
}