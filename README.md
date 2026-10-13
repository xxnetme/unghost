<div align="center">

# unghost

**Zero-dependency scanner & sanitizer for invisible zero-width characters and Trojan Source Unicode attacks.**

[![npm version](https://img.shields.io/npm/v/unghost?style=flat-square&color=58a6ff)](https://www.npmjs.com/package/unghost)
[![license](https://img.shields.io/github/license/xxnetme/unghost?style=flat-square&color=3fb950)](LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)](#)
[![node](https://img.shields.io/badge/node-%3E%3D18.0.0-blue?style=flat-square)](https://nodejs.org)

<br/>

Protect your codebase, CI pipelines, and LLM prompts against hidden steganography, invisible character syntax errors, and Trojan Source (CVE-2021-42574) direction attacks.

```bash
npx unghost scan .
npx unghost clean ./src
```

</div>

---

### What it detects

* **Trojan Source Attacks (CVE-2021-42574):** Bidi overrides (`U+202E`, `U+202A`-`U+202D`, `U+2066`-`U+2069`) used to visually reverse code execution order and disguise malicious logic inside innocent-looking comments.
* **Invisible Zero-Width Characters:** Zero-width spaces (`U+200B`), non-joiners (`U+200C`), joiners (`U+200D`), and byte order marks (`U+FEFF`) that cause compiler `SyntaxError: unexpected token` or invisible prompt injection.
* **Non-Breaking Spaces:** Non-breaking spaces (`U+00A0`) accidentally copied from websites or rich-text editors that break terminal scripts.

---

### CLI Usage

#### 1. Scan your repository
```bash
npx unghost scan .
```

#### 2. Clean files in-place
```bash
npx unghost clean ./src
```

#### 3. CI/CD integration
```bash
npx unghost scan . --json
```

---

### Programmatic API

```ts
import { scanString, cleanString, scanPath } from "unghost";

// Scan arbitrary string
const result = scanString("const secret = 'abc\u200B123';");
console.log(result.hasGhostChars); // true
console.log(result.characters);

// Sanitize string
const clean = cleanString("const secret = 'abc\u200B123';");
console.log(clean); // "const secret = 'abc123';"
```

---

### License

MIT License (c) 2026 [xxnetme](https://github.com/xxnetme)
