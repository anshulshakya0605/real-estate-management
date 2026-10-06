import { Document, model, Schema, Types } from "mongoose";
import { City, SiteStatus, SiteType } from "../shared/enums";

export interface ISite extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    siteType: SiteType;
    status: SiteStatus;
    city: City;
    address: string;
    location?: string;
    plotAreaSqFt?: number;
    budget?: number;
    startDate?: Date;
}

const siteSchema = new Schema<ISite> ({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    siteType: {
        type: String,
        enum: Object.values(SiteType),
        required: true
    },

    status: {
        type: String,
        enum: Object.values(SiteStatus),
        index: true,
        default: SiteStatus.PLANNING
    },

    city: {
        type: String,
        enum: Object.values(City),
        required: true,
        index: true,
    },

    address: {
        type: String,
        required: true
    },

    location: {
        type: String,
    },

    plotAreaSqFt: {
        type: Number,
    },

    budget: {
        type: Number
    },

    startDate: {
        type: Date
    }
},
{
    timestamps: true,
    collection: 'sites'
}
);

export const Site = model<ISite>("Site", siteSchema);
