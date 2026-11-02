/* Copyright Elysia © 2025 */

import { execFileSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

import versions from "./build-dependencies.json";

const root = process.cwd();
const vencordDir = path.join(root, "Vencord");
const pluginDir = path.join(vencordDir, "src", "userplugins", "botClient");

function run (command: string, args: string[], cwd = root) {
    execFileSync(command, args, { cwd, stdio: "inherit" });
}

function prepareCheckout (directory: string, repository: string, revision: string) {
    if (!existsSync(directory)) {
        run("git", ["clone", "--filter=blob:none", repository, directory]);
        run("git", ["checkout", "--detach", revision], directory);
    } else if (!existsSync(path.join(directory, ".git"))) {
        throw new Error(directory + " exists but is not a Git checkout.");
    }

    const current = execFileSync("git", ["rev-parse", "HEAD"], { cwd: directory, encoding: "utf8" }).trim();
    if (current !== revision) {
        throw new Error(directory + " is at " + current + "; expected " + revision + ". Resolve this checkout manually before building.");
    }
}

prepareCheckout(vencordDir, "https://github.com/Vendicated/Vencord.git", versions.vencord);
prepareCheckout(pluginDir, "https://github.com/aiko-chan-ai/VencordDBCPlugin.git", versions.botClientPlugin);
run(process.execPath, [path.join(root, "node_modules", "pnpm", "bin", "pnpm.cjs"), "install", "--frozen-lockfile"], vencordDir);
