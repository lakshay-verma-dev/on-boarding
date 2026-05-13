import mongoose, { Schema, models } from "mongoose";

const AttendanceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // Stored as "YYYY-MM-DD" for simple daily queries
      required: true,
    },
    clockIn: {
      type: Date,
    },
    clockOut: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "half-day"],
      default: "present",
    },
    totalHours: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

// Ensure a user can only have one attendance record per day
AttendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

export default models.Attendance || mongoose.model("Attendance", AttendanceSchema);
