"use client";

import Link from "next/link";

import {
    ArrowLeft,
    Eye,
    EyeOff,
    Lock,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/common/navbar/ThemeToggle";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">

            {/* Theme Toggle */}
            <div className="absolute right-6 top-6 z-50">
                <ThemeToggle />
            </div>

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_40%)]" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">

                {/* Top */}
                <div className="mb-8">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Lock size={30} />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-foreground">
                        Reset Password
                    </h1>

                    <p className="mt-3 leading-7 text-muted-foreground">
                        Create a new secure password for your
                        account.
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-6">

                    {/* New Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            New Password
                        </label>

                        <div className="relative">

                            <Input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter new password"
                                className="h-12 pr-11"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <Input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm password"
                                className="h-12 pr-11"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <Button className="h-12 w-full text-base">
                        Reset Password
                    </Button>
                </div>

                {/* Back */}
                <Link
                    href="/login"
                    className="mt-8 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                    <ArrowLeft size={16} />

                    Back to Login
                </Link>
            </div>
        </main>
    );
}