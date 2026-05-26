"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";
import { Button } from "@/components/ui/button";
import {
    FormInput,
    FormSelect,
    FormDatePicker,
    FormTextarea,
} from "@/components/ui/form-fields";
import { createEmployee } from "@/services/employee/employee.service";

const roleOptions = [
    { value: "LEAD", label: "LEAD" },
    { value: "EMPLOYEE", label: "EMPLOYEE" },
];

export default function CreateEmployeePage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [role, setRole] = useState("EMPLOYEE");
    const [joiningDate, setJoiningDate] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Name, email, and password are required.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await createEmployee({
                name,
                email,
                password,
                role,
                phone,
                department,
                designation,
                address,
                joiningDate,
            });

            if (res.data.success) {
                toast.success("Employee created successfully!");
                router.push("/admin/employees");
            } else {
                toast.error(res.data.message || "Failed to create employee.");
            }
        } catch (error: any) {
            console.error("Create employee error:", error);
            const msg = error.response?.data?.message || "Something went wrong.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <PageHeader
                title="Create Employee"
                description="Add a new employee to your company."
                breadcrumbs={[
                    { label: "Employees", href: "/admin/employees" },
                    { label: "Create Employee" },
                ]}
            />

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Full Name */}
                    <FormInput
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter employee name"
                        autoComplete="name"
                    />

                    {/* Email */}
                    <FormInput
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter employee email"
                        autoComplete="email"
                    />

                    {/* Password */}
                    <FormInput
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        autoComplete="new-password"
                    />

                    {/* Phone */}
                    <FormInput
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        autoComplete="tel"
                    />

                    {/* Department */}
                    <FormInput
                        label="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Frontend / Backend / HR"
                        autoComplete="off"
                    />

                    {/* Designation */}
                    <FormInput
                        label="Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="React Developer"
                        autoComplete="off"
                    />

                    {/* Role */}
                    <FormSelect
                        label="Role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        options={roleOptions}
                    />

                    {/* Joining Date */}
                    <FormDatePicker
                        label="Joining Date"
                        name="joiningDate"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                    />
                </div>

                {/* Address */}
                <FormTextarea
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter employee address..."
                    containerClassName="mt-6"
                />

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-12 rounded-2xl px-6 bg-primary hover:bg-primary/90 text-white font-medium transition-all"
                    >
                        {isLoading ? "Creating..." : "Create Employee"}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.push("/admin/employees")}
                        className="h-12 rounded-2xl px-6"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}