import type { IClient } from "../../models/client.model.js";
import type { IEmployee } from "../../models/employee.model.js";
import type { IOtpToken } from "../../models/otpToken.model.js";
import type { IPasswordHistory } from "../../models/passwordHistory.model.js";
import type { IUser } from "../../models/user.model.js";

import {
    Client,
    Employee,
    OtpToken,
    PasswordHistory,
    User,
} from "../../models/index.js";

import {
    AccountStatus,
    TokenPurpose,
} from "../../shared/enums/index.js";

export const findUserByEmail = async (
    email: string,
): Promise<IUser | null> => {
    return User.findOne({ email })
        .select("+passwordHash");
};

export const findUserById = async (
    userId: string,
): Promise<IUser | null> => {
    return User.findById(userId)
        .select("+passwordHash");
};

export const findUserByEmailWithoutPassword = async (
    email: string,
): Promise<IUser | null> => {
    return User.findOne({ email });
};

export const createUser = async (
    data: Partial<IUser>,
): Promise<IUser> => {
    return User.create(data);
};

export const updateUser = async (
    userId: string,
    data: Partial<IUser>,
): Promise<IUser | null> => {
    return User.findByIdAndUpdate(
        userId,
        data,
        {
            new: true,
            runValidators: true,
        },
    );
};

export const createEmployee = async (
    data: Partial<IEmployee>,
): Promise<IEmployee> => {
    return Employee.create(data);
};

export const findEmployeeByUserId = async (
    userId: string,
): Promise<IEmployee | null> => {
    return Employee.findOne({ userId });
};

export const createClient = async (
    data: Partial<IClient>,
): Promise<IClient> => {
    return Client.create(data);
};

export const findClientByUserId = async (
    userId: string,
): Promise<IClient | null> => {
    return Client.findOne({ userId });
};

export const createOtp = async (
    data: Partial<IOtpToken>,
): Promise<IOtpToken> => {
    return OtpToken.create(data);
};

export const findLatestActiveOtp = async (
    userId: string,
    purpose: TokenPurpose,
): Promise<IOtpToken | null> => {
    return OtpToken.findOne({
        userId,
        purpose,
        usedAt: null,
        expiresAt: {
            $gt: new Date(),
        },
    }).sort({
        createdAt: -1,
    });
};

export const invalidateActiveOtps = async (
    userId: string,
    purpose: TokenPurpose,
): Promise<void> => {
    await OtpToken.updateMany(
        {
            userId,
            purpose,
            usedAt: null,
        },
        {
            $set: {
                usedAt: new Date(),
            },
        },
    );
};

export const markOtpUsed = async (
    otpId: string,
): Promise<IOtpToken | null> => {
    return OtpToken.findByIdAndUpdate(
        otpId,
        {
            $set: {
                usedAt: new Date(),
            },
        },
        {
            new: true,
        },
    );
};

export const incrementOtpAttempts = async (
    otpId: string,
): Promise<IOtpToken | null> => {
    return OtpToken.findByIdAndUpdate(
        otpId,
        {
            $inc: {
                attempts: 1,
            },
        },
        {
            new: true,
        },
    );
};

export const createPasswordHistory = async (
    data: Partial<IPasswordHistory>,
): Promise<IPasswordHistory> => {
    return PasswordHistory.create(data);
};

export const findRecentPasswordHistories = async (
    userId: string,
    limit: number,
): Promise<IPasswordHistory[]> => {
    return PasswordHistory.find({
        userId,
    })
        .sort({
            createdAt: -1,
        })
        .limit(limit);
};

export const countActiveAdminUsers = async (): Promise<number> => {
    return User.countDocuments({
        role: "ADMIN",
        accountStatus: AccountStatus.ACTIVE,
        isActive: true,
        emailVerified: true,
    });
};