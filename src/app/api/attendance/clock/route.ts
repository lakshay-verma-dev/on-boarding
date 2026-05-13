import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import dayjs from "dayjs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = (session.user as any).id;
    const today = dayjs().format("YYYY-MM-DD");

    let attendance = await Attendance.findOne({ userId, date: today });

    if (!attendance) {
      // Clock In
      attendance = await Attendance.create({
        userId,
        date: today,
        clockIn: new Date(),
        status: "present",
      });
      return NextResponse.json({ message: "Clocked in successfully", attendance });
    }

    if (!attendance.clockOut) {
      // Clock Out
      const clockOutTime = new Date();
      const diffMs = clockOutTime.getTime() - new Date(attendance.clockIn).getTime();
      const totalHours = Number((diffMs / (1000 * 60 * 60)).toFixed(2));

      attendance.clockOut = clockOutTime;
      attendance.totalHours = totalHours;
      await attendance.save();

      return NextResponse.json({ message: "Clocked out successfully", attendance });
    }

    // Already clocked out
    return NextResponse.json({ error: "Already clocked out for today", attendance }, { status: 400 });

  } catch (error: any) {
    console.error("Clock API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = (session.user as any).id;
    const today = dayjs().format("YYYY-MM-DD");

    const attendance = await Attendance.findOne({ userId, date: today });
    
    // Also fetch last 7 days history
    const history = await Attendance.find({ userId })
      .sort({ date: -1 })
      .limit(7);

    return NextResponse.json({ today: attendance, history });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
