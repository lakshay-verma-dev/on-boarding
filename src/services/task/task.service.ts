import { api } from "../api";

// =========================
// GET TASKS
// =========================

export const getTasks =
    async () => {
        return api.get(
            "/tasks"
        );
    };

// =========================
// GET PROJECT TASKS
// =========================

export const getProjectTasks =
    async (
        projectId: string
    ) => {
        return api.get(
            `/tasks?project=${projectId}`
        );
    };

// =========================
// GET TASK BY ID
// =========================

export const getTaskById =
    async (id: string) => {
        return api.get(
            `/tasks/${id}`
        );
    };

// =========================
// CREATE TASK
// =========================

export const createTask =
    async (data: any) => {
        return api.post(
            "/tasks",
            data
        );
    };

// =========================
// UPDATE TASK
// =========================

export const updateTask =
    async (
        id: string,
        data: any
    ) => {
        return api.put(
            `/tasks/${id}`,
            data
        );
    };

// =========================
// DELETE TASK
// =========================

export const deleteTask =
    async (id: string) => {
        return api.delete(
            `/tasks/${id}`
        );
    };