"use client";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateTaskPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Create Task"
                description="Assign and manage tasks for employees."
            />

            {/* Form */}
            <div className="rounded-3xl border border-border bg-card p-8">

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Task Title */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Task Title
                        </label>

                        <Input placeholder="Enter task title" />
                    </div>

                    {/* Project */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Project
                        </label>

                        <select className="flex h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-primary">

                            <option>
                                Select Project
                            </option>

                            <option>
                                HRM Dashboard
                            </option>

                            <option>
                                Client CRM
                            </option>

                            <option>
                                Finance Tracker
                            </option>
                        </select>
                    </div>

                    {/* Assign To */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Assign To
                        </label>

                        <select className="flex h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-primary">

                            <option>
                                Select Employee
                            </option>

                            <option>
                                John Doe
                            </option>

                            <option>
                                Sarah Smith
                            </option>

                            <option>
                                Alex Johnson
                            </option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Priority
                        </label>

                        <select className="flex h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-primary">

                            <option>
                                Select Priority
                            </option>

                            <option>
                                High
                            </option>

                            <option>
                                Medium
                            </option>

                            <option>
                                Low
                            </option>
                        </select>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Start Date
                        </label>

                        <Input type="date" />
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Due Date
                        </label>

                        <Input type="date" />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Status
                        </label>

                        <select className="flex h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-primary">

                            <option>
                                Select Status
                            </option>

                            <option>
                                Pending
                            </option>

                            <option>
                                In Progress
                            </option>

                            <option>
                                Completed
                            </option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Task Description
                    </label>

                    <Textarea placeholder="Write task details..." />
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">

                    <Button>
                        Create Task
                    </Button>

                    <Button variant="secondary">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}