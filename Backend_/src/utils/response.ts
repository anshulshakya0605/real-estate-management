import type { Response } from "express";

import type {
    ApiListResponse,
    ApiSuccessResponse,
    PaginationMeta,
} from "../shared/types/apiResponse.types.js";
import { HttpStatus } from "../shared/constants/httpStatus.constant.js";

export const sendSuccess = <T>(
    res: Response,
    statusCode: HttpStatus,
    message: string,
    data: T,
    requestId: string,
): Response<ApiSuccessResponse<T>> => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        requestId,
    });
};

export const sendListSuccess = <T>(
    res: Response,
    statusCode: HttpStatus,
    message: string,
    data: T[],
    pagination: PaginationMeta,
    requestId: string,
): Response<ApiListResponse<T>> => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        pagination,
        requestId,
    });
};