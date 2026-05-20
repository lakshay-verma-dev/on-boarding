"use client";

import {
    CalendarDays,
    CheckCircle2,
    ClipboardList,
    MessageSquare,
    Users,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TaskDetailsPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Task Details"
                description="Track task progress and collaboration."
                action={
                    <div className="flex gap-3">

                        <Button variant="secondary">
                            Edit Task
                        </Button>

                        <Button>
                            Update Status
                        </Button>
                    </div>
                }
            />

            <div className="grid gap-6 xl:grid-cols-3">

                {/* Left */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                        <ClipboardList size={38} />
                    </div>

                    <h2 className="mt-6 text-3xl font-bold text-foreground">
                        Build Attendance APIs
                    </h2>

                    <p className="mt-4 leading-8 text-muted-foreground">
                        Create attendance APIs for clock in,
                        clock out and leave management system.
                    </p>

                    {/* Status */}
                    <div className="mt-6 flex flex-wrap gap-3">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                            In Progress
                        </span>

                        <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
                            High Priority
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
                                    Assigned To
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    John Doe
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
                                    Due Date
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    22 May 2026
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                            <CheckCircle2
                                size={20}
                                className="text-primary"
                            />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Progress
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    78% Completed
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-8">

                        <div className="mb-3 flex items-center justify-between">

                            <p className="text-sm font-medium text-foreground">
                                Task Progress
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

                    {/* Activity */}
                    <div className="rounded-3xl border border-border bg-card p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Task Activity
                                </h2>

                                <p className="mt-2 text-muted-foreground">
                                    Recent updates and progress.
                                </p>
                            </div>

                            <Button variant="secondary">
                                View Logs
                            </Button>
                        </div>

                        <div className="mt-8 space-y-4">

                            {[
                                {
                                    title:
                                        "Attendance API routes created",
                                    time: "20 mins ago",
                                },
                                {
                                    title:
                                        "JWT authentication integrated",
                                    time: "1 hour ago",
                                },
                                {
                                    title:
                                        "Database schema updated",
                                    time: "3 hours ago",
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4"
                                >

                                    <div className="mt-1 h-3 w-3 rounded-full bg-primary" />

                                    <div>
                                        <p className="font-medium text-foreground">
                                            {activity.title}
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="rounded-3xl border border-border bg-card p-6">

                        <div className="flex items-center gap-3">

                            <MessageSquare
                                size={24}
                                className="text-primary"
                            />

                            <h2 className="text-2xl font-bold text-foreground">
                                Comments
                            </h2>
                        </div>

                        {/* Comment List */}
                        <div className="mt-8 space-y-5">

                            {[
                                {
                                    name: "Sarah Smith",
                                    comment:
                                        "Please complete leave APIs today.",
                                },
                                {
                                    name: "John Doe",
                                    comment:
                                        "Clock in and clock out APIs are completed.",
                                },
                            ].map((comment, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-border bg-background p-5"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                            {comment.name
                                                .split(" ")
                                                .map((name) => name[0])
                                                .join("")}
                                        </div>

                                        <div>
                                            <p className="font-medium text-foreground">
                                                {comment.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                Just now
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-4 leading-7 text-muted-foreground">
                                        {comment.comment}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <div className="mt-8">

                            <Textarea placeholder="Write a comment..." />

                            <div className="mt-4 flex justify-end">

                                <Button>
                                    Add Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}