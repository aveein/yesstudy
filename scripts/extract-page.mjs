import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'node-html-parser';

// Usage: node scripts/extract-page.mjs <captureDir> <outJson> <slug> <country>
const [dir, out, slug, country] = process.argv.slice(2);
const html = await readFile(`${dir}/index.html`, 'utf8');
const root = parse(html, { blockTextElements: { style: false, script: false } });

const el = (id) => root.querySelector('.elementor-element-' + id);
// Find the nearest top-level section (e-parent) whose heading matches a regex.
const sectionByHeading = (re) => {
  for (const h of root.querySelectorAll('.elementor-heading-title')) {
    if (!re.test(h.text)) continue;
    let p = h;
    for (let i = 0; i < 10 && p; i++) {
      p = p.parentNode;
      const cls = p?.getAttribute?.('class') || '';
      if (/\be-parent\b/.test(cls)) return p;
    }
  }
  return null;
};
const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
const imgName = (src) => {
  if (!src) return null;
  let b = src.split('/').pop().split('?')[0];
  b = b.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1');
  return '/images/' + b.toLowerCase();
};
// paragraphs from a text-editor widget container (split on <p>/<br>/<li>)
const paras = (node) => {
  if (!node) return [];
  const c = node.querySelector('.elementor-widget-container') || node;
  const ps = c.querySelectorAll('p, li');
  let list = ps.length ? ps.map((p) => clean(p.text)).filter(Boolean)
                        : [clean(c.text)].filter(Boolean);
  return list;
};

// Map of loop-item id -> background image (Elementor sets these in inline <style> blocks)
const loopBg = {};
for (const m of html.matchAll(/e-loop-item-(\d+)[^{]*\{background-image:url\("([^"]+)"\)/g)) {
  loopBg[m[1]] = imgName(m[2]);
}
function loopItemImage(item) {
  const img = item.querySelector('img')?.getAttribute('src');
  if (img) return imgName(img);
  const id = (item.getAttribute('class') || '').match(/e-loop-item-(\d+)/)?.[1];
  return id ? loopBg[id] || null : null;
}

function widgetsOf(container) {
  return container.querySelectorAll('.elementor-widget[data-widget_type]');
}

function parseBlocks(rightContainer) {
  const blocks = [];
  for (const w of widgetsOf(rightContainer)) {
    const wt = w.getAttribute('data-widget_type') || '';
    if (wt.startsWith('text-editor')) {
      const p = paras(w); if (p.length) blocks.push({ kind: 'prose', paragraphs: p });
    } else if (wt.startsWith('image-box')) {
      blocks.push({
        kind: 'imagebox',
        image: imgName(w.querySelector('img')?.getAttribute('src')),
        title: clean(w.querySelector('.elementor-image-box-title')?.text),
        text: clean(w.querySelector('.elementor-image-box-description')?.text),
      });
    } else if (wt.startsWith('image')) {
      blocks.push({ kind: 'image', image: imgName(w.querySelector('img')?.getAttribute('src')), alt: w.querySelector('img')?.getAttribute('alt') || '' });
    } else if (wt.startsWith('heading')) {
      const h = w.querySelector('.elementor-heading-title');
      blocks.push({ kind: 'heading', level: h?.tagName?.toLowerCase() || 'h4', text: clean(h?.text) });
    }
    // dividers, buttons handled elsewhere / skipped
  }
  return blocks;
}

function parseChapter(id) {
  const rootEl = el(id);
  if (!rootEl) return null;
  const inner = rootEl.querySelector('.e-con-inner') || rootEl;
  const containers = inner.childNodes.filter((n) => n.nodeType === 1 && (n.getAttribute('data-element_type') === 'container'));
  const headEls = containers[0]?.querySelectorAll('.elementor-heading-title') || [];
  const number = clean(headEls[0]?.text);
  const title = clean(headEls[1]?.text);
  const groups = [];
  for (const g of containers.slice(1)) {
    const gi = g.querySelector('.e-con-inner') || g;
    const cols = gi.childNodes.filter((n) => n.nodeType === 1 && n.getAttribute('data-element_type') === 'container');
    if (cols.length < 2) continue;
    const label = clean(cols[0].querySelector('.elementor-heading-title')?.text);
    const blocks = parseBlocks(cols[1]);
    groups.push({ label, blocks });
  }
  return { number, title, groups };
}

// ---- Hero ----
function parseHero() {
  const h = el('bff025c');
  if (!h) return null;
  const title = clean(h.querySelector('h1.elementor-heading-title')?.text
    || h.querySelector('.elementor-heading-title')?.text);
  const subtitle = clean(h.querySelector('.elementor-widget-text-editor')?.text);
  const img = imgName(h.querySelector('img')?.getAttribute('src'));
  // Sticky sub-nav labels (verbatim from the live pages; they anchor into the guide).
  const nav = [
    { label: 'Overview', href: '#overview' },
    { label: `Education in ${country}`, href: '#education' },
    { label: `Studying in ${country}`, href: '#studying' },
    { label: 'Get Started', href: '#get-started' },
  ];
  return { title, subtitle, image: img, nav };
}

// ---- Overview (heading + intro prose + closing prose) ----
function parseOverview() {
  const head = el('a03a4bb');
  const headings = head?.querySelectorAll('.elementor-heading-title') || [];
  const eyebrow = clean(headings[0]?.text);
  const heading = clean(headings[1]?.text);
  const intro = paras(el('5f7ea8c'));
  const closing = paras(el('596aae7'));
  const video = root.querySelector('.elementor-element-060c1c0 iframe')?.getAttribute('src')
    || (el('060c1c0')?.querySelector('.elementor-widget-video')?.getAttribute('data-settings') || '');
  return { eyebrow, heading, intro, closing };
}

// ---- FAQ accordion (UiCore) ----
function parseFaq() {
  const f = sectionByHeading(/Frequently Asked Questions/i) || el('5a5b593');
  if (!f) return null;
  const heading = clean(f.querySelector('.elementor-heading-title')?.text);
  let items = [];
  // UiCore content accordion (uc_trigger / uc_content)
  const triggers = f.querySelectorAll('.uc_trigger');
  if (triggers.length) {
    const contents = f.querySelectorAll('.uc_content');
    items = triggers.map((t, i) => ({ question: clean(t.text), answer: paras(contents[i]) }));
  } else {
    // Elementor nested-accordion: <details><summary class="e-n-accordion-item-title">Q</summary><div>A</div></details>
    for (const d of f.querySelectorAll('.e-n-accordion-item, details')) {
      const summary = d.querySelector('summary, .e-n-accordion-item-title');
      const question = clean(summary?.querySelector('.e-n-accordion-item-title-text')?.text || summary?.text)
        .replace(/^["']+|["']+$/g, '');
      const answerNode = d.querySelector('.e-n-accordion-item-content, .e-con-inner') || d;
      const answer = paras(answerNode);
      if (question) items.push({ question, answer });
    }
  }
  items = items.filter((x) => x.question);
  return { heading, items };
}

// ---- Video id from overview ----
function parseVideo() {
  const vid = root.querySelector('.elementor-widget-video');
  const s = vid?.getAttribute('data-settings') || '';
  const m = s.match(/watch\?v=([\w-]+)/) || s.match(/youtu\.be\\?\/([\w-]+)/);
  return m ? m[1] : null;
}

// ---- Shape Your Future (visa carousel + lead form) ----
function parseShape() {
  const s = sectionByHeading(/Shape Your Future/i) || el('cac206c');
  if (!s) return null;
  const headings = s.querySelectorAll('.elementor-heading-title');
  const heading = clean(headings[0]?.text);
  const sub = clean(headings[1]?.text);
  const body = paras(s.querySelector('.elementor-widget-text-editor'));
  // visa carousel images (dedupe, cap 12)
  const seen = new Set(); const visa = [];
  for (const img of s.querySelectorAll('img')) {
    const src = img.getAttribute('src') || '';
    if (!/Visa|_Visa|Visa-Granted|visa/i.test(src)) continue;
    const name = imgName(src);
    if (name && !seen.has(name)) { seen.add(name); visa.push({ image: name, alt: clean(img.getAttribute('alt')) }); }
    if (visa.length >= 12) break;
  }
  return { heading, sub, body, visa };
}

// ---- CTA carousel (Expert guidance) ----
function parseCta() {
  const c = sectionByHeading(/Expert guidance/i) || el('6cb0610');
  if (!c) return null;
  const heading = clean(c.querySelector('.elementor-heading-title')?.text);
  const cards = [];
  for (const item of c.querySelectorAll('.e-loop-item')) {
    const name = clean(item.querySelector('.elementor-heading-title, .elementor-image-box-title')?.text);
    const image = loopItemImage(item);
    const href = item.querySelector('a')?.getAttribute('href') || '#';
    if (name || image) cards.push({ name, image, href });
  }
  return { heading, cards };
}

// ---- Universities carousel (#6) ----
function parseUniversities() {
  const u = el('bf6759c');
  if (!u) return null;
  const heading = clean(u.querySelector('.elementor-heading-title')?.text);
  const cards = [];
  for (const card of u.querySelectorAll('.e-loop-item')) {
    const img = imgName(card.querySelector('img')?.getAttribute('src'));
    const name = clean(card.querySelector('.elementor-heading-title')?.text);
    const a = card.querySelector('a')?.getAttribute('href');
    if (name || img) cards.push({ name, image: img, href: a || '#' });
  }
  return { heading, cards };
}

const data = {
  slug, country,
  hero: parseHero(),
  overview: { ...parseOverview(), videoId: parseVideo() },
  shape: parseShape(),
  chapters: ['0cda169', 'abcb3d6', '92024df', 'd4213f5', '55d7d67'].map(parseChapter).filter(Boolean),
  universities: parseUniversities(),
  faq: parseFaq(),
  cta: parseCta(),
};

await writeFile(out, JSON.stringify(data, null, 2));
console.log('wrote', out);
console.log('hero.title=', data.hero?.title, '| nav=', data.hero?.nav?.map(n=>n.label).join('/'));
console.log('overview.heading=', data.overview?.heading);
console.log('chapters=', data.chapters.map(c => `${c.number}:${c.title}(${c.groups.length}g)`).join(' | '));
console.log('universities=', data.universities?.heading, '| cards=', data.universities?.cards?.length);
console.log('faq=', data.faq?.heading, '| items=', data.faq?.items?.length);
