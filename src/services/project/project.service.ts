import { api } from "../api";

// =========================
// GET PROJECTS
// =========================

export const getProjects =
    async () => {
        return api.get(
            "/projects"
        );
    };

// =========================
// CREATE PROJECT
// =========================

export const createProject =
    async (data: any) => {
        return api.post(
            "/projects",
            data
        );
    };

// =========================
// GET PROJECT BY ID
// =========================

export const getProjectById =
    async (id: string) => {
        console.log(id)
        return api.get(
            `/projects/${id}`
        );
    };

// =========================
// UPDATE PROJECT
// =========================

export const updateProject =
    async (
        id: string,
        data: any
    ) => {
        return api.put(
            `/projects/${id}`,
            data
        );
    };

// =========================
// DELETE PROJECT
// =========================

export const deleteProject =
    async (id: string) => {
        return api.delete(
            `/projects/${id}`
        );
    };