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