"use client";

import Link from "next/link";

import { ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_40%)]" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">

                {/* Top */}
                <div className="mb-8">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Mail size={30} />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-foreground">
                        Forgot Password
                    </h1>

                    <p className="mt-3 leading-7 text-muted-foreground">
                        Enter your registered email address and
                        we’ll send you a password reset link.
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-6">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Email Address
                        </label>

                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="h-12"
                        />
                    </div>

                    <Button className="h-12 w-full text-base">
                        Send Reset Link
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