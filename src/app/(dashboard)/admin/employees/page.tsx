"use client";

import Link from "next/link";

import {
    Eye,
    Loader2,
    Pencil,
    Trash2,
    AlertTriangle,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";

import DataTable from "@/components/common/tables/DataTable";

import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteEmployee, getEmployees } from "@/services/employee/employee.service";

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
        key: "role",
        title: "Role",
    },
    {
        key: "status",
        title: "Status",
    },
];

export default function EmployeesPage() {
    const [employees, setEmployees] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [employeeToDelete, setEmployeeToDelete] =
        useState<{ id: string; name: string } | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    // =========================
    // FETCH EMPLOYEES
    // =========================

    const fetchEmployees =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getEmployees();

                const employeesData =
                    response.data.employees.map(
                        (employee: any) => ({
                            ...employee,

                            role: (
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    {employee.role}
                                </span>
                            ),

                            status: (
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium
                  ${employee.status ===
                                            "ACTIVE"
                                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                            : employee.status ===
                                                "ON_LEAVE"
                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                        }`}
                                >
                                    {employee.status}
                                </span>
                            ),
                        })
                    );

                setEmployees(
                    employeesData
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch employees"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const triggerDeleteConfirm = (id: string, name: string) => {
        setEmployeeToDelete({ id, name });
        setDeleteModalOpen(true);
    };

    const executeDelete =
        async () => {
            if (!employeeToDelete) return;

            try {
                setDeleting(true);

                await deleteEmployee(employeeToDelete.id);

                toast.success(
                    "Employee deleted successfully"
                );

                setDeleteModalOpen(false);

                setEmployeeToDelete(null);

                fetchEmployees();
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to delete employee"
                );
            } finally {
                setDeleting(false);
            }
        };

    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Employees"
                description="Manage all company employees."
                breadcrumbs={[
                    { label: "Employees" }
                ]}
                action={
                    <Button asChild>
                        <Link href="/admin/employees/create">
                            Add Employee
                        </Link>
                    </Button>
                }
            />

            {/* Loading */}
            {loading ? (
                <div className="flex h-[400px] items-center justify-center">

                    <Loader2
                        size={32}
                        className="animate-spin text-primary"
                    />
                </div>
            ) : (

                <>

                    {/* Empty State */}
                    {employees.length ===
                        0 ? (
                        <div className="flex h-[300px] flex-col items-center justify-center rounded-3xl border border-border bg-card">

                            <h2 className="text-xl font-semibold text-foreground">
                                No Employees Found
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Start by creating your first employee.
                            </p>

                            <Button
                                asChild
                                className="mt-6"
                            >
                                <Link href="/admin/employees/create">
                                    Add Employee
                                </Link>
                            </Button>
                        </div>
                    ) : (

                        <>

                            {/* Table */}
                            <DataTable
                                columns={
                                    employeeColumns
                                }
                                data={employees}
                                actions={(row) => (
                                    <div className="flex items-center justify-end gap-2">

                                        {/* View */}
                                        <Link
                                            href={`/admin/employees/${row._id}`}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-all hover:bg-muted"
                                        >
                                            <Eye size={18} />
                                        </Link>

                                        {/* Edit */}
                                        <Link
                                            href={`/admin/employees/${row._id}/edit`}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-all hover:bg-muted"
                                        >
                                            <Pencil size={18} />
                                        </Link>

                                        {/* Delete */}
                                        <button
                                            onClick={() =>
                                                triggerDeleteConfirm(
                                                    row._id,
                                                    row.name
                                                )
                                            }
                                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-background text-red-500 transition-all hover:bg-red-500/10"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                )}
                            />
                        </>
                    )}
                </>
            )}

            {/* Delete Confirmation Modal */}
            <AlertDialog
                open={deleteModalOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteModalOpen(false);
                        setEmployeeToDelete(null);
                    }
                }}
            >
                <AlertDialogContent className="rounded-3xl border border-border bg-card p-6 shadow-2xl max-w-md animate-in fade-in-0 zoom-in-95 duration-200">
                    <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                            <AlertTriangle size={24} />
                        </div>

                        <div className="space-y-2">
                            <AlertDialogTitle className="text-xl font-bold text-foreground">
                                Delete Employee Account?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="text-sm text-muted-foreground text-pretty">
                                Are you sure you want to delete <span className="font-semibold text-foreground">{employeeToDelete?.name}</span>? This action is permanent and will delete all associated data.
                            </AlertDialogDescription>
                        </div>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-6 flex flex-row justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                setDeleteModalOpen(false);
                                setEmployeeToDelete(null);
                            }}
                            disabled={deleting}
                            className="h-11 rounded-2xl px-5 font-semibold transition-all hover:bg-muted"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={executeDelete}
                            disabled={deleting}
                            className="h-11 rounded-2xl bg-red-600 hover:bg-red-700 text-white px-5 font-semibold transition-all hover:shadow-lg hover:shadow-red-500/20"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete Employee"
                            )}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}