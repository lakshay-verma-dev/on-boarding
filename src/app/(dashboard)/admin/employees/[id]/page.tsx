"use client";

import Link from "next/link";

import {
    ArrowLeft,
    Briefcase,
    Building2,
    CalendarDays,
    Mail,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import { useParams } from "next/navigation";

import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

import { getEmployeeById } from "@/services/employee/employee.service";

export default function ViewEmployeePage() {
    const params = useParams();

    const [employee, setEmployee] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    // =========================
    // FETCH EMPLOYEE
    // =========================

    const fetchEmployee =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getEmployeeById(
                        params.id as string
                    );

                setEmployee(
                    response.data.employee
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch employee"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        if (params.id) {
            fetchEmployee();
        }
    }, [params.id]);

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">

                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    // =========================
    // NO EMPLOYEE
    // =========================

    if (!employee) {
        return (
            <div className="flex h-[400px] items-center justify-center">

                <p className="text-muted-foreground">
                    Employee not found
                </p>
            </div>
        );
    }

    const initials =
        employee.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Employee Details"
                description="View employee information."
                breadcrumbs={[
                    { label: "Employees", href: "/admin/employees" },
                    { label: employee.name || "Employee Details" },
                ]}
            />

            {/* Profile Card */}
            <div className="rounded-3xl border border-border bg-card p-8">

                {/* Top */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-5">

                        {/* Avatar */}
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                            {initials}
                        </div>

                        {/* Info */}
                        <div>

                            <h2 className="text-3xl font-bold text-foreground">
                                {employee.name}
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                {
                                    employee.designation
                                }
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3">

                                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
                                    {employee.role}
                                </span>

                                <span
                                    className={`rounded-full px-4 py-1 text-xs font-medium
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
                            </div>
                        </div>
                    </div>

                    {/* Edit */}
                    <Button asChild>
                        <Link
                            href={`/admin/employees/${employee._id}/edit`}
                        >
                            Edit Employee
                        </Link>
                    </Button>
                </div>

                {/* Details */}
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {/* Email */}
                    <div className="rounded-2xl border border-border bg-background p-5">

                        <div className="flex items-center gap-3">

                            <Mail
                                size={18}
                                className="text-primary"
                            />

                            <h3 className="font-medium text-foreground">
                                Email
                            </h3>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground">
                            {employee.email}
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="rounded-2xl border border-border bg-background p-5">

                        <div className="flex items-center gap-3">

                            <Phone
                                size={18}
                                className="text-primary"
                            />

                            <h3 className="font-medium text-foreground">
                                Phone
                            </h3>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground">
                            {employee.phone ||
                                "N/A"}
                        </p>
                    </div>

                    {/* Department */}
                    <div className="rounded-2xl border border-border bg-background p-5">

                        <div className="flex items-center gap-3">

                            <Building2
                                size={18}
                                className="text-primary"
                            />

                            <h3 className="font-medium text-foreground">
                                Department
                            </h3>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground">
                            {
                                employee.department
                            }
                        </p>
                    </div>

                    {/* Designation */}
                    <div className="rounded-2xl border border-border bg-background p-5">

                        <div className="flex items-center gap-3">

                            <Briefcase
                                size={18}
                                className="text-primary"
                            />

                            <h3 className="font-medium text-foreground">
                                Designation
                            </h3>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground">
                            {
                                employee.designation
                            }
                        </p>
                    </div>

                    {/* Role */}
                    <div className="rounded-2xl border border-border bg-background p-5">

                        <div className="flex items-center gap-3">

                            <ShieldCheck
                                size={18}
                                className="text-primary"
                            />

                            <h3 className="font-medium text-foreground">
                                Role
                            </h3>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground">
                            {employee.role}
                        </p>
                    </div>

                    {/* Joining Date */}
                    <div className="rounded-2xl border border-border bg-background p-5">

                        <div className="flex items-center gap-3">

                            <CalendarDays
                                size={18}
                                className="text-primary"
                            />

                            <h3 className="font-medium text-foreground">
                                Joining Date
                            </h3>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground">
                            {employee.joiningDate
                                ? new Date(
                                      employee.joiningDate
                                  ).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                </div>

                {/* Address */}
                <div className="mt-6 rounded-2xl border border-border bg-background p-5">

                    <div className="flex items-center gap-3">

                        <User
                            size={18}
                            className="text-primary"
                        />

                        <h3 className="font-medium text-foreground">
                            Address
                        </h3>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        {employee.address ||
                            "No address added"}
                    </p>
                </div>
            </div>
        </div>
    );
}