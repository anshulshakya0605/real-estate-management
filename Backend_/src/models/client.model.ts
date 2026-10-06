import { HydratedDocument, model, Schema, Types } from "mongoose";


export interface IClient {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    companyName?: string;
    gstNumber?: string;
    convertedFromInquiryId?: Types.ObjectId;
}

const clientSchema = new Schema<IClient>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        companyName: {
            type: String,
            trim: true,
        },

        gstNumber: {
            type: String,
            trim: true,
        },

        convertedFromInquiryId: {
            type: Schema.Types.ObjectId,
            ref: "inquiries",
        },
    },
    {
        timestamps: true,
        collection: "clients",
    },
);

export type ClientDocument = HydratedDocument<IClient>;

export const Client = model<IClient>("Client", clientSchema)