import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import {
    JsonWebTokenError,
    TokenExpiredError,
} from "jsonwebtoken";
import mongoose from "mongoose";

import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";
import logger from "../config/logger.js";

import {
    ERROR_CODES,
    GENERIC_MESSAGES,
    AUTH_MESSAGES,
    type HttpStatus,
    type ErrorCode,
   }
    from "../shared/constants/index.js";
import { HTTP_STATUS } from "../shared/constants/httpStatus.constant.js";

const getZodErrors = (
    error: ZodError,
): Array<{ field?: string; message: string }> => {
    return error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
    }));
};

const getMongooseValidationErrors = (
    error: mongoose.Error.ValidationError,
): Array<{ field?: string; message: string }> => {
    return Object.values(error.errors).map((item) => ({
        field: item.path,
        message: item.message,
    }));
};

export const errorMiddleware: ErrorRequestHandler = (
    error,
    req,
    res,
    _next,
) => {
    let statusCode: HttpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message: string = GENERIC_MESSAGES.INTERNAL_ERROR;
    let errorCode: ErrorCode = ERROR_CODES.INTERNAL_ERROR;
    let errors: Array<{
        field?: string;
        message: string;
    }> = [];

    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errorCode = error.errorCode;
        errors = error.errors;

        if (statusCode >= 500) {
            req.log.error(
                {
                    error,
                },
                "Application error",
            );
        } else {
            req.log.warn(
                {
                    error,
                },
                "Operational error",
            );
        }
    } else if (error instanceof ZodError) {
        statusCode = HTTP_STATUS.BAD_REQUEST;
        message = GENERIC_MESSAGES.VALIDATION_ERROR;
        errorCode = ERROR_CODES.VALIDATION_ERROR;
        errors = getZodErrors(error);

        req.log.info(
            {
                error,
            },
            "Validation error",
        );
    } else if (error instanceof TokenExpiredError) {
        statusCode = HTTP_STATUS.UNAUTHORIZED;
        message = AUTH_MESSAGES.TOKEN_EXPIRED;
        errorCode = ERROR_CODES.AUTH_TOKEN_EXPIRED;

        req.log.warn(
            {
                error,
            },
            "JWT token expired",
        );
    } else if (error instanceof JsonWebTokenError) {
        statusCode = HTTP_STATUS.UNAUTHORIZED;
        message = AUTH_MESSAGES.TOKEN_INVALID;
        errorCode = ERROR_CODES.AUTH_TOKEN_INVALID;

        req.log.warn(
            {
                error,
            },
            "Invalid JWT token",
        );
    } else if (error instanceof mongoose.Error.ValidationError) {
        statusCode = HTTP_STATUS.BAD_REQUEST;
        message = GENERIC_MESSAGES.VALIDATION_ERROR;
        errorCode = ERROR_CODES.VALIDATION_ERROR;
        errors = getMongooseValidationErrors(error);

        req.log.info(
            {
                error,
            },
            "Mongoose validation error",
        );
    } else if (error instanceof mongoose.Error.CastError) {
        statusCode = HTTP_STATUS.BAD_REQUEST;
        message = GENERIC_MESSAGES.VALIDATION_ERROR;
        errorCode = ERROR_CODES.VALIDATION_ERROR;

        errors = [
            {
                field: error.path,
                message: "Invalid ID format",
            },
        ];

        req.log.info(
            {
                error,
            },
            "Mongoose cast error",
        );
    } else if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
    ) {
        statusCode = HTTP_STATUS.CONFLICT;
        message = GENERIC_MESSAGES.RESOURCE_ALREADY_EXISTS;
        errorCode = ERROR_CODES.DUPLICATE_KEY;

        req.log.warn(
            {
                error,
            },
            "Duplicate resource",
        );
    } else if (error instanceof mongoose.mongo.MongoServerError) {
        statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        message = GENERIC_MESSAGES.INTERNAL_ERROR;
        errorCode = ERROR_CODES.INTERNAL_ERROR;

        req.log.error(
            {
                error,
            },
            "MongoDB server error",
        );
    } else {
       logger.error(
    {
        err: error,
        requestId: req.id,
    },
    "Unhandled application error",
);
    }

    const response: {
        success: false;
        message: string;
        errorCode: string;
        errors: Array<{
            field?: string;
            message: string;
        }>;
        requestId: string;
        stack?: string;
    } = {
        success: false,
        message,
        errorCode,
        errors,
        requestId: String(req.id),
    };

    if (env.NODE_ENV !== "production") {
        response.stack =
            error instanceof Error
                ? error.stack
                : undefined;
    }

    res.status(statusCode).json(response);
};