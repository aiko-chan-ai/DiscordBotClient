import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
    root: fileURLToPath(new URL("../src/renderer/settings", import.meta.url)),
    base: "./",
    esbuild: { jsx: "automatic" },
    build: {
        outDir: fileURLToPath(new URL("../build/renderer/settings", import.meta.url)),
        emptyOutDir: true,
        target: "es2022",
        rollupOptions: {
            onwarn(warning, warn) {
                // This is a client-only Electron UI; Fluent's RSC boundary directives do not apply.
                if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes('"use client"')) return;
                warn(warning);
            },
        },
    },
});
