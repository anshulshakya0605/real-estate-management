

import type { ErrorCode, HttpStatus } from "../shared/constants/index.js";

export interface ApiErrorOptions {
    statusCode: HttpStatus;
    message: string;
    errorCode: ErrorCode;
    errors?: Array<{
        field?: string;
        message: string;
    }>;
    isOperational?: boolean;
}

export class ApiError extends Error {
    public readonly statusCode: HttpStatus;
    public readonly errorCode: ErrorCode;
    public readonly errors: Array<{
        field?: string;
        message: string;
    }>;
    public readonly isOperational: boolean;

    constructor({
        statusCode,
        message,
        errorCode,
        errors = [],
        isOperational = true,
    }: ApiErrorOptions) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.errors = errors;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}