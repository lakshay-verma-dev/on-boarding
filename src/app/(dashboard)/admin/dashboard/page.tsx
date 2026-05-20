import {
    CalendarDays,
    ClipboardList,
    FolderKanban,
    Users,
} from "lucide-react";

import StatsCard from "@/components/common/cards/StatsCard";

export default function AdminDashboardPage() {
    return (
        <div>

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Welcome back, manage your company efficiently.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatsCard
                    title="Total Employees"
                    value="120"
                    change="+12 this month"
                    icon={Users}
                />

                <StatsCard
                    title="Active Projects"
                    value="18"
                    change="+3 ongoing"
                    icon={FolderKanban}
                />

                <StatsCard
                    title="Pending Tasks"
                    value="342"
                    change="+28 today"
                    icon={ClipboardList}
                />

                <StatsCard
                    title="Attendance"
                    value="92%"
                    change="+4% from yesterday"
                    icon={CalendarDays}
                />
            </div>

            {/* Bottom Section */}
            <div className="mt-8 grid gap-6 xl:grid-cols-3">

                {/* Recent Activities */}
                <div className="rounded-3xl border border-border bg-card p-6 xl:col-span-2">

                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">
                            Recent Activities
                        </h2>

                        <button className="text-sm font-medium text-primary">
                            View All
                        </button>
                    </div>

                    <div className="space-y-5">

                        {[
                            {
                                title:
                                    "New employee joined frontend team",
                                time: "2 mins ago",
                            },
                            {
                                title:
                                    "Project dashboard redesign updated",
                                time: "15 mins ago",
                            },
                            {
                                title:
                                    "Attendance report generated",
                                time: "1 hour ago",
                            },
                            {
                                title:
                                    "Task assigned to backend developer",
                                time: "2 hours ago",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4"
                            >
                                <div className="mt-1 h-3 w-3 rounded-full bg-primary" />

                                <div>
                                    <p className="font-medium text-foreground">
                                        {item.title}
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Overview */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <h2 className="text-xl font-semibold text-foreground">
                        Quick Overview
                    </h2>

                    <div className="mt-6 space-y-5">

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-foreground">
                                    Project Completion
                                </p>

                                <p className="text-sm text-primary">
                                    78%
                                </p>
                            </div>

                            <div className="h-3 rounded-full bg-muted">
                                <div className="h-3 w-[78%] rounded-full bg-primary" />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-foreground">
                                    Attendance Rate
                                </p>

                                <p className="text-sm text-primary">
                                    92%
                                </p>
                            </div>

                            <div className="h-3 rounded-full bg-muted">
                                <div className="h-3 w-[92%] rounded-full bg-primary" />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-foreground">
                                    Task Progress
                                </p>

                                <p className="text-sm text-primary">
                                    64%
                                </p>
                            </div>

                            <div className="h-3 rounded-full bg-muted">
                                <div className="h-3 w-[64%] rounded-full bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}