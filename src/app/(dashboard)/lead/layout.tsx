"use client";

import AppSidebar from "@/components/common/sidebar/AppSidebar";
import Navbar from "@/components/common/navbar/Navbar";

export default function LeadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">

            {/* Sidebar */}
            <AppSidebar />

            {/* Main */}
            <div className="flex flex-1 flex-col">

                {/* Navbar */}
                <Navbar />

                {/* Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}