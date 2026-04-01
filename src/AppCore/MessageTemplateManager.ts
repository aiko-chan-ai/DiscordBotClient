/* Copyright xql.dev © 2025. All rights reserved */

import { app } from "electron";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface EmbedTemplate {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    timestamp?: boolean;
    footer?: { text: string; icon_url?: string };
    image?: { url: string };
    thumbnail?: { url: string };
    author?: { name: string; url?: string; icon_url?: string };
    fields?: EmbedField[];
}

export interface MessageTemplate {
    id: string;
    name: string;
    description?: string;
    content?: string;
    embeds?: EmbedTemplate[];
    components?: unknown[];
    tags?: string[];
    createdAt: number;
    updatedAt: number;
    usageCount: number;
    isFavorite: boolean;
}

export class MessageTemplateManager {
    private templatesPath: string;
    private templates: Map<string, MessageTemplate> = new Map();

    constructor() {
        this.templatesPath = path.join(app.getPath("userData"), "templates.json");
        this.loadTemplates();
    }

    private loadTemplates(): void {
        try {
            if (fs.existsSync(this.templatesPath)) {
                const data = JSON.parse(fs.readFileSync(this.templatesPath, "utf-8"));
                if (Array.isArray(data)) {
                    data.forEach((template: MessageTemplate) => {
                        this.templates.set(template.id, template);
                    });
                }
            }
        } catch (error) {
            console.error("Failed to load templates:", error);
        }
    }

    private saveTemplates(): void {
        try {
            const templatesArray = Array.from(this.templates.values());
            fs.writeFileSync(this.templatesPath, JSON.stringify(templatesArray, null, 2), "utf-8");
        } catch (error) {
            console.error("Failed to save templates:", error);
        }
    }

    createTemplate(
        name: string,
        content?: string,
        embeds?: EmbedTemplate[],
        options: { description?: string; tags?: string[] } = {}
    ): MessageTemplate {
        const now = Date.now();
        const template: MessageTemplate = {
            id: randomUUID(),
            name,
            description: options.description,
            content,
            embeds,
            tags: options.tags || [],
            createdAt: now,
            updatedAt: now,
            usageCount: 0,
            isFavorite: false,
        };
        
        this.templates.set(template.id, template);
        this.saveTemplates();
        return template;
    }

    updateTemplate(id: string, updates: Partial<MessageTemplate>): MessageTemplate | null {
        const template = this.templates.get(id);
        if (!template) return null;

        const updatedTemplate = { 
            ...template, 
            ...updates, 
            updatedAt: Date.now() 
        };
        this.templates.set(id, updatedTemplate);
        this.saveTemplates();
        return updatedTemplate;
    }

    deleteTemplate(id: string): boolean {
        const deleted = this.templates.delete(id);
        if (deleted) this.saveTemplates();
        return deleted;
    }

    getTemplate(id: string): MessageTemplate | null {
        return this.templates.get(id) || null;
    }

    getAllTemplates(): MessageTemplate[] {
        return Array.from(this.templates.values()).sort((a, b) => {
            if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
            return b.updatedAt - a.updatedAt;
        });
    }

    getTemplatesByTag(tag: string): MessageTemplate[] {
        return this.getAllTemplates().filter(t => t.tags?.includes(tag));
    }

    searchTemplates(query: string): MessageTemplate[] {
        const lowerQuery = query.toLowerCase();
        return this.getAllTemplates().filter(t => 
            t.name.toLowerCase().includes(lowerQuery) ||
            t.description?.toLowerCase().includes(lowerQuery) ||
            t.content?.toLowerCase().includes(lowerQuery) ||
            t.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    incrementUsage(id: string): void {
        const template = this.templates.get(id);
        if (template) {
            template.usageCount++;
            this.templates.set(id, template);
            this.saveTemplates();
        }
    }

    toggleFavorite(id: string): boolean {
        const template = this.templates.get(id);
        if (!template) return false;
        
        template.isFavorite = !template.isFavorite;
        this.templates.set(id, template);
        this.saveTemplates();
        return template.isFavorite;
    }

    getPopularTemplates(limit: number = 10): MessageTemplate[] {
        return this.getAllTemplates()
            .sort((a, b) => b.usageCount - a.usageCount)
            .slice(0, limit);
    }

    getAllTags(): string[] {
        const tags = new Set<string>();
        this.templates.forEach(t => t.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }

    duplicateTemplate(id: string): MessageTemplate | null {
        const template = this.templates.get(id);
        if (!template) return null;
        
        const copy: MessageTemplate = {
            ...template,
            id: randomUUID(),
            name: `${template.name} (Copy)`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            usageCount: 0,
            isFavorite: false,
        };
        
        this.templates.set(copy.id, copy);
        this.saveTemplates();
        return copy;
    }

    exportTemplates(): string {
        return JSON.stringify(Array.from(this.templates.values()), null, 2);
    }

    importTemplates(jsonString: string): { success: number; failed: number } {
        let success = 0;
        let failed = 0;
        
        try {
            const data = JSON.parse(jsonString);
            if (Array.isArray(data)) {
                data.forEach((template: Partial<MessageTemplate>) => {
                    if (template.name) {
                        const newTemplate: MessageTemplate = {
                            id: randomUUID(),
                            name: template.name,
                            description: template.description,
                            content: template.content,
                            embeds: template.embeds,
                            tags: template.tags || [],
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            usageCount: 0,
                            isFavorite: false,
                        };
                        this.templates.set(newTemplate.id, newTemplate);
                        success++;
                    } else {
                        failed++;
                    }
                });
                this.saveTemplates();
            }
        } catch (error) {
            console.error("Failed to import templates:", error);
            failed++;
        }
        
        return { success, failed };
    }

    createQuickTemplate(name: string, content: string): MessageTemplate {
        return this.createTemplate(name, content, undefined, { tags: ["quick"] });
    }
}

export default new MessageTemplateManager();
