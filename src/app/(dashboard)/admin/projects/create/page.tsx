"use client";

import {
    useEffect,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
    getEmployeesOnly,
    getLeads,
} from "@/services/employee/employee.service";

import { createProject } from "@/services/project/project.service";
import { ChevronDown } from "lucide-react";

export default function CreateProjectPage() {
    const router = useRouter();

    // =========================
    // STATES
    // =========================

    const [loading, setLoading] =
        useState(false);

    const [leads, setLeads] =
        useState<any[]>([]);

    const [employees, setEmployees] =
        useState<any[]>([]);

    const [formData, setFormData] =
        useState({
            name: "",

            description: "",

            status: "PENDING",

            priority: "MEDIUM",

            deadline: "",

            lead: "",

            teamMembers: [] as string[],
        });

    // =========================
    // FETCH DATA
    // =========================

    const fetchData =
        async () => {
            try {
                const [
                    leadsRes,
                    employeesRes,
                ] = await Promise.all([
                    getLeads(),

                    getEmployeesOnly(),
                ]);

                setLeads(
                    leadsRes.data.employees
                );

                setEmployees(
                    employeesRes.data
                        .employees
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to load data"
                );
            }
        };

    useEffect(() => {
        fetchData();
    }, []);

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
    // TEAM SELECT
    // =========================

    const handleTeamSelect = (
        employeeId: string
    ) => {
        const exists =
            formData.teamMembers.includes(
                employeeId
            );

        if (exists) {
            setFormData({
                ...formData,

                teamMembers:
                    formData.teamMembers.filter(
                        (id) =>
                            id !== employeeId
                    ),
            });
        } else {
            setFormData({
                ...formData,

                teamMembers: [
                    ...formData.teamMembers,
                    employeeId,
                ],
            });
        }
    };

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

                await createProject(
                    formData
                );

                toast.success(
                    "Project created successfully"
                );

                router.push(
                    "/admin/projects"
                );
            } catch (error: any) {
                console.log(error);

                toast.error(
                    error?.response?.data
                        ?.message ||
                    "Failed to create project"
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Create Project"
                description="Create and manage company projects."
                breadcrumbs={[
                    { label: "Projects", href: "/admin/projects" },
                    { label: "Create Project" },
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
                            Project Name
                        </label>

                        <Input
                            name="name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter project name"
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
                    </div>

                    {/* Deadline */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Deadline
                        </label>

                        <Input
                            type="date"
                            name="deadline"
                            value={
                                formData.deadline
                            }
                            onChange={
                                handleChange
                            }
                            className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                        />
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

                                <option value="PENDING">
                                    PENDING
                                </option>

                                <option value="IN_PROGRESS">
                                    IN PROGRESS
                                </option>

                                <option value="COMPLETED">
                                    COMPLETED
                                </option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={18} />
                        </div>
                    </div>

                    {/* Priority */}
                    <div>

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Priority
                        </label>

                        <div className="relative">
                            <select
                                name="priority"
                                value={
                                    formData.priority
                                }
                                onChange={
                                    handleChange
                                }
                                className="flex h-12 w-full appearance-none rounded-2xl border border-border bg-background px-4 pr-10 text-sm text-foreground outline-none transition-all duration-300 hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            >

                                <option value="LOW">
                                    LOW
                                </option>

                                <option value="MEDIUM">
                                    MEDIUM
                                </option>

                                <option value="HIGH">
                                    HIGH
                                </option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={18} />
                        </div>
                    </div>

                    {/* Lead */}
                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Project Lead
                        </label>

                        <div className="relative">
                            <select
                                name="lead"
                                value={
                                    formData.lead
                                }
                                onChange={
                                    handleChange
                                }
                                className="flex h-12 w-full appearance-none rounded-2xl border border-border bg-background px-4 pr-10 text-sm text-foreground outline-none transition-all duration-300 hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            >

                                <option value="">
                                    Select Lead
                                </option>

                                {leads.map(
                                    (lead) => (
                                        <option
                                            key={
                                                lead._id
                                            }
                                            value={
                                                lead._id
                                            }
                                        >
                                            {lead.name}
                                        </option>
                                    )
                                )}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={18} />
                        </div>
                    </div>
                </div >

                {/* Description */}
                < div className="mt-6" >

                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Description
                    </label>

                    <Textarea
                        name="description"
                        value={
                            formData.description
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Project description..."
                    />
                </div >

                {/* Team Members */}
                < div className="mt-6" >

                    <label className="mb-4 block text-sm font-medium">
                        Team Members
                    </label>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                        {employees.map(
                            (employee) => (
                                <label
                                    key={
                                        employee._id
                                    }
                                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 transition-all hover:bg-muted"
                                >

                                    <input
                                        type="checkbox"
                                        checked={formData.teamMembers.includes(
                                            employee._id
                                        )}
                                        onChange={() =>
                                            handleTeamSelect(
                                                employee._id
                                            )
                                        }
                                    />

                                    <div>

                                        <p className="font-medium">
                                            {
                                                employee.name
                                            }
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {
                                                employee.department
                                            }
                                        </p>
                                    </div>
                                </label>
                            )
                        )}
                    </div>
                </div >

                {/* Actions */}
                < div className="mt-8 flex items-center gap-4" >

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Project"}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            router.push(
                                "/admin/projects"
                            )
                        }
                    >
                        Cancel
                    </Button>
                </div >
            </form >
        </div >
    );
}