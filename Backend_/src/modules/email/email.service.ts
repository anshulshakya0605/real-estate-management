import { mailTransporter } from "../../config/mailer.js";
import { env } from "../../config/env.js";
import {
    EMAIL_MESSAGES,
} from "../../shared/constants/messages.constant.js";

import type {
    PasswordChangedEmailInput,
    PasswordResetOtpEmailInput,
    SendEmailInput,
    VerificationOtpEmailInput,
    WelcomeEmailInput,
} from "./email.types.js";

import {
    passwordChangedEmailTemplate,
    passwordResetOtpTemplate,
    verificationOtpTemplate,
    welcomeEmailTemplate,
} from "./email.templates.js";

export const sendEmail = async (
    input: SendEmailInput,
): Promise<void> => {
    await mailTransporter.sendMail({
        from: env.EMAIL_FROM,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
    });
};

export const sendVerificationOtpEmail = async (
    input: VerificationOtpEmailInput,
): Promise<void> => {
    await sendEmail({
        to: input.to,
        subject: EMAIL_MESSAGES.VERIFY_OTP_SUBJECT,
        html: verificationOtpTemplate(
            input.fullName,
            input.otp,
        ),
    });
};

export const sendPasswordResetOtpEmail = async (
    input: PasswordResetOtpEmailInput,
): Promise<void> => {
    await sendEmail({
        to: input.to,
        subject: EMAIL_MESSAGES.RESET_OTP_SUBJECT,
        html: passwordResetOtpTemplate(
            input.fullName,
            input.otp,
        ),
    });
};

export const sendWelcomeEmail = async (
    input: WelcomeEmailInput,
): Promise<void> => {
    await sendEmail({
        to: input.to,
        subject: EMAIL_MESSAGES.WELCOME_SUBJECT,
        html: welcomeEmailTemplate(input.fullName),
    });
};

export const sendPasswordChangedEmail = async (
    input: PasswordChangedEmailInput,
): Promise<void> => {
    await sendEmail({
        to: input.to,
        subject: EMAIL_MESSAGES.PASSWORD_CHANGED_SUBJECT,
        html: passwordChangedEmailTemplate(
            input.fullName,
        ),
    });
};