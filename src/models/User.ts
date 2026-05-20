import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["ADMIN", "LEAD", "EMPLOYEE"],
            default: "EMPLOYEE",
        },

        designation: {
            type: String,
        },

        department: {
            type: String,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;