"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronDown, ArrowLeft } from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEmployee } from "@/services/employee/employee.service";

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
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Full Name
                        </label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
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
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
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
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="flex h-12 w-full appearance-none rounded-2xl border border-border bg-background px-4 pr-10 text-sm text-foreground outline-none transition-all duration-300 hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="LEAD">LEAD</option>
                                <option value="EMPLOYEE">EMPLOYEE</option>
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
                            value={joiningDate}
                            onChange={(e) => setJoiningDate(e.target.value)}
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter employee address..."
                        className="rounded-2xl border-border bg-background px-4 py-3 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 min-h-[120px] resize-none transition-all duration-300"
                    />
                </div>

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