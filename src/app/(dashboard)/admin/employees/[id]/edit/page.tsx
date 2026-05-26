"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";
import { Button } from "@/components/ui/button";
import {
    FormInput,
    FormSelect,
    FormDatePicker,
    FormTextarea,
} from "@/components/ui/form-fields";
import {
    getEmployeeById,
    updateEmployee,
} from "@/services/employee/employee.service";

const roleOptions = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "LEAD", label: "LEAD" },
    { value: "EMPLOYEE", label: "EMPLOYEE" },
];

const statusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "ON_LEAVE", label: "ON LEAVE" },
    { value: "INACTIVE", label: "INACTIVE" },
];

export default function EditEmployeePage() {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // =========================
    // FORM STATE
    // =========================
    const [formData, setFormData] = useState({
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
        e: {
            target: {
                name: string;
                value: any;
                type?: string;
            };
        }
    ) => {
        const {
            name,
            value,
            type,
        } = e.target;

        setFormData({
            ...formData,

            [name]:
                type === "range"
                    ? Number(value)
                    : value,
        });
    };

    // =========================
    // FETCH EMPLOYEE
    // =========================
    const fetchEmployee = async () => {
        try {
            setFetching(true);
            const response = await getEmployeeById(params.id as string);
            const employee = response.data.employee;

            setFormData({
                name: employee.name || "",
                email: employee.email || "",
                password: "",
                phone: employee.phone || "",
                department: employee.department || "",
                designation: employee.designation || "",
                role: employee.role || "EMPLOYEE",
                status: employee.status || "ACTIVE",
                joiningDate: employee.joiningDate?.split("T")[0] || "",
                address: employee.address || "",
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch employee");
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await updateEmployee(params.id as string, formData);
            toast.success("Employee updated successfully");
            router.push("/admin/employees");
        } catch (error: any) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Failed to update employee"
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
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <FormInput
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter employee name"
                        autoComplete="name"
                    />

                    {/* Email */}
                    <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter employee email"
                        autoComplete="email"
                    />

                    {/* Password */}
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Leave empty to keep old password"
                        autoComplete="new-password"
                    />

                    {/* Phone */}
                    <FormInput
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        autoComplete="tel"
                    />

                    {/* Department */}
                    <FormInput
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Frontend / Backend / HR"
                        autoComplete="off"
                    />

                    {/* Designation */}
                    <FormInput
                        label="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="React Developer"
                        autoComplete="off"
                    />

                    {/* Role */}
                    <FormSelect
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        options={roleOptions}
                    />

                    {/* Status */}
                    <FormSelect
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={statusOptions}
                    />

                    {/* Joining Date */}
                    <FormDatePicker
                        label="Joining Date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                    />
                </div>

                {/* Address */}
                <FormTextarea
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter employee address..."
                    containerClassName="mt-6"
                />

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Employee"}
                    </Button>

                    <Button type="button" variant="secondary" asChild>
                        <Link href="/admin/employees">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}