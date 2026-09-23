export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
    requestId: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiListResponse<T> {
    success: true;
    message: string;
    data: T[];
    pagination: PaginationMeta;
    requestId: string;
}

export interface ApiErrorDetail {
    field?: string;
    message: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errorCode: string;
    errors: ApiErrorDetail[];
    requestId: string;
    stack?: string;
}