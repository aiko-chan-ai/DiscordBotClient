/* Copyright Elysia © 2025. All rights reserved */

import { FrecencyUserSettings, PreloadedUserSettings } from "discord-protos";
import { IpcMainEvent } from "electron";
import { Request, Response, Router } from "express";
import { IPCEvent } from "src/AppCore/IPCEvents";
import Util from "src/AppUtils/Utils";

const app = Router({ mergeParams: true });

/**
 * Wait for an IPC event matching a specific uid (correlation ID).
 * This avoids race conditions when multiple requests arrive simultaneously
 * by filtering on the uid so each request only gets its own response.
 */
function waitForSettingsEvent (
    emitter: NodeJS.EventEmitter,
    eventName: string,
    uid: string,
    timeoutMs = 15000,
): Promise<[IpcMainEvent, string, string]> {
    return new Promise((resolve, reject) => {
        const onEvent = (event: IpcMainEvent, botId: string, settings: string) => {
            if (botId !== uid) return; // Not our response, ignore
            clearTimeout(timer);
            emitter.removeListener(eventName, onEvent);
            resolve([event, botId, settings]);
        };

        const timer = setTimeout(() => {
            emitter.removeListener(eventName, onEvent);
            reject(new Error(`Timeout waiting for "${eventName}" (uid=${uid}) after ${timeoutMs}ms`));
        }, timeoutMs);

        emitter.on(eventName, onEvent);
    });
}

app.all("/1", async (req, res) => {
    const uid = Util.getIDFromToken(req.headers.authorization);
    if (!uid) {
        return res.send({
            settings: "",
        });
    }
    try {
        const promise = waitForSettingsEvent(
            globalThis.botClient.ipcMain,
            IPCEvent.GetPreloadedUserSettingsResponse,
            uid,
        );
        // Request user settings from database
        globalThis.botClient.discordWebContents.send(IPCEvent.GetPreloadedUserSettings, uid);
        // [event, botId, settings]
        const userSettingEvent = await promise;
        const userSettings = await PreloadedUserSettings.fromBase64(userSettingEvent[2]);
        if (req.method.toUpperCase() === "GET") {
            return res.send({
                settings: userSettingEvent[2],
            });
        }
        const callback = async (
            reqC: Request<
                unknown,
                unknown,
                {
                    required_data_version: number;
                    settings: string;
                }
            >,
            resC: Response,
        ) => {
            /**
             * @type {PreloadedUserSettings}
             */
            const decoded = PreloadedUserSettings.fromBase64(reqC.body?.settings || "");
            for (const key of Object.keys(decoded)) {
                // eslint-disable-next-line
                (userSettings as any)[key] = (decoded as any)[key];
            }
            const base64 = PreloadedUserSettings.toBase64(userSettings);
            await globalThis.botClient.discordWebContents.send(IPCEvent.SetPreloadedUserSettings, uid, base64);
            return resC.send({
                settings: base64,
            });
        };
        return Util.getDataFromRequest(req, res, callback);
    } catch (err) {
        console.error("Error in settings-proto /1:", err);
        if (!res.headersSent) {
            return res.status(500).send({ settings: "" });
        }
    }
});

app.all("/2", async (req, res) => {
    const uid = Util.getIDFromToken(req.headers.authorization);
    if (!uid) {
        return res.send({
            settings: "",
        });
    }
    try {
        const promise = waitForSettingsEvent(
            globalThis.botClient.ipcMain,
            IPCEvent.GetFrecencyUserSettingsResponse,
            uid,
        );
        // Request user settings from database
        globalThis.botClient.discordWebContents.send(IPCEvent.GetFrecencyUserSettings, uid);
        // [event, botId, settings]
        const userSettingEvent = await promise;
        const userSettings = await FrecencyUserSettings.fromBase64(userSettingEvent[2]);
        if (req.method.toUpperCase() === "GET") {
            return res.send({
                settings: userSettingEvent[2],
            });
        }
        const callback = async (
            reqC: Request<
                unknown,
                unknown,
                {
                    settings: string;
                }
            >,
            resC: Response,
        ) => {
            /**
             * @type {FrecencyUserSettings}
             */
            const decoded = FrecencyUserSettings.fromBase64(reqC.body?.settings || "");
            for (const key of Object.keys(decoded)) {
                // eslint-disable-next-line
                (userSettings as any)[key] = (decoded as any)[key];
            }
            const base64 = FrecencyUserSettings.toBase64(userSettings);
            await globalThis.botClient.discordWebContents.send(IPCEvent.SetFrecencyUserSettings, uid, base64);
            return resC.send({
                settings: base64,
            });
        };
        return Util.getDataFromRequest(req, res, callback);
    } catch (err) {
        console.error("Error in settings-proto /2:", err);
        if (!res.headersSent) {
            return res.status(500).send({ settings: "" });
        }
    }
});

export default app;
