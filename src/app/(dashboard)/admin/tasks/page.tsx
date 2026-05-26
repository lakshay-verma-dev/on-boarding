"use client";

import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";

import {
    CalendarDays,
    ClipboardList,
    Loader2,
    MessageSquare,
    Pencil,
    Trash2,
} from "lucide-react";

import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";


import { Button } from "@/components/ui/button";

import {
    deleteTask,
    getTasks,
} from "@/services/task/task.service";

export default function TasksPage() {
    // =========================
    // STATES
    // =========================

    const [tasks, setTasks] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    // =========================
    // FETCH TASKS
    // =========================

    const fetchTasks =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getTasks();

                setTasks(
                    response.data.tasks
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch tasks"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchTasks();
    }, []);

    // =========================
    // DELETE TASK
    // =========================

    const handleDeleteTask =
        async (id: string) => {
            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this task?"
                );

            if (!confirmDelete)
                return;

            try {
                await deleteTask(id);

                toast.success(
                    "Task deleted successfully"
                );

                fetchTasks();
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to delete task"
                );
            }
        };

    return (
        <div>

            {/* Header */}
            <PageHeader
                title="Tasks"
                description="Track and manage team tasks."
                breadcrumbs={[
                    {
                        label:
                            "Tasks",
                    },
                ]}
                action={
                    <Button asChild>

                        <Link href="/admin/tasks/create">
                            Create Task
                        </Link>
                    </Button>
                }
            />

            {/* Loading */}
            {loading ? (
                <div className="flex h-[400px] items-center justify-center">

                    <Loader2
                        size={32}
                        className="animate-spin text-primary"
                    />
                </div>
            ) : (
                <>
                    {/* Empty State */}
                    {tasks.length ===
                        0 ? (
                        <div className="flex h-[350px] flex-col items-center justify-center rounded-3xl border border-border bg-card">

                            <ClipboardList
                                size={60}
                                className="text-primary"
                            />

                            <h2 className="mt-6 text-2xl font-bold text-foreground">
                                No Tasks Found
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Create your first task to get started.
                            </p>

                            <Button className="mt-6">

                                <Link href="/admin/tasks/create">
                                    Create Task
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Grid */}
                            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

                                {tasks.map(
                                    (
                                        task
                                    ) => (
                                        <div
                                            key={
                                                task._id
                                            }
                                            className="rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
                                        >

                                            {/* Top */}
                                            <div className="flex items-start justify-between">

                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                    <ClipboardList
                                                        size={
                                                            26
                                                        }
                                                    />
                                                </div>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium
                                                    ${task.status ===
                                                            "COMPLETED"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                            : task.status ===
                                                                "IN_PROGRESS"
                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                        }`}
                                                >
                                                    {task.status.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="mt-6">

                                                <h2 className="text-2xl font-bold text-foreground">
                                                    {
                                                        task.title
                                                    }
                                                </h2>

                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    Project:{" "}
                                                    {
                                                        task
                                                            ?.project
                                                            ?.name
                                                    }
                                                </p>
                                            </div>

                                            {/* Priority */}
                                            <div className="mt-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium
                                                    ${task.priority ===
                                                            "HIGH"
                                                            ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                                            : task.priority ===
                                                                "MEDIUM"
                                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                                : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                        }`}
                                                >
                                                    {
                                                        task.priority
                                                    }{" "}
                                                    Priority
                                                </span>
                                            </div>

                                            {/* Bottom */}
                                            <div className="mt-6 space-y-4 border-t border-border pt-6">

                                                {/* Assignee */}
                                                <div className="flex items-center justify-between">

                                                    <div>

                                                        <p className="text-xs text-muted-foreground">
                                                            Assigned To
                                                        </p>

                                                        <p className="mt-1 font-medium text-foreground">
                                                            {
                                                                task
                                                                    ?.assignedTo
                                                                    ?.name
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                                        {task
                                                            ?.assignedTo
                                                            ?.name
                                                            ?.split(
                                                                " "
                                                            )
                                                            .map(
                                                                (
                                                                    name: string
                                                                ) =>
                                                                    name[0]
                                                            )
                                                            .join(
                                                                ""
                                                            )}
                                                    </div>
                                                </div>

                                                {/* Deadline */}
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">

                                                    <CalendarDays
                                                        size={
                                                            18
                                                        }
                                                    />

                                                    <span>
                                                        Due:{" "}
                                                        {task.deadline
                                                            ? new Date(
                                                                task.deadline
                                                            ).toLocaleDateString()
                                                            : "N/A"}
                                                    </span>
                                                </div>

                                                {/* Comments */}
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">

                                                    <MessageSquare
                                                        size={
                                                            18
                                                        }
                                                    />

                                                    <span>
                                                        0
                                                        Comments
                                                    </span>
                                                </div>

                                                {/* Actions */}
                                                <div className="grid grid-cols-3 gap-3 pt-3">

                                                    {/* View */}
                                                    <Button
                                                        asChild
                                                        variant="secondary"
                                                    >
                                                        <Link
                                                            href={`/admin/tasks/${task._id}`}
                                                        >
                                                            View
                                                        </Link>
                                                    </Button>

                                                    {/* Edit */}
                                                    <Button
                                                        variant="secondary"
                                                    >
                                                        <Pencil
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </Button>

                                                    {/* Delete */}
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleDeleteTask(
                                                                task._id
                                                            )
                                                        }
                                                    >
                                                        <Trash2
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}