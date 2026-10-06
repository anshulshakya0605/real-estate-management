import { FilterQuery } from "mongoose";
import { IInquiry, Inquiry } from "../../models";
import { AssignInquiryInput, CreateInquiryInput, InquiryListQuery, UpdateInquiryStatusInput } from "./inquiry.types";
import { InquiryStatus } from "../../shared/enums";


export const createInquiry = async (
    data: CreateInquiryInput
): Promise<IInquiry> => {
    return Inquiry.create(data);
};

export const findInquiries = async (
    query: InquiryListQuery
): Promise<IInquiry[]> => {

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const filter: FilterQuery<IInquiry> = {};

    if (query.status) {
        filter.status = query.status
    }

    if (query.city) {
        filter.city = query.city
    }

    return Inquiry.find(filter).sort({ createdAt: - 1 }).skip((page - 1) * limit).limit(limit)

}

export const countInquiries = async (
    query: InquiryListQuery
): Promise<number> => {

    const filter: FilterQuery<IInquiry> = {};

    if (query.status) {
        filter.status = query.status
    }

    if (query.city) {
        filter.city = query.city
    }

    return Inquiry.countDocuments(filter);

}

export const findInquiryById = async (
    inquiryId: string
): Promise<IInquiry | null> => {

    return Inquiry.findById(inquiryId)
        .populate("assignedToId", "fullName email role")
}


export const updateInquiryStatus = async (
    inquiryId: string,
    data: UpdateInquiryStatusInput
): Promise<IInquiry | null> => {

    return Inquiry.findByIdAndUpdate(inquiryId,
        {
            status: data.status
        },
        {
            new: true,
            runValidators: true
        }
    )

};

export const assignInquiry = async (
    inquiryId: string,
    data: AssignInquiryInput
): Promise<IInquiry | null> => {

    return Inquiry.findByIdAndUpdate(
        inquiryId,
        {
            assignedToId: data.assignedToId
        },
        {
            new: true,
            runValidators: true
        }
    ).populate("assignedToId", "fullName email role")
};

export const markInquiryAsConverted = async (
    inquiryId: string
): Promise<IInquiry | null> => {

    return Inquiry.findByIdAndUpdate(
        inquiryId,
        {
            status: InquiryStatus.CONVERTED
        },
        {
            new: true,
            runValidators: true
        }
    )
}

export const deleteInquiry = async (
    inquiryId: string
): Promise<IInquiry | null> => {

    return Inquiry.findByIdAndDelete(inquiryId);
}