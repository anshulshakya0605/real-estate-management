import { Types } from "mongoose";
import { AccountStatus, City, Role } from "../../shared/enums";


export interface ClientResponse {
    id: string;
    userId: string;

    email: string;
    fullName: string;
    phone?: string;
    city?: City;

    role: Role;
    accountStatus: AccountStatus;
    isActive: boolean;
    emailVerified: boolean;

    companyName?: string;
    gstNumber?: string;
    convertedFromInquiryId?: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface ClientWithUser {
    _id: Types.ObjectId,
    userId: {
        _id: Types.ObjectId;
        email: string;
        fullName: string;
        phone?: string;
        city?: City;
        role: Role;
        accountStatus: AccountStatus;
        isActive: boolean;
        emailVerified: boolean;
    }
    companyName?: string;
    gstNumber?: string;
    convertedFromInquiryId?: Types.ObjectId;
    
    createdAt: Date;
    updatedAt: Date;
}

export interface ClientListQuery {
    page?: number;
    limit?: number;
}