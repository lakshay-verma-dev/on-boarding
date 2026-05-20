"use client";

import {
    ClipboardList,
    FolderKanban,
    Timer,
    Users,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";
import StatsCard from "@/components/common/cards/StatsCard";

import { Button } from "@/components/ui/button";

export default function LeadDashboardPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Lead Dashboard"
                description="Manage your team, projects and assigned tasks."
            />

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatsCard
                    title="Team Members"
                    value="18"
                    change="+2 this month"
                    icon={Users}
                />

                <StatsCard
                    title="Active Projects"
                    value="06"
                    change="2 nearing deadline"
                    icon={FolderKanban}
                />

                <StatsCard
                    title="Pending Tasks"
                    value="42"
                    change="12 pending review"
                    icon={ClipboardList}
                />

                <StatsCard
                    title="Productivity"
                    value="86%"
                    change="+4% from last week"
                    icon={Timer}
                />
            </div>

            {/* Main Grid */}
            <div className="mt-8 grid gap-6 xl:grid-cols-3">

                {/* Team Activity */}
                <div className="rounded-3xl border border-border bg-card p-6 xl:col-span-2">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-2xl font-bold text-foreground">
                                Team Activity
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Recent updates from your team.
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
                                    "John completed Attendance API module",
                                time: "10 mins ago",
                            },
                            {
                                title:
                                    "Sarah updated dashboard UI components",
                                time: "35 mins ago",
                            },
                            {
                                title:
                                    "Alex submitted project progress report",
                                time: "1 hour ago",
                            },
                            {
                                title:
                                    "Emma created 4 new tasks",
                                time: "2 hours ago",
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

                {/* Quick Actions */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <h2 className="text-2xl font-bold text-foreground">
                        Quick Actions
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Common lead management actions.
                    </p>

                    <div className="mt-8 space-y-4">

                        <Button className="h-12 w-full justify-start">
                            Create New Task
                        </Button>

                        <Button
                            variant="secondary"
                            className="h-12 w-full justify-start"
                        >
                            Assign Team Member
                        </Button>

                        <Button
                            variant="secondary"
                            className="h-12 w-full justify-start"
                        >
                            Create Project Report
                        </Button>

                        <Button
                            variant="secondary"
                            className="h-12 w-full justify-start"
                        >
                            Review Team Progress
                        </Button>
                    </div>

                    {/* Overview */}
                    <div className="mt-8 rounded-2xl border border-border bg-background p-5">

                        <p className="text-sm text-muted-foreground">
                            Team Efficiency
                        </p>

                        <h3 className="mt-3 text-4xl font-bold text-foreground">
                            86%
                        </h3>

                        <div className="mt-4 h-3 rounded-full bg-muted">
                            <div className="h-3 w-[86%] rounded-full bg-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}