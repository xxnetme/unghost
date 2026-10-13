import type { FileScanResult, ScanOptions } from "./types.js";
export * from "./types.js";
export * from "./constants.js";
export declare function scanString(content: string, filePath?: string): FileScanResult;
export declare function cleanString(content: string): string;
export declare function scanPath(targetPath: string, options?: ScanOptions): FileScanResult[];
export declare function cleanFile(filePath: string): boolean;
//# sourceMappingURL=index.d.ts.map