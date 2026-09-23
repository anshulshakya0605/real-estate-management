import { AccountStatus, City, Role, Trade } from "../../shared/enums/index";


export interface RegisterEmployeeInput {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    city: City;
    trade: Trade
}

export interface RegisterClientInput {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    companyName?: string;
    gstNumber?: string;
}

export interface VerifyEmailInput {
    email: string;
    otp: string;
}

export interface ResendVerificationInput {
    email: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface ForgotPasswordInput {
    email: string;
}

export interface VerifyResetOtpInput {
    email: string;
    otp: string;
}

export interface ResetPasswordInput {
    resetTicket: string;
    newPassword: string;
}

export interface ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
}

export interface AuthUserResponse {
    id: string;
    email: string;
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

export interface LoginResponse {
    user: AuthUserResponse;
    token: string;
}

export interface VerifyResetOtpResponse {
    resetTicket: string;
}