"use client";

import { useState } from "react";

import Navbar from "@/components/common/navbar/Navbar";
import AppSidebar from "@/components/common/sidebar/AppSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] =
        useState(false);

    return (
        <div className="flex min-h-screen bg-background">

            {/* Sidebar */}
            <AppSidebar />

            {/* Main */}
            <div className="flex flex-1 flex-col">

                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}