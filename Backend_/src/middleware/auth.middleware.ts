import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import {
    ERROR_CODES,
    GENERIC_MESSAGES,
    HTTP_STATUS,
    type Role,
} from "../shared/constants/index.js";

import type { JwtPayload } from "../shared/types/jwt.types.js";

import { ApiError } from "../utils/ApiError.js";

export const authenticate: RequestHandler = (
    req,
    _res,
    next,
) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return next(
                new ApiError({
                    statusCode: HTTP_STATUS.UNAUTHORIZED,
                    message: GENERIC_MESSAGES.UNAUTHORIZED,
                    errorCode: ERROR_CODES.AUTH_TOKEN_MISSING,
                }),
            );
        }

        const [scheme, token] = authorization.split(" ");

        if (!scheme || !token || scheme !== "Bearer") {
            return next(
                new ApiError({
                    statusCode: HTTP_STATUS.UNAUTHORIZED,
                    message: GENERIC_MESSAGES.UNAUTHORIZED,
                    errorCode: ERROR_CODES.AUTH_TOKEN_INVALID,
                }),
            );
        }

        const decoded = jwt.verify(
            token,
            env.JWT_SECRET,
        ) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};

export const authorize = (
    ...allowedRoles: Role[]
): RequestHandler => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(
                new ApiError({
                    statusCode: HTTP_STATUS.UNAUTHORIZED,
                    message: GENERIC_MESSAGES.UNAUTHORIZED,
                    errorCode: ERROR_CODES.AUTH_TOKEN_MISSING,
                }),
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                new ApiError({
                    statusCode: HTTP_STATUS.FORBIDDEN,
                    message: GENERIC_MESSAGES.FORBIDDEN,
                    errorCode: ERROR_CODES.AUTH_FORBIDDEN,
                }),
            );
        }

        next();
    };
};