"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    FormInput,
    FormSelect,
    FormDatePicker,
    FormTextarea,
    FormField,
} from "@/components/ui/form-fields";
import {
    getEmployeesOnly,
    getLeads,
} from "@/services/employee/employee.service";
import {
    getProjectById,
    updateProject,
} from "@/services/project/project.service";

const statusOptions = [
    { value: "PENDING", label: "PENDING" },
    { value: "IN_PROGRESS", label: "IN PROGRESS" },
    { value: "COMPLETED", label: "COMPLETED" },
];

const priorityOptions = [
    { value: "LOW", label: "LOW" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HIGH", label: "HIGH" },
];

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();

    // =========================
    // STATES
    // =========================
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [leads, setLeads] = useState<any[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "PENDING",
        priority: "MEDIUM",
        progress: 0,
        deadline: "",
        lead: "",
        teamMembers: [] as string[],
    });

    // =========================
    // FETCH DATA
    // =========================
    const fetchData = async () => {
        try {
            setFetching(true);

            const [projectRes, leadsRes, employeesRes] = await Promise.all([
                getProjectById(params.id as string),
                getLeads(),
                getEmployeesOnly(),
            ]);

            const project = projectRes.data.project;

            setLeads(leadsRes.data.employees);
            setEmployees(employeesRes.data.employees);

            setFormData({
                name: project.name || "",
                description: project.description || "",
                status: project.status || "PENDING",
                priority: project.priority || "MEDIUM",
                progress: project.progress || 0,
                deadline: project.deadline?.split("T")[0] || "",
                lead: project.lead?._id || "",
                teamMembers: project.teamMembers?.map((member: any) => member._id) || [],
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch project");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchData();
        }
    }, [params.id]);

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
    // TEAM SELECT
    // =========================
    const handleTeamSelect = (employeeId: string) => {
        if (employeeId === formData.lead) {
            toast.error("Lead cannot be a team member");
            return;
        }

        const exists = formData.teamMembers.includes(employeeId);

        if (exists) {
            setFormData({
                ...formData,
                teamMembers: formData.teamMembers.filter(
                    (id) => id !== employeeId
                ),
            });
        } else {
            setFormData({
                ...formData,
                teamMembers: [...formData.teamMembers, employeeId],
            });
        }
    };

    // =========================
    // SUBMIT
    // =========================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await updateProject(params.id as string, formData);
            toast.success("Project updated successfully");
            router.push(`/admin/projects/${params.id}`);
        } catch (error: any) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Failed to update project"
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
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    const leadOptions = leads.map((lead) => ({
        value: lead._id,
        label: lead.name,
    }));

    return (
        <div>
            {/* Header */}
            <PageHeader
                title="Edit Project"
                description="Update project information."
                breadcrumbs={[
                    { label: "Projects", href: "/admin/projects" },
                    { label: formData.name || "Project", href: `/admin/projects/${params.id}` },
                    { label: "Edit Project" },
                ]}
            />

            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Project Name */}
                    <FormInput
                        label="Project Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter project name"
                    />

                    {/* Deadline */}
                    <FormDatePicker
                        label="Deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                    />

                    {/* Status */}
                    <FormSelect
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={statusOptions}
                    />

                    {/* Priority */}
                    <FormSelect
                        label="Priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        options={priorityOptions}
                    />

                    {/* Progress */}
                    <FormField
                        label="Progress"
                        containerClassName="md:col-span-2"
                    >
                        <div className="flex items-center gap-4">
                            <Input
                                type="range"
                                name="progress"
                                min="0"
                                max="100"
                                value={formData.progress}
                                onChange={handleChange}
                                className="cursor-pointer flex-1"
                            />
                            <span className="text-sm font-medium text-primary w-12 text-right">
                                {formData.progress}%
                            </span>
                        </div>
                    </FormField>

                    {/* Lead */}
                    <FormSelect
                        label="Project Lead"
                        name="lead"
                        value={formData.lead}
                        onChange={handleChange}
                        options={leadOptions}
                        placeholder="Select Lead"
                        containerClassName="md:col-span-2"
                    />
                </div>

                {/* Description */}
                <FormTextarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Project description..."
                    containerClassName="mt-6"
                />

                {/* Team Members */}
                <div className="mt-6">
                    <label className="mb-4 block text-sm font-medium text-foreground">
                        Team Members
                    </label>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {employees.map((employee) => (
                            <label
                                key={employee._id}
                                className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all duration-300
                                ${formData.teamMembers.includes(employee._id)
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/30 hover:bg-primary/5"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.teamMembers.includes(
                                        employee._id
                                    )}
                                    onChange={() =>
                                        handleTeamSelect(employee._id)
                                    }
                                />

                                <div>
                                    <p className="font-medium text-foreground">
                                        {employee.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {employee.department}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Project"}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            router.push(`/admin/projects/${params.id}`)
                        }
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}