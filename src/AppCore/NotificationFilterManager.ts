/* Copyright xql.dev © 2026. All rights reserved */

import { app, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import EventEmitter from "events";

export interface NotificationFilter {
    id: string;
    name: string;
    enabled: boolean;
    conditions: Array<{
        type: "guild" | "channel" | "user" | "keyword" | "mention" | "role";
        value: string;
        action: "include" | "exclude" | "priority";
    }>;
    actions: {
        showNotification: boolean;
        playSound: boolean;
        flashWindow: boolean;
        badgeCount: boolean;
    };
    priority: "low" | "normal" | "high";
    schedule?: {
        startTime?: string;
        endTime?: string;
        daysOfWeek?: number[];
    };
}

export class NotificationFilterManager extends EventEmitter {
    private filtersPath: string;
    private filters: Map<string, NotificationFilter> = new Map();
    private globalEnabled: boolean = true;
    private doNotDisturb: boolean = false;

    constructor() {
        super();
        this.filtersPath = path.join(app.getPath("userData"), "notification_filters.json");
        this.loadFilters();
        this.setupIPC();
    }

    private setupIPC(): void {
        ipcMain.handle("notification:create-filter", (_, filter: Omit<NotificationFilter, "id">) => {
            return this.createFilter(filter);
        });

        ipcMain.handle("notification:update-filter", (_, id: string, updates: Partial<NotificationFilter>) => {
            return this.updateFilter(id, updates);
        });

        ipcMain.handle("notification:delete-filter", (_, id: string) => {
            return this.deleteFilter(id);
        });

        ipcMain.handle("notification:get-filters", () => {
            return this.getAllFilters();
        });

        ipcMain.handle("notification:set-global-enabled", (_, enabled: boolean) => {
            this.setGlobalEnabled(enabled);
            return true;
        });

        ipcMain.handle("notification:set-dnd", (_, enabled: boolean) => {
            this.setDoNotDisturb(enabled);
            return true;
        });

        ipcMain.handle("notification:should-notify", (_, message: {
            guildId?: string;
            channelId: string;
            authorId: string;
            content: string;
            mentions: string[];
            mentionRoles: string[];
        }) => {
            return this.shouldNotify(message);
        });
    }

    private loadFilters(): void {
        try {
            if (fs.existsSync(this.filtersPath)) {
                const data = JSON.parse(fs.readFileSync(this.filtersPath, "utf-8"));
                this.globalEnabled = data.globalEnabled ?? true;
                this.doNotDisturb = data.doNotDisturb ?? false;
                
                if (Array.isArray(data.filters)) {
                    data.filters.forEach((filter: NotificationFilter) => {
                        this.filters.set(filter.id, filter);
                    });
                }
            }
        } catch (error) {
            console.error("Failed to load notification filters:", error);
        }
    }

    private saveFilters(): void {
        try {
            const data = {
                globalEnabled: this.globalEnabled,
                doNotDisturb: this.doNotDisturb,
                filters: Array.from(this.filters.values()),
            };
            fs.writeFileSync(this.filtersPath, JSON.stringify(data, null, 2), "utf-8");
        } catch (error) {
            console.error("Failed to save notification filters:", error);
        }
    }

    createFilter(filterData: Omit<NotificationFilter, "id">): NotificationFilter {
        const filter: NotificationFilter = {
            ...filterData,
            id: this.generateId(),
        };

        this.filters.set(filter.id, filter);
        this.saveFilters();
        this.emit("filter-created", filter);
        return filter;
    }

    updateFilter(id: string, updates: Partial<NotificationFilter>): NotificationFilter | null {
        const filter = this.filters.get(id);
        if (!filter) return null;

        const updatedFilter = { ...filter, ...updates };
        this.filters.set(id, updatedFilter);
        this.saveFilters();
        this.emit("filter-updated", updatedFilter);
        return updatedFilter;
    }

    deleteFilter(id: string): boolean {
        const deleted = this.filters.delete(id);
        if (deleted) {
            this.saveFilters();
            this.emit("filter-deleted", id);
        }
        return deleted;
    }

    getFilter(id: string): NotificationFilter | null {
        return this.filters.get(id) || null;
    }

    getAllFilters(): NotificationFilter[] {
        return Array.from(this.filters.values());
    }

    getEnabledFilters(): NotificationFilter[] {
        return this.getAllFilters().filter(f => f.enabled);
    }

    setGlobalEnabled(enabled: boolean): void {
        this.globalEnabled = enabled;
        this.saveFilters();
        this.emit("global-enabled-changed", enabled);
    }

    setDoNotDisturb(enabled: boolean): void {
        this.doNotDisturb = enabled;
        this.saveFilters();
        this.emit("dnd-changed", enabled);
    }

    isDoNotDisturb(): boolean {
        return this.doNotDisturb;
    }

    isGlobalEnabled(): boolean {
        return this.globalEnabled;
    }

    shouldNotify(message: {
        guildId?: string;
        channelId: string;
        authorId: string;
        content: string;
        mentions: string[];
        mentionRoles: string[];
    }): { shouldNotify: boolean; actions: NotificationFilter["actions"]; priority: string } {
        if (!this.globalEnabled || this.doNotDisturb) {
            return { shouldNotify: false, actions: { showNotification: false, playSound: false, flashWindow: false, badgeCount: false }, priority: "normal" };
        }

        const enabledFilters = this.getEnabledFilters();
        
        for (const filter of enabledFilters) {
            if (this.matchesFilter(filter, message)) {
                return {
                    shouldNotify: filter.actions.showNotification,
                    actions: filter.actions,
                    priority: filter.priority,
                };
            }
        }

        return {
            shouldNotify: true,
            actions: {
                showNotification: true,
                playSound: true,
                flashWindow: true,
                badgeCount: true,
            },
            priority: "normal",
        };
    }

    private matchesFilter(filter: NotificationFilter, message: {
        guildId?: string;
        channelId: string;
        authorId: string;
        content: string;
        mentions: string[];
        mentionRoles: string[];
    }): boolean {
        if (filter.schedule && !this.isInSchedule(filter.schedule)) {
            return false;
        }

        let hasMatch = false;

        for (const condition of filter.conditions) {
            let matches = false;

            switch (condition.type) {
                case "guild":
                    matches = message.guildId === condition.value;
                    break;
                case "channel":
                    matches = message.channelId === condition.value;
                    break;
                case "user":
                    matches = message.authorId === condition.value;
                    break;
                case "keyword":
                    matches = message.content.toLowerCase().includes(condition.value.toLowerCase());
                    break;
                case "mention":
                    matches = message.mentions.includes(condition.value);
                    break;
                case "role":
                    matches = message.mentionRoles.includes(condition.value);
                    break;
            }

            if (condition.action === "exclude" && matches) {
                return false;
            }

            if ((condition.action === "include" || condition.action === "priority") && matches) {
                hasMatch = true;
            }
        }

        return hasMatch || filter.conditions.length === 0;
    }

    private isInSchedule(schedule: NonNullable<NotificationFilter["schedule"]>): boolean {
        const now = new Date();
        const currentDay = now.getDay();
        const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

        if (schedule.daysOfWeek && !schedule.daysOfWeek.includes(currentDay)) {
            return false;
        }

        if (schedule.startTime && currentTime < schedule.startTime) {
            return false;
        }

        if (schedule.endTime && currentTime > schedule.endTime) {
            return false;
        }

        return true;
    }

    createDefaultFilters(): void {
        this.createFilter({
            name: "Mentions Priority",
            enabled: true,
            conditions: [
                { type: "mention", value: "@me", action: "priority" },
            ],
            actions: {
                showNotification: true,
                playSound: true,
                flashWindow: true,
                badgeCount: true,
            },
            priority: "high",
        });

        this.createFilter({
            name: "Direct Messages",
            enabled: true,
            conditions: [
                { type: "guild", value: "", action: "include" },
            ],
            actions: {
                showNotification: true,
                playSound: true,
                flashWindow: true,
                badgeCount: true,
            },
            priority: "normal",
        });

        this.createFilter({
            name: "Work Hours Only",
            enabled: false,
            conditions: [],
            actions: {
                showNotification: true,
                playSound: false,
                flashWindow: false,
                badgeCount: true,
            },
            priority: "normal",
            schedule: {
                startTime: "09:00",
                endTime: "17:00",
                daysOfWeek: [1, 2, 3, 4, 5],
            },
        });
    }

    private generateId(): string {
        return `filter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    exportFilters(): string {
        return JSON.stringify(this.getAllFilters(), null, 2);
    }

    importFilters(jsonString: string): { success: number; failed: number } {
        let success = 0;
        let failed = 0;

        try {
            const data = JSON.parse(jsonString);
            if (Array.isArray(data)) {
                data.forEach((filter: Partial<NotificationFilter>) => {
                    if (filter.name && filter.conditions && filter.actions) {
                        this.createFilter(filter as Omit<NotificationFilter, "id">);
                        success++;
                    } else {
                        failed++;
                    }
                });
            }
        } catch (error) {
            console.error("Failed to import filters:", error);
            failed++;
        }

        return { success, failed };
    }
}

export default new NotificationFilterManager();
