import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import User from "@/models/User";
import dayjs from "dayjs";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    await connectDB();
    const today = dayjs().format("YYYY-MM-DD");

    // 1. Total Users
    const totalUsers = await User.countDocuments({ role: "employee" });

    // 2. Active Sessions Today
    const todayAttendances = await Attendance.find({ date: today }).populate("userId", "name email");
    const activeSessions = todayAttendances.filter(a => !a.clockOut).length;
    const completedSessions = todayAttendances.filter(a => a.clockOut).length;

    // 3. Weekly attendance data for chart (last 7 days)
    const last7Days = Array.from({ length: 7 }).map((_, i) => dayjs().subtract(i, "day").format("YYYY-MM-DD")).reverse();
    
    const weeklyData = await Attendance.aggregate([
      { $match: { date: { $in: last7Days } } },
      { $group: { _id: "$date", count: { $sum: 1 } } }
    ]);

    const chartData = last7Days.map(date => {
      const record = weeklyData.find(d => d._id === date);
      return record ? record.count : 0;
    });

    return NextResponse.json({
      totalUsers,
      activeSessions,
      completedSessions,
      totalToday: todayAttendances.length,
      todayAttendances,
      chartLabels: last7Days.map(d => dayjs(d).format("ddd")),
      chartData
    });

  } catch (error: any) {
    console.error("Admin API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
