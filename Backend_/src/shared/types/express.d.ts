import type { Logger } from "pino";
import { JwtPayload } from "./jwt.types";

declare global {
    namespace Express {
        interface Request {
            id: string;
            log: Logger;
            user?: JwtPayload
        }
    }
}

export {};