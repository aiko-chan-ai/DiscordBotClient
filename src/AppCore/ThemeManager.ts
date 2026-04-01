/* Copyright Elysia © 2025. All rights reserved */

import { app } from "electron";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import EventEmitter from "events";

export interface CustomTheme {
    id: string;
    name: string;
    author?: string;
    description?: string;
    css: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
    variables?: Record<string, string>;
}

export class ThemeManager extends EventEmitter {
    private themesPath: string;
    private themes: Map<string, CustomTheme> = new Map();
    private activeThemeId: string | null = null;
    private userCssPath: string;

    constructor() {
        super();
        this.themesPath = path.join(app.getPath("userData"), "themes.json");
        this.userCssPath = path.join(app.getPath("userData"), "custom.css");
        this.loadThemes();
    }

    private loadThemes(): void {
        try {
            if (fs.existsSync(this.themesPath)) {
                const data = JSON.parse(fs.readFileSync(this.themesPath, "utf-8"));
                if (Array.isArray(data)) {
                    data.forEach((theme: CustomTheme) => {
                        this.themes.set(theme.id, theme);
                        if (theme.isActive) {
                            this.activeThemeId = theme.id;
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Failed to load themes:", error);
        }
    }

    private saveThemes(): void {
        try {
            const themesArray = Array.from(this.themes.values());
            fs.writeFileSync(this.themesPath, JSON.stringify(themesArray, null, 2), "utf-8");
        } catch (error) {
            console.error("Failed to save themes:", error);
        }
    }

    createTheme(
        name: string,
        css: string,
        options: { author?: string; description?: string; variables?: Record<string, string> } = {}
    ): CustomTheme {
        const now = Date.now();
        const theme: CustomTheme = {
            id: randomUUID(),
            name,
            author: options.author,
            description: options.description,
            css,
            isActive: false,
            createdAt: now,
            updatedAt: now,
            variables: options.variables || {},
        };
        
        this.themes.set(theme.id, theme);
        this.saveThemes();
        this.emit("created", theme);
        return theme;
    }

    updateTheme(id: string, updates: Partial<CustomTheme>): CustomTheme | null {
        const theme = this.themes.get(id);
        if (!theme) return null;

        const updatedTheme = { 
            ...theme, 
            ...updates, 
            updatedAt: Date.now() 
        };
        this.themes.set(id, updatedTheme);
        this.saveThemes();
        
        if (this.activeThemeId === id && updates.css !== undefined) {
            this.emit("css-updated", updatedTheme.css);
        }
        
        this.emit("updated", updatedTheme);
        return updatedTheme;
    }

    deleteTheme(id: string): boolean {
        const theme = this.themes.get(id);
        if (!theme) return false;

        if (this.activeThemeId === id) {
            this.deactivateTheme();
        }

        this.themes.delete(id);
        this.saveThemes();
        this.emit("deleted", id);
        return true;
    }

    activateTheme(id: string): boolean {
        const theme = this.themes.get(id);
        if (!theme) return false;

        if (this.activeThemeId && this.activeThemeId !== id) {
            const currentTheme = this.themes.get(this.activeThemeId);
            if (currentTheme) {
                currentTheme.isActive = false;
                this.themes.set(this.activeThemeId, currentTheme);
            }
        }

        theme.isActive = true;
        this.activeThemeId = id;
        this.themes.set(id, theme);
        this.saveThemes();
        
        this.emit("activated", theme);
        this.emit("css-updated", this.getActiveCSS());
        return true;
    }

    deactivateTheme(): void {
        if (this.activeThemeId) {
            const theme = this.themes.get(this.activeThemeId);
            if (theme) {
                theme.isActive = false;
                this.themes.set(this.activeThemeId, theme);
            }
            this.activeThemeId = null;
            this.saveThemes();
            this.emit("deactivated");
            this.emit("css-updated", "");
        }
    }

    getActiveTheme(): CustomTheme | null {
        return this.activeThemeId ? this.themes.get(this.activeThemeId) || null : null;
    }

    getActiveCSS(): string {
        const theme = this.getActiveTheme();
        if (!theme) return "";

        let css = theme.css;
        
        if (theme.variables) {
            const variableBlock = Object.entries(theme.variables)
                .map(([key, value]) => `  --${key}: ${value};`)
                .join("\n");
            
            css = `:root {\n${variableBlock}\n}\n\n${css}`;
        }

        return css;
    }

    getAllThemes(): CustomTheme[] {
        return Array.from(this.themes.values()).sort((a, b) => b.updatedAt - a.updatedAt);
    }

    getTheme(id: string): CustomTheme | null {
        return this.themes.get(id) || null;
    }

    duplicateTheme(id: string): CustomTheme | null {
        const theme = this.themes.get(id);
        if (!theme) return null;
        
        const copy: CustomTheme = {
            ...theme,
            id: randomUUID(),
            name: `${theme.name} (Copy)`,
            isActive: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        
        this.themes.set(copy.id, copy);
        this.saveThemes();
        this.emit("created", copy);
        return copy;
    }

    importTheme(jsonString: string): CustomTheme | null {
        try {
            const data = JSON.parse(jsonString);
            if (data.name && data.css) {
                return this.createTheme(data.name, data.css, {
                    author: data.author,
                    description: data.description,
                    variables: data.variables,
                });
            }
        } catch (error) {
            console.error("Failed to import theme:", error);
        }
        return null;
    }

    exportTheme(id: string): string | null {
        const theme = this.themes.get(id);
        if (!theme) return null;
        return JSON.stringify(theme, null, 2);
    }

    saveUserCSS(css: string): void {
        try {
            fs.writeFileSync(this.userCssPath, css, "utf-8");
            this.emit("user-css-updated", css);
        } catch (error) {
            console.error("Failed to save user CSS:", error);
        }
    }

    getUserCSS(): string {
        try {
            if (fs.existsSync(this.userCssPath)) {
                return fs.readFileSync(this.userCssPath, "utf-8");
            }
        } catch (error) {
            console.error("Failed to read user CSS:", error);
        }
        return "";
    }

    getCombinedCSS(): string {
        const parts: string[] = [];
        
        const userCSS = this.getUserCSS();
        if (userCSS) parts.push(`/* User CSS */\n${userCSS}`);
        
        const themeCSS = this.getActiveCSS();
        if (themeCSS) parts.push(`/* Theme: ${this.getActiveTheme()?.name} */\n${themeCSS}`);
        
        return parts.join("\n\n");
    }

    validateCSS(css: string): { valid: boolean; errors: string[] } {
        const errors: string[] = [];
        
        try {
            if (css.includes("@import")) {
                errors.push("@import rules are not allowed for security reasons");
            }
            
            const dangerousFunctions = /expression\(|javascript:|vbscript:/gi;
            if (dangerousFunctions.test(css)) {
                errors.push("Potentially dangerous CSS functions detected");
            }
            
        } catch (error) {
            errors.push("CSS validation error");
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }

    createPresetTheme(type: "dark" | "light" | "amoled" | "midnight" | "ocean"): CustomTheme {
        const presets: Record<string, { name: string; css: string; variables: Record<string, string> }> = {
            dark: {
                name: "Enhanced Dark",
                css: `
.appMount-2yBXZl { background: var(--bg-primary) !important; }
.guilds-2JjMmN { background: var(--bg-secondary) !important; }
.sidebar-1tnWFu { background: var(--bg-secondary) !important; }
.chat-2ZfZYH { background: var(--bg-primary) !important; }
                `,
                variables: {
                    "bg-primary": "#1a1a1a",
                    "bg-secondary": "#0f0f0f",
                    "bg-tertiary": "#000000",
                    "text-normal": "#ffffff",
                    "text-muted": "#a0a0a0",
                    "accent": "#5865f2",
                },
            },
            light: {
                name: "Clean Light",
                css: `
.appMount-2yBXZl { background: var(--bg-primary) !important; }
.guilds-2JjMmN { background: var(--bg-secondary) !important; }
.sidebar-1tnWFu { background: var(--bg-secondary) !important; }
                `,
                variables: {
                    "bg-primary": "#ffffff",
                    "bg-secondary": "#f2f3f5",
                    "bg-tertiary": "#e3e5e8",
                    "text-normal": "#2e3338",
                    "text-muted": "#747f8d",
                    "accent": "#5865f2",
                },
            },
            amoled: {
                name: "AMOLED Black",
                css: `
* { --background-primary: #000000 !important; }
* { --background-secondary: #000000 !important; }
* { --background-tertiary: #000000 !important; }
                `,
                variables: {
                    "bg-primary": "#000000",
                    "bg-secondary": "#000000",
                    "bg-tertiary": "#000000",
                    "text-normal": "#ffffff",
                    "accent": "#5865f2",
                },
            },
            midnight: {
                name: "Midnight Blue",
                css: `
.appMount-2yBXZl { background: linear-gradient(135deg, #0f0c29, #302b63, #24243e) !important; }
                `,
                variables: {
                    "bg-primary": "#0f0c29",
                    "bg-secondary": "#1a1a2e",
                    "accent": "#7b68ee",
                },
            },
            ocean: {
                name: "Deep Ocean",
                css: `
.appMount-2yBXZl { background: linear-gradient(180deg, #1a3a52, #0d2137) !important; }
                `,
                variables: {
                    "bg-primary": "#0d2137",
                    "bg-secondary": "#1a3a52",
                    "accent": "#00b4d8",
                },
            },
        };

        const preset = presets[type];
        return this.createTheme(preset.name, preset.css, {
            description: `Preset ${type} theme`,
            variables: preset.variables,
        });
    }
}

export default new ThemeManager();
