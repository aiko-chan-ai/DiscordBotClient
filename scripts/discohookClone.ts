/* Copyright Elysia © 2025 */

import { execFileSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

import versions from "./build-dependencies.json";

const root = process.cwd();
const discohookDir = path.join(root, "discohook");

function run (command: string, args: string[], cwd = root) {
    execFileSync(command, args, { cwd, stdio: "inherit" });
}

if (!existsSync(discohookDir)) {
    run("git", ["clone", "--filter=blob:none", "https://github.com/aiko-chan-ai/discohook.git", discohookDir]);
    run("git", ["checkout", "--detach", versions.discohook], discohookDir);
} else if (!existsSync(path.join(discohookDir, ".git"))) {
    throw new Error(discohookDir + " exists but is not a Git checkout.");
}

const current = execFileSync("git", ["rev-parse", "HEAD"], { cwd: discohookDir, encoding: "utf8" }).trim();
if (current !== versions.discohook) {
    throw new Error(discohookDir + " is at " + current + "; expected " + versions.discohook + ". Resolve this checkout manually before building.");
}

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run dependency setup through npm run requirement.");
run(process.execPath, [npmCli, "ci", "--legacy-peer-deps"], discohookDir);
