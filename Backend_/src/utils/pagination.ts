import { CONFIG } from "../shared/constants";


export interface PaginationInput {
    page?: number;
    limit?: number;
}

export interface PaginationResult {
    page?: number;
    limit?: number;
    skip?: number;
}

export const getPagination = ({page = CONFIG.PAGINATION_DEFAULT_PAGE, limit = CONFIG.PAGINATION_DEFAULT_LIMIT, }: PaginationInput):PaginationResult => {
    const normalPage = Math.max(CONFIG.PAGINATION_DEFAULT_PAGE, Math.floor(page));
    const normalPageLimit = Math.min(CONFIG.PAGINATION_MAX_LIMIT, Math.max(1, Math.floor(limit)))
    return {
        page: normalPage,
        limit: normalPageLimit,
        skip: (normalPage - 1) * limit
    }
} 


export const getTotalPages = (total: number, limit: number): number => {
    return Math.ceil(total / limit)
}