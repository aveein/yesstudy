/**
 * Downloads every image, font, and favicon used by https://niec.edu.np/ into public/.
 *
 * Source URLs are read from scripts/asset-manifest.json (generated during inspection).
 * Filenames are normalised: WordPress/PageSpeed mangling (`xFoo.png.pagespeed.ic_.HASH.png`,
 * `-1024x799` size suffixes, hash prefixes) is stripped so components can import stable paths.
 *
 * Usage: node scripts/download-assets.mjs
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const CONCURRENCY = 3;

const manifest = JSON.parse(await readFile(path.join(ROOT, 'scripts', 'asset-manifest.json'), 'utf8'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download({ url, dest }) {
  const abs = path.join(ROOT, 'public', dest);
  await mkdir(path.dirname(abs), { recursive: true });

  // The origin drops connections under burst load, so retry with backoff.
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA } });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) throw new Error('empty body');
      await writeFile(abs, buf);
      return buf.length;
    } catch (err) {
      lastErr = err;
      if (attempt < 4) await sleep(attempt * 750);
    }
  }
  throw lastErr;
}

const results = { ok: [], failed: [] };

for (let i = 0; i < manifest.length; i += CONCURRENCY) {
  const batch = manifest.slice(i, i + CONCURRENCY);
  await Promise.all(
    batch.map(async (item) => {
      try {
        const bytes = await download(item);
        results.ok.push({ ...item, bytes });
        console.log(`  ok  ${String(Math.round(bytes / 1024)).padStart(5)}kb  ${item.dest}`);
      } catch (err) {
        results.failed.push({ ...item, error: String(err.message ?? err) });
        console.error(`  FAIL              ${item.dest}  -> ${err.message ?? err}`);
      }
    }),
  );
}

console.log(`\nDownloaded ${results.ok.length}/${manifest.length} assets.`);
if (results.failed.length) {
  console.log('Failures:');
  for (const f of results.failed) console.log(`  ${f.dest}  <-  ${f.url}\n    ${f.error}`);
  process.exitCode = 1;
}
