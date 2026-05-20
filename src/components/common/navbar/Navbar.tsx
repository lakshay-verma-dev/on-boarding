"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { useEffect } from "react";

import ThemeToggle from "./ThemeToggle";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { getCurrentUser, logoutUser } from "@/services/auth/auth.service";

export default function Navbar() {
    const { user, setUser, logout } = useAuthStore();

    useEffect(() => {
        if (!user) {
            getCurrentUser()
                .then((res) => {
                    if (res.data.success) {
                        setUser(res.data.user);
                    }
                })
                .catch((err) => {
                    console.error("Failed to fetch user:", err);
                });
        }
    }, [user, setUser]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const name = user?.name || "Loading...";
    const email = user?.email || "";
    const role = user?.role || "";
    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "..";

    return (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">

            {/* Search */}
            <div className="relative w-full max-w-md">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                    placeholder="Search employees, projects, tasks..."
                    className="h-12 rounded-2xl pl-11"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notification */}
                <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card transition-all hover:bg-muted">

                    <Bell size={18} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                </button>

                {/* User Dropdown */}
                <div className="relative group">
                    {/* Trigger */}
                    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2 cursor-pointer transition-all hover:bg-muted/50">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                            {initials}
                        </div>

                        <div className="hidden md:block">
                            <p className="text-sm font-semibold text-foreground">
                                {name}
                            </p>

                            <p className="text-xs text-muted-foreground capitalize">
                                {role.toLowerCase()}
                            </p>
                        </div>
                    </div>

                    {/* Dropdown Menu on Hover */}
                    <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-2xl border border-border bg-popover/90 backdrop-blur-md p-2 shadow-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                        {email && (
                            <div className="px-3 py-2 border-b border-border/50 mb-1">
                                <p className="text-xs text-muted-foreground">Signed in as</p>
                                <p className="text-sm font-medium text-foreground truncate">{email}</p>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}