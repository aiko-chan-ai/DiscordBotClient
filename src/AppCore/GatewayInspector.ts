/* Copyright Elysia © 2025. All rights reserved */

import { ipcMain } from "electron";
import EventEmitter from "events";

export interface GatewayEvent {
    id: string;
    direction: "send" | "receive";
    opcode: number;
    type: string;
    data: unknown;
    timestamp: number;
    size: number;
}

export interface GatewayStats {
    totalEvents: number;
    eventsSent: number;
    eventsReceived: number;
    heartbeats: number;
    reconnects: number;
    latency: number;
    sessionId?: string;
    resumeUrl?: string;
    connectedAt?: number;
}

export interface GatewayPayload {
    op: number;
    d?: unknown;
    s?: number;
    t?: string;
}

export class GatewayInspector extends EventEmitter {
    private events: GatewayEvent[] = [];
    private maxEvents: number = 1000;
    private stats: GatewayStats = {
        totalEvents: 0,
        eventsSent: 0,
        eventsReceived: 0,
        heartbeats: 0,
        reconnects: 0,
        latency: 0,
    };
    private isRecording: boolean = false;
    private filters: Set<string> = new Set();

    constructor() {
        super();
        this.setupIPC();
    }

    private setupIPC(): void {
        ipcMain.handle("gateway:get-events", (_, options: { limit?: number; type?: string } = {}) => {
            return this.getEvents(options);
        });

        ipcMain.handle("gateway:get-stats", () => {
            return this.getStats();
        });

        ipcMain.handle("gateway:clear", () => {
            this.clear();
            return true;
        });

        ipcMain.handle("gateway:start-recording", () => {
            this.startRecording();
            return true;
        });

        ipcMain.handle("gateway:stop-recording", () => {
            this.stopRecording();
            return true;
        });

        ipcMain.handle("gateway:set-filter", (_, types: string[]) => {
            this.setFilter(types);
            return true;
        });

        ipcMain.handle("gateway:export", () => {
            return this.exportEvents();
        });
    }

    recordEvent(direction: "send" | "receive", payload: GatewayPayload, size: number): void {
        if (!this.isRecording) return;

        const eventType = payload.t || this.getOpcodeName(payload.op);
        
        if (this.filters.size > 0 && !this.filters.has(eventType)) {
            return;
        }

        const event: GatewayEvent = {
            id: this.generateId(),
            direction,
            opcode: payload.op,
            type: eventType,
            data: payload.d,
            timestamp: Date.now(),
            size,
        };

        this.events.unshift(event);
        
        if (this.events.length > this.maxEvents) {
            this.events = this.events.slice(0, this.maxEvents);
        }

        this.updateStats(direction, payload);
        this.emit("event", event);
    }

    private updateStats(direction: "send" | "receive", payload: GatewayPayload): void {
        this.stats.totalEvents++;
        
        if (direction === "send") {
            this.stats.eventsSent++;
        } else {
            this.stats.eventsReceived++;
        }

        if (payload.op === 1 || payload.op === 11) {
            this.stats.heartbeats++;
        }

        if (payload.t === "READY") {
            const readyData = payload.d as { session_id: string; resume_gateway_url: string };
            this.stats.sessionId = readyData?.session_id;
            this.stats.resumeUrl = readyData?.resume_gateway_url;
            this.stats.connectedAt = Date.now();
        }

        if (payload.t === "RESUMED") {
            this.stats.reconnects++;
        }

        this.emit("stats-updated", this.stats);
    }

    updateLatency(latency: number): void {
        this.stats.latency = latency;
        this.emit("stats-updated", this.stats);
    }

    startRecording(): void {
        this.isRecording = true;
        this.emit("recording-started");
    }

    stopRecording(): void {
        this.isRecording = false;
        this.emit("recording-stopped");
    }

    setFilter(eventTypes: string[]): void {
        this.filters = new Set(eventTypes);
    }

    clearFilter(): void {
        this.filters.clear();
    }

    getEvents(options: { limit?: number; type?: string; direction?: "send" | "receive" } = {}): GatewayEvent[] {
        let filtered = this.events;

        if (options.type) {
            filtered = filtered.filter(e => e.type === options.type);
        }

        if (options.direction) {
            filtered = filtered.filter(e => e.direction === options.direction);
        }

        if (options.limit) {
            filtered = filtered.slice(0, options.limit);
        }

        return filtered;
    }

    getStats(): GatewayStats {
        return { ...this.stats };
    }

    clear(): void {
        this.events = [];
        this.stats = {
            totalEvents: 0,
            eventsSent: 0,
            eventsReceived: 0,
            heartbeats: 0,
            reconnects: 0,
            latency: 0,
        };
        this.emit("cleared");
    }

    exportEvents(): string {
        return JSON.stringify({
            exportedAt: Date.now(),
            stats: this.stats,
            events: this.events,
        }, null, 2);
    }

    getEventTypes(): Array<{ type: string; count: number; lastSeen?: number }> {
        const typeMap = new Map<string, { count: number; lastSeen: number }>();

        this.events.forEach(event => {
            const existing = typeMap.get(event.type);
            if (existing) {
                existing.count++;
                existing.lastSeen = Math.max(existing.lastSeen, event.timestamp);
            } else {
                typeMap.set(event.type, { count: 1, lastSeen: event.timestamp });
            }
        });

        return Array.from(typeMap.entries())
            .map(([type, data]) => ({ type, ...data }))
            .sort((a, b) => b.count - a.count);
    }

    getOpcodeName(opcode: number): string {
        const opcodes: Record<number, string> = {
            0: "DISPATCH",
            1: "HEARTBEAT",
            2: "IDENTIFY",
            3: "PRESENCE_UPDATE",
            4: "VOICE_STATE_UPDATE",
            5: "VOICE_SERVER_PING",
            6: "RESUME",
            7: "RECONNECT",
            8: "REQUEST_GUILD_MEMBERS",
            9: "INVALID_SESSION",
            10: "HELLO",
            11: "HEARTBEAT_ACK",
        };
        return opcodes[opcode] || `UNKNOWN(${opcode})`;
    }

    parsePayload(data: string | ArrayBuffer): GatewayPayload | null {
        try {
            if (typeof data === "string") {
                return JSON.parse(data);
            }
            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(data));
        } catch {
            return null;
        }
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    getCommonEvents(): Array<{ type: string; description: string }> {
        return [
            { type: "READY", description: "Initial state information" },
            { type: "RESUMED", description: "Resume successful" },
            { type: "GUILD_CREATE", description: "Guild became available" },
            { type: "GUILD_UPDATE", description: "Guild was updated" },
            { type: "GUILD_DELETE", description: "Guild became unavailable" },
            { type: "CHANNEL_CREATE", description: "Channel was created" },
            { type: "CHANNEL_UPDATE", description: "Channel was updated" },
            { type: "CHANNEL_DELETE", description: "Channel was deleted" },
            { type: "MESSAGE_CREATE", description: "New message received" },
            { type: "MESSAGE_UPDATE", description: "Message was edited" },
            { type: "MESSAGE_DELETE", description: "Message was deleted" },
            { type: "MESSAGE_REACTION_ADD", description: "Reaction was added" },
            { type: "MESSAGE_REACTION_REMOVE", description: "Reaction was removed" },
            { type: "TYPING_START", description: "User started typing" },
            { type: "PRESENCE_UPDATE", description: "User presence changed" },
            { type: "VOICE_STATE_UPDATE", description: "Voice state changed" },
            { type: "INTERACTION_CREATE", description: "Interaction received" },
        ];
    }
}

export default new GatewayInspector();
