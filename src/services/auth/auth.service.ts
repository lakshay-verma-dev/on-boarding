import { api } from "../api";

interface LoginPayload {
    email: string;
    password: string;
}

export const loginUser = async (
    data: LoginPayload
) => {
    return api.post(
        "/auth/login",
        data
    );
};

export const logoutUser =
    async () => {
        return api.post(
            "/auth/logout"
        );
    };

export const getCurrentUser =
    async () => {
        return api.get("/auth/me");
    };

export const updateCurrentUser =
    async (data: any) => {
        return api.put("/auth/me", data);
    };

export const forgotPassword = async (email: string) => {
    return api.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token: string, password: string) => {
    return api.post("/auth/reset-password", { token, password });
};