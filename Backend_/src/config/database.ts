import mongoose from "mongoose";

import { env } from "./env.js";
import logger from "./logger.js";
import { DATABASE_CONFIG } from "../shared/constants/database.constant.js";

const databaseConnection = mongoose.connection;

databaseConnection.on("connected", () => {
    logger.info("MongoDB connection established");
});

databaseConnection.on("error", (error) => {
    logger.error(
        {
            error,
        },
        "MongoDB connection error",
    );
});

databaseConnection.on("disconnected", () => {
    logger.warn("MongoDB connection disconnected");
});

export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGODB_URI, {
            maxPoolSize: DATABASE_CONFIG.MAX_POOL_SIZE,
            serverSelectionTimeoutMS:
                DATABASE_CONFIG.SERVER_SELECTION_TIMEOUT_MS,
        });
    } catch (error) {
        logger.error(
            {
                error,
            },
            "MongoDB initial connection failed",
        );

        throw error;
    }
};

export const disconnectDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        logger.error(
            {
                error,
            },
            "MongoDB disconnection failed",
        );

        throw error;
    }
};

export const isDatabaseConnected = (): boolean => {
    return databaseConnection.readyState === 1;
};