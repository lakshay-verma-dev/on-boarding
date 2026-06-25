"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/common/navbar/ThemeToggle";
import { forgotPassword } from "@/services/auth/auth.service";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [resetLink, setResetLink] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            setLoading(true);
            const response = await forgotPassword(email);
            const data = response.data;

            // In dev: the API returns the reset link for easy testing
            if (data.resetLink) {
                setResetLink(data.resetLink);
            }
            setSubmitted(true);
            toast.success("Reset link generated successfully");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

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
                        <Mail size={30} />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-foreground">
                        Forgot Password
                    </h1>

                    <p className="mt-3 leading-7 text-muted-foreground">
                        Enter your registered email address and we'll generate a password reset link.
                    </p>
                </div>

                {/* Success State */}
                {submitted ? (
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                            <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                                <CheckCircle size={20} />
                                <p className="font-semibold text-sm">Reset link generated!</p>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                The reset link has been logged in the server console. In production this would be emailed to you.
                            </p>
                        </div>

                        {/* Show reset link in dev for easy testing */}
                        {resetLink && (
                            <div className="rounded-2xl border border-border bg-muted/30 p-4 break-all">
                                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                                    Dev Mode – Reset Link
                                </p>
                                <Link
                                    href={resetLink}
                                    className="text-sm text-primary hover:underline break-all"
                                >
                                    {resetLink}
                                </Link>
                            </div>
                        )}

                        <Button
                            variant="outline"
                            className="h-12 w-full"
                            onClick={() => { setSubmitted(false); setEmail(""); setResetLink(""); }}
                        >
                            Try another email
                        </Button>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="h-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 w-full text-base"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 size={18} className="animate-spin" />
                                    Generating Link...
                                </div>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>
                    </form>
                )}

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