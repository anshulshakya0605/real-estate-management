import z from "zod";
import { City, SiteStatus, SiteType } from "../../shared/enums";


const locationSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([
        z.number().min(-180).max(180),
        z.number().min(-90).max(90)
    ])
})

export const createSiteSchema = z.object({
    name: z.string().trim().min(2),
    description: z.string().trim().optional(),

    siteType: z.nativeEnum(SiteType),

    city: z.nativeEnum(City),

    address: z.string().trim().min(3),

    location: locationSchema.optional(),

    plotAreaSqFt: z.number().positive().optional(),

    budget: z.number().positive().optional(),

    startDate: z.coerce.date().optional(),

    expectedEndDate: z.coerce.date().optional(),

    clientId: z.string().trim().min(1)
})

export const updateSiteSchema = z.object({
    name: z.string().trim().min(2).optional(),

    description: z.string().trim().optional(),

    siteType: z.nativeEnum(SiteType).optional(),

    status: z.nativeEnum(SiteStatus).optional(),

    city: z.nativeEnum(City).optional(),

    address: z.string().trim().min(3).optional(),

    location: locationSchema.optional(),

    plotAreaSqFt: z.number().positive().optional(),

    budget: z.number().positive().optional(),

    startDate: z.coerce.date().optional(),

    expectedEndDate: z.coerce.date().optional(),

    actualEndDate: z.coerce.date().optional(),

    clientId: z.string().trim().min(1).optional()
});

export const siteListQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().max(100).optional(),

    status: z.nativeEnum(SiteStatus).optional(),

    city: z.nativeEnum(City).optional(),

    siteType: z.nativeEnum(SiteType).optional(),

    clientId: z.string().trim().optional()
});