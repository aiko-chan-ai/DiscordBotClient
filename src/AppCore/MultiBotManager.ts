/* Copyright xql.dev © 2026. All rights reserved */

import { app } from "electron";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface BotAccount {
    id: string;
    name: string;
    token: string;
    avatar?: string;
    isActive: boolean;
    lastUsed?: number;
    intents?: number;
}

export class MultiBotManager {
    private botsPath: string;
    private bots: Map<string, BotAccount> = new Map();
    private activeBotId: string | null = null;

    constructor() {
        this.botsPath = path.join(app.getPath("userData"), "bots.json");
        this.loadBots();
    }

    private loadBots(): void {
        try {
            if (fs.existsSync(this.botsPath)) {
                const data = JSON.parse(fs.readFileSync(this.botsPath, "utf-8"));
                if (Array.isArray(data)) {
                    data.forEach((bot: BotAccount) => {
                        this.bots.set(bot.id, bot);
                        if (bot.isActive) {
                            this.activeBotId = bot.id;
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Failed to load bots:", error);
        }
    }

    private saveBots(): void {
        try {
            const botsArray = Array.from(this.bots.values());
            fs.writeFileSync(this.botsPath, JSON.stringify(botsArray, null, 2), "utf-8");
        } catch (error) {
            console.error("Failed to save bots:", error);
        }
    }

    addBot(name: string, token: string, avatar?: string): BotAccount {
        const id = randomUUID();
        const bot: BotAccount = {
            id,
            name,
            token,
            avatar,
            isActive: this.bots.size === 0,
            lastUsed: Date.now(),
        };
        
        this.bots.set(id, bot);
        if (this.bots.size === 1) {
            this.activeBotId = id;
        }
        this.saveBots();
        return bot;
    }

    updateBot(id: string, updates: Partial<BotAccount>): BotAccount | null {
        const bot = this.bots.get(id);
        if (!bot) return null;

        const updatedBot = { ...bot, ...updates };
        this.bots.set(id, updatedBot);
        this.saveBots();
        return updatedBot;
    }

    removeBot(id: string): boolean {
        const bot = this.bots.get(id);
        if (!bot) return false;

        this.bots.delete(id);
        
        if (this.activeBotId === id) {
            const firstBot = this.getAllBots()[0];
            this.activeBotId = firstBot ? firstBot.id : null;
            if (firstBot) {
                firstBot.isActive = true;
                this.bots.set(firstBot.id, firstBot);
            }
        }
        
        this.saveBots();
        return true;
    }

    switchBot(id: string): BotAccount | null {
        const bot = this.bots.get(id);
        if (!bot) return null;

        if (this.activeBotId) {
            const currentBot = this.bots.get(this.activeBotId);
            if (currentBot) {
                currentBot.isActive = false;
                this.bots.set(this.activeBotId, currentBot);
            }
        }

        bot.isActive = true;
        bot.lastUsed = Date.now();
        this.activeBotId = id;
        this.bots.set(id, bot);
        this.saveBots();
        
        return bot;
    }

    getActiveBot(): BotAccount | null {
        return this.activeBotId ? this.bots.get(this.activeBotId) || null : null;
    }

    getAllBots(): BotAccount[] {
        return Array.from(this.bots.values()).sort((a, b) => (b.lastUsed || 0) - (a.lastUsed || 0));
    }

    getBotById(id: string): BotAccount | null {
        return this.bots.get(id) || null;
    }

    setBotIntents(id: string, intents: number): boolean {
        const bot = this.bots.get(id);
        if (!bot) return false;
        
        bot.intents = intents;
        this.bots.set(id, bot);
        this.saveBots();
        return true;
    }

    exportBots(): string {
        return JSON.stringify(Array.from(this.bots.values()), null, 2);
    }

    importBots(jsonString: string): { success: number; failed: number } {
        let success = 0;
        let failed = 0;
        
        try {
            const data = JSON.parse(jsonString);
            if (Array.isArray(data)) {
                data.forEach((bot: Partial<BotAccount>) => {
                    if (bot.name && bot.token) {
                        this.addBot(bot.name, bot.token, bot.avatar);
                        success++;
                    } else {
                        failed++;
                    }
                });
            }
        } catch (error) {
            console.error("Failed to import bots:", error);
            failed++;
        }
        
        return { success, failed };
    }
}

export default new MultiBotManager();
