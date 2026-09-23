import type { RequestHandler } from "express";
import { randomUUID } from "node:crypto";

import logger from "../config/logger.js";

export const requestIdMiddleware: RequestHandler = (
    req,
    _res,
    next,
) => {
    const requestId = randomUUID();

    req.id = requestId;
    req.log = logger.child({
        requestId,
    });

    next();
};