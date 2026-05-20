"use client";

import { Bell, Search } from "lucide-react";

import ThemeToggle from "./ThemeToggle";

import { Input } from "@/components/ui/input";

export default function Navbar() {
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

                {/* User */}
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        LV
                    </div>

                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-foreground">
                            Lakshay Verma
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Administrator
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}