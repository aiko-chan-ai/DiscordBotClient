/* Copyright Elysia © 2025. All rights reserved */

import { AddressInfo } from "node:net";

import { scope } from "electron-log";
import express from "express";
import morgan from "morgan";

import Constants from "./Constants";

const logger = scope("EditorServer");

const app = express();

if (Constants.VerboseAPIServerLogging) {
    app.use(
        morgan("dev", {
            stream: {
                write: msg => logger.info(msg.replace(/\n/g, "")),
            },
        }),
    );
}

app.use(express.static(Constants.EditorHTMLFolderPath));

export default async function startEditor (): Promise<number> {
    return new Promise((resolve, reject) => {
        const server = app.listen(0, "127.0.0.1", () => {
            const { port } = server.address() as AddressInfo;
            resolve(port);
            logger.log(`API Server listening on http://localhost:${port}`);
        });
        server.on("error", reject);
    });
}
