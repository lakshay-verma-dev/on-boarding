"use client";

import {
    Briefcase,
    CalendarDays,
    Mail,
    Phone,
} from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

export default function EmployeeDetailsPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Employee Details"
                description="View employee information and activity."
                action={
                    <div className="flex gap-3">

                        <Button variant="secondary">
                            Edit Employee
                        </Button>

                        <Button>
                            Assign Project
                        </Button>
                    </div>
                }
            />

            <div className="grid gap-6 xl:grid-cols-3">

                {/* Left Profile */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <div className="flex flex-col items-center text-center">

                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
                            JD
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-foreground">
                            John Doe
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            React Developer
                        </p>

                        <span className="mt-4 rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                            Active Employee
                        </span>
                    </div>

                    {/* Info */}
                    <div className="mt-8 space-y-5">

                        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                            <Mail
                                size={20}
                                className="text-primary"
                            />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Email
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    john@example.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                            <Phone
                                size={20}
                                className="text-primary"
                            />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Phone
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    +91 9876543210
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                            <Briefcase
                                size={20}
                                className="text-primary"
                            />

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Department
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    Frontend Team
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
                                    Joining Date
                                </p>

                                <p className="mt-1 text-sm font-medium text-foreground">
                                    10 Jan 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6 xl:col-span-2">

                    {/* Employee Info */}
                    <div className="rounded-3xl border border-border bg-card p-6">

                        <h2 className="text-2xl font-bold text-foreground">
                            Employee Information
                        </h2>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Employee ID
                                </p>

                                <p className="mt-2 text-lg font-semibold text-foreground">
                                    EMP-1024
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Role
                                </p>

                                <p className="mt-2 text-lg font-semibold text-foreground">
                                    Employee
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Designation
                                </p>

                                <p className="mt-2 text-lg font-semibold text-foreground">
                                    React Developer
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Experience
                                </p>

                                <p className="mt-2 text-lg font-semibold text-foreground">
                                    2 Years
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Projects */}
                    <div className="rounded-3xl border border-border bg-card p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Assigned Projects
                                </h2>

                                <p className="mt-2 text-muted-foreground">
                                    Projects currently assigned.
                                </p>
                            </div>

                            <Button variant="secondary">
                                Manage
                            </Button>
                        </div>

                        <div className="mt-8 space-y-4">

                            {[
                                "HRM Dashboard",
                                "Employee Portal",
                                "Analytics Platform",
                            ].map((project, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                                >

                                    <div>
                                        <p className="font-medium text-foreground">
                                            {project}
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Active Project
                                        </p>
                                    </div>

                                    <Button variant="secondary">
                                        View
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}