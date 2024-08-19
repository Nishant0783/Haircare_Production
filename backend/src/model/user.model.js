import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        number: {
            type: Number,
            required: true,
            lowercase: true,
            trim: true
        },
        gender: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            enum: ['male', 'female', 'other']
        },
        image: {
            type: String,
            required: true,
            trim: true
        },
        dob: {
            type: Date,
            required: true,
            trim: true
        },
        familyHistory: {
            type: String,
            required: true,
            trim: true,
            enum: ['yes', 'no']
        },
        stressLevel: {
            type: String,
            required: true,
            trim: true,
            enum: ['low', 'medium', 'high']
        }
    }, {
    timestamps: true
}
)

export const User = mongoose.model("User", userSchema);