export interface GhostChar {
    char: string;
    codePoint: string;
    name: string;
    line: number;
    column: number;
}
export interface FileScanResult {
    filePath: string;
    hasGhostChars: boolean;
    characters: GhostChar[];
}
export interface ScanOptions {
    extensions?: string[];
    ignore?: string[];
    fixBidi?: boolean;
    fixZeroWidth?: boolean;
    fixSpaces?: boolean;
}
//# sourceMappingURL=types.d.ts.map