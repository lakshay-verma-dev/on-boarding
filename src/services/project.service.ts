import { api } from "./api";


// GET PROJECTS
export const getProjects = async () => {
    const response = await api.get(
        "/projects"
    );

    return response.data;
};


// GET PROJECT
export const getProject = async (
    projectId: string
) => {
    const response = await api.get(
        `/projects/${projectId}`
    );

    return response.data;
};


// CREATE PROJECT
export const createProject = async (
    data: any
) => {
    const response = await api.post(
        "/projects",
        data
    );

    return response.data;
};


// UPDATE PROJECT
export const updateProject = async (
    projectId: string,
    data: any
) => {
    const response = await api.put(
        `/projects/${projectId}`,
        data
    );

    return response.data;
};


// DELETE PROJECT
export const deleteProject = async (
    projectId: string
) => {
    const response = await api.delete(
        `/projects/${projectId}`
    );

    return response.data;
};


// ADD MEMBER
export const addProjectMember = async (
    projectId: string,
    data: any
) => {
    const response = await api.post(
        `/projects/${projectId}/members`,
        data
    );

    return response.data;
};


// ASSIGN LEAD
export const assignProjectLead = async (
    projectId: string,
    data: any
) => {
    const response = await api.post(
        `/projects/${projectId}/assign-lead`,
        data
    );

    return response.data;
};