"use client";

import Link from "next/link";

import {
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
    FormEvent,
    useState,
} from "react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuthStore } from "@/store/authStore";

import { loginUser } from "@/services/auth/auth.service";

export default function LoginPage() {
    const router = useRouter();

    const { login } =
        useAuthStore();

    const [showPassword, setShowPassword] =
        useState(false);

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [rememberMe, setRememberMe] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    // =========================
    // HANDLE LOGIN
    // =========================

    const handleLogin = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            setError("");

            // Validation
            if (!email || !password) {
                setError(
                    "Please fill all fields"
                );

                return;
            }

            // Login API
            const response =
                await loginUser({
                    email,
                    password,
                });

            const data = response.data;

            login(
                data.user,
                data.token
            );

            // Role Redirect
            if (
                data.user.role === "ADMIN"
            ) {
                router.push(
                    "/admin/dashboard"
                );
            } else if (
                data.user.role === "LEAD"
            ) {
                router.push(
                    "/lead/dashboard"
                );
            } else {
                router.push(
                    "/employee/dashboard"
                );
            }
        } catch (error: any) {
            console.log(error);

            setError(
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <main className="relative flex min-h-screen overflow-hidden bg-background">

                {/* Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_40%)]" />

                {/* Left Side */}
                <div className="relative hidden flex-1 border-r border-border lg:flex">

                    <div className="flex w-full flex-col justify-between p-12">

                        {/* Logo */}
                        <div>

                            <h1 className="text-4xl font-bold text-foreground">
                                HRM System
                            </h1>

                            <p className="mt-3 text-muted-foreground">
                                Modern employee management
                                platform.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="max-w-xl">

                            <h2 className="text-5xl font-bold leading-tight text-foreground">
                                Manage Your Team
                                <span className="block text-primary">
                                    Efficiently
                                </span>
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                Complete HRM platform for
                                attendance, projects, tasks
                                and employee management.
                            </p>

                            {/* Cards */}
                            <div className="mt-10 grid gap-5">

                                <div className="rounded-3xl border border-border bg-card p-5">

                                    <h3 className="font-semibold text-foreground">
                                        Attendance Management
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                        Clock in, clock out,
                                        leave requests and
                                        attendance tracking.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-border bg-card p-5">

                                    <h3 className="font-semibold text-foreground">
                                        Project Collaboration
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                        Manage projects,
                                        assign leads and track
                                        tasks efficiently.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-sm text-muted-foreground">
                            © 2026 HRM System. All rights
                            reserved.
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative flex w-full items-center justify-center p-6 lg:w-[600px]">

                    <div className="w-full max-w-md">

                        {/* Heading */}
                        <div className="mb-10">

                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                Welcome Back
                            </div>

                            <h1 className="mt-6 text-4xl font-bold text-foreground">
                                Sign In
                            </h1>

                            <p className="mt-3 text-muted-foreground">
                                Login to continue to your
                                dashboard.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleLogin}
                            className="rounded-3xl border border-border bg-card p-8 shadow-sm"
                        >

                            <div className="space-y-6">

                                {/* Error */}
                                {error && (
                                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                                        {error}
                                    </div>
                                )}

                                {/* Email */}
                                <div>

                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        Email Address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        />

                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="h-12 pl-11"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>

                                    <div className="mb-2 flex items-center justify-between">

                                        <label className="text-sm font-medium text-foreground">
                                            Password
                                        </label>

                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <div className="relative">

                                        <Lock
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        />

                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your password"
                                            className="h-12 pl-11 pr-11"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
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

                                {/* Remember Me */}
                                <div className="flex items-center justify-between">

                                    <label className="flex items-center gap-3 text-sm text-muted-foreground">

                                        <input
                                            type="checkbox"
                                            checked={
                                                rememberMe
                                            }
                                            onChange={(e) =>
                                                setRememberMe(
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 rounded border-border"
                                        />

                                        Remember me
                                    </label>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-12 w-full text-base"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">

                                            <Loader2
                                                size={18}
                                                className="animate-spin"
                                            />

                                            Signing In...
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>

                                {/* Demo Credentials */}
                                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">

                                    <p className="text-sm font-medium text-foreground">
                                        Demo Admin Credentials
                                    </p>

                                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">

                                        <p>
                                            Email:
                                            admin@hrm.com
                                        </p>

                                        <p>
                                            Password:
                                            admin123
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}