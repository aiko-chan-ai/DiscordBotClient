/* Copyright Elysia © 2025. All rights reserved */

import { app } from "electron";
import { errorHandler, eventLogger, hooks, scope, transports } from "electron-log";
import { inspect } from "util";

import Constants from "./AppCore/Constants";
import { DiscordBotClient } from "./AppCore/index";
import { IPCEvent } from "./AppCore/IPCEvents";

BigInt.prototype.toJSON = function () {
    return this.toString();
};

// Setup logger
const log = scope(Constants.AppName);
Object.assign(console, scope("ConsoleProxy"));
errorHandler.startCatching({
    onError ({ createIssue, error, processType, versions }) {
        log.error(error, processType, versions);
        return false;
    },
});
eventLogger.startLogging();

// https://github.com/chalk/ansi-regex/blob/main/index.js
/*
export default function ansiRegex({onlyFirst = false} = {}) {
	// Valid string terminator sequences are BEL, ESC\, and 0x9c
	const ST = '(?:\\u0007|\\u001B\\u005C|\\u009C)';
	const pattern = [
		`[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${ST})`,
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
}
*/

const botClient = new DiscordBotClient();

const RegexANSIEscape =
    // eslint-disable-next-line
    /[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?(?:\u0007|\u001B\u005C|\u009C))|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))/g;

hooks.push((message, transport) => {
    if (transport !== transports.file) {
        return message;
    }
    message.data = message.data.map(l => {
        if (typeof l === "string") {
            return l.replace(RegexANSIEscape, "");
        }
        return inspect(l);
    });
    if (app.isReady() && botClient.discordWebContents && !botClient.discordWebContents.isDestroyed()) {
        botClient.discordWebContents.send(
            IPCEvent.LogFromMainProcess,
            message.scope,
            ["error", "warn", "log"].includes(message.level) ? message.level : "debug",
            ...message.data,
        );
    }
    return message;
});

globalThis.botClient = botClient;
