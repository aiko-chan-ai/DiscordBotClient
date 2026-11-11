/* Copyright Elysia © 2025. All rights reserved */

// The source code below is taken from the Lambert-server library.
// Credits to the original authors and contributors of Lambert-server for their work.
// Some parts may have been modified or adapted to fit this project’s structure and requirements.
// https://github.com/SamuelScheit/Lambert-server

import { Express, Router } from "express";
import fs from "fs";
import { resolve } from "path";

export interface TraverseDirectoryOptions {
    dirname: string;
    filter?: RegExp;
    excludeDirs?: RegExp;
    recursive?: boolean;
}

const DEFAULT_EXCLUDE_DIR = /^\./;
const DEFAULT_FILTER = /^([^.].*)(?<!\.d)\.(ts|js)$/;

export function traverseDirectorySync(options: TraverseDirectoryOptions): string[] {
    if (!options.dirname.endsWith("/")) options.dirname += "/";
    if (!options.filter) options.filter = DEFAULT_FILTER;
    if (!options.excludeDirs) options.excludeDirs = DEFAULT_EXCLUDE_DIR;

    const routes = fs.readdirSync(options.dirname);
    const result: string[] = [];

    for (const file of routes.sort((a, b) => {
        const aIsParam = a.startsWith("#");
        const bIsParam = b.startsWith("#");
        // Static routes first, parameterized routes (#id) last
        if (aIsParam && !bIsParam) return 1;
        if (!aIsParam && bIsParam) return -1;
        return a.localeCompare(b);
    })) {
        const path = options.dirname + file;
        const stat = fs.lstatSync(path);
        if (path.match(options.excludeDirs)) continue;

        if (path.match(options.filter) && stat.isFile()) {
            result.push(path);
        } else if (options.recursive && stat.isDirectory()) {
            result.push(...traverseDirectorySync({ ...options, dirname: path + "/" }));
        }
    }

    return result;
}

export function registerRoutesSync(app: Express, path: string, autoPrefix: string[] = []) {
    const route = Router({ mergeParams: true });
    const root = resolve(path);
    const files = traverseDirectorySync({
        dirname: root,
        recursive: true,
    });
    console.log(`[Server] Found ${files.length} route files in ${path}`);
    const result = [];

    for (const absolutePath of files) {
        // eslint-disable-next-line
        const module = require(absolutePath);
        const res = registerRouteSync(route, root, absolutePath, module);
        if (res) result.push(res);
    }

    for (const prefix of autoPrefix) {
        app.use(prefix, route);
    }

    app.use(route);

    return result;
}

export function registerRouteSync(
    route: Router,
    root: string,
    file: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router: any,
): Router | undefined {
    if (root.endsWith("/") || root.endsWith("\\")) root = root.slice(0, -1); // removes slash at the end of the root dir
    let path = file.replace(root, ""); // remove root from path and
    path = path.split(".").slice(0, -1).join("."); // trancate .js/.ts file extension of path
    path = path.replaceAll("#", ":").replaceAll("!", "?").replaceAll("\\", "/");
    if (path.endsWith("/index")) path = path.slice(0, -6); // delete index from path
    if (!path.length) path = "/"; // first root index.js file must have a / path

    try {
        if (router.router) router = router.router;
        if (router.default) router = router.default;
        if (!router || router?.prototype?.constructor?.name !== "router") {
            throw "File doesn't export any default router";
        }
        if (!path.startsWith("/")) path = "/" + path;
        route.use(path, <Router>router);
        // console.log(`[Server] Registered route ${path}`);
        return router;
    } catch (error) {
        console.error(new Error(`[Server] Failed to register route ${path}: ${error}`));
    }
}
