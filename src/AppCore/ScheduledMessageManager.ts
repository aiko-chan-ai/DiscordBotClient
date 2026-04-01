/* Copyright xql.dev © 2025. All rights reserved */

import { app } from "electron";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import EventEmitter from "events";

export interface ScheduledMessage {
    id: string;
    channelId: string;
    guildId?: string;
    content?: string;
    embeds?: unknown[];
    components?: unknown[];
    scheduledTime: number;
    recurrence?: {
        type: "daily" | "weekly" | "monthly" | "custom";
        interval?: number;
        daysOfWeek?: number[];
        endDate?: number;
        maxOccurrences?: number;
    };
    timezone: string;
    status: "pending" | "sent" | "failed" | "cancelled";
    createdAt: number;
    executedAt?: number;
    errorMessage?: string;
    retryCount: number;
    maxRetries: number;
}

export class ScheduledMessageManager extends EventEmitter {
    private schedulePath: string;
    private messages: Map<string, ScheduledMessage> = new Map();
    private timers: Map<string, NodeJS.Timeout> = new Map();
    private checkInterval?: NodeJS.Timeout;

    constructor() {
        super();
        this.schedulePath = path.join(app.getPath("userData"), "scheduled_messages.json");
        this.loadMessages();
        this.startScheduler();
    }

    private loadMessages(): void {
        try {
            if (fs.existsSync(this.schedulePath)) {
                const data = JSON.parse(fs.readFileSync(this.schedulePath, "utf-8"));
                if (Array.isArray(data)) {
                    data.forEach((msg: ScheduledMessage) => {
                        if (msg.status === "pending") {
                            this.messages.set(msg.id, msg);
                            this.scheduleExecution(msg);
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Failed to load scheduled messages:", error);
        }
    }

    private saveMessages(): void {
        try {
            const allMessages = [
                ...Array.from(this.messages.values()),
                ...this.getHistory()
            ];
            fs.writeFileSync(this.schedulePath, JSON.stringify(allMessages, null, 2), "utf-8");
        } catch (error) {
            console.error("Failed to save scheduled messages:", error);
        }
    }

    private startScheduler(): void {
        this.checkInterval = setInterval(() => {
            this.checkPendingMessages();
        }, 60000);
    }

    private checkPendingMessages(): void {
        const now = Date.now();
        this.messages.forEach((msg, id) => {
            if (msg.status === "pending" && msg.scheduledTime <= now) {
                this.executeMessage(id);
            }
        });
    }

    private scheduleExecution(message: ScheduledMessage): void {
        const delay = Math.max(0, message.scheduledTime - Date.now());
        
        const timer = setTimeout(() => {
            this.executeMessage(message.id);
        }, delay);
        
        this.timers.set(message.id, timer);
    }

    private async executeMessage(id: string): Promise<void> {
        const message = this.messages.get(id);
        if (!message || message.status !== "pending") return;

        this.timers.delete(id);
        
        try {
            this.emit("execute", message);
            
            message.status = "sent";
            message.executedAt = Date.now();
            this.messages.delete(id);
            this.saveMessages();
            
            this.emit("executed", message);
            
            if (message.recurrence) {
                this.createRecurrence(message);
            }
        } catch (error) {
            message.retryCount++;
            
            if (message.retryCount >= message.maxRetries) {
                message.status = "failed";
                message.errorMessage = error instanceof Error ? error.message : "Unknown error";
                this.messages.delete(id);
                this.emit("failed", message);
            } else {
                const retryDelay = Math.pow(2, message.retryCount) * 60000;
                message.scheduledTime = Date.now() + retryDelay;
                this.scheduleExecution(message);
            }
            
            this.saveMessages();
        }
    }

    private createRecurrence(originalMessage: ScheduledMessage): void {
        const recurrence = originalMessage.recurrence;
        if (!recurrence) return;

        let nextTime: number;
        const now = Date.now();

        switch (recurrence.type) {
            case "daily":
                nextTime = originalMessage.scheduledTime + (recurrence.interval || 1) * 86400000;
                break;
            case "weekly":
                nextTime = originalMessage.scheduledTime + (recurrence.interval || 1) * 604800000;
                break;
            case "monthly":
                const date = new Date(originalMessage.scheduledTime);
                date.setMonth(date.getMonth() + (recurrence.interval || 1));
                nextTime = date.getTime();
                break;
            case "custom":
                nextTime = originalMessage.scheduledTime + (recurrence.interval || 86400000);
                break;
            default:
                return;
        }

        if (recurrence.endDate && nextTime > recurrence.endDate) return;
        if (recurrence.maxOccurrences !== undefined) {
            const count = this.getRecurrenceCount(originalMessage.id);
            if (count >= recurrence.maxOccurrences) return;
        }

        const newMessage: ScheduledMessage = {
            ...originalMessage,
            id: randomUUID(),
            scheduledTime: nextTime,
            status: "pending",
            createdAt: now,
            executedAt: undefined,
            errorMessage: undefined,
            retryCount: 0,
        };

        this.messages.set(newMessage.id, newMessage);
        this.scheduleExecution(newMessage);
        this.saveMessages();
    }

    private getRecurrenceCount(originalId: string): number {
        return 0;
    }

    schedule(
        channelId: string,
        content: string | undefined,
        scheduledTime: number,
        options: {
            guildId?: string;
            embeds?: unknown[];
            components?: unknown[];
            recurrence?: ScheduledMessage["recurrence"];
            timezone?: string;
        } = {}
    ): ScheduledMessage {
        const message: ScheduledMessage = {
            id: randomUUID(),
            channelId,
            guildId: options.guildId,
            content,
            embeds: options.embeds,
            components: options.components,
            scheduledTime,
            recurrence: options.recurrence,
            timezone: options.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            status: "pending",
            createdAt: Date.now(),
            retryCount: 0,
            maxRetries: 3,
        };

        this.messages.set(message.id, message);
        this.scheduleExecution(message);
        this.saveMessages();
        
        this.emit("scheduled", message);
        return message;
    }

    cancel(id: string): boolean {
        const message = this.messages.get(id);
        if (!message || message.status !== "pending") return false;

        const timer = this.timers.get(id);
        if (timer) {
            clearTimeout(timer);
            this.timers.delete(id);
        }

        message.status = "cancelled";
        this.messages.delete(id);
        this.saveMessages();
        
        this.emit("cancelled", message);
        return true;
    }

    reschedule(id: string, newTime: number): ScheduledMessage | null {
        const message = this.messages.get(id);
        if (!message || message.status !== "pending") return null;

        const timer = this.timers.get(id);
        if (timer) {
            clearTimeout(timer);
        }

        message.scheduledTime = newTime;
        this.scheduleExecution(message);
        this.saveMessages();
        
        this.emit("rescheduled", message);
        return message;
    }

    getPendingMessages(): ScheduledMessage[] {
        return Array.from(this.messages.values())
            .filter(m => m.status === "pending")
            .sort((a, b) => a.scheduledTime - b.scheduledTime);
    }

    getHistory(): ScheduledMessage[] {
        try {
            if (fs.existsSync(this.schedulePath)) {
                const data = JSON.parse(fs.readFileSync(this.schedulePath, "utf-8"));
                if (Array.isArray(data)) {
                    return data.filter((m: ScheduledMessage) => m.status !== "pending");
                }
            }
        } catch (error) {
            console.error("Failed to load history:", error);
        }
        return [];
    }

    getMessage(id: string): ScheduledMessage | null {
        return this.messages.get(id) || null;
    }

    getMessagesForChannel(channelId: string): ScheduledMessage[] {
        return this.getPendingMessages().filter(m => m.channelId === channelId);
    }

    getUpcomingMessages(limit: number = 10): ScheduledMessage[] {
        return this.getPendingMessages().slice(0, limit);
    }

    clearHistory(): void {
        const pending = this.getPendingMessages();
        fs.writeFileSync(this.schedulePath, JSON.stringify(pending, null, 2), "utf-8");
    }

    dispose(): void {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
        this.timers.forEach(timer => clearTimeout(timer));
        this.timers.clear();
    }
}

export default new ScheduledMessageManager();
