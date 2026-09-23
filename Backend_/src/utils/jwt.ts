import jwt, {
    type SignOptions,
} from "jsonwebtoken";

import { env } from "../config/env.js";

import type {
    EmailVerifyTicketPayload,
    JwtPayload,
    ResetTicketPayload,
} from "../shared/types/jwt.types.js";

const createSignOptions = (
    expiresIn: string,
): SignOptions => ({
    expiresIn: expiresIn as SignOptions["expiresIn"],
});

export const generateAccessToken = (
    payload: JwtPayload,
): string => {
    return jwt.sign(
        payload,
        env.JWT_SECRET,
        createSignOptions(env.JWT_EXPIRES_IN),
    );
};

export const verifyAccessToken = (
    token: string,
): JwtPayload => {
    return jwt.verify(
        token,
        env.JWT_SECRET,
    ) as JwtPayload;
};

export const generateResetTicket = (
    payload: ResetTicketPayload,
): string => {
    return jwt.sign(
        payload,
        env.RESET_TICKET_SECRET,
        createSignOptions(
            env.RESET_TICKET_EXPIRES_IN,
        ),
    );
};

export const verifyResetTicket = (
    token: string,
): ResetTicketPayload => {
    return jwt.verify(
        token,
        env.RESET_TICKET_SECRET,
    ) as ResetTicketPayload;
};

export const generateEmailVerifyTicket = (
    payload: EmailVerifyTicketPayload,
): string => {
    return jwt.sign(
        payload,
        env.EMAIL_VERIFY_TICKET_SECRET,
        createSignOptions(
            env.EMAIL_VERIFY_TICKET_EXPIRES_IN,
        ),
    );
};

export const verifyEmailVerifyTicket = (
    token: string,
): EmailVerifyTicketPayload => {
    return jwt.verify(
        token,
        env.EMAIL_VERIFY_TICKET_SECRET,
    ) as EmailVerifyTicketPayload;
};