/* Copyright xql.dev 2026. All rights reserved */

import { BrowserWindow, screen } from "electron";
import EventEmitter from "events";

export interface SplitViewPanel {
    id: string;
    channelId: string;
    guildId?: string;
    width: number;
    active: boolean;
}

export interface SplitViewLayout {
    panels: SplitViewPanel[];
    orientation: "horizontal" | "vertical";
}

export class SplitViewManager extends EventEmitter {
    private layouts: Map<string, SplitViewLayout> = new Map();
    private childWindows: Map<string, BrowserWindow> = new Map();

    constructor() {
        super();
    }

    createSplitView(
        mainWindow: BrowserWindow,
        channelId: string,
        guildId?: string
    ): BrowserWindow | null {
        const id = `split_${Date.now()}`;
        
        const { width, height } = mainWindow.getBounds();
        const splitWidth = Math.floor(width / 2);

        const childWindow = new BrowserWindow({
            width: splitWidth,
            height: height - 100,
            parent: mainWindow,
            webPreferences: {
                webSecurity: false,
                sandbox: false,
            },
            title: `Split View - ${channelId}`,
            autoHideMenuBar: true,
        });

        this.childWindows.set(id, childWindow);
        
        const layout: SplitViewLayout = {
            panels: [
                {
                    id: "main",
                    channelId: "",
                    guildId: undefined,
                    width: splitWidth,
                    active: true,
                },
                {
                    id,
                    channelId,
                    guildId,
                    width: splitWidth,
                    active: true,
                },
            ],
            orientation: "horizontal",
        };

        this.layouts.set(mainWindow.id.toString(), layout);

        childWindow.on("closed", () => {
            this.childWindows.delete(id);
            this.emit("panel-closed", id);
        });

        this.emit("split-created", { id, channelId, guildId });
        
        return childWindow;
    }

    closeSplitView(id: string): boolean {
        const window = this.childWindows.get(id);
        if (!window) return false;

        window.close();
        this.childWindows.delete(id);
        return true;
    }

    updateLayout(
        windowId: string,
        layout: Partial<SplitViewLayout>
    ): SplitViewLayout | null {
        const currentLayout = this.layouts.get(windowId);
        if (!currentLayout) return null;

        const updatedLayout: SplitViewLayout = {
            ...currentLayout,
            ...layout,
            panels: layout.panels || currentLayout.panels,
        };

        this.layouts.set(windowId, updatedLayout);
        this.emit("layout-updated", { windowId, layout: updatedLayout });
        
        return updatedLayout;
    }

    resizePanel(
        windowId: string,
        panelId: string,
        newWidth: number
    ): boolean {
        const layout = this.layouts.get(windowId);
        if (!layout) return false;

        const panel = layout.panels.find(p => p.id === panelId);
        if (!panel) return false;

        panel.width = newWidth;
        this.emit("panel-resized", { windowId, panelId, width: newWidth });
        
        return true;
    }

    swapPanels(windowId: string, panelId1: string, panelId2: string): boolean {
        const layout = this.layouts.get(windowId);
        if (!layout) return false;

        const idx1 = layout.panels.findIndex(p => p.id === panelId1);
        const idx2 = layout.panels.findIndex(p => p.id === panelId2);

        if (idx1 === -1 || idx2 === -1) return false;

        const temp = layout.panels[idx1];
        layout.panels[idx1] = layout.panels[idx2];
        layout.panels[idx2] = temp;

        this.emit("panels-swapped", { windowId, panelId1, panelId2 });
        
        return true;
    }

    focusPanel(windowId: string, panelId: string): boolean {
        const layout = this.layouts.get(windowId);
        if (!layout) return false;

        layout.panels.forEach(p => {
            p.active = p.id === panelId;
        });

        this.emit("panel-focused", { windowId, panelId });
        
        return true;
    }

    getLayout(windowId: string): SplitViewLayout | null {
        return this.layouts.get(windowId) || null;
    }

    getAllSplitViews(): Array<{ id: string; window: BrowserWindow }> {
        return Array.from(this.childWindows.entries()).map(([id, window]) => ({
            id,
            window,
        }));
    }

    toggleOrientation(windowId: string): SplitViewLayout | null {
        const layout = this.layouts.get(windowId);
        if (!layout) return null;

        layout.orientation = layout.orientation === "horizontal" ? "vertical" : "horizontal";
        this.emit("orientation-changed", { windowId, orientation: layout.orientation });
        
        return layout;
    }

    saveLayout(windowId: string, name: string): boolean {
        const layout = this.layouts.get(windowId);
        if (!layout) return false;

        try {
            localStorage.setItem(`split_layout_${name}`, JSON.stringify(layout));
            this.emit("layout-saved", { windowId, name });
            return true;
        } catch {
            return false;
        }
    }

    loadLayout(windowId: string, name: string): SplitViewLayout | null {
        try {
            const saved = localStorage.getItem(`split_layout_${name}`);
            if (!saved) return null;

            const layout: SplitViewLayout = JSON.parse(saved);
            this.layouts.set(windowId, layout);
            this.emit("layout-loaded", { windowId, name, layout });
            
            return layout;
        } catch {
            return null;
        }
    }

    closeAllSplitViews(): void {
        this.childWindows.forEach((window, id) => {
            window.close();
        });
        this.childWindows.clear();
        this.layouts.clear();
        this.emit("all-closed");
    }

    syncNavigation(mainChannelId: string, targetChannelId: string): void {
        this.emit("sync-navigation", { mainChannelId, targetChannelId });
    }

    isSplitViewActive(windowId: string): boolean {
        const layout = this.layouts.get(windowId);
        return layout ? layout.panels.length > 1 : false;
    }

    getPanelForChannel(channelId: string): SplitViewPanel | null {
        for (const layout of this.layouts.values()) {
            const panel = layout.panels.find(p => p.channelId === channelId);
            if (panel) return panel;
        }
        return null;
    }
}

export default new SplitViewManager();
