"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getCurrentUser } from "@/services/auth/auth.service";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default function HomeNavbar() {
    const { user, setUser, isAuthenticated } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!user) {
            getCurrentUser()
                .then((res) => {
                    if (res.data?.success) {
                        setUser(res.data.user);
                    }
                })
                .catch(() => {
                    // Fail silently for unauthenticated users on public home page
                });
        }
    }, [user, setUser]);

    // Role-based dashboard path
    const getDashboardPath = () => {
        if (!user) return "/login";
        switch (user.role) {
            case "ADMIN":
                return "/admin/dashboard";
            case "LEAD":
                return "/lead/dashboard";
            case "EMPLOYEE":
                return "/employee/dashboard";
            default:
                return "/";
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-300">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:scale-105">
                        <ShieldCheck size={22} className="stroke-[2.5]" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:opacity-90">
                        HRM System
                    </span>
                </Link>

                {/* Right side CTA & Theme */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {mounted && isAuthenticated && user ? (
                        <Link href={getDashboardPath()}>
                            <Button className="h-11 rounded-2xl px-6 bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary/20">
                                Dashboard
                                <ArrowRight size={16} className="ml-1.5" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button className="h-11 rounded-2xl px-6 bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary/20">
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
