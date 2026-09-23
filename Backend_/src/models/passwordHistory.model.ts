import { Schema, model, type Document, type Types } from "mongoose";

export interface IPasswordHistory extends Document {
    userId: Types.ObjectId;
    passwordHash: string;
    createdAt: Date;
}

const passwordHistorySchema = new Schema<IPasswordHistory>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        collection: "passwordHistories",
        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
    },
);


export const PasswordHistory = model<IPasswordHistory>(
    "PasswordHistory",
    passwordHistorySchema,
);