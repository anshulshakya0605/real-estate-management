import { Role, TokenPurpose } from "../enums";

export interface JwtPayload {
    userId: string;
    role: Role
}

export interface ResetTicketPayload {
    userId: string;
    purpose: TokenPurpose.PASSWORD_RESET
}

export interface EmailVerifyTicketPayload {
    userId: string;
    purpose: TokenPurpose.EMAIL_VERIFICATION
}
