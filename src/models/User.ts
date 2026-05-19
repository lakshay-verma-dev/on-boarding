import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "admin" | "employee";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    name:     { type: String, required: true, trim: true },
    role:     { type: String, enum: ["admin", "employee"], default: "employee" },
  },
  { timestamps: true }
);

// Prevent model re-registration in dev hot-reload
export default models.User || model<IUser>("User", UserSchema);
