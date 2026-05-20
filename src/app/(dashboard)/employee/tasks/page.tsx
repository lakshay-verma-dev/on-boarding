"use client";

import {
    CalendarDays,
    ClipboardList,
    MessageSquare,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

const tasks = [
    {
        title: "Build Attendance Module",
        project: "HRM Dashboard",
        priority: "High",
        status: "In Progress",
        dueDate: "22 May 2026",
        comments: 12,
    },
    {
        title: "Fix Navbar Responsive Issues",
        project: "Employee Portal",
        priority: "Medium",
        status: "Pending",
        dueDate: "25 May 2026",
        comments: 5,
    },
    {
        title: "Update Dashboard Charts",
        project: "Analytics System",
        priority: "Low",
        status: "Completed",
        dueDate: "18 May 2026",
        comments: 8,
    },
];

export default function EmployeeTasksPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="My Tasks"
                description="Manage your assigned tasks and progress."
            />

            {/* Grid */}
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
                    >

                        {/* Top */}
                        <div className="flex items-start justify-between">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <ClipboardList size={26} />
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${task.status === "Completed"
                                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                        : task.status === "In Progress"
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                    }`}
                            >
                                {task.status}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="mt-6">

                            <h2 className="text-2xl font-bold text-foreground">
                                {task.title}
                            </h2>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Project: {task.project}
                            </p>
                        </div>

                        {/* Priority */}
                        <div className="mt-5">

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${task.priority === "High"
                                        ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                        : task.priority === "Medium"
                                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                            : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                    }`}
                            >
                                {task.priority} Priority
                            </span>
                        </div>

                        {/* Bottom */}
                        <div className="mt-6 space-y-4 border-t border-border pt-6">

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <CalendarDays size={18} />

                                <span>
                                    Due: {task.dueDate}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MessageSquare size={18} />

                                <span>
                                    {task.comments} Comments
                                </span>
                            </div>

                            <div className="pt-3">

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                >
                                    View Task
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}