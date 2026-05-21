import { api } from "../api";

interface CreateEmployeePayload {
    name: string;

    email: string;

    password: string;

    role: string;

    phone: string;

    department: string;

    designation: string;

    address: string;

    joiningDate: string;
}

interface UpdateEmployeePayload {
    name: string;

    email: string;

    password?: string;

    role: string;

    phone: string;

    department: string;

    designation: string;

    address: string;

    joiningDate: string;

    status: string;
}

// =========================
// GET ALL EMPLOYEES
// =========================

export const getEmployees =
    async () => {
        return api.get(
            "/employees"
        );
    };

// =========================
// GET SINGLE EMPLOYEE
// =========================

export const getEmployeeById =
    async (id: string) => {
        return api.get(
            `/employees/${id}`
        );
    };

// =========================
// CREATE EMPLOYEE
// =========================

export const createEmployee =
    async (
        data: CreateEmployeePayload
    ) => {
        return api.post(
            "/employees",
            data
        );
    };

// =========================
// UPDATE EMPLOYEE
// =========================

export const updateEmployee =
    async (
        id: string,
        data: UpdateEmployeePayload
    ) => {
        return api.put(
            `/employees/${id}`,
            data
        );
    };

// =========================
// DELETE EMPLOYEE
// =========================

export const deleteEmployee =
    async (id: string) => {
        return api.delete(
            `/employees/${id}`
        );
    };


// =========================
// GET LEADS
// =========================

export const getLeads =
    async () => {
        return api.get(
            "/employees?role=LEAD"
        );
    };

// =========================
// GET EMPLOYEES ONLY
// =========================

export const getEmployeesOnly =
    async () => {
        return api.get(
            "/employees?role=EMPLOYEE"
        );
    };