import { create } from "zustand";

interface Attendance {
    _id: string;
    date: string;
    status: string;
}

interface AttendanceState {
    attendance: Attendance[];

    setAttendance: (
        attendance: Attendance[]
    ) => void;
}

export const useAttendanceStore =
    create<AttendanceState>((set) => ({
        attendance: [],

        setAttendance: (
            attendance
        ) =>
            set({
                attendance,
            }),
    }));