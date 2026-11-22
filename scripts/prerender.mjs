import { readFile, writeFile, rm } from 'node:fs/promises';
import { renderPages } from '../.prerender/prerender.js';

for (const { file, html } of renderPages()) {
  const path = new URL(`../dist/${file}`, import.meta.url);
  const source = await readFile(path, 'utf8');
  if (!html.includes('<h1')) throw new Error(`Missing page content: ${file}`);
  const rendered = source.replace(/(<div id="root"[^>]*>)<\/div>/, (_, root) => `${root}${html}</div>`)
    .replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  if (rendered === source) throw new Error(`Missing root: ${file}`);
  await writeFile(path, rendered);
  console.log(`Prerendered ${file}`);
}
await rm(new URL('../.prerender', import.meta.url), { recursive: true, force: true });
