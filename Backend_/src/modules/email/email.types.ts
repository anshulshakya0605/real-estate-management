export interface SendEmailInput {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export interface VerificationOtpEmailInput {
    to: string;
    fullName: string;
    otp: string;
}

export interface PasswordResetOtpEmailInput {
    to: string;
    fullName: string;
    otp: string;
}

export interface WelcomeEmailInput {
    to: string;
    fullName: string;
}

export interface PasswordChangedEmailInput {
    to: string;
    fullName: string;
}