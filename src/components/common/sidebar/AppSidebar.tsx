"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
    CalendarDays,
    ClipboardList,
    FolderKanban,
    LayoutDashboard,
    Users,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";

import { cn } from "@/lib/utils";

const sidebarConfig = {
    ADMIN: [
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

    ],

    LEAD: [
        {
            label: "Dashboard",
            href: "/lead/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Projects",
            href: "/lead/projects",
            icon: FolderKanban,
        },
        {
            label: "Tasks",
            href: "/lead/tasks",
            icon: ClipboardList,
        },
        {
            label: "Attendance",
            href: "/lead/attendance",
            icon: CalendarDays,
        },

    ],

    EMPLOYEE: [
        {
            label: "Dashboard",
            href: "/employee/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "My Tasks",
            href: "/employee/tasks",
            icon: ClipboardList,
        },
        {
            label: "Attendance",
            href: "/employee/attendance",
            icon: CalendarDays,
        },

    ],
};

interface AppSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const role = user?.role || "ADMIN";

    const sidebarLinks =
        sidebarConfig[
        role as keyof typeof sidebarConfig
        ] || [];

    return (
        <aside className={cn(
            "hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex flex-col h-screen overflow-y-auto transition-all duration-300 ease-in-out flex-shrink-0 select-none",
            isCollapsed ? "w-[80px]" : "w-[280px]"
        )}>
            {/* Header / Collapse Toggle */}
            <div className={cn(
                "flex h-20 items-center border-b border-sidebar-border px-4",
                isCollapsed ? "justify-center" : "justify-between"
            )}>
                {!isCollapsed && (
                    <div className="flex flex-col min-w-0">
                        <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                            HRM System
                        </h1>
                        <p className="mt-1.5 text-[10px] text-white/50 font-medium">
                            Team Management
                        </p>
                    </div>
                )}
                <button
                    onClick={onToggle}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* User Info / Badge */}
            <div className="border-b border-sidebar-border p-4">
                <div className={cn(
                    "rounded-2xl bg-white/5 p-4 transition-all duration-300",
                    isCollapsed ? "p-2 flex justify-center" : "p-4"
                )}>
                    <div className={cn("flex items-center gap-3", isCollapsed && "flex-col gap-0")}>
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-inner">
                            {user?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2) || "AD"}
                        </div>

                        {!isCollapsed && (
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white">
                                    {user?.name || "Admin"}
                                </p>
                                <p className="truncate text-xs text-white/60 mt-0.5">
                                    {user?.email}
                                </p>
                                <p className="mt-2 inline-flex rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
                                    {role}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-2 p-4">
                {sidebarLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            title={isCollapsed ? item.label : undefined}
                            className={cn(
                                "flex items-center rounded-2xl transition-all duration-200",
                                isCollapsed 
                                    ? "justify-center w-12 h-12 mx-auto" 
                                    : "gap-4 px-4 py-3 text-sm font-medium",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon size={20} className="flex-shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}