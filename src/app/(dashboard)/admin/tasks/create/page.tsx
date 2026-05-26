"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";

import {
    FormInput,
    FormSelect,
    FormDatePicker,
    FormTextarea,
} from "@/components/ui/form-fields";

import { Button } from "@/components/ui/button";

import {
    getProjects,
} from "@/services/project/project.service";

import {
    createTask,
} from "@/services/task/task.service";

// =========================
// OPTIONS
// =========================

const statusOptions = [
    {
        value: "TODO",
        label: "TODO",
    },

    {
        value: "IN_PROGRESS",
        label: "IN PROGRESS",
    },

    {
        value: "REVIEW",
        label: "REVIEW",
    },

    {
        value: "COMPLETED",
        label: "COMPLETED",
    },
];

const priorityOptions = [
    {
        value: "LOW",
        label: "LOW",
    },

    {
        value: "MEDIUM",
        label: "MEDIUM",
    },

    {
        value: "HIGH",
        label: "HIGH",
    },
];

export default function CreateTaskPage() {
    const router =
        useRouter();

    // =========================
    // STATES
    // =========================

    const [loading, setLoading] =
        useState(false);

    const [projects, setProjects] =
        useState<any[]>([]);

    const [selectedProject, setSelectedProject] =
        useState<any>(null);

    const [memberOptions, setMemberOptions] =
        useState<any[]>([]);

    const [formData, setFormData] =
        useState({
            title: "",

            description: "",

            project: "",

            assignedTo: "",

            status: "TODO",

            priority: "MEDIUM",

            deadline: "",
        });

    // =========================
    // FETCH PROJECTS
    // =========================

    const fetchProjects =
        async () => {
            try {
                const response =
                    await getProjects();

                setProjects(
                    response.data
                        .projects
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch projects"
                );
            }
        };

    useEffect(() => {
        fetchProjects();
    }, []);

    // =========================
    // OPTIONS
    // =========================

    const projectOptions =
        projects.map(
            (project: any) => ({
                value:
                    project._id,

                label:
                    project.name,
            })
        );

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
        } = e.target;

        // =========================
        // PROJECT CHANGE
        // =========================

        if (name === "project") {
            const foundProject =
                projects.find(
                    (project: any) =>
                        project._id ===
                        value
                );

            setSelectedProject(
                foundProject
            );

            // Reset Assigned User
            setFormData({
                ...formData,

                project: value,

                assignedTo: "",
            });

            // Update Members
            const members =
                foundProject?.teamMembers?.map(
                    (
                        member: any
                    ) => ({
                        value:
                            member._id,

                        label:
                            member.name,
                    })
                ) || [];

            setMemberOptions(
                members
            );

            return;
        }

        // =========================
        // NORMAL CHANGE
        // =========================

        setFormData({
            ...formData,

            [name]: value,
        });
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
                // Validation
                if (
                    !formData.title ||
                    !formData.project ||
                    !formData.assignedTo
                ) {
                    toast.error(
                        "Please fill required fields"
                    );

                    return;
                }

                setLoading(true);

                await createTask(
                    formData
                );

                toast.success(
                    "Task created successfully"
                );

                router.push(
                    "/admin/tasks"
                );
            } catch (error: any) {
                console.log(error);

                toast.error(
                    error?.response
                        ?.data
                        ?.message ||
                    "Failed to create task"
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Create Task"
                description="Create and assign task to project member."
                breadcrumbs={[
                    {
                        label:
                            "Tasks",

                        href:
                            "/admin/tasks",
                    },

                    {
                        label:
                            "Create Task",
                    },
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

                    {/* Title */}
                    <FormInput
                        label="Task Title"
                        name="title"
                        value={
                            formData.title
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter task title"
                        containerClassName="md:col-span-2"
                    />

                    {/* Description */}
                    <FormTextarea
                        label="Description"
                        name="description"
                        value={
                            formData.description
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Task description..."
                        containerClassName="md:col-span-2"
                    />

                    {/* Project */}
                    <FormSelect
                        label="Project"
                        name="project"
                        value={
                            formData.project
                        }
                        onChange={
                            handleChange
                        }
                        options={
                            projectOptions
                        }
                        placeholder="Select Project"
                    />

                    {/* Assign To */}
                    <FormSelect
                        label="Assign To"
                        name="assignedTo"
                        value={
                            formData.assignedTo
                        }
                        onChange={
                            handleChange
                        }
                        options={
                            memberOptions
                        }
                        placeholder={
                            selectedProject
                                ? "Select Team Member"
                                : "Select Project First"
                        }
                        disabled={
                            !selectedProject
                        }
                    />

                    {/* Status */}
                    <FormSelect
                        label="Status"
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        options={
                            statusOptions
                        }
                    />

                    {/* Priority */}
                    <FormSelect
                        label="Priority"
                        name="priority"
                        value={
                            formData.priority
                        }
                        onChange={
                            handleChange
                        }
                        options={
                            priorityOptions
                        }
                    />

                    {/* Deadline */}
                    <FormDatePicker
                        label="Deadline"
                        name="deadline"
                        value={
                            formData.deadline
                        }
                        onChange={
                            handleChange
                        }
                    />
                </div>

                {/* Selected Project Info */}
                {selectedProject && (
                    <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">

                        <h3 className="text-lg font-semibold text-foreground">
                            Selected Project
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {
                                selectedProject.name
                            }
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">

                            {selectedProject.teamMembers?.map(
                                (
                                    member: any
                                ) => (
                                    <span
                                        key={
                                            member._id
                                        }
                                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                    >
                                        {
                                            member.name
                                        }
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">

                    <Button
                        type="submit"
                        disabled={
                            loading
                        }
                    >
                        {loading
                            ? "Creating..."
                            : "Create Task"}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            router.push(
                                "/admin/tasks"
                            )
                        }
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}