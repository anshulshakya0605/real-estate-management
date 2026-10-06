import { Document, model, Schema, Types } from "mongoose";
import { City, InquiryStatus, SiteType } from "../shared/enums";


export interface IInquiry extends Document {
    _id: Types.ObjectId;
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

const inquirySchema = new Schema<IInquiry>(
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
            min: 0
        },

        budgetRange: {
            type: String,
            trim: true
        },

        message: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: Object.values(InquiryStatus),
            default: InquiryStatus.NEW,
            required: true,
            index: true
        },

        assignedToId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
        collection: 'inquiries'
    }
);

export const Inquiry = model<IInquiry>("Inquiry", inquirySchema);