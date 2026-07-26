import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('public/images');
await mkdir(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const urls = (await readFile(process.argv[2], 'utf8')).split('\n').map(s => s.trim()).filter(Boolean);
const local = (u) => path.basename(new URL(u).pathname).toLowerCase();

async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function dl(u, tries = 0) {
  const dest = path.join(OUT, local(u));
  if (await exists(dest)) return { u, skipped: true };
  try {
    const r = await fetch(u, { headers: { 'user-agent': UA } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    await writeFile(dest, buf);
    return { u, bytes: buf.length };
  } catch (e) {
    if (tries < 3) { await new Promise(r => setTimeout(r, 500 * (tries + 1))); return dl(u, tries + 1); }
    return { u, error: String(e) };
  }
}

let ok = 0, skip = 0, err = 0;
for (let i = 0; i < urls.length; i += 4) {
  const batch = urls.slice(i, i + 4);
  const res = await Promise.all(batch.map(u => dl(u)));
  for (const r of res) { if (r.skipped) skip++; else if (r.error) { err++; console.log('ERR', local(r.u), r.error); } else ok++; }
}
console.log(`downloaded ${ok}, skipped ${skip}, errors ${err}`);
