/* Copyright xql.dev © 2026. All rights reserved */

import { ipcMain } from "electron";
import EventEmitter from "events";
import path from "path";
import fs from "fs";

export interface UploadFile {
    id: string;
    path: string;
    name: string;
    size: number;
    type: string;
    preview?: string;
    progress: number;
    status: "pending" | "uploading" | "completed" | "failed";
    error?: string;
}

export interface UploadQueue {
    id: string;
    channelId: string;
    files: UploadFile[];
    message?: string;
    status: "pending" | "uploading" | "completed" | "failed";
}

export class DragDropManager extends EventEmitter {
    private uploadQueues: Map<string, UploadQueue> = new Map();
    private supportedTypes: Set<string> = new Set([
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/mp4",
        "video/webm",
        "audio/mp3",
        "audio/ogg",
        "audio/wav",
        "application/pdf",
        "text/plain",
        "text/markdown",
    ]);
    private maxFileSize: number = 100 * 1024 * 1024;
    private maxFilesPerUpload: number = 10;

    constructor() {
        super();
        this.setupIPC();
    }

    private setupIPC(): void {
        ipcMain.handle("dragdrop:process-files", async (_, filePaths: string[], channelId: string) => {
            return this.processFiles(filePaths, channelId);
        });

        ipcMain.handle("dragdrop:get-supported-types", () => {
            return Array.from(this.supportedTypes);
        });

        ipcMain.handle("dragdrop:validate-files", (_, filePaths: string[]) => {
            return this.validateFiles(filePaths);
        });

        ipcMain.handle("dragdrop:create-upload", (_, files: Omit<UploadFile, "id" | "progress" | "status">[], channelId: string, message?: string) => {
            return this.createUploadQueue(files, channelId, message);
        });

        ipcMain.handle("dragdrop:cancel-upload", (_, uploadId: string) => {
            return this.cancelUpload(uploadId);
        });

        ipcMain.handle("dragdrop:get-uploads", () => {
            return this.getAllUploads();
        });
    }

    async processFiles(filePaths: string[], channelId: string): Promise<UploadFile[]> {
        const files: UploadFile[] = [];

        for (const filePath of filePaths) {
            try {
                const stats = fs.statSync(filePath);
                
                if (!stats.isFile()) continue;

                const file: UploadFile = {
                    id: this.generateId(),
                    path: filePath,
                    name: path.basename(filePath),
                    size: stats.size,
                    type: this.getMimeType(filePath),
                    progress: 0,
                    status: "pending",
                };

                if (this.isImageFile(file.type)) {
                    file.preview = await this.generatePreview(filePath);
                }

                files.push(file);
            } catch (error) {
                console.error(`Failed to process file ${filePath}:`, error);
            }
        }

        return files;
    }

    validateFiles(filePaths: string[]): Array<{
        path: string;
        valid: boolean;
        errors: string[];
    }> {
        return filePaths.map(filePath => {
            const errors: string[] = [];

            try {
                if (!fs.existsSync(filePath)) {
                    errors.push("File does not exist");
                    return { path: filePath, valid: false, errors };
                }

                const stats = fs.statSync(filePath);
                
                if (!stats.isFile()) {
                    errors.push("Not a file");
                }

                if (stats.size > this.maxFileSize) {
                    errors.push(`File too large (max ${this.formatBytes(this.maxFileSize)})`);
                }

                if (stats.size === 0) {
                    errors.push("File is empty");
                }

                const ext = path.extname(filePath).toLowerCase();
                if (!this.isExtensionAllowed(ext)) {
                    errors.push("File type not supported");
                }

            } catch (error) {
                errors.push("Cannot access file");
            }

            return {
                path: filePath,
                valid: errors.length === 0,
                errors,
            };
        });
    }

    createUploadQueue(
        files: Omit<UploadFile, "id" | "progress" | "status">[],
        channelId: string,
        message?: string
    ): UploadQueue {
        const uploadFiles: UploadFile[] = files.slice(0, this.maxFilesPerUpload).map(file => ({
            ...file,
            id: this.generateId(),
            progress: 0,
            status: "pending",
        }));

        const queue: UploadQueue = {
            id: this.generateId(),
            channelId,
            files: uploadFiles,
            message,
            status: "pending",
        };

        this.uploadQueues.set(queue.id, queue);
        this.emit("upload-created", queue);

        return queue;
    }

    async startUpload(uploadId: string): Promise<boolean> {
        const queue = this.uploadQueues.get(uploadId);
        if (!queue) return false;

        queue.status = "uploading";
        this.emit("upload-started", queue);

        for (const file of queue.files) {
            if (file.status === "pending") {
                await this.uploadFile(uploadId, file);
            }
        }

        const allCompleted = queue.files.every(f => f.status === "completed");
        const anyFailed = queue.files.some(f => f.status === "failed");

        if (allCompleted) {
            queue.status = "completed";
            this.emit("upload-completed", queue);
        } else if (anyFailed) {
            queue.status = "failed";
            this.emit("upload-failed", queue);
        }

        return true;
    }

    private async uploadFile(uploadId: string, file: UploadFile): Promise<void> {
        file.status = "uploading";
        this.emit("file-upload-start", { uploadId, file });

        try {
            const chunkSize = 8192;
            const totalSize = file.size;
            let uploaded = 0;

            while (uploaded < totalSize) {
                await new Promise(resolve => setTimeout(resolve, 10));
                uploaded += chunkSize;
                file.progress = Math.min(100, Math.round((uploaded / totalSize) * 100));
                this.emit("file-progress", { uploadId, fileId: file.id, progress: file.progress });
            }

            file.status = "completed";
            file.progress = 100;
            this.emit("file-upload-complete", { uploadId, file });

        } catch (error) {
            file.status = "failed";
            file.error = error instanceof Error ? error.message : "Upload failed";
            this.emit("file-upload-error", { uploadId, file, error: file.error });
        }
    }

    cancelUpload(uploadId: string): boolean {
        const queue = this.uploadQueues.get(uploadId);
        if (!queue) return false;

        queue.files.forEach(file => {
            if (file.status === "uploading") {
                file.status = "failed";
                file.error = "Cancelled by user";
            }
        });

        queue.status = "failed";
        this.emit("upload-cancelled", queue);
        
        return true;
    }

    removeUpload(uploadId: string): boolean {
        const deleted = this.uploadQueues.delete(uploadId);
        if (deleted) {
            this.emit("upload-removed", uploadId);
        }
        return deleted;
    }

    getUpload(uploadId: string): UploadQueue | null {
        return this.uploadQueues.get(uploadId) || null;
    }

    getAllUploads(): UploadQueue[] {
        return Array.from(this.uploadQueues.values());
    }

    getUploadsForChannel(channelId: string): UploadQueue[] {
        return this.getAllUploads().filter(q => q.channelId === channelId);
    }

    clearCompletedUploads(): number {
        let cleared = 0;
        this.uploadQueues.forEach((queue, id) => {
            if (queue.status === "completed" || queue.status === "failed") {
                this.uploadQueues.delete(id);
                cleared++;
            }
        });
        this.emit("uploads-cleared", cleared);
        return cleared;
    }

    private generateId(): string {
        return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private getMimeType(filePath: string): string {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes: Record<string, string> = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".webp": "image/webp",
            ".mp4": "video/mp4",
            ".webm": "video/webm",
            ".mp3": "audio/mp3",
            ".ogg": "audio/ogg",
            ".wav": "audio/wav",
            ".pdf": "application/pdf",
            ".txt": "text/plain",
            ".md": "text/markdown",
        };
        return mimeTypes[ext] || "application/octet-stream";
    }

    private isImageFile(mimeType: string): boolean {
        return mimeType.startsWith("image/");
    }

    private isExtensionAllowed(ext: string): boolean {
        const allowed = [
            ".jpg", ".jpeg", ".png", ".gif", ".webp",
            ".mp4", ".webm", ".mov",
            ".mp3", ".ogg", ".wav", ".m4a",
            ".pdf", ".txt", ".md", ".json",
            ".zip", ".rar", ".7z",
        ];
        return allowed.includes(ext);
    }

    private async generatePreview(filePath: string): Promise<string> {
        return `file://${filePath}`;
    }

    private formatBytes(bytes: number): string {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    setMaxFileSize(bytes: number): void {
        this.maxFileSize = bytes;
    }

    setMaxFilesPerUpload(count: number): void {
        this.maxFilesPerUpload = count;
    }

    addSupportedType(mimeType: string): void {
        this.supportedTypes.add(mimeType);
    }

    compressImagesBeforeUpload(enabled: boolean): void {
        this.emit("compression-setting-changed", enabled);
    }
}

export default new DragDropManager();
