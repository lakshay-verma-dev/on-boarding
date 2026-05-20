import { create } from "zustand";

interface Employee {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface EmployeeState {
    employees: Employee[];

    selectedEmployee: Employee | null;

    isLoading: boolean;

    setEmployees: (
        employees: Employee[]
    ) => void;

    setSelectedEmployee: (
        employee: Employee | null
    ) => void;
}

export const useEmployeeStore =
    create<EmployeeState>((set) => ({
        employees: [],

        selectedEmployee: null,

        isLoading: false,

        setEmployees: (employees) =>
            set({ employees }),

        setSelectedEmployee: (
            selectedEmployee
        ) =>
            set({
                selectedEmployee,
            }),
    }));