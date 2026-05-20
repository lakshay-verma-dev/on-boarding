"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    CalendarDays,
    FolderKanban,
    ClipboardList,
    Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Employees",
        href: "/admin/employees",
        icon: Users,
    },
    {
        label: "Attendance",
        href: "/admin/attendance",
        icon: CalendarDays,
    },
    {
        label: "Projects",
        href: "/admin/projects",
        icon: FolderKanban,
    },
    {
        label: "Tasks",
        href: "/admin/tasks",
        icon: ClipboardList,
    },
    {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden min-h-screen w-[280px] border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">

            {/* Logo */}
            <div className="flex h-20 items-center border-b border-sidebar-border px-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        HRM System
                    </h1>

                    <p className="mt-1 text-xs text-white/60">
                        Team Management Platform
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="space-y-2 p-4">
                {sidebarLinks.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                        pathname === item.href;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",

                                isActive
                                    ? "bg-primary text-white shadow-lg"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon size={20} />

                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}