"use client";

import { useState } from "react";

import Navbar from "@/components/common/navbar/Navbar";
import AppSidebar from "@/components/common/sidebar/AppSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background">

            {/* Sidebar */}
            <AppSidebar isCollapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

            {/* Main */}
            <div className="flex flex-1 flex-col h-full overflow-hidden">

                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}