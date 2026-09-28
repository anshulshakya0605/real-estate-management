import z from "zod";
import { AccountStatus, City, Trade } from "../../shared/enums";

export const employeeListQuerySchema = z.object({
    trade: z.enum(Object.values(Trade) as [Trade, ...Trade[]]).optional(),
    city: z.enum(Object.values(City) as [City, ...City[]] ).optional(),
    availability: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
    accountStatus: z.enum(Object.values(AccountStatus) as [AccountStatus, ...AccountStatus[]]).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional()
})

export const updateEmployeeSchema = z.object({
    trade: z.enum(
        Object.values(Trade) as [Trade, ...Trade[]]
    ).optional(),

    isAvailable: z.boolean().optional(),
}).strict()


export const rejectEmployeeSchema = z.object({
    rejectionReason: z.string().trim().min(1).max(500),
}).strict()



