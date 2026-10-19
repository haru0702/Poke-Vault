import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const baseline = JSON.parse(await readFile(new URL('./audit-baseline.json', import.meta.url), 'utf8'));
const changed = [];
for (const [relative, expected] of Object.entries(baseline)) {
  try {
    const current = createHash('sha256').update(await readFile(new URL(relative, root))).digest('hex');
    if (current !== expected) changed.push(relative);
  } catch { changed.push(relative); }
}
if (changed.length) {
  console.error('Sprint 0A evidence changed or missing:', changed);
  process.exitCode = 1;
} else {
  console.log(`Verified ${Object.keys(baseline).length} unchanged Sprint 0A audit files in ${fileURLToPath(root)}`);
}
