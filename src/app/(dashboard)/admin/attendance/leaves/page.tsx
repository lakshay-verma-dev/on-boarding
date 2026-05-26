"use client";

import PageHeader from "@/components/common/headers/PageHeader";

export default function LeavesPage() {
    return (
        <div>
            <PageHeader
                title="Leaves Management"
                description="Manage employee leave requests."
            />
            <div className="mt-8 rounded-3xl border border-border bg-card p-8 flex flex-col items-center justify-center min-h-[300px]">
                <h2 className="text-xl font-semibold text-foreground">
                    Leaves Management coming soon
                </h2>
                <p className="mt-2 text-muted-foreground text-center">
                    This feature is currently under development.
                </p>
            </div>
        </div>
    );
}
