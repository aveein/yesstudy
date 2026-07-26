/**
 * Generalized query helper. Works against any capture dir.
 *   node qx.mjs <dir> css  <elementId...>   -> CSS rules mentioning those elementor ids
 *   node qx.mjs <dir> html <elementId>      -> pretty HTML subtree
 *   node qx.mjs <dir> text <elementId>      -> visible text of subtree
 *   node qx.mjs <dir> find <regex>          -> grep all css
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SELF = path.dirname(fileURLToPath(import.meta.url));
const [, , dirArg, cmd, ...args] = process.argv;
const DIR = path.resolve(SELF, dirArg);
const html = await readFile(path.join(DIR, 'index.html'), 'utf8');

async function allCss() {
  const dir = path.join(DIR, 'css');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.css'));
  let out = '';
  for (const f of files) out += `\n/*==== ${f} ====*/\n` + (await readFile(path.join(dir, f), 'utf8'));
  // include inline <style> blocks from the html (loop templates)
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) out += `\n/*==== inline ====*/\n` + m[1];
  return out;
}

function splitRules(css) {
  const rules = [];
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '{') { if (depth === 0) { /* selector ends */ } depth++; }
    else if (c === '}') { depth--; if (depth === 0) { rules.push(css.slice(start, i + 1)); start = i + 1; } }
    else if (depth === 0 && (c === '\n' || c === ' ') && start === i) start = i + 1;
  }
  return rules;
}

if (cmd === 'css') {
  const css = await allCss();
  const ids = args;
  const rules = splitRules(css);
  const matched = rules.filter((r) => ids.some((id) => r.includes(id)));
  console.log(matched.join('\n'));
} else if (cmd === 'find') {
  const css = await allCss();
  const re = new RegExp(args.join(' '), 'i');
  const rules = splitRules(css);
  console.log(rules.filter((r) => re.test(r)).join('\n'));
} else if (cmd === 'html' || cmd === 'text') {
  const id = args[0];
  // find the element with data-id or elementor-element-<id>
  const anchor = html.indexOf(`elementor-element-${id}`);
  if (anchor < 0) { console.log('not found: ' + id); process.exit(0); }
  // walk back to the opening <div/<a/<section
  let start = html.lastIndexOf('<', anchor);
  // balance tags forward
  let i = start, depth = 0;
  const tagRe = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g;
  tagRe.lastIndex = start;
  let m, end = html.length;
  // True HTML void elements only. SVG <path>/<use> are explicitly closed in this corpus,
  // so treating them as void made every subtree end one level early per icon.
  const voidTags = new Set(['img','br','hr','input','meta','link','source','area','col']);
  while ((m = tagRe.exec(html))) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const selfClose = m[3].trim().endsWith('/') || voidTags.has(tag);
    if (!closing && !selfClose) depth++;
    else if (closing) { depth--; if (depth === 0) { end = tagRe.lastIndex; break; } }
  }
  const sub = html.slice(start, end);
  if (cmd === 'text') {
    console.log(sub.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  } else {
    // light pretty-print
    console.log(sub.replace(/>\s*</g, '>\n<'));
  }
}
