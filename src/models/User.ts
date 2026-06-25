import mongoose, {
    Schema,
    models,
    model,
} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: [
                "ADMIN",
                "LEAD",
                "EMPLOYEE",
            ],
            default: "EMPLOYEE",
        },

        phone: {
            type: String,
            default: "",
        },

        department: {
            type: String,
            default: "",
        },

        designation: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },

        joiningDate: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: [
                "ACTIVE",
                "INACTIVE",
                "ON_LEAVE",
            ],
            default: "ACTIVE",
        },

        avatar: {
            type: String,
            default: "",
        },
        resetPasswordToken: {
            type: String,
            default: "",
        },
        resetPasswordExpires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User =
    models.User ||
    model("User", userSchema);

export default User;