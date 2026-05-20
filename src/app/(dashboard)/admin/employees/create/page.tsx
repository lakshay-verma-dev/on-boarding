"use client";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEmployeePage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Create Employee"
                description="Add a new employee to your company."
            />

            {/* Form */}
            <div className="rounded-3xl border border-border bg-card p-8">

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Full Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Full Name
                        </label>

                        <Input placeholder="Enter employee name" />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Email Address
                        </label>

                        <Input
                            type="email"
                            placeholder="Enter employee email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Password
                        </label>

                        <Input
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Phone Number
                        </label>

                        <Input placeholder="Enter phone number" />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Department
                        </label>

                        <Input placeholder="Frontend / Backend / HR" />
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Designation
                        </label>

                        <Input placeholder="React Developer" />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Role
                        </label>

                        <select className="flex h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-primary">

                            <option>
                                Select Role
                            </option>

                            <option>
                                ADMIN
                            </option>

                            <option>
                                LEAD
                            </option>

                            <option>
                                EMPLOYEE
                            </option>
                        </select>
                    </div>

                    {/* Joining Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Joining Date
                        </label>

                        <Input type="date" />
                    </div>
                </div>

                {/* Address */}
                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Address
                    </label>

                    <Textarea placeholder="Enter employee address..." />
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">

                    <Button>
                        Create Employee
                    </Button>

                    <Button variant="secondary">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}