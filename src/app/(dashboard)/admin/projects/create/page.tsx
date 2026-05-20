"use client";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProjectPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Create Project"
                description="Create and manage a new company project."
            />

            {/* Form */}
            <div className="rounded-3xl border border-border bg-card p-8">

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Project Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Project Name
                        </label>

                        <Input placeholder="Enter project name" />
                    </div>

                    {/* Project Lead */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Project Lead
                        </label>

                        <select className="flex h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-primary">

                            <option>
                                Select Project Lead
                            </option>

                            <option>
                                Sarah Smith
                            </option>

                            <option>
                                John Doe
                            </option>

                            <option>
                                Alex Johnson
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

                    {/* Deadline */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Deadline
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

                    {/* Team Size */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Team Size
                        </label>

                        <Input
                            type="number"
                            placeholder="Enter team size"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Project Description
                    </label>

                    <Textarea placeholder="Write project description..." />
                </div>

                {/* Team Members */}
                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Assign Team Members
                    </label>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                        {[
                            "John Doe",
                            "Sarah Smith",
                            "Alex Johnson",
                            "Michael Brown",
                            "Emma Wilson",
                            "David Miller",
                        ].map((member) => (
                            <label
                                key={member}
                                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4"
                            >
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-border"
                                />

                                <span className="text-sm font-medium text-foreground">
                                    {member}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">

                    <Button>
                        Create Project
                    </Button>

                    <Button variant="secondary">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}