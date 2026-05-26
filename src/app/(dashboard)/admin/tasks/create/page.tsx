"use client";

import { useState } from "react";
import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";
import { Button } from "@/components/ui/button";
import {
    FormInput,
    FormSelect,
    FormDatePicker,
    FormTextarea,
} from "@/components/ui/form-fields";

const projectOptions = [
    { value: "hrm-dashboard", label: "HRM Dashboard" },
    { value: "client-crm", label: "Client CRM" },
    { value: "finance-tracker", label: "Finance Tracker" },
];

const employeeOptions = [
    { value: "john-doe", label: "John Doe" },
    { value: "sarah-smith", label: "Sarah Smith" },
    { value: "alex-johnson", label: "Alex Johnson" },
];

const priorityOptions = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
];

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
];

export default function CreateTaskPage() {
    const [title, setTitle] = useState("");
    const [project, setProject] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [priority, setPriority] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Task created successfully (Mock)!");
    };

    return (
        <div>
            {/* Header */}
            <PageHeader
                title="Create Task"
                description="Assign and manage tasks for employees."
            />

            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Task Title */}
                    <FormInput
                        label="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                    />

                    {/* Project */}
                    <FormSelect
                        label="Project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        options={projectOptions}
                        placeholder="Select Project"
                    />

                    {/* Assign To */}
                    <FormSelect
                        label="Assign To"
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        options={employeeOptions}
                        placeholder="Select Employee"
                    />

                    {/* Priority */}
                    <FormSelect
                        label="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        options={priorityOptions}
                        placeholder="Select Priority"
                    />

                    {/* Start Date */}
                    <FormDatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    {/* Due Date */}
                    <FormDatePicker
                        label="Due Date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    {/* Status */}
                    <FormSelect
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={statusOptions}
                        placeholder="Select Status"
                    />
                </div>

                {/* Description */}
                <FormTextarea
                    label="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write task details..."
                    containerClassName="mt-6"
                />

                {/* Actions */}
                <div className="mt-8 flex items-center gap-4">
                    <Button type="submit">
                        Create Task
                    </Button>

                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}