import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import * as inquiryService from './inquiry.service.js'
import { sendListSuccess, sendSuccess } from "../../utils/response";
import { HTTP_STATUS, INQUIRY_MESSAGES } from "../../shared/constants";
import { City, InquiryStatus } from "../../shared/enums";



export const createInquiry: RequestHandler = catchAsync(
    async (req, res) => {
        const inquiry = await inquiryService.createInquiry(req.body)
        return sendSuccess(
            res,
            HTTP_STATUS.CREATED,
            INQUIRY_MESSAGES.INQUIRY_SUBMITTED,
            inquiry,
            String(req.id)
        )
    }
)

export const getInquiries: RequestHandler = catchAsync(
    async (req, res) => {
        const query = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,

            status: req.query.status as| InquiryStatus | undefined,
            
            city: req.query.city as| City | undefined,
        }
        
        const result = await inquiryService.getInquiries(query);

        return sendListSuccess(
            res,
            HTTP_STATUS.OK,
            INQUIRY_MESSAGES.INQUIRIES_FETCHED,
            result.data,
            result.pagination,
            String(req.id)
        )
    }
)

export const getInquiryById: RequestHandler = catchAsync(
    async (req, res) => {
        const inquiry = await inquiryService.getInquiryById(req.params.id);
        return sendSuccess(
            res, 
            HTTP_STATUS.OK,
            INQUIRY_MESSAGES.INQUIRY_FETCHED,
            inquiry,
            String(req.id)
        )
    }
)

export const updateInquiryStatus: RequestHandler = catchAsync(
    async (req, res) => {
        const inquiry = await inquiryService.updateInquiryStatus(req.params.id, req.body);
        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            INQUIRY_MESSAGES.INQUIRY_STATUS_UPDATED,
            inquiry,
            String(req.id)
        )
    }
)

export const assignInquiry: RequestHandler = catchAsync(
    async (req, res) => {
        const inquiry = await inquiryService.assignInquiry(req.params.id, req.body);
        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            INQUIRY_MESSAGES.INQUIRY_ASSIGNED,
            inquiry,
            String(req.id)
        )
    }
)


export const convertInquiryToClient: RequestHandler = catchAsync(
    async (req, res) => {
        const inquiry = await inquiryService.convertInquiryToClient(req.params.id);
        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            INQUIRY_MESSAGES.INQUIRY_CONVERTED,
            inquiry,
            String(req.id)
        )
    }
)


export const deleteInquiry: RequestHandler = catchAsync(
    async (req, res) => {
        await inquiryService.deleteInquiry(req.params.id)
        return sendSuccess(
            res,
            HTTP_STATUS.OK,
            INQUIRY_MESSAGES.INQUIRY_DELETE,
            null,
            String(req.id)
        )
    }
)