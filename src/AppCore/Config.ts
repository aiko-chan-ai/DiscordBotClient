/* Copyright Elysia © 2025. All rights reserved */

import { randomUUID } from "crypto";
import { app } from "electron";
import fs from "fs";
import { parse } from "ini";
import path from "path";

import { defaultSettings, Settings, settingsDefinitions, SettingsSnapshot, validateSettings } from "../shared/Settings";

export type Config = Settings;

export class GlobalConfig {
    config: Settings = Object.freeze({ ...defaultSettings });
    readonly jsonPath: string;
    readonly iniPath: string;
    private warning?: string;
    private readOnly = false;

    constructor (directory = app.getPath("userData")) {
        this.jsonPath = path.join(directory, "config.json");
        this.iniPath = path.join(directory, "config.ini");
        try {
            // Read directly: only ENOENT permits migration, never permissions or other IO errors.
            let json: string | undefined;
            try {
                json = fs.readFileSync(this.jsonPath, "utf8");
            } catch (error) {
                if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
            }
            if (json !== undefined) {
                const document: unknown = JSON.parse(json);
                if (!document || typeof document !== "object" || Array.isArray(document)) {
                    throw new Error("Invalid configuration document.");
                }
                const envelope = document as Record<string, unknown>;
                if (envelope.version !== 1) throw new Error("Unsupported configuration version.");
                if (Object.keys(envelope).some(key => key !== "version" && key !== "settings")) {
                    throw new Error("Unsupported configuration document keys.");
                }
                this.config = Object.freeze(this.withDefaults(envelope.settings));
                return;
            }
            let settings = { ...defaultSettings };
            try {
                settings = this.importIni(fs.readFileSync(this.iniPath, "utf8"));
            } catch (error) {
                if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
            }
            this.save(settings);
        } catch (error) {
            this.readOnly = true;
            this.warning = `Settings could not be loaded or migrated. The original file has been preserved; defaults are active. ${error instanceof Error ? error.message : "Unknown error."}`;
        }
    }

    snapshot (): SettingsSnapshot {
        return {
            settings: { ...this.config },
            readOnly: this.readOnly,
            ...(this.warning ? { warning: this.warning } : {}),
        };
    }

    save (value: unknown): SettingsSnapshot {
        if (this.readOnly) throw new Error(this.warning || "Settings are read-only.");
        const candidate = validateSettings(value);
        const temporaryPath = `${this.jsonPath}.${randomUUID()}.tmp`;
        try {
            fs.mkdirSync(path.dirname(this.jsonPath), { recursive: true });
            fs.writeFileSync(temporaryPath, `${JSON.stringify({ version: 1, settings: candidate }, null, 4)}\n`, {
                encoding: "utf8",
                flag: "wx",
                mode: 0o600,
            });
            fs.renameSync(temporaryPath, this.jsonPath);
        } catch (error) {
            try {
                fs.unlinkSync(temporaryPath);
            } catch {
                // No temporary file may have been created.
            }
            throw error;
        }
        // Publish only after the complete candidate has replaced the durable file.
        this.config = Object.freeze(candidate);
        return this.snapshot();
    }

    private withDefaults (value: unknown): Settings {
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            throw new Error("Invalid stored settings.");
        }
        return validateSettings({ ...defaultSettings, ...value });
    }

    private importIni (source: string): Settings {
        // ini.parse tolerates malformed lines and drops dangerous keys; check syntax first.
        const seen = new Set<string>();
        for (const raw of source.split(/\r?\n/)) {
            const line = raw.trim();
            if (!line || /^[;#]/.test(line)) continue;
            const match = /^([^=]+)=/.exec(line);
            const key = match?.[1].trim();
            if (!key || !Object.hasOwn(defaultSettings, key) || seen.has(key)) {
                throw new Error("Invalid or unsupported legacy INI setting.");
            }
            seen.add(key);
        }
        const values = parse(source);
        for (const key of Object.keys(values)) {
            const value: unknown = values[key];
            if (typeof value !== "string") continue;
            const definition = settingsDefinitions.find(setting => setting.key === key);
            if (definition?.type === "boolean" && /^(true|false)$/i.test(value)) {
                values[key] = value.toLowerCase() === "true";
            } else if (definition?.type === "number" && value.trim() !== "" && Number.isFinite(Number(value))) {
                values[key] = Number(value);
            }
        }
        return this.withDefaults(values);
    }
}

export default new GlobalConfig();
