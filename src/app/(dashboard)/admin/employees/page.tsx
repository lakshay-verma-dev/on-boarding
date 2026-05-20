"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";
import DataTable from "@/components/common/tables/DataTable";

import { Button } from "@/components/ui/button";

const employeeColumns = [
    {
        key: "name",
        title: "Employee",
    },
    {
        key: "email",
        title: "Email",
    },
    {
        key: "department",
        title: "Department",
    },
    {
        key: "designation",
        title: "Designation",
    },
    {
        key: "status",
        title: "Status",
    },
];

const employeeData = [
    {
        name: "John Doe",
        email: "john@example.com",
        department: "Frontend",
        designation: "React Developer",
        status: (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                Active
            </span>
        ),
    },
    {
        name: "Sarah Smith",
        email: "sarah@example.com",
        department: "Backend",
        designation: "Node Developer",
        status: (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                Active
            </span>
        ),
    },
    {
        name: "Alex Johnson",
        email: "alex@example.com",
        department: "UI/UX",
        designation: "Designer",
        status: (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                On Leave
            </span>
        ),
    },
];

export default function EmployeesPage() {
    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Employees"
                description="Manage all company employees."
                action={
                    <Button>
                        Add Employee
                    </Button>
                }
            />

            {/* Table */}
            <DataTable
                columns={employeeColumns}
                data={employeeData}
                actions={(row) => (
                    <div className="flex items-center justify-end gap-2">

                        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-all hover:bg-muted">
                            <Eye size={18} />
                        </button>

                        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-all hover:bg-muted">
                            <Pencil size={18} />
                        </button>

                        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-red-500 transition-all hover:bg-red-500/10">
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            />
        </div>
    );
}