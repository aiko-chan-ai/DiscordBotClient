/* Copyright xql.dev © 2026. All rights reserved */

import { app, safeStorage } from "electron";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export class SecureStorage {
    private storagePath: string;
    private algorithm = "aes-256-gcm";
    private keyLength = 32;
    private ivLength = 16;
    private authTagLength = 16;

    constructor() {
        this.storagePath = path.join(app.getPath("userData"), "secure_storage.json");
    }

    private getEncryptionKey(): Buffer {
        const machineId = this.getMachineId();
        return crypto.scryptSync(machineId, "DiscordBotClient", this.keyLength);
    }

    private getMachineId(): string {
        try {
            if (process.platform === "win32") {
                const { execSync } = require("child_process");
                return execSync("wmic csproduct get uuid", { encoding: "utf-8" }).split("\n")[1].trim();
            } else if (process.platform === "darwin") {
                const { execSync } = require("child_process");
                return execSync("ioreg -rd1 -c IOPlatformExpertDevice | grep IOPlatformUUID", { encoding: "utf-8" }).split('"')[3];
            } else {
                const { execSync } = require("child_process");
                return execSync("cat /etc/machine-id || cat /var/lib/dbus/machine-id", { encoding: "utf-8" }).trim();
            }
        } catch {
            return `${app.getPath("userData")}-${process.env.USERNAME || process.env.USER || "unknown"}`;
        }
    }

    encrypt(text: string): { encrypted: string; authTag: string; iv: string } | null {
        try {
            if (safeStorage.isEncryptionAvailable()) {
                const encrypted = safeStorage.encryptString(text);
                return {
                    encrypted: encrypted.toString("base64"),
                    authTag: "",
                    iv: "system",
                };
            }

            const iv = crypto.randomBytes(this.ivLength);
            const key = this.getEncryptionKey();
            const cipher = crypto.createCipheriv(this.algorithm, key, iv) as crypto.CipherGCM;
            
            let encrypted = cipher.update(text, "utf8", "hex");
            encrypted += cipher.final("hex");
            
            const authTag = cipher.getAuthTag();
            
            return {
                encrypted,
                authTag: authTag.toString("hex"),
                iv: iv.toString("hex"),
            };
        } catch (error) {
            console.error("Encryption failed:", error);
            return null;
        }
    }

    decrypt(data: { encrypted: string; authTag: string; iv: string }): string | null {
        try {
            if (data.iv === "system" && safeStorage.isEncryptionAvailable()) {
                const buffer = Buffer.from(data.encrypted, "base64");
                return safeStorage.decryptString(buffer);
            }

            const key = this.getEncryptionKey();
            const iv = Buffer.from(data.iv, "hex");
            const authTag = Buffer.from(data.authTag, "hex");
            
            const decipher = crypto.createDecipheriv(this.algorithm, key, iv) as crypto.DecipherGCM;
            decipher.setAuthTag(authTag);
            
            let decrypted = decipher.update(data.encrypted, "hex", "utf8");
            decrypted += decipher.final("utf8");
            
            return decrypted;
        } catch (error) {
            console.error("Decryption failed:", error);
            return null;
        }
    }

    saveSecureData(key: string, value: string): boolean {
        try {
            const encrypted = this.encrypt(value);
            if (!encrypted) return false;

            let data: Record<string, { encrypted: string; authTag: string; iv: string }> = {};
            
            if (fs.existsSync(this.storagePath)) {
                data = JSON.parse(fs.readFileSync(this.storagePath, "utf-8"));
            }

            data[key] = encrypted;
            fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), "utf-8");
            
            return true;
        } catch (error) {
            console.error("Failed to save secure data:", error);
            return false;
        }
    }

    loadSecureData(key: string): string | null {
        try {
            if (!fs.existsSync(this.storagePath)) return null;

            const data = JSON.parse(fs.readFileSync(this.storagePath, "utf-8"));
            const encrypted = data[key];
            
            if (!encrypted) return null;

            return this.decrypt(encrypted);
        } catch (error) {
            console.error("Failed to load secure data:", error);
            return null;
        }
    }

    deleteSecureData(key: string): boolean {
        try {
            if (!fs.existsSync(this.storagePath)) return false;

            const data = JSON.parse(fs.readFileSync(this.storagePath, "utf-8"));
            delete data[key];
            fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), "utf-8");
            
            return true;
        } catch (error) {
            console.error("Failed to delete secure data:", error);
            return false;
        }
    }

    rotateEncryption(): boolean {
        try {
            if (!fs.existsSync(this.storagePath)) return true;

            const data = JSON.parse(fs.readFileSync(this.storagePath, "utf-8"));
            
            for (const [key, encrypted] of Object.entries(data)) {
                const decrypted = this.decrypt(encrypted as { encrypted: string; authTag: string; iv: string });
                if (decrypted) {
                    const newEncrypted = this.encrypt(decrypted);
                    if (newEncrypted) {
                        data[key] = newEncrypted;
                    }
                }
            }

            fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), "utf-8");
            return true;
        } catch (error) {
            console.error("Failed to rotate encryption:", error);
            return false;
        }
    }

    hashToken(token: string): string {
        return crypto.createHash("sha256").update(token).digest("hex");
    }

    generateSecureId(): string {
        return crypto.randomBytes(16).toString("hex");
    }
}

export default new SecureStorage();
