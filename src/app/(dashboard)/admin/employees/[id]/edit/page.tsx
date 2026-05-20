"use client";

import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import { toast } from "sonner";

import { ChevronDown, ArrowLeft } from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
    getEmployeeById,
    updateEmployee,
} from "@/services/employee/employee.service";

export default function EditEmployeePage() {
    const params = useParams();

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [fetching, setFetching] =
        useState(true);

    // =========================
    // FORM STATE
    // =========================

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            phone: "",
            department: "",
            designation: "",
            role: "EMPLOYEE",
            status: "ACTIVE",
            joiningDate: "",
            address: "",
        });

    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    // =========================
    // FETCH EMPLOYEE
    // =========================

    const fetchEmployee =
        async () => {
            try {
                setFetching(true);

                const response =
                    await getEmployeeById(
                        params.id as string
                    );

                const employee =
                    response.data.employee;

                setFormData({
                    name:
                        employee.name || "",

                    email:
                        employee.email ||
                        "",

                    password: "",

                    phone:
                        employee.phone ||
                        "",

                    department:
                        employee.department ||
                        "",

                    designation:
                        employee.designation ||
                        "",

                    role:
                        employee.role ||
                        "EMPLOYEE",

                    status:
                        employee.status ||
                        "ACTIVE",

                    joiningDate:
                        employee.joiningDate
                            ?.split("T")[0] ||
                        "",

                    address:
                        employee.address ||
                        "",
                });
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch employee"
                );
            } finally {
                setFetching(false);
            }
        };

    useEffect(() => {
        if (params.id) {
            fetchEmployee();
        }
    }, [params.id]);

    // =========================
    // SUBMIT
    // =========================

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {
            e.preventDefault();

            try {
                setLoading(true);

                await updateEmployee(
                    params.id as string,
                    formData
                );

                toast.success(
                    "Employee updated successfully"
                );

                router.push(
                    "/admin/employees"
                );
            } catch (error: any) {
                console.log(error);

                toast.error(
                    error?.response?.data
                        ?.message ||
                    "Failed to update employee"
                );
            } finally {
                setLoading(false);
            }
        };

    // =========================
    // LOADING
    // =========================

    if (fetching) {
        return (
            <div className="flex h-[400px] items-center justify-center">

                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Edit Employee"
                description="Update employee information."
                breadcrumbs={[
                    { label: "Employees", href: "/admin/employees" },
                    { label: formData.name || "Employee", href: `/admin/employees/${params.id}` },
                    { label: "Edit" },
                ]}
            />

            {/* Form */}
            <form
                onSubmit={
                    handleSubmit
                }
                className="rounded-3xl border border-border bg-card p-8"
            >

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Name */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Full Name
                        </label>

                        <Input
                            name="name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter employee name"
                            autoComplete="name"
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
                    </div>

                    {/* Email */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Email Address
                        </label>

                        <Input
                            type="email"
                            name="email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter employee email"
                            autoComplete="email"
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
                    </div>

                    {/* Password */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Password
                        </label>

                        <Input
                            type="password"
                            name="password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Leave empty to keep old password"
                            autoComplete="new-password"
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
                    </div>

                    {/* Phone */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Phone Number
                        </label>

                        <Input
                            name="phone"
                            value={
                                formData.phone
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter phone number"
                            autoComplete="tel"
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
                    </div>

                    {/* Department */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Department
                        </label>

                        <Input
                            name="department"
                            value={
                                formData.department
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Frontend / Backend / HR"
                            autoComplete="off"
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
                    </div>

                    {/* Designation */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Designation
                        </label>

                        <Input
                            name="designation"
                            value={
                                formData.designation
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="React Developer"
                            autoComplete="off"
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
                    </div>

                    {/* Role */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Role
                        </label>

                        <div className="relative">
                            <select
                                name="role"
                                value={
                                    formData.role
                                }
                                onChange={
                                    handleChange
                                }
                                className="flex h-12 w-full appearance-none rounded-2xl border border-border bg-background px-4 pr-10 text-sm text-foreground outline-none transition-all duration-300 hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            >

                                <option value="ADMIN">
                                    ADMIN
                                </option>

                                <option value="LEAD">
                                    LEAD
                                </option>

                                <option value="EMPLOYEE">
                                    EMPLOYEE
                                </option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={18} />
                        </div>
                    </div>

                    {/* Status */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Status
                        </label>

                        <div className="relative">
                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={
                                    handleChange
                                }
                                className="flex h-12 w-full appearance-none rounded-2xl border border-border bg-background px-4 pr-10 text-sm text-foreground outline-none transition-all duration-300 hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            >

                                <option value="ACTIVE">
                                    ACTIVE
                                </option>

                                <option value="ON_LEAVE">
                                    ON LEAVE
                                </option>

                                <option value="INACTIVE">
                                    INACTIVE
                                </option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={18} />
                        </div>
                    </div>

                    {/* Joining Date */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Joining Date
                        </label>

                        <Input
                            type="date"
                            name="joiningDate"
                            value={
                                formData.joiningDate
                            }
                            onChange={
                                handleChange
                            }
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300 [color-scheme:dark]"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="mt-6">

                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Address
                    </label>

                    <Textarea
                        name="address"
                        value={
                            formData.address
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter employee address..."
                        className="rounded-2xl border-border bg-background px-4 py-3 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 min-h-[120px] resize-none transition-all duration-300"
                    />
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Updating..."
                            : "Update Employee"}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        asChild
                    >
                        <Link href="/admin/employees">
                            Cancel
                        </Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}