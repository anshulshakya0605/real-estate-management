import { RequestHandler } from "express";
import { ApiError } from "../utils/ApiError";
import { ERROR_CODES, GENERIC_MESSAGES, HTTP_STATUS } from "../shared/constants";


export const notFoundMiddleware: RequestHandler = (req, res, next) => {
    next(
        new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: GENERIC_MESSAGES.ROUTE_NOT_FOUND,
            errorCode: ERROR_CODES.ROUTE_NOT_FOUND,
        })
    )
}