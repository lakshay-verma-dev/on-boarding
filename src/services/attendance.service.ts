import { api } from "./api";


// CLOCK IN
export const clockIn = async () => {
    const response = await api.post(
        "/attendance/clock-in"
    );

    return response.data;
};


// CLOCK OUT
export const clockOut = async () => {
    const response = await api.post(
        "/attendance/clock-out"
    );

    return response.data;
};


// GET ATTENDANCE
export const getAttendance = async () => {
    const response = await api.get(
        "/attendance/history"
    );

    return response.data;
};


// APPLY LEAVE
export const applyLeave = async (
    data: any
) => {
    const response = await api.post(
        "/attendance/leave",
        data
    );

    return response.data;
};


// APPLY WFH
export const applyWFH = async (
    data: any
) => {
    const response = await api.post(
        "/attendance/wfh",
        data
    );

    return response.data;
};


// HALF DAY
export const applyHalfDay = async (
    data: any
) => {
    const response = await api.post(
        "/attendance/half-day",
        data
    );

    return response.data;
};


// SHORT LEAVE
export const applyShortLeave = async (
    data: any
) => {
    const response = await api.post(
        "/attendance/short-leave",
        data
    );

    return response.data;
};