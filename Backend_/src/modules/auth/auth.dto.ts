import { z } from "zod";

import { CONFIG } from "../../shared/constants/config.constant.js";
import { AUTH_VALIDATION_MESSAGES } from "../../shared/constants/messages.constant.js";

import {
    City,
    Trade,
} from "../../shared/enums/index.js";

const cityValues = Object.values(City) as [City, ...City[]];

const tradeValues = Object.values(Trade) as [Trade, ...Trade[]];

const emailSchema = z
    .string()
    .trim()
    .email(AUTH_VALIDATION_MESSAGES.EMAIL_INVALID)
    .toLowerCase();

const passwordSchema = z
    .string()
    .min(
        CONFIG.PASSWORD_MIN_LENGTH,
        AUTH_VALIDATION_MESSAGES.PASSWORD_TOO_SHORT,
    )
    .max(
        CONFIG.PASSWORD_MAX_LENGTH,
        AUTH_VALIDATION_MESSAGES.PASSWORD_TOO_LONG,
    );

const otpSchema = z
    .string()
    .length(
        CONFIG.OTP_LENGTH,
        AUTH_VALIDATION_MESSAGES.OTP_LENGTH_INVALID,
    )
    .regex(
        /^\d+$/,
        AUTH_VALIDATION_MESSAGES.OTP_INVALID,
    );

const fullNameSchema = z
    .string()
    .trim()
    .min(
        1,
        AUTH_VALIDATION_MESSAGES.FULL_NAME_REQUIRED,
    );

const phoneSchema = z
    .string()
    .trim()
    .optional();

export const registerEmployeeSchema = z.object({
    email: emailSchema,

    password: passwordSchema,

    fullName: fullNameSchema,

    phone: phoneSchema,

    city: z.enum(cityValues),

    trade: z.enum(tradeValues),
});

export const registerClientSchema = z.object({
    email: emailSchema,

    password: passwordSchema,

    fullName: fullNameSchema,

    phone: phoneSchema,

    companyName: z
        .string()
        .trim()
        .optional(),

    gstNumber: z
        .string()
        .trim()
        .optional(),
});

export const verifyEmailSchema = z.object({
    email: emailSchema,

    otp: otpSchema,
});

export const resendVerificationSchema = z.object({
    email: emailSchema,
});

export const loginSchema = z.object({
    email: emailSchema,

    password: z.string(),
});

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const verifyResetOtpSchema = z.object({
    email: emailSchema,

    otp: otpSchema,
});

export const resetPasswordSchema = z.object({
    resetTicket: z
        .string()
        .trim()
        .min(1, AUTH_VALIDATION_MESSAGES.RESET_TICKET_REQUIRED),

    newPassword: passwordSchema,
});

export const changePasswordSchema = z.object({
    currentPassword: z.string(),

    newPassword: passwordSchema,
});