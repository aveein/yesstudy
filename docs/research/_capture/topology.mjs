/**
 * Print the top-level Elementor section topology of a capture.
 *   node topology.mjs <dir> [depth]
 * Emits: data-id, element_type/widget list, and a text preview per top-level section.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SELF = path.dirname(fileURLToPath(import.meta.url));
const [, , dirArg, depthArg] = process.argv;
const MAXD = Number(depthArg ?? 1);
const html = await readFile(path.resolve(SELF, dirArg, 'index.html'), 'utf8');

// Grab the main content container
// True HTML void elements only — SVG <path>/<use> are explicitly closed in this corpus.
const voidTags = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'area', 'col']);

function matchFrom(start) {
  const tagRe = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g;
  tagRe.lastIndex = start;
  let m, depth = 0;
  while ((m = tagRe.exec(html))) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const selfClose = m[3].trim().endsWith('/') || voidTags.has(tag);
    if (!closing && !selfClose) depth++;
    else if (closing) { depth--; if (depth === 0) return tagRe.lastIndex; }
  }
  return html.length;
}

// Find the elementor wrappers we care about (header / page content / footer), by location type.
const WANT = new Set(['wp-page', 'single-page', 'header', 'footer']);
const wrapRe = /<(?:div|header|footer|section)\b[^>]*\bdata-elementor-type="([^"]+)"[^>]*>/g;
let w;
const wrappers = [];
while ((w = wrapRe.exec(html))) {
  if (!WANT.has(w[1])) continue;
  const post = html.slice(w.index, wrapRe.lastIndex).match(/elementor-(\d+)/)?.[1] ?? '?';
  wrappers.push({ post: `${post} (${w[1]})`, start: w.index, bodyStart: wrapRe.lastIndex });
}

function scanChildren(from, to, depth) {
  // find elementor-element divs whose nesting depth relative to `from` is 1
  const re = /<(div|section|header|footer)([^>]*\bclass="[^"]*elementor-element[^"]*"[^>]*)>/g;
  re.lastIndex = from;
  let m;
  const out = [];
  let cursor = from;
  while ((m = re.exec(html)) && m.index < to) {
    if (m.index < cursor) continue;
    const attrs = m[2];
    const id = attrs.match(/data-id="([^"]+)"/)?.[1] ?? '?';
    const type = attrs.match(/data-element_type="([^"]+)"/)?.[1] ?? '?';
    const widget = attrs.match(/data-widget_type="([^"]+)"/)?.[1] ?? '';
    const end = matchFrom(m.index);
    const inner = html.slice(m.index, end);
    const text = inner.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const imgs = [...inner.matchAll(/<img[^>]+src="([^"]+)"/g)].length;
    out.push({ id, type, widget, end, text, imgs, start: m.index });
    if (depth < MAXD) out.push(...scanChildren(re.lastIndex, end, depth + 1).map(c => ({ ...c, _d: (c._d ?? 1) + 1 })));
    cursor = end;
    re.lastIndex = end;
  }
  return out;
}

for (const wr of wrappers) {
  const end = matchFrom(wr.start);
  console.log(`\n########## elementor-${wr.post} ##########`);
  for (const c of scanChildren(wr.bodyStart, end, 1)) {
    const pad = '  '.repeat((c._d ?? 1) - 1);
    console.log(`${pad}[${c.id}] ${c.type}${c.widget ? ':' + c.widget : ''} imgs=${c.imgs}`);
    console.log(`${pad}    "${c.text.slice(0, 260)}"`);
  }
}
