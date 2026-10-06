import { AssignInquiryInput, CreateInquiryInput, InquiryListQuery, InquiryResponse, InquiryWithAssignee, UpdateInquiryStatusInput } from "./inquiry.types";
import * as inquiryRepository from './inquiry.repository.js'
import { ApiError } from "../../utils/ApiError";
import { CLIENT_MESSAGES, ERROR_CODES, HTTP_STATUS, INQUIRY_MESSAGES } from "../../shared/constants/index.js";
import { AccountStatus, InquiryStatus, Role } from "../../shared/enums";
import * as authRepository from '../auth/auth.repository.js'
import * as clientRepository from '../clients/client.repository.js'
import { hashPassword } from "../../utils/password";
import { sendWelcomeEmail } from "../email/email.service";


const mapInquiryResponse = (
    inquiry: InquiryWithAssignee
): InquiryResponse => {

    return {
        id: String(inquiry._id),
        fullName: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone,
        city: inquiry.city,
        siteType: inquiry.siteType,
        plotAreaSqFt: inquiry.plotAreaSqFt,
        budgetRange: inquiry.budgetRange,
        message: inquiry.message,
        status: inquiry.status,
        assignedToId: inquiry.assignedToId?._id.toString(),
        notes: inquiry.notes,
        createdAt: inquiry.createdAt,
        updatedAt: inquiry.updatedAt
    }
}

export const createInquiry = async (
    input: CreateInquiryInput
): Promise<InquiryResponse> => {

    const inquiry = await inquiryRepository.createInquiry(input);
    return mapInquiryResponse(inquiry as unknown as InquiryWithAssignee)
}

export const getInquiries = async (
    query: InquiryListQuery
) => {

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [inquiries, total] = await Promise.all([
        inquiryRepository.findInquiries(query),
        inquiryRepository.countInquiries(query)
    ])

    const data = inquiries.map((inquiry) => mapInquiryResponse(inquiry as unknown as InquiryWithAssignee))

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    }
}

export const getInquiryById = async (
    inquiryId: string
): Promise<InquiryResponse> => {

    const inquiry = await inquiryRepository.findInquiryById(inquiryId);

    if (!inquiry) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
            errorCode: ERROR_CODES.INQ_NOT_FOUND
        })
    }

    return mapInquiryResponse(inquiry as unknown as InquiryWithAssignee)
}

export const updateInquiryStatus = async (
    inquiryId: string,
    input: UpdateInquiryStatusInput
): Promise<InquiryResponse> => {

    const inquiry = await inquiryRepository.findInquiryById(inquiryId);

    if (!inquiry) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
            errorCode: ERROR_CODES.INQ_NOT_FOUND
        })
    }

    if (inquiry.status === InquiryStatus.CONVERTED) {
        throw new ApiError({
            statusCode: HTTP_STATUS.CONFLICT,
            message: INQUIRY_MESSAGES.INQUIRY_ALREADY_CONVERTED,
            errorCode: ERROR_CODES.INQ_ALREADY_CONVERTED
        })
    }

    const updatedInquiry = await inquiryRepository.updateInquiryStatus(inquiryId, input);

    if (!updatedInquiry) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
            errorCode: ERROR_CODES.INQ_NOT_FOUND
        })
    }

    return mapInquiryResponse(updatedInquiry as unknown as InquiryWithAssignee)
}

export const assignInquiry = async (
    inquiryId: string,
    input: AssignInquiryInput
): Promise<InquiryResponse> => {

    const inquiry = await inquiryRepository.findInquiryById(inquiryId);

    if (!inquiry) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
            errorCode: ERROR_CODES.INQ_NOT_FOUND
        })
    }

    if (inquiry.status === InquiryStatus.CONVERTED) {
        throw new ApiError({
            statusCode: HTTP_STATUS.CONFLICT,
            message: INQUIRY_MESSAGES.INQUIRY_ALREADY_CONVERTED,
            errorCode: ERROR_CODES.INQ_ALREADY_CONVERTED
        })
    }

    const updatedInquiry = await inquiryRepository.assignInquiry(inquiryId, input);

    if (!updatedInquiry) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
            errorCode: ERROR_CODES.INQ_NOT_FOUND
        })
    }

    return mapInquiryResponse(updatedInquiry as unknown as InquiryWithAssignee)
}

export const convertInquiryToClient = async (inquiryId: string) => {

    const inquiry = await inquiryRepository.findInquiryById(inquiryId);

    if (!inquiry) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
            errorCode: ERROR_CODES.INQ_NOT_FOUND
        })
    }

    if (inquiry.status === InquiryStatus.CONVERTED) {
        throw new ApiError({
            statusCode: HTTP_STATUS.CONFLICT,
            message: INQUIRY_MESSAGES.INQUIRY_ALREADY_CONVERTED,
            errorCode: ERROR_CODES.INQ_ALREADY_CONVERTED
        })
    }

    const existingUser = await authRepository.findUserByEmail(inquiry.email);

    if (existingUser) {
        throw new ApiError({
            statusCode: HTTP_STATUS.CONFLICT,
            message: CLIENT_MESSAGES.CLIENT_EMAIL_EXISTS,
            errorCode: ERROR_CODES.REG_EMAIL_EXISTS
        })
    }

    const temporaryPassword = 'Password@123';

    const passwordHash = await hashPassword(temporaryPassword)

    const user = await authRepository.createUser({
        email: inquiry.email,
        passwordHash,
        fullName: inquiry.fullName,
        phone: inquiry.phone,
        role: Role.CLIENT,
        accountStatus: AccountStatus.ACTIVE,
        isActive: true,
        emailVerified: true
    })

    let client;

    try {
        client = await authRepository.createClient({
            userId: user._id,
            convertedFromInquiryId: inquiry._id
        })

        const updatedInquiry = await inquiryRepository.markInquiryAsConverted(inquiryId);
        if (!updatedInquiry) {
            throw new ApiError({
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
                errorCode: ERROR_CODES.INQ_NOT_FOUND
            })
        }

        void sendWelcomeEmail({
            to: user.email,
            fullName: user.fullName
        })

        return {
            client, temporaryPassword
        }

    } catch (error) {
        if (client?._id) {
            await clientRepository.deleteClient(
                String(client._id),
            );
        }
        await authRepository.deleteUser(String(user._id))
        throw error
    }

}

export const deleteInquiry = async (inquiryId: string): Promise<void> => {
    const inquiry = await inquiryRepository.findInquiryById(inquiryId);

    if (!inquiry) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message: INQUIRY_MESSAGES.INQUIRY_NOT_FOUND,
            errorCode: ERROR_CODES.INQ_NOT_FOUND
        })
    }

    if (inquiry.status === InquiryStatus.CONVERTED) {
        throw new ApiError({
            statusCode: HTTP_STATUS.CONFLICT,
            message: INQUIRY_MESSAGES.INQUIRY_ALREADY_CONVERTED,
            errorCode: ERROR_CODES.INQ_ALREADY_CONVERTED
        })
    }
    await inquiryRepository.deleteInquiry(inquiryId)
}

