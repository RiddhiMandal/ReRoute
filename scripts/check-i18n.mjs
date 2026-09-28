// Checks that English and French dictionaries have identical keys, that every
// t("key") used in the code exists, and that no French text is missing for data strings.
// Run: node scripts/check-i18n.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dict = readFileSync("lib/dictionary.ts", "utf8");
const [enPart, frPart] = dict.split("export const FR");
const keysOf = (src) => new Set([...src.matchAll(/^\s*"([^"]+)":/gm)].map((m) => m[1]));
const en = keysOf(enPart);
const fr = keysOf(frPart);

const problems = [];
for (const k of en) if (!fr.has(k)) problems.push(`missing in FR: ${k}`);
for (const k of fr) if (!en.has(k)) problems.push(`missing in EN: ${k}`);

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|ts)$/.test(f)) out.push(p);
  }
  return out;
}
const used = new Set();
for (const file of [...walk("components"), ...walk("app"), ...walk("lib")]) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/\bt\(\s*["'`]([a-zA-Z0-9_.]+)["'`]/g)) used.add(m[1]);
  for (const m of src.matchAll(/labelKey:\s*"([a-z0-9.]+)"/g)) used.add(m[1]);
  for (const m of src.matchAll(/"(bot\.suggest\.\d)"/g)) used.add(m[1]);
}
for (const k of used) if (!en.has(k)) problems.push(`used but undefined: ${k}`);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`i18n OK — ${en.size} keys in both languages, ${used.size} static keys used.`);
