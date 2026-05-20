import { api } from "./api";

export const getEmployees = async () => {
    return api.get("/employees");
};

export const createEmployee = async (data: any) => {
    return api.post("/employees", data);
};

export const updateEmployee = async (
    id: string,
    data: any
) => {
    return api.put(`/employees/${id}`, data);
};

export const deleteEmployee = async (
    id: string
) => {
    return api.delete(`/employees/${id}`);
};