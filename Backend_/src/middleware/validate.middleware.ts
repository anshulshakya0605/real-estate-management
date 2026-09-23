import { RequestHandler } from "express";
import { ZodType } from "zod";
import { ApiError } from "../utils/ApiError";
import { ERROR_CODES, GENERIC_MESSAGES, HTTP_STATUS } from "../shared/constants";



export const validate = (schema: ZodType): RequestHandler => {
 return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
        }));
        return next(
            new ApiError({
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: GENERIC_MESSAGES.VALIDATION_ERROR,
                errorCode: ERROR_CODES.VALIDATION_ERROR,
                errors
            })
        )
    }

    req.body = result.data;
    next();
 }
}