import { Types } from "mongoose";
import { City, SiteStatus, SiteType } from "../../shared/enums";


export interface CreateSiteInput {
     name: string;
    description?: string;

    siteType: SiteType;
    city: City;
    address: string;

    location?: {
        type: "Point";
        coordinates: [number, number];
    };

    plotAreaSqFt?: number;
    budget?: number;

    startDate?: Date;
    expectedEndDate?: Date;

    clientId: string;
}

export interface CreateSiteData {
    name: string;
    description?: string;

    siteType: SiteType;
    city: City;
    address: string;

    location?: {
        type: "Point";
        coordinates: [number, number];
    };

    plotAreaSqFt?: number;
    budget?: number;

    startDate?: Date;
    expectedEndDate?: Date;

    clientId: Types.ObjectId;
    createdById: Types.ObjectId;
    status: SiteStatus;
}

export interface UpdateSiteInput {
    name?: string;
    description?: string;

    siteType?: SiteType;
    city?: City;
    address?: string;
    location?: {
        type: "Point",
        coordinates: [number, number]
    };

    plotAreaSqFt?: number;
    budget?: number;

    startDate?: Date;
    expectedEndDate?: Date;
    actualEndDate?: Date;
    clientId?: string;
}

export interface SiteListQuery {
    page?: number;
    limit?: number;
    status?: SiteStatus;
    city?: City;
    siteType?: SiteType;
    clientId?: string;
}

export interface SiteResponse {
    id: string;
    name: string
    description: string;

    siteType: SiteType;
    status: SiteStatus;
    city: City;
    address: string;

    location?: {
        type: "Point";
        coordinates: [number, number];
    };

    plotAreaSqFt?: number;
    budget?: number;

    startDate?: Date;
    expectedEndDate?: Date;
    actualEndDate?: Date;

    createdById: string;
    clientId: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface SiteWithRelations extends Omit<SiteResponse, "createdById" | "clientId">{
    _id: Types.ObjectId;
    createdById: Types.ObjectId | {
        _id: Types.ObjectId,
        fullName: string;
        email: string;
    };

    clientId: Types.ObjectId | {
        _id: Types.ObjectId;
        userId: Types.ObjectId
    } 
}