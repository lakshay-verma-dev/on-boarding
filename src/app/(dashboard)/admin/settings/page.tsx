"use client";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Settings"
                description="Manage your account and application settings."
            />

            <div className="grid gap-6 xl:grid-cols-3">

                {/* Profile Settings */}
                <div className="rounded-3xl border border-border bg-card p-6 xl:col-span-2">

                    <h2 className="text-2xl font-bold text-foreground">
                        Profile Settings
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Update your personal information.
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Full Name
                            </label>

                            <Input
                                placeholder="Enter full name"
                                defaultValue="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Email Address
                            </label>

                            <Input
                                type="email"
                                placeholder="Enter email"
                                defaultValue="john@example.com"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Phone Number
                            </label>

                            <Input
                                placeholder="Enter phone number"
                                defaultValue="+91 9876543210"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Role
                            </label>

                            <Input
                                disabled
                                defaultValue="Administrator"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mt-6">
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Bio
                        </label>

                        <Textarea
                            placeholder="Write something..."
                            defaultValue="System administrator managing HRM operations."
                        />
                    </div>

                    <div className="mt-8">
                        <Button>
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Security */}
                <div className="rounded-3xl border border-border bg-card p-6">

                    <h2 className="text-2xl font-bold text-foreground">
                        Security
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Update your password and security settings.
                    </p>

                    <div className="mt-8 space-y-5">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Current Password
                            </label>

                            <Input
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                New Password
                            </label>

                            <Input
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Confirm Password
                            </label>

                            <Input
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button className="w-full">
                            Update Password
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}