import { HydratedDocument, model, Schema, Types } from "mongoose";
import { City, InquiryStatus, SiteType } from "../shared/enums";


export interface IInquires {
    fullName: string;
    email: string;
    phone: string;
    city: City;
    siteType?: SiteType;
    plotAreaSqFt?: Number;
    budgetRange?: string;
    message?: string;
    status: InquiryStatus;
    assignedToId?: Types.ObjectId;
    notes?: string;
    created: Date;
    updatedAt: Date;
}

const inquirySchema = new Schema<IInquires>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },

        phone: {
            type: String,
            trim: true,
            required: true,
            index: true
        },
         
        city: {
            type: String,
            enum: Object.values(City),
            required: true,
            index: true
        },

        siteType: {
            type: String,
            enum: Object.values(SiteType)
        },

        plotAreaSqFt: {
            type: Number,
        },

        budgetRange: {
            type: String
        },

        message: {
            type: String,
        },

        status: {
            type: String,
            enum: Object.values(InquiryStatus),
            default: InquiryStatus.NEW,
            required: true,
            index: true
        },

        assignedToId: {
            type: Types.ObjectId,
        },

        notes: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: 'inquiries'
    }
);

export type InquiryDocument = HydratedDocument<IInquires>;

export const Inquiry = model<IInquires>("Inquiry", inquirySchema);