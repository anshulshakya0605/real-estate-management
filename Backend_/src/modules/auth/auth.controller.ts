import type { Request, Response } from "express";

import {
    HTTP_STATUS,
} from "../../shared/constants/httpStatus.constant.js";

import {
    AUTH_MESSAGES,
    PASSWORD_MESSAGES,
    REGISTER_MESSAGES,
    VERIFICATION_MESSAGES,
    GENERIC_MESSAGES,
} from "../../shared/constants/messages.constant.js";

import {
    sendSuccess,
} from "../../utils/response.js";

import * as authService from "./auth.service.js";


export const registerEmployee = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.registerEmployee(
        req.body,
    );

    sendSuccess(
        res,
        HTTP_STATUS.CREATED,
        AUTH_MESSAGES.REGISTER_SUCCESS,
        undefined,
        String(req.id),
    );
};


export const registerClient = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.registerClient(
        req.body,
    );

    sendSuccess(
        res,
        HTTP_STATUS.CREATED,
        AUTH_MESSAGES.REGISTER_SUCCESS,
        undefined,
        String(req.id),
    );
};


export const verifyEmail = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.verifyEmail(
        req.body,
    );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        VERIFICATION_MESSAGES.EMAIL_VERIFIED_SUCCESS,
        undefined,
        String(req.id),
    );
};


export const resendVerification = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.resendVerification(
        req.body.email,
    );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        VERIFICATION_MESSAGES.RESEND_SUCCESS,
        undefined,
        String(req.id),
    );
};


export const login = async (
    req: Request,
    res: Response,
): Promise<void> => {

    const result =
        await authService.login(
            req.body,
        );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        AUTH_MESSAGES.LOGIN_SUCCESS,
        result,
        String(req.id),
    );
};


export const forgotPassword = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.forgotPassword(
        req.body,
    );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        PASSWORD_MESSAGES.FORGOT_EMAIL_SENT,
        undefined,
        String(req.id),
    );
};


export const verifyResetOtp = async (
    req: Request,
    res: Response,
): Promise<void> => {

    const result =
        await authService.verifyResetOtp(
            req.body,
        );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        VERIFICATION_MESSAGES.OTP_VERIFIED,
        result,
        String(req.id),
    );
};


export const resetPassword = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.resetPassword(
        req.body,
    );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        PASSWORD_MESSAGES.RESET_SUCCESS,
        undefined,
        String(req.id),
    );
};


export const changePassword = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.changePassword(
        req.user!.userId,
        req.body,
    );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        PASSWORD_MESSAGES.CHANGE_SUCCESS,
        undefined,
        String(req.id),
    );
};


export const getMe = async (
    req: Request,
    res: Response,
): Promise<void> => {

    const user =
        await authService.getMe(
            req.user!.userId,
        );

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        AUTH_MESSAGES.ME_FETCHED,
        user,
        String(req.id),
    );
};


export const logout = async (
    req: Request,
    res: Response,
): Promise<void> => {

    await authService.logout();

    sendSuccess(
        res,
        HTTP_STATUS.OK,
        AUTH_MESSAGES.LOGOUT_SUCCESS,
        undefined,
        String(req.id),
    );
};