import z from "zod";
import { City, InquiryStatus, SiteType } from "../../shared/enums";


const cityValues = Object.values(City) as [City, ...City[]];

const siteTypeValues = Object.values(SiteType) as [SiteType, ...SiteType[]];

const inquiryStatusValues = Object.values(InquiryStatus) as [InquiryStatus, ...InquiryStatus[]];

export const createInquirySchema = z.object({
    fullName: z.string().trim().min(1).max(100),

    email: z.string().trim().email().max(255),

    phone: z.string().trim().min(10).max(15),

    city: z.enum(cityValues),

    siteType: z.enum(siteTypeValues).optional(),

    plotAreaSqFt: z.number().positive().optional(),

    budgetRange: z.string().trim().max(100).optional(),

    message: z.string().trim().max(1000).optional(),
}).strict()

export const inquiryListQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().optional(),

    status: z.enum(inquiryStatusValues).optional(),

    city: z.enum(cityValues).optional()
}).strict()


export const updateInquiryStatusInputSchema = z.object({
    status: z.enum(inquiryStatusValues)
}).strict()

export const assignInquiryInputSchema = z.object({
    assignedToId: z.string().trim().min(1)
})