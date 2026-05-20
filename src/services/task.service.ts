import { api } from "./api";


// GET TASKS
export const getTasks = async () => {
    const response = await api.get(
        "/tasks"
    );

    return response.data;
};


// GET TASK
export const getTask = async (
    taskId: string
) => {
    const response = await api.get(
        `/tasks/${taskId}`
    );

    return response.data;
};


// CREATE TASK
export const createTask = async (
    data: any
) => {
    const response = await api.post(
        "/tasks",
        data
    );

    return response.data;
};


// UPDATE TASK
export const updateTask = async (
    taskId: string,
    data: any
) => {
    const response = await api.put(
        `/tasks/${taskId}`,
        data
    );

    return response.data;
};


// DELETE TASK
export const deleteTask = async (
    taskId: string
) => {
    const response = await api.delete(
        `/tasks/${taskId}`
    );

    return response.data;
};


// UPDATE STATUS
export const updateTaskStatus = async (
    taskId: string,
    status: string
) => {
    const response = await api.patch(
        `/tasks/${taskId}/status`,
        { status }
    );

    return response.data;
};


// ADD COMMENT
export const addTaskComment = async (
    taskId: string,
    comment: string
) => {
    const response = await api.post(
        `/tasks/${taskId}/comments`,
        { comment }
    );

    return response.data;
};