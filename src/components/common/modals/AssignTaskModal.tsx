"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
    FormInput,
    FormSelect,
    FormDatePicker,
    FormTextarea,
} from "@/components/ui/form-fields";

import { createTask } from "@/services/task/task.service";

import {
    getProjects,
} from "@/services/project/project.service";

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

// =========================
// TYPES
// =========================

interface AssignTaskModalProps {
    open: boolean;

    onClose: () => void;

    project: any;

    onSuccess?: () => void;
}

// =========================
// COMPONENT
// =========================

export default function AssignTaskModal({
    open,
    onClose,
    project,
    onSuccess,
}: AssignTaskModalProps) {
    // =========================
    // STATES
    // =========================

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            title: "",

            description: "",

            status: "TODO",

            priority: "MEDIUM",

            deadline: "",

            assignedTo: "",
        });

    const [projects, setProjects] =
        useState<any[]>([]);

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

        setFormData({
            ...formData,

            [name]: value,
        });
    };

    // =========================
    // ASSIGNEE OPTIONS
    // =========================

    const memberOptions =
        project?.teamMembers?.map(
            (member: any) => ({
                value:
                    member._id,

                label:
                    member.name,
            })
        ) || [];

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
                    !formData.assignedTo
                ) {
                    toast.error(
                        "Please fill required fields"
                    );

                    return;
                }

                setLoading(true);

                await createTask({
                    ...formData,

                    project:
                        project._id,
                });

                toast.success(
                    "Task created successfully"
                );

                // Reset
                setFormData({
                    title: "",

                    description: "",

                    status: "TODO",

                    priority:
                        "MEDIUM",

                    deadline: "",

                    assignedTo: "",
                });

                onClose();

                if (onSuccess) {
                    onSuccess();
                }
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

    // =========================
    // HIDE
    // =========================

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

            {/* Modal */}
            <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-foreground">
                            Assign Task
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Create and assign a task to project member.
                        </p>
                    </div>

                    <button
                        onClick={
                            onClose
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border transition-all hover:bg-muted"
                    >
                        <X
                            size={18}
                        />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="mt-8"
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

                        {/* Assigned To */}
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
                            placeholder="Select Team Member"
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
                    </div>

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
                        containerClassName="mt-6"
                    />

                    {/* Footer */}
                    <div className="mt-8 flex items-center justify-end gap-4 border-t border-border pt-6">

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={
                                onClose
                            }
                        >
                            Cancel
                        </Button>

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
                    </div>
                </form>
            </div>
        </div>
    );
}