"use client";

import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "next/navigation";

import {
    CalendarDays,
    FolderKanban,
    Loader2,
    Users,
} from "lucide-react";

import { toast } from "sonner";

import PageHeader from "@/components/common/headers/PageHeader";

import { Button } from "@/components/ui/button";

import { getProjectById } from "@/services/project/project.service";

import {
    getEmployeesOnly,
} from "@/services/employee/employee.service";

import {
    updateProject,
} from "@/services/project/project.service";

import {
    createTask,
    getProjectTasks,
} from "@/services/task/task.service";

import {
    Check,
    Plus,
    X,
} from "lucide-react";
import AssignTaskModal from "@/components/common/modals/AssignTaskModal";

export default function ProjectDetailsPage() {
    const params =
        useParams();

    const [project, setProject] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    const [employees, setEmployees] =
        useState<any[]>([]);

    const [addingMember, setAddingMember] =
        useState(false);

    const [selectedMember, setSelectedMember] =
        useState("");

    const [showMemberModal, setShowMemberModal] =
        useState(false);

    const [selectedMembers, setSelectedMembers] =
        useState<string[]>([]);


    const [tasks, setTasks] =
        useState<any[]>([]);

    const [showTaskModal, setShowTaskModal] =
        useState(false);

    const [creatingTask, setCreatingTask] =
        useState(false);

    const [taskData, setTaskData] =
        useState({
            title: "",

            description: "",

            priority: "MEDIUM",

            status: "TODO",

            deadline: "",

            assignedTo: "",
        });

    // =========================
    // HANDLE ADD EMPLOYEES
    // =========================

    const handleAddMember =
        async () => {
            try {
                if (!selectedMember) {
                    toast.error(
                        "Please select employee"
                    );

                    return;
                }

                const alreadyExists =
                    project.teamMembers.some(
                        (
                            member: any
                        ) =>
                            member._id ===
                            selectedMember
                    );

                if (alreadyExists) {
                    toast.error(
                        "Employee already added"
                    );

                    return;
                }

                setAddingMember(true);

                const updatedMembers =
                    [
                        ...project.teamMembers.map(
                            (
                                member: any
                            ) =>
                                member._id
                        ),

                        selectedMember,
                    ];

                await updateProject(
                    project._id,
                    {
                        ...project,

                        lead:
                            project.lead
                                ?._id,

                        teamMembers:
                            updatedMembers,
                    }
                );

                toast.success(
                    "Member added successfully"
                );

                setSelectedMember("");

                fetchProject();
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to add member"
                );
            } finally {
                setAddingMember(false);
            }
        };


    // =========================
    // FETCH PROJECT
    // =========================

    const fetchProject =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getProjectById(
                        params.id as string
                    );

                setProject(
                    response.data.project
                );
                const employeesRes =
                    await getEmployeesOnly();

                setEmployees(
                    employeesRes.data
                        .employees
                );

                const tasksRes =
                    await getProjectTasks(
                        params.id as string
                    );

                setTasks(
                    tasksRes.data.tasks
                );
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to fetch project"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        if (params.id) {
            fetchProject();
        }
    }, [params.id]);


    const openMemberModal =
        () => {
            setSelectedMembers(
                project.teamMembers.map(
                    (
                        member: any
                    ) =>
                        member._id
                )
            );

            setShowMemberModal(true);
        };


    const handleMemberToggle =
        (
            employeeId: string
        ) => {
            const exists =
                selectedMembers.includes(
                    employeeId
                );

            if (exists) {
                setSelectedMembers(
                    selectedMembers.filter(
                        (id) =>
                            id !== employeeId
                    )
                );
            } else {
                setSelectedMembers([
                    ...selectedMembers,
                    employeeId,
                ]);
            }
        };


    const handleSaveMembers =
        async () => {
            try {
                setAddingMember(true);

                await updateProject(
                    project._id,
                    {
                        ...project,

                        lead:
                            project.lead
                                ?._id,

                        teamMembers:
                            selectedMembers,
                    }
                );

                toast.success(
                    "Members updated successfully"
                );

                setShowMemberModal(false);

                fetchProject();
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to update members"
                );
            } finally {
                setAddingMember(false);
            }
        };

    // =========================
    // LOADING
    // =========================

    const handleTaskChange = (
        e: {
            target: {
                name: string;
                value: any;
            };
        }
    ) => {
        setTaskData({
            ...taskData,

            [e.target.name]:
                e.target.value,
        });
    };


    const handleCreateTask =
        async () => {
            try {
                if (
                    !taskData.title ||
                    !taskData.assignedTo
                ) {
                    toast.error(
                        "Please fill required fields"
                    );

                    return;
                }

                setCreatingTask(true);

                await createTask({
                    ...taskData,

                    project:
                        project._id,
                });

                toast.success(
                    "Task created successfully"
                );

                setShowTaskModal(false);

                setTaskData({
                    title: "",

                    description: "",

                    priority: "MEDIUM",

                    status: "TODO",

                    deadline: "",

                    assignedTo: "",
                });

                fetchProject();
            } catch (error) {
                console.log(error);

                toast.error(
                    "Failed to create task"
                );
            } finally {
                setCreatingTask(false);
            }
        };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">

                <Loader2
                    size={32}
                    className="animate-spin text-primary"
                />
            </div>
        );
    }

    // =========================
    // NO PROJECT
    // =========================

    if (!project) {
        return (
            <div className="flex h-[400px] items-center justify-center">

                <p className="text-muted-foreground">
                    Project not found
                </p>
            </div>
        );
    }

    return (
        <>
            <div>

                {/* Header */}
                <PageHeader
                    title={
                        project.name
                    }
                    description="Manage project information, members and progress."
                    breadcrumbs={[
                        {
                            label: "Projects",
                            href:
                                "/admin/projects",
                        },
                        {
                            label:
                                project.name,
                        },
                    ]}
                    action={
                        <div className="flex gap-3">

                            <Button
                                variant="secondary"
                                asChild
                            >
                                <Link
                                    href={`/admin/projects/${project._id}/edit`}
                                >
                                    Edit Project
                                </Link>
                            </Button>

                            <Button>
                                Assign Task
                            </Button>
                        </div>
                    }
                />

                <div className="grid gap-6 xl:grid-cols-3">

                    {/* Left */}
                    <div className="rounded-3xl border border-border bg-card p-6">

                        {/* Icon */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                            <FolderKanban
                                size={38}
                            />
                        </div>

                        {/* Title */}
                        <h2 className="mt-6 text-3xl font-bold text-foreground">
                            {project.name}
                        </h2>

                        {/* Description */}
                        <p className="mt-4 leading-8 text-muted-foreground">
                            {
                                project.description
                            }
                        </p>

                        {/* Status */}
                        <div className="mt-6">

                            <span
                                className={`rounded-full px-4 py-2 text-xs font-medium
              ${project.status ===
                                        "COMPLETED"
                                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                        : project.status ===
                                            "IN_PROGRESS"
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                    }`}
                            >
                                {project.status.replace(
                                    "_",
                                    " "
                                )}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="mt-8 space-y-5">

                            {/* Team */}
                            <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                                <Users
                                    size={20}
                                    className="text-primary"
                                />

                                <div>

                                    <p className="text-xs text-muted-foreground">
                                        Team Members
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {
                                            project
                                                ?.teamMembers
                                                ?.length
                                        }{" "}
                                        Members
                                    </p>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                                <CalendarDays
                                    size={20}
                                    className="text-primary"
                                />

                                <div>

                                    <p className="text-xs text-muted-foreground">
                                        Deadline
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {project.deadline
                                            ? new Date(
                                                project.deadline
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Lead */}
                            <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">

                                <Users
                                    size={20}
                                    className="text-primary"
                                />

                                <div>

                                    <p className="text-xs text-muted-foreground">
                                        Project Lead
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {
                                            project?.lead
                                                ?.name
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-8">

                            <div className="mb-3 flex items-center justify-between">

                                <p className="text-sm font-medium text-foreground">
                                    Project Progress
                                </p>

                                <p className="text-sm text-primary">
                                    {
                                        project.progress
                                    }
                                    %
                                </p>
                            </div>

                            <div className="h-3 rounded-full bg-muted">

                                <div
                                    className="h-3 rounded-full bg-primary transition-all"
                                    style={{
                                        width: `${project.progress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-6 xl:col-span-2">

                        {/* Team Members */}
                        <div className="rounded-3xl border border-border bg-card p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold text-foreground">
                                        Team Members
                                    </h2>

                                    <p className="mt-2 text-muted-foreground">
                                        Employees working on this project.
                                    </p>
                                </div>

                                <Button
                                    variant="secondary"
                                    onClick={
                                        openMemberModal
                                    }
                                >
                                    <Plus size={16} />

                                    Add Member
                                </Button>
                            </div>

                            {/* Members */}
                            <div className="mt-8 space-y-4">

                                {project
                                    ?.teamMembers
                                    ?.map(
                                        (
                                            member: any
                                        ) => (
                                            <div
                                                key={
                                                    member._id
                                                }
                                                className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                                            >

                                                <div className="flex items-center gap-4">

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                                        {member.name
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

                                                    <div>

                                                        <p className="font-medium text-foreground">
                                                            {
                                                                member.name
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-sm text-muted-foreground">
                                                            {
                                                                member.email
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="secondary"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/admin/employees/${member._id}`}
                                                    >
                                                        View
                                                    </Link>
                                                </Button>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="rounded-3xl border border-border bg-card p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold text-foreground">
                                        Recent Tasks
                                    </h2>

                                    <p className="mt-2 text-muted-foreground">
                                        Latest tasks assigned in this project.
                                    </p>
                                </div>

                                <Button
                                    onClick={() =>
                                        setShowTaskModal(true)
                                    }
                                >
                                    Create Task
                                </Button>
                            </div>

                            {/* Empty State */}
                            <div className="mt-8 space-y-4">

                                {tasks.length === 0 ? (
                                    <div className="flex h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-border">

                                        <FolderKanban
                                            size={48}
                                            className="text-primary"
                                        />

                                        <h3 className="mt-4 text-lg font-semibold text-foreground">
                                            No Tasks Yet
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Tasks will appear here once created.
                                        </p>
                                    </div>
                                ) : (
                                    tasks.map(
                                        (task) => (
                                            <div
                                                key={task._id}
                                                className="rounded-2xl border border-border bg-background p-5"
                                            >

                                                <div className="flex items-start justify-between">

                                                    <div>

                                                        <h3 className="text-lg font-semibold text-foreground">
                                                            {task.title}
                                                        </h3>

                                                        <p className="mt-2 text-sm text-muted-foreground">
                                                            {
                                                                task.description
                                                            }
                                                        </p>
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

                                                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">

                                                    <div>

                                                        <p className="text-xs text-muted-foreground">
                                                            Assigned To
                                                        </p>

                                                        <p className="mt-1 text-sm font-medium text-foreground">
                                                            {
                                                                task
                                                                    ?.assignedTo
                                                                    ?.name
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>

                                                        <p className="text-xs text-muted-foreground">
                                                            Deadline
                                                        </p>

                                                        <p className="mt-1 text-sm font-medium text-foreground">
                                                            {task.deadline
                                                                ? new Date(
                                                                    task.deadline
                                                                ).toLocaleDateString()
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Member Modal */}
            {showMemberModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-bold text-foreground">
                                    Manage Team Members
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Add or remove employees from this project.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowMemberModal(false)
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-all hover:bg-muted"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Employees */}
                        <div className="mt-8 grid max-h-[450px] gap-4 overflow-y-auto md:grid-cols-2">

                            {employees.map(
                                (employee) => {
                                    const isSelected =
                                        selectedMembers.includes(
                                            employee._id
                                        );

                                    return (
                                        <button
                                            key={
                                                employee._id
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleMemberToggle(
                                                    employee._id
                                                )
                                            }
                                            className={`flex items-center cursor-pointer justify-between rounded-2xl border p-4 text-left transition-all duration-300
                                ${isSelected
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/30 hover:bg-primary/5"
                                                }`}
                                        >

                                            <div className="flex items-center gap-4">

                                                {/* Avatar */}
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                                    {employee.name
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

                                                {/* Info */}
                                                <div>

                                                    <p className="font-medium text-foreground">
                                                        {
                                                            employee.name
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {
                                                            employee.department
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Checkbox */}
                                            <div
                                                className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all
                                    ${isSelected
                                                        ? "border-primary bg-primary text-white"
                                                        : "border-border"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <Check size={14} />
                                                )}
                                            </div>
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-6">

                            <Button
                                variant="secondary"
                                onClick={() =>
                                    setShowMemberModal(false)
                                }
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={
                                    handleSaveMembers
                                }
                                disabled={
                                    addingMember
                                }
                            >
                                {addingMember
                                    ? "Saving..."
                                    : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <AssignTaskModal
                open={showTaskModal}
                onClose={() =>
                    setShowTaskModal(false)
                }
                project={project}
                onSuccess={fetchProject}
            />
        </>
    );
}