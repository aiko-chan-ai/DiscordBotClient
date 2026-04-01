/* Copyright xql.dev © 2026. All rights reserved */

import { ipcMain } from "electron";
import EventEmitter from "events";

export interface APIRequest {
    id: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: string;
    body?: unknown;
    headers?: Record<string, string>;
    timestamp: number;
}

export interface APIResponse {
    id: string;
    requestId: string;
    status: number;
    statusText: string;
    data: unknown;
    headers: Record<string, string>;
    duration: number;
    timestamp: number;
    error?: string;
}

export interface APIEndpoint {
    method: string;
    path: string;
    description: string;
    parameters?: Array<{
        name: string;
        type: string;
        required: boolean;
        description: string;
    }>;
    body?: Record<string, unknown>;
}

export class ConsoleAPIManager extends EventEmitter {
    private requests: Map<string, APIRequest> = new Map();
    private responses: Map<string, APIResponse> = new Map();
    private history: Array<{ request: APIRequest; response?: APIResponse }> = [];
    private maxHistorySize: number = 100;

    constructor() {
        super();
        this.setupIPC();
    }

    private setupIPC(): void {
        ipcMain.handle("api-console:execute", async (_, request: Omit<APIRequest, "id" | "timestamp">) => {
            return this.executeRequest(request);
        });

        ipcMain.handle("api-console:get-history", () => {
            return this.getHistory();
        });

        ipcMain.handle("api-console:clear-history", () => {
            this.clearHistory();
            return true;
        });

        ipcMain.handle("api-console:get-endpoints", () => {
            return this.getAvailableEndpoints();
        });

        ipcMain.handle("api-console:replay", (_, requestId: string) => {
            return this.replayRequest(requestId);
        });
    }

    async executeRequest(
        requestData: Omit<APIRequest, "id" | "timestamp">
    ): Promise<APIResponse> {
        const id = this.generateId();
        const timestamp = Date.now();
        
        const request: APIRequest = {
            ...requestData,
            id,
            timestamp,
        };

        this.requests.set(id, request);
        this.emit("request", request);

        const startTime = performance.now();
        
        try {
            const baseUrl = "https://discord.com/api/v10";
            const url = `${baseUrl}${request.endpoint}`;
            
            const options: RequestInit = {
                method: request.method,
                headers: {
                    "Content-Type": "application/json",
                    ...request.headers,
                },
            };

            if (request.body && ["POST", "PUT", "PATCH"].includes(request.method)) {
                options.body = JSON.stringify(request.body);
            }

            this.emit("executing", request);
            
            const response = await fetch(url, options);
            const duration = Math.round(performance.now() - startTime);
            
            let data: unknown;
            const contentType = response.headers.get("content-type");
            
            if (contentType?.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            const responseData: APIResponse = {
                id: this.generateId(),
                requestId: id,
                status: response.status,
                statusText: response.statusText,
                data,
                headers: Object.fromEntries(response.headers.entries()),
                duration,
                timestamp: Date.now(),
            };

            this.responses.set(responseData.id, responseData);
            this.addToHistory(request, responseData);
            this.emit("response", responseData);
            
            return responseData;

        } catch (error) {
            const duration = Math.round(performance.now() - startTime);
            
            const responseData: APIResponse = {
                id: this.generateId(),
                requestId: id,
                status: 0,
                statusText: "Error",
                data: null,
                headers: {},
                duration,
                timestamp: Date.now(),
                error: error instanceof Error ? error.message : "Unknown error",
            };

            this.responses.set(responseData.id, responseData);
            this.addToHistory(request, responseData);
            this.emit("error", responseData);
            
            return responseData;
        }
    }

    private addToHistory(request: APIRequest, response: APIResponse): void {
        this.history.unshift({ request, response });
        
        if (this.history.length > this.maxHistorySize) {
            this.history = this.history.slice(0, this.maxHistorySize);
        }
    }

    replayRequest(requestId: string): Promise<APIResponse | null> {
        const originalRequest = this.requests.get(requestId);
        if (!originalRequest) return Promise.resolve(null);

        return this.executeRequest({
            method: originalRequest.method,
            endpoint: originalRequest.endpoint,
            body: originalRequest.body,
            headers: originalRequest.headers,
        });
    }

    getHistory(): Array<{ request: APIRequest; response?: APIResponse }> {
        return [...this.history];
    }

    clearHistory(): void {
        this.history = [];
        this.requests.clear();
        this.responses.clear();
        this.emit("history-cleared");
    }

    getRequest(id: string): APIRequest | undefined {
        return this.requests.get(id);
    }

    getResponse(id: string): APIResponse | undefined {
        return this.responses.get(id);
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    getAvailableEndpoints(): APIEndpoint[] {
        return [
            {
                method: "GET",
                path: "/users/@me",
                description: "Get current user information",
            },
            {
                method: "GET",
                path: "/users/@me/guilds",
                description: "Get guilds the bot is in",
            },
            {
                method: "GET",
                path: "/guilds/{guild.id}",
                description: "Get guild information",
                parameters: [
                    { name: "guild.id", type: "snowflake", required: true, description: "Guild ID" },
                ],
            },
            {
                method: "GET",
                path: "/guilds/{guild.id}/channels",
                description: "Get guild channels",
                parameters: [
                    { name: "guild.id", type: "snowflake", required: true, description: "Guild ID" },
                ],
            },
            {
                method: "GET",
                path: "/channels/{channel.id}",
                description: "Get channel information",
                parameters: [
                    { name: "channel.id", type: "snowflake", required: true, description: "Channel ID" },
                ],
            },
            {
                method: "GET",
                path: "/channels/{channel.id}/messages",
                description: "Get channel messages",
                parameters: [
                    { name: "channel.id", type: "snowflake", required: true, description: "Channel ID" },
                    { name: "limit", type: "integer", required: false, description: "Max number of messages (1-100)" },
                    { name: "before", type: "snowflake", required: false, description: "Get messages before this ID" },
                    { name: "after", type: "snowflake", required: false, description: "Get messages after this ID" },
                ],
            },
            {
                method: "POST",
                path: "/channels/{channel.id}/messages",
                description: "Send a message",
                parameters: [
                    { name: "channel.id", type: "snowflake", required: true, description: "Channel ID" },
                ],
                body: {
                    content: "string",
                    embeds: "array",
                    components: "array",
                },
            },
            {
                method: "PATCH",
                path: "/channels/{channel.id}/messages/{message.id}",
                description: "Edit a message",
                parameters: [
                    { name: "channel.id", type: "snowflake", required: true, description: "Channel ID" },
                    { name: "message.id", type: "snowflake", required: true, description: "Message ID" },
                ],
                body: {
                    content: "string",
                    embeds: "array",
                    components: "array",
                },
            },
            {
                method: "DELETE",
                path: "/channels/{channel.id}/messages/{message.id}",
                description: "Delete a message",
                parameters: [
                    { name: "channel.id", type: "snowflake", required: true, description: "Channel ID" },
                    { name: "message.id", type: "snowflake", required: true, description: "Message ID" },
                ],
            },
            {
                method: "PUT",
                path: "/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me",
                description: "Add reaction to message",
                parameters: [
                    { name: "channel.id", type: "snowflake", required: true, description: "Channel ID" },
                    { name: "message.id", type: "snowflake", required: true, description: "Message ID" },
                    { name: "emoji", type: "string", required: true, description: "Emoji (URL encoded)" },
                ],
            },
            {
                method: "GET",
                path: "/applications/@me",
                description: "Get application info",
            },
            {
                method: "GET",
                path: "/gateway/bot",
                description: "Get gateway connection info",
            },
            {
                method: "GET",
                path: "/oauth2/applications/@me",
                description: "Get OAuth2 application info",
            },
        ];
    }

    exportRequestAsCurl(request: APIRequest): string {
        let curl = `curl -X ${request.method} "https://discord.com/api/v10${request.endpoint}"`;
        
        curl += ' -H "Content-Type: application/json"';
        
        if (request.headers) {
            Object.entries(request.headers).forEach(([key, value]) => {
                curl += ` -H "${key}: ${value}"`;
            });
        }
        
        if (request.body) {
            curl += ` -d '${JSON.stringify(request.body)}'`;
        }
        
        return curl;
    }

    exportResponseAsJSON(response: APIResponse): string {
        return JSON.stringify({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
            duration: response.duration,
            timestamp: response.timestamp,
        }, null, 2);
    }
}

export default new ConsoleAPIManager();
