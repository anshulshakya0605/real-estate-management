import { Types } from "mongoose";
import { City, InquiryStatus, Role, SiteType } from "../../shared/enums";


export interface CreateInquiryInput {
    fulName: string;
    email: string;
    phone: string;
    city: City;

    siteType?: SiteType;
    plotAreaSqFt?: number;
    budgetRange?: string;
    message?: string;
}

export interface InquiryListQuery {
    page?: number;
    limit?: number;
    status?: InquiryStatus;
    city?: City;
}

export interface UpdateInquiryStatusInput{
    status: InquiryStatus;
}

export interface AssignInquiryInput {
    assignedToId: string 
}

export interface InquiryResponse {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    siteType?: SiteType;
    plotAreaSqFt?: number;
    budgetRange?: string;
    message?: string;
    status: InquiryStatus;
    assignedToId?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InquiryWithAssignee {
    _id: Types.ObjectId;

    fullName: string;
    email: string;
    phone: string;

    city: City;
    siteType?: SiteType;

    plotAreaSqFt?: number;
    budgetRange?: string;
    message?: string;

    status: InquiryStatus;

    assignedToId: {
        _id: Types.ObjectId,
        fullName: string;
        email: string
        role: Role
    };

    notes?: string;

    createdAt: Date;
    updatedAt: Date;
}

