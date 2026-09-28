import { Types } from "mongoose";
import { AccountStatus, City, Role, Trade } from "../../shared/enums";



export interface EmployeeListQuery {
    trade?: Trade;
    city?: City;
    availability?: boolean;
    accountStatus?: AccountStatus;
    page?: number;
    limit?: number;
}

export interface UpdateEmployeeInput {
    trade?: Trade;
    isAvailable?: boolean;
}

export interface RejectEmployeeInput {
    rejectionReason?: string;
}   

export interface EmployeeUserResponse {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    city?: City;
    role: Role;
    accountStatus: AccountStatus;
    isAvailable?: boolean;
    emailVerified: boolean;
}

export interface EmployeeResponse {
    id: string;
    userId: string;
    email: string;
    fullName: string;
    phone?: string;
    city?: City;
    trade: Trade;
    employeeCode: string;
    joiningDate: Date;
    isAvailable: boolean;
    accountStatus: AccountStatus;
    emailVerified: boolean;
    isActive: boolean;
    approvedById?: string;
    approvedAt?: Date;
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface EmployeeWithUser {
    _id: Types.ObjectId;
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

    trade?: Trade;
    employeeCode: string;
    joiningDate: Date;
    isAvailable: boolean;
    approvedById?: Types.ObjectId;
    approvedAt?: Date;
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date
}
