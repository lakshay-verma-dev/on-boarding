import { create } from "zustand";

interface User {
    _id: string;
    name: string;
    email: string;
    role: "ADMIN" | "LEAD" | "EMPLOYEE";
}

interface AuthState {
    user: User | null;

    token: string | null;

    isAuthenticated: boolean;

    isLoading: boolean;

    setUser: (user: User | null) => void;

    setToken: (token: string | null) => void;

    login: (
        user: User,
        token: string
    ) => void;

    logout: () => void;
}

export const useAuthStore =
    create<AuthState>((set) => ({
        user: null,

        token: null,

        isAuthenticated: false,

        isLoading: false,

        setUser: (user) =>
            set({
                user,
                isAuthenticated: !!user,
            }),

        setToken: (token) =>
            set({
                token,
            }),

        login: (user, token) =>
            set({
                user,
                token,
                isAuthenticated: true,
            }),

        logout: () =>
            set({
                user: null,
                token: null,
                isAuthenticated: false,
            }),
    }));