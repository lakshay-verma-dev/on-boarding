import mongoose, {
    model,
    models,
    Schema,
} from "mongoose";

const taskSchema =
    new Schema(
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },

            description: {
                type: String,
                default: "",
            },

            status: {
                type: String,
                enum: [
                    "TODO",
                    "IN_PROGRESS",
                    "REVIEW",
                    "COMPLETED",
                ],
                default: "TODO",
            },

            priority: {
                type: String,
                enum: [
                    "LOW",
                    "MEDIUM",
                    "HIGH",
                ],
                default: "MEDIUM",
            },

            progress: {
                type: Number,
                default: 0,
            },

            deadline: {
                type: Date,
            },

            // =========================
            // RELATIONS
            // =========================

            project: {
                type:
                    Schema.Types.ObjectId,

                ref: "Project",

                required: true,
            },

            assignedTo: {
                type:
                    Schema.Types.ObjectId,

                ref: "User",

                required: true,
            },

            assignedBy: {
                type:
                    Schema.Types.ObjectId,

                ref: "User",
            },
        },
        {
            timestamps: true,
        }
    );

const Task =
    models.Task ||
    model(
        "Task",
        taskSchema
    );

export default Task;