
import {Document, model, Schema, Types } from "mongoose";
import { AccountStatus, City, Role } from "../shared/enums/index";



export interface IUser extends Document {
    _id: Types.ObjectId
    email: string;
    passwordHash: string;
    fullName: string;
    phone?: string;
    role: Role;
    city?: City;
    accountStatus: AccountStatus;
    isActive: boolean;
    emailVerified: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
    },
     passwordHash: {
            type: String,
            required: true,
            select: false,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
            index: true,
        },

        role: {
            type: String,
            enum: Object.values(Role),
            required: true,
            index: true,
        },

        city: {
            type: String,
            enum: Object.values(City),
            index: true,
        },

        accountStatus: {
            type: String,
            enum: Object.values(AccountStatus),
            required: true,
            default: AccountStatus.PENDING_VERIFICATION,
            index: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },

        lastLoginAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
        collection: "users",
    },
);


export const User = model<IUser>("User", userSchema)