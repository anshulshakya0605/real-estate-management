import { Types } from "mongoose";
import { CreateSiteInput, SiteListQuery, SiteResponse, SiteWithRelations } from "./site.types";
import { ApiError } from "../../utils/ApiError";
import { CLIENT_MESSAGES, ERROR_CODES, HTTP_STATUS, SITE_MESSAGES, USER_MESSAGES } from "../../shared/constants";
import * as siteRepository from './site.repository.js'
import { SiteStatus } from "../../shared/enums";


const mapSiteResponse = (site: SiteWithRelations): SiteResponse => {

    const createdById = typeof site.createdById === "object" && 
    "_id" in site.createdById ? site.createdById._id : site.createdById;

    const clientId = typeof site.clientId === "object" && 
    "_id" in site.clientId ? site.clientId._id : site.clientId
    
    return {
        id: String(site._id),
        name: site.name,
        description: site.description,
        siteType: site.siteType,
        status: site.status,
        city: site.city,
        address: site.address,
        location: site.location,
        plotAreaSqFt: site.plotAreaSqFt,
        budget: site.budget,
        startDate: site.startDate,
        expectedEndDate: site.expectedEndDate,
        actualEndDate: site.actualEndDate,
        createdById: String(createdById),
        clientId: String(clientId),
        createdAt: site.createdAt,
        updatedAt: site.updatedAt
    }
}

export const createSite = async (
    input: CreateSiteInput,
    createdById: string
): Promise<SiteResponse> => {

    if (!Types.ObjectId.isValid(createdById)) {
        throw new ApiError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: USER_MESSAGES.USER_ID_INVALID,
            errorCode: ERROR_CODES.INVALID_ID
        })
    }

    if (!Types.ObjectId.isValid(input.clientId)) {
        throw new ApiError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: CLIENT_MESSAGES.INVALID_CLIENT_ID,
            errorCode: ERROR_CODES.INVALID_ID
        })
    }

    const site = await siteRepository.createSite({
        name: input.name,
        description: input.description,
        siteType: input.siteType,
        city: input.city,
        address: input.address,
        location: input.location,
        plotAreaSqFt: input.plotAreaSqFt,
        budget: input.budget,
        startDate: input.startDate,
        expectedEndDate: input.expectedEndDate,
        clientId: new Types.ObjectId(input.clientId),
        createdById: new Types.ObjectId(createdById),
        status: SiteStatus.PLANNING
    })

    const populatedSite = await siteRepository.findSiteById(String(site._id));

     if (!populatedSite) {
        throw new ApiError({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: "Site could not be fetched after creation",
            errorCode: ERROR_CODES.INTERNAL_ERROR
        });
    }

    return mapSiteResponse(
        populatedSite as unknown as SiteWithRelations
    )

}

export const getSiteById = async(siteId: string): Promise<SiteResponse> => {
    if (!Types.ObjectId.isValid(siteId)) {
        throw new ApiError({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: SITE_MESSAGES.INVALID_SITE_ID,
            errorCode: ERROR_CODES.INVALID_ID
        })
    }

    const site = await siteRepository.findSiteById(siteId);

    if (!site) {
        throw new ApiError({
            statusCode: HTTP_STATUS.NOT_FOUND,
            message:SITE_MESSAGES.SITE_NOT_FOUND,
            errorCode: ERROR_CODES.SITE_NOT_FOUND
        })
    }

    return mapSiteResponse(
        site as unknown as SiteWithRelations
    )
}

export const getSites = async(query: SiteListQuery) =>{

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [sites, total] = await Promise.all([
        siteRepository.findSites(query),
        siteRepository.countSites(query)
    ])

    const data = sites.map((site) => mapSiteResponse(
        site as unknown as SiteWithRelations
    ));

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