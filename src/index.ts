import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { GHOST_MAP, GHOST_REGEX } from "./constants.js";
import type { FileScanResult, GhostChar, ScanOptions } from "./types.js";

export * from "./types.js";
export * from "./constants.js";

export function scanString(content: string, filePath = "<string>"): FileScanResult {
    const characters: GhostChar[] = [];
    const lines = content.split(/\r?\n/);

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx];
        for (let colIdx = 0; colIdx < line.length; colIdx++) {
            const code = line.charCodeAt(colIdx);
            if (code in GHOST_MAP) {
                characters.push({
                    char: line[colIdx],
                    codePoint: `U+${code.toString(16).toUpperCase().padStart(4, "0")}`,
                    name: GHOST_MAP[code],
                    line: lineIdx + 1,
                    column: colIdx + 1
                });
            }
        }
    }

    return {
        filePath,
        hasGhostChars: characters.length > 0,
        characters
    };
}

export function cleanString(content: string): string {
    return content.replace(GHOST_REGEX, "");
}

export function scanPath(targetPath: string, options: ScanOptions = {}): FileScanResult[] {
    const results: FileScanResult[] = [];
    if (!existsSync(targetPath)) return results;

    const stat = statSync(targetPath);
    if (!stat.isDirectory()) {
        try {
            const content = readFileSync(targetPath, "utf8");
            return [scanString(content, targetPath)];
        } catch {
            return [];
        }
    }

    function walk(dir: string) {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const full = join(dir, entry.name);
            if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "dist" || entry.name === "build") {
                continue;
            }

            if (entry.isDirectory()) {
                walk(full);
            } else if (entry.isFile()) {
                try {
                    const content = readFileSync(full, "utf8");
                    const res = scanString(content, full);
                    if (res.hasGhostChars) {
                        results.push(res);
                    }
                } catch {
                    // Skip binary files
                }
            }
        }
    }

    walk(targetPath);
    return results;
}

export function cleanFile(filePath: string): boolean {
    try {
        const content = readFileSync(filePath, "utf8");
        const cleaned = cleanString(content);
        if (content !== cleaned) {
            writeFileSync(filePath, cleaned, "utf8");
            return true;
        }
    } catch {
        // ignore
    }
    return false;
}
