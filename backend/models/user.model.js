import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phoneNumber: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        role: {
            type: String,
            enum: ["student", "recruiter"],
            required: true
        },

        profile: {
            bio: {
                type: String,
                default: ""
            },

            skills: [
                {
                    type: String
                }
            ],

            resume: {
                type: String,
                default: ""
            },

            resumeOriginalName: {
                type: String,
                default: ""
            },

            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
                default: null
            },

            profilePhoto: {
                type: String,
                default: ""
            }
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);