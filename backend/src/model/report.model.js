import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        report: {
            type: Object,
            required: true
        }
    }, {
        timestamps: true
    }
)

export const Report = mongoose.model("Report", reportSchema);