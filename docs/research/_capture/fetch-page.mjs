import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = process.argv[2] || '.';
const TARGET = 'https://niec.edu.np/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

await mkdir(OUT, { recursive: true });
await mkdir(path.join(OUT, 'css'), { recursive: true });

const res = await fetch(TARGET, { headers: { 'user-agent': UA } });
const html = await res.text();
await writeFile(path.join(OUT, 'index.html'), html);
console.log('HTML bytes:', html.length, 'status:', res.status);

// Collect stylesheet URLs
const cssUrls = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)]
  .map(m => m[0].match(/href=["']([^"']+)["']/i)?.[1])
  .filter(Boolean)
  .map(u => new URL(u, TARGET).href);

console.log('Stylesheets found:', cssUrls.length);

let i = 0;
const cssIndex = [];
for (const u of cssUrls) {
  i++;
  try {
    const r = await fetch(u, { headers: { 'user-agent': UA } });
    const t = await r.text();
    const name = String(i).padStart(2, '0') + '-' + (new URL(u).pathname.split('/').pop() || 'style.css').replace(/[^\w.-]/g, '_');
    await writeFile(path.join(OUT, 'css', name), t);
    cssIndex.push({ file: name, url: u, bytes: t.length });
  } catch (e) {
    cssIndex.push({ url: u, error: String(e) });
  }
}
await writeFile(path.join(OUT, 'css-index.json'), JSON.stringify(cssIndex, null, 2));
console.log(cssIndex.map(c => `${c.file || 'ERR'}  ${c.bytes ?? c.error}  ${c.url}`).join('\n'));
