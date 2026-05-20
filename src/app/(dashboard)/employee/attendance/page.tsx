"use client";

import {
    CalendarDays,
    Clock3,
    Timer,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";
import DataTable from "@/components/common/tables/DataTable";

import { Button } from "@/components/ui/button";

const attendanceColumns = [
    {
        key: "date",
        title: "Date",
    },
    {
        key: "clockIn",
        title: "Clock In",
    },
    {
        key: "clockOut",
        title: "Clock Out",
    },
    {
        key: "hours",
        title: "Working Hours",
    },
    {
        key: "status",
        title: "Status",
    },
];

const attendanceData = [
    {
        date: "19 May 2026",
        clockIn: "09:12 AM",
        clockOut: "06:30 PM",
        hours: "08h 18m",
        status: (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                Present
            </span>
        ),
    },
    {
        date: "18 May 2026",
        clockIn: "09:42 AM",
        clockOut: "06:15 PM",
        hours: "07h 33m",
        status: (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                Late
            </span>
        ),
    },
    {
        date: "17 May 2026",
        clockIn: "-",
        clockOut: "-",
        hours: "-",
        status: (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                WFH
            </span>
        ),
    },
];

export default function EmployeeAttendancePage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="My Attendance"
                description="Track your attendance and working hours."
            />

            {/* Top Cards */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Today Status
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-foreground">
                                Present
                            </h2>
                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <CalendarDays size={26} />
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Clock In
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-foreground">
                                09:12
                            </h2>
                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
                            <Clock3 size={26} />
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Working Hours
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-foreground">
                                07:32
                            </h2>
                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                            <Timer size={26} />
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-muted-foreground">
                                This Month
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-foreground">
                                92%
                            </h2>
                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-500">
                            <CalendarDays size={26} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mb-8 flex flex-wrap gap-4">

                <Button className="h-12 px-6">
                    Clock In
                </Button>

                <Button
                    variant="secondary"
                    className="h-12 px-6"
                >
                    Clock Out
                </Button>

                <Button
                    variant="secondary"
                    className="h-12 px-6"
                >
                    Apply Leave
                </Button>

                <Button
                    variant="secondary"
                    className="h-12 px-6"
                >
                    Work From Home
                </Button>
            </div>

            {/* Table */}
            <DataTable
                columns={attendanceColumns}
                data={attendanceData}
            />
        </div>
    );
}