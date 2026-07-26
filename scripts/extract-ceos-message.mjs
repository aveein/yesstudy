/**
 * Extracts the /about/ceos-message/ page content from the offline capture into
 * `src/data/ceos-message.json`.
 *
 * The prose carries inline `<strong>`, so paragraphs are emitted as arrays of runs
 * (`{ text, bold }`) rather than plain strings — that keeps the emphasis verbatim without
 * resorting to `dangerouslySetInnerHTML`.
 *
 *   node scripts/extract-ceos-message.mjs [captureDir] [outFile]
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const captureDir = process.argv[2] ?? "docs/research/_capture-ceo";
const outFile = process.argv[3] ?? "src/data/ceos-message.json";

const html = await readFile(resolve(captureDir, "index.html"), "utf8");

const decode = (s) =>
  s
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const clean = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

const localImage = (url) =>
  "/images/" + decodeURIComponent(url.split("/").pop()).toLowerCase().replace(/_/g, "-");

const at = (id) => {
  const i = html.indexOf(`elementor-element-${id} `);
  if (i === -1) throw new Error(`element ${id} not found in ${captureDir}`);
  return i;
};
const slice = (id, until) => html.slice(at(id), until ? at(until) : undefined);

/** Widget markup between `<div class="elementor-widget-container">` and its closing tag. */
const widgetHtml = (id, until) => {
  const seg = slice(id, until);
  const m = seg.match(/<div class="elementor-widget-container">([\s\S]*?)<\/div>/);
  return m ? m[1] : "";
};

/**
 * `<p>` blocks -> arrays of runs. Only `<strong>`/`<b>` are meaningful in this corpus;
 * any other inline tag is flattened to plain text.
 */
const paragraphRuns = (inner) =>
  [...inner.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => {
    const runs = [];
    const re = /<(strong|b)>([\s\S]*?)<\/\1>/g;
    let last = 0;
    let mm;
    while ((mm = re.exec(m[1]))) {
      const before = clean(m[1].slice(last, mm.index));
      if (before) runs.push({ text: before, bold: false });
      const bold = clean(mm[2]);
      if (bold) runs.push({ text: bold, bold: true });
      last = mm.index + mm[0].length;
    }
    const tail = clean(m[1].slice(last));
    if (tail) runs.push({ text: tail, bold: false });
    // Re-insert the single space that `clean()` trims at run boundaries.
    return runs.map((r, i) => ({
      ...r,
      text: i < runs.length - 1 ? r.text + " " : r.text,
    }));
  });

const heading = (id, until) => {
  const m = slice(id, until).match(
    /<(h[1-6]|span) class="elementor-heading-title[^"]*">([\s\S]*?)<\/\1>/,
  );
  return m ? clean(m[2]) : null;
};

const imageOf = (id, until) => {
  const tag = slice(id, until).match(/<img[^>]*>/);
  if (!tag) return null;
  const src = tag[0].match(/src="([^"]+)"/);
  const alt = tag[0].match(/alt="([^"]*)"/);
  const w = tag[0].match(/width="(\d+)"/);
  const h = tag[0].match(/height="(\d+)"/);
  return {
    src: localImage(src[1]),
    alt: alt ? decode(alt[1]) : "",
    width: w ? Number(w[1]) : null,
    height: h ? Number(h[1]) : null,
  };
};

/* ------------------------------------------------------------------- banner */
const banner = {
  title: heading("f8799bc", "99acf0e"),
  subtitle: heading("99acf0e", "107dd1d"),
  breadcrumb: [
    ...slice("107dd1d", "3cb4bd9").matchAll(
      /<span class="elementor-icon-list-text">([\s\S]*?)<\/span>/g,
    ),
  ].map((m) => clean(m[1])),
};

/* ------------------------------------------------------------------- blocks */
/**
 * `layout` mirrors the source container order; `background` is the container's own
 * background-color (`--e-global-color-a86860a` = the sky wash, or none = white).
 * `columns` is the declared `--width` pair at >=768px — they intentionally sum to more
 * than 100% in the first block (40% + 70%), and flex-shrink resolves the overflow.
 */
const blocks = [
  {
    id: "3cb4bd9",
    layout: "image-left",
    background: "white",
    columns: [40, 70],
    gap: 50,
    // This block spaces itself with a 60px margin and keeps the `.e-con` default 10px
    // padding; the sky blocks below use 60px padding and no margin instead.
    marginY: 60,
    paddingY: 10,
    image: imageOf("e4e17c3", "706e2d5"),
    paragraphs: paragraphRuns(widgetHtml("71d09bc", "20db9c6")),
  },
  {
    id: "20db9c6",
    layout: "image-right",
    background: "sky",
    columns: [60, 40],
    gap: 40,
    marginY: 0,
    paddingY: 60,
    image: imageOf("96f70a6", "decd8dc"),
    paragraphs: paragraphRuns(widgetHtml("8bf94df", "96f70a6")),
  },
  {
    id: "decd8dc",
    layout: "quote",
    background: "white",
    columns: null,
    gap: null,
    marginY: 0,
    paddingY: 40,
    image: null,
    paragraphs: paragraphRuns(widgetHtml("b705ab5", "e007dc7")),
  },
  {
    id: "e007dc7",
    layout: "image-left",
    background: "sky",
    columns: [40, 60],
    gap: 40,
    marginY: 0,
    paddingY: 60,
    image: imageOf("5690eb2", "2a080ad"),
    paragraphs: paragraphRuns(widgetHtml("edba404")),
  },
];

await writeFile(
  outFile,
  JSON.stringify({ banner, blocks }, null, 2) + "\n",
  "utf8",
);
console.log(
  `wrote ${outFile}: banner "${banner.title}" / "${banner.subtitle}", ${blocks.length} blocks, ` +
    `${blocks.reduce((n, b) => n + b.paragraphs.length, 0)} paragraphs, ` +
    `${blocks.filter((b) => b.image).length} images`,
);
