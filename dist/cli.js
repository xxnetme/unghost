#!/usr/bin/env node
import { cleanFile, scanPath } from "./index.js";
const VERSION = "1.0.0";
const HELP = `
unghost — Zero-dependency Trojan Source & invisible character detector

Usage:
  unghost scan [path]       Scan directory or file for invisible characters
  unghost clean [path]      Clean invisible characters from files in-place

Options:
  --json                    Output results as JSON
  -v, --version             Display version
  -h, --help                Display help message

Examples:
  $ unghost scan .
  $ unghost clean ./src
  $ unghost scan --json
`;
async function main() {
    const args = process.argv.slice(2);
    if (args.includes("-h") || args.includes("--help") || args.length === 0) {
        console.log(HELP);
        return;
    }
    if (args.includes("-v") || args.includes("--version")) {
        console.log(`unghost v${VERSION}`);
        return;
    }
    const json = args.includes("--json");
    const cleanArgs = args.filter(a => !a.startsWith("-"));
    const cmd = cleanArgs[0];
    const targetPath = cleanArgs[1] || ".";
    if (cmd === "scan") {
        const results = scanPath(targetPath);
        if (json) {
            console.log(JSON.stringify(results, null, 2));
            process.exit(results.length > 0 ? 1 : 0);
        }
        if (results.length === 0) {
            console.log("\x1b[32m✔\x1b[0m Clean! No invisible characters or Trojan Source overrides detected.");
            return;
        }
        console.error(`\x1b[31m✖\x1b[0m Found invisible characters in ${results.length} file(s):\n`);
        for (const file of results) {
            console.error(`\x1b[33m${file.filePath}\x1b[0m:`);
            for (const char of file.characters) {
                console.error(`  Line ${char.line}, Col ${char.column}: ${char.codePoint} — ${char.name}`);
            }
        }
        process.exit(1);
    }
    else if (cmd === "clean") {
        const results = scanPath(targetPath);
        if (results.length === 0) {
            console.log("\x1b[32m✔\x1b[0m Nothing to clean. All files are clean.");
            return;
        }
        let cleanedCount = 0;
        for (const file of results) {
            if (cleanFile(file.filePath)) {
                cleanedCount++;
                console.log(`\x1b[32m✔\x1b[0m Cleaned: ${file.filePath} (${file.characters.length} characters removed)`);
            }
        }
        console.log(`\nSuccessfully sanitized ${cleanedCount} file(s).`);
    }
    else {
        console.log(HELP);
    }
}
main().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map