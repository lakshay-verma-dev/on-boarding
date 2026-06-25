"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, FormEvent, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/common/navbar/ThemeToggle";
import { resetPassword } from "@/services/auth/auth.service";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Reset token is missing. Please use the link from your email.");
            return;
        }

        if (!password || !confirmPassword) {
            toast.error("Please fill in both password fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await resetPassword(token, password);
            setSuccess(true);
            toast.success("Password reset successfully!");

            // Redirect to login after 2.5 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2500);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to reset password. The link may be expired."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-5 text-center">
                <p className="font-semibold text-destructive">Invalid reset link</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Please request a new password reset link.
                </p>
                <Link
                    href="/forgot-password"
                    className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                    Go to Forgot Password
                </Link>
            </div>
        );
    }

    return (
        <>
            {success ? (
                <div className="space-y-6">
                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                        <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                            <CheckCircle size={20} />
                            <p className="font-semibold text-sm">Password reset successfully!</p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Redirecting you to the login page...
                        </p>
                    </div>
                    <Link
                        href="/login"
                        className="flex items-center justify-center h-12 w-full rounded-xl bg-primary text-primary-foreground font-medium text-base hover:bg-primary/90 transition-colors"
                    >
                        Go to Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* New Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            New Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password (min. 6 characters)"
                                className="h-12 pr-11"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your new password"
                                className="h-12 pr-11"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Match Indicator */}
                    {confirmPassword && (
                        <p className={`text-sm ${password === confirmPassword ? "text-green-500" : "text-destructive"}`}>
                            {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                        </p>
                    )}

                    {/* Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-12 w-full text-base"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 size={18} className="animate-spin" />
                                Resetting Password...
                            </div>
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </form>
            )}
        </>
    );
}

export default function ResetPasswordPage() {
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
                        Create a new secure password for your account.
                    </p>
                </div>

                {/* Form wrapped in Suspense for useSearchParams */}
                <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-muted" />}>
                    <ResetPasswordForm />
                </Suspense>

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