import mongoose, {
    model,
    models,
    Schema,
} from "mongoose";

const projectSchema =
    new Schema(
        {
            name: {
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
                    "PENDING",
                    "IN_PROGRESS",
                    "COMPLETED",
                ],
                default: "PENDING",
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

            lead: {
                type:
                    Schema.Types.ObjectId,

                ref: "User",

                required: true,
            },

            teamMembers: [
                {
                    type:
                        Schema.Types.ObjectId,

                    ref: "User",
                },
            ],

            createdBy: {
                type:
                    Schema.Types.ObjectId,

                ref: "User",
            },
        },
        {
            timestamps: true,
        }
    );

const Project =
    models.Project ||
    model(
        "Project",
        projectSchema
    );

export default Project;