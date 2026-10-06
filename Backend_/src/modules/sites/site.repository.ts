import { FilterQuery } from "mongoose";
import { ISite, Site } from "../../models";
import { CreateSiteInput, SiteListQuery, UpdateSiteInput } from "./site.types";

export const createSite = async (
    data: CreateSiteInput
): Promise<ISite> => {

    return Site.create(data);
}

export const findSiteById = async (siteId: string): Promise<ISite | null> => {
    return Site.findById(siteId)
        .populate("createdById", "fullName email")
        .populate("clientId", "userId");
}

export const findSites = async (query: SiteListQuery): Promise<ISite[]> => {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const filter: FilterQuery<ISite> = {};

    if (query.status) {
        filter.status = query.status
    }

    if (query.city) {
        filter.city = query.city
    }

    if (query.siteType) {
        filter.siteType = query.siteType
    }

    if (query.clientId) {
        filter.clientId = query.clientId
    }

    return Site.find(filter)
        .populate("createdById", "fullName email")
        .populate("clientId", "userId")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
}

export const countSites = async (query: SiteListQuery): Promise<number> => {

    const filter: FilterQuery<ISite> = {};

    if (query.status) {
        filter.status = query.status
    }

    if (query.city) {
        filter.city = query.city
    }

    if (query.siteType) {
        filter.siteType = query.siteType
    }

    if (query.clientId) {
        filter.clientId = query.clientId
    }

    return Site.countDocuments(filter);
}

export const updateSite = async (
    siteId: string,
    data: UpdateSiteInput
): Promise<ISite | null> => {

    return Site.findByIdAndUpdate(
        siteId,
        data,
        {
            new: true,
            runValidators: true
        }
    )
    .populate("createdById", "fullName email")
    .populate("clientId", "userId");
}

export const deleteSite = async(siteId: string): Promise<ISite | null> => {
    return Site.findByIdAndDelete(siteId);
}   