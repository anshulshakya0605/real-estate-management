import { model, Schema, Types } from "mongoose";
import { TokenPurpose } from "../shared/enums/index";


export interface IOtpToken extends Document{
    _id: Types.ObjectId
    userId: Types.ObjectId;
    otpHash: string;
    purpose: TokenPurpose;
    expiresAt: Date;
    attempts: number;
    usedAt?: Date | null;
    createdAt: Date;
}

const otpTokenSchema = new Schema<IOtpToken>(
     {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        otpHash: {
            type: String,
            required: true,
            select: false,
        },

        purpose: {
            type: String,
            enum: Object.values(TokenPurpose),
            required: true,
            index: true,
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true,
        },

        attempts: {
            type: Number,
            default: 0,
            min: 0,
        },

        usedAt: {
            type: Date,
            default: null,
        },
    },
    {
        collection: "otpTokens",
        timestamps: true
    },
);


export const OtpToken = model<IOtpToken>("OtpToken", otpTokenSchema)