import { Document, model, Schema, Types } from "mongoose";
import { City, SiteStatus, SiteType } from "../shared/enums";


export interface ILocation {
    type: "Point";
    coordinates: [number, number];
}

export interface ISite extends Document {
    _id: Types.ObjectId;

    name: string;
    description?: string;

    siteType: SiteType;
    status: SiteStatus;

    city: City;
    address: string;

    location?: ILocation;

    plotAreaSqFt?: number;
    budget?: number;

    startDate?: Date;
    expectedEndDate?: Date;
    actualEndDate?: Date;

    createdById: Types.ObjectId;
    clientId: Types.ObjectId;
}

const locationSchema = new Schema<ILocation>({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
},
    {
        _id: false
    }
);

const siteSchema = new Schema<ISite>({
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
        default: SiteStatus.PLANNING,
        required: true,
        index: true,
    },

    city: {
        type: String,
        enum: Object.values(City),
        required: true,
        index: true,
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: locationSchema,
        index: '2dsphere'
    },

    plotAreaSqFt: {
        type: Number,
        min: 0,
    },

    budget: {
        type: Number,
        min: 0
    },

    startDate: {
        type: Date
    },

    expectedEndDate: {
        type: Date
    },

    actualEndDate: {
        type: Date
    },

    createdById: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true,
        index: true,
    }
},
    {
        timestamps: true,
        collection: 'sites'
    }
);

siteSchema.index({
    city: 1,
    status: 1
})

export const Site = model<ISite>("Site", siteSchema);
