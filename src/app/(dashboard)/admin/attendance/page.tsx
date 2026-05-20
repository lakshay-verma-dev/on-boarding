"use client";

import PageHeader from "@/components/common/headers/PageHeader";
import DataTable from "@/components/common/tables/DataTable";

import { Button } from "@/components/ui/button";

const attendanceColumns = [
    {
        key: "employee",
        title: "Employee",
    },
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
        key: "status",
        title: "Status",
    },
];

const attendanceData = [
    {
        employee: "John Doe",
        date: "19 May 2026",
        clockIn: "09:12 AM",
        clockOut: "06:30 PM",
        status: (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                Present
            </span>
        ),
    },
    {
        employee: "Sarah Smith",
        date: "19 May 2026",
        clockIn: "09:45 AM",
        clockOut: "06:15 PM",
        status: (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                Late
            </span>
        ),
    },
    {
        employee: "Alex Johnson",
        date: "19 May 2026",
        clockIn: "-",
        clockOut: "-",
        status: (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                WFH
            </span>
        ),
    },
    {
        employee: "Michael Brown",
        date: "19 May 2026",
        clockIn: "-",
        clockOut: "-",
        status: (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
                Leave
            </span>
        ),
    },
];

export default function AttendancePage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Attendance"
                description="Track and manage employee attendance."
                action={
                    <Button>
                        Export Report
                    </Button>
                }
            />

            {/* Top Cards */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-3xl border border-border bg-card p-6">
                    <p className="text-sm text-muted-foreground">
                        Total Present
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-foreground">
                        92
                    </h2>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6">
                    <p className="text-sm text-muted-foreground">
                        Late Employees
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-yellow-500">
                        08
                    </h2>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6">
                    <p className="text-sm text-muted-foreground">
                        Work From Home
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-blue-500">
                        12
                    </h2>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6">
                    <p className="text-sm text-muted-foreground">
                        On Leave
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-red-500">
                        05
                    </h2>
                </div>
            </div>

            {/* Attendance Table */}
            <DataTable
                columns={attendanceColumns}
                data={attendanceData}
            />
        </div>
    );
}