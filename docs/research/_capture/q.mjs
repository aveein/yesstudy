/**
 * Query helper for the captured Yes Study site.
 *   node q.mjs css <elementId...>   -> all CSS rules mentioning those elementor element ids
 *   node q.mjs html <elementId>     -> pretty-printed HTML subtree for that element id
 *   node q.mjs text <elementId>     -> visible text content of that subtree
 *   node q.mjs find <regex>         -> grep the homepage CSS
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const [, , cmd, ...args] = process.argv;

const html = await readFile(path.join(DIR, 'index.html'), 'utf8');

async function allCss() {
  const dir = path.join(DIR, 'css');
  const files = (await readdir(dir)).filter((f) => /^(04|06|26|27|28|29|99)-/.test(f));
  let out = '';
  for (const f of files) out += `\n/*==== ${f} ====*/\n` + (await readFile(path.join(dir, f), 'utf8'));
  return out;
}

// split a css text into top-level rules (handles @media blocks)
function splitRules(css) {
  const rules = [];
  let depth = 0, start = 0, inMedia = null, mediaStart = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '{') { if (depth === 0) { const sel = css.slice(start, i); if (/^\s*@(media|supports)/.test(sel)) { inMedia = sel.trim(); mediaStart = i + 1; } } depth++; }
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        if (inMedia) { for (const r of splitRules(css.slice(mediaStart, i))) rules.push({ ...r, media: inMedia }); inMedia = null; }
        else rules.push({ sel: css.slice(start, css.indexOf('{', start)).trim(), body: css.slice(css.indexOf('{', start) + 1, i).trim() });
        start = i + 1;
      }
    }
  }
  return rules;
}

if (cmd === 'css') {
  const css = await allCss();
  const rules = splitRules(css.replace(/\/\*[\s\S]*?\*\//g, ''));
  const ids = args;
  for (const r of rules) {
    if (!r.sel) continue;
    if (ids.some((id) => r.sel.includes(id))) {
      const sel = r.sel.replace(/\.elementor-\d+ /g, '').replace(/\s+/g, ' ');
      console.log((r.media ? r.media + ' ' : '') + '{ ' + sel + ' }');
      console.log('   ' + r.body.replace(/;/g, ';\n   '));
      console.log();
    }
  }
} else if (cmd === 'find') {
  const css = await allCss();
  const re = new RegExp(args[0], 'gi');
  const rules = splitRules(css.replace(/\/\*[\s\S]*?\*\//g, ''));
  for (const r of rules) if (r.sel && (re.test(r.sel) || re.test(r.body))) { console.log((r.media ? r.media + ' ' : '') + r.sel.replace(/\.elementor-\d+ /g, '')); console.log('   ' + r.body.replace(/;/g, ';\n   ')); console.log(); }
} else if (cmd === 'html' || cmd === 'text') {
  // find the element with class elementor-element-<id> and return its balanced subtree
  const id = args[0];
  const marker = 'elementor-element-' + id;
  const at = html.indexOf(marker);
  if (at < 0) { console.log('not found: ' + id); process.exit(1); }
  const open = html.lastIndexOf('<', at);
  const tag = html.slice(open + 1).match(/^[a-zA-Z0-9]+/)[0];
  // walk forward balancing <tag ...> / </tag>
  let depth = 0, i = open, end = -1;
  const re = new RegExp(`<${tag}\\b|</${tag}>`, 'gi');
  re.lastIndex = open;
  let m;
  while ((m = re.exec(html))) {
    if (m[0][1] === '/') { depth--; if (depth === 0) { end = m.index + m[0].length; break; } }
    else depth++;
  }
  let sub = html.slice(open, end);
  if (cmd === 'text') {
    sub = sub.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
    sub = sub.replace(/<[^>]+>/g, '\n').replace(/&#\d+;/g, (s) => String.fromCharCode(+s.slice(2, -1)))
      .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#0*39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"');
    console.log(sub.split('\n').map((s) => s.trim()).filter(Boolean).join('\n'));
  } else {
    // light pretty print
    console.log(sub.replace(/></g, '>\n<').replace(/\s+class="/g, ' class="'));
  }
} else {
  console.log('usage: node q.mjs css|html|text|find <arg>');
}
