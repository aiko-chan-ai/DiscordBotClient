import "express";

import type { IncomingHttpHeaders } from "http";

import type { DiscordBotClient } from "./AppCore";

declare global {
    namespace Express {
        interface Request {
            originalHeaders: IncomingHttpHeaders;
            rawBody?: string;
        }
    }
    interface BigInt {
        toJSON(): string;
    }
    interface Window {
        Dexie: unknown;
    }
    var botClient: DiscordBotClient;
}
