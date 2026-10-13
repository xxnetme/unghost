export const GHOST_MAP: Record<number, string> = {
    0x200B: "Zero-Width Space (ZWSP)",
    0x200C: "Zero-Width Non-Joiner (ZWNJ)",
    0x200D: "Zero-Width Joiner (ZWJ)",
    0x200E: "Left-to-Right Mark (LRM)",
    0x200F: "Right-to-Left Mark (RLM)",
    0x202A: "Left-to-Right Embedding (LRE - Trojan Source)",
    0x202B: "Right-to-Left Embedding (RLE - Trojan Source)",
    0x202C: "Pop Directional Formatting (PDF - Trojan Source)",
    0x202D: "Left-to-Right Override (LRO - Trojan Source)",
    0x202E: "Right-to-Left Override (RLO - Trojan Source)",
    0x2066: "Left-to-Right Isolate (LRI - Trojan Source)",
    0x2067: "Right-to-Left Isolate (RLI - Trojan Source)",
    0x2068: "First Strong Isolate (FSI - Trojan Source)",
    0x2069: "Pop Directional Isolate (PDI - Trojan Source)",
    0xFEFF: "Byte Order Mark (BOM / Zero-Width No-Break Space)",
    0x00A0: "Non-Breaking Space (NBSP)"
};

export const GHOST_REGEX = /[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF\u00A0]/g;
