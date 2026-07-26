/**
 * Extracts the /study-abroad/ landing page content from the offline capture into
 * `src/data/study-abroad-landing.json`.
 *
 * Every string in the JSON is lifted verbatim from the capture — nothing is hand-typed, so
 * re-running this after a fresh `fetch-url.mjs` pull keeps the clone in sync with the source.
 *
 *   node scripts/extract-study-abroad.mjs [captureDir] [outFile]
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const captureDir = process.argv[2] ?? "docs/research/_capture-studyabroad";
const outFile = process.argv[3] ?? "src/data/study-abroad-landing.json";

const html = await readFile(resolve(captureDir, "index.html"), "utf8");

/** Upstream uploads URL -> local `public/images/` path (lowercased, `_` -> `-`). */
const localImage = (url) =>
  "/images/" +
  decodeURIComponent(url.split("/").pop()).toLowerCase().replace(/_/g, "-");

/** Absolute niec.edu.np links -> site-relative. */
const localHref = (href) => href.replace(/^https?:\/\/niec\.edu\.np/, "") || "/";

const decode = (s) =>
  s
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Collapse the literal newlines Elementor stores inside headings, as HTML rendering does. */
const text = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** Start offset of an Elementor element's opening tag. */
const at = (id) => {
  const i = html.indexOf(`elementor-element-${id} `);
  if (i === -1) throw new Error(`element ${id} not found in ${captureDir}`);
  return i;
};

/** The markup of element `id`, ending where `until` begins. */
const slice = (id, until) => html.slice(at(id), until ? at(until) : undefined);

const heading = (seg) => {
  const m = seg.match(
    /<(h[1-6]|span) class="elementor-heading-title[^"]*">([\s\S]*?)<\/\1>/,
  );
  return m ? text(m[2]) : null;
};
const paragraphs = (seg) =>
  [...seg.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => text(m[1])).filter(Boolean);
const firstImage = (seg) => {
  const tag = seg.match(/<img[^>]*>/);
  if (!tag) return null;
  const src = tag[0].match(/src="([^"]+)"/);
  const alt = tag[0].match(/alt="([^"]*)"/);
  return src ? { src: localImage(src[1]), alt: alt ? decode(alt[1]) : "" } : null;
};

/* ---------------------------------------------------------------- hero + nav */
const heroSeg = slice("2ee91af", "e0a5daf");
const navSeg = slice("e0a5daf", "37a26b4");
const heroImage = firstImage(heroSeg);

const hero = {
  title: heading(heroSeg),
  intro: paragraphs(heroSeg)[0],
  image: heroImage.src,
  imageAlt: heroImage.alt,
  nav: [...navSeg.matchAll(/href="(#[^"]*)"[\s\S]*?elementor-button-text">([^<]+)</g)].map(
    (m) => ({ href: m[1], label: decode(m[2]).trim() }),
  ),
};

/* ------------------------------------------------------------------ overview */
const overviewSeg = slice("37a26b4", "1e344ab");
const overviewHeadings = [
  ...overviewSeg.matchAll(
    /<(h[1-6]|span) class="elementor-heading-title[^"]*">([\s\S]*?)<\/\1>/g,
  ),
].map((m) => text(m[2]));

const overview = {
  eyebrow: overviewHeadings[0],
  heading: overviewHeadings[1],
  body: paragraphs(overviewSeg)[0],
  image: firstImage(overviewSeg).src,
};

/* -------------------------------------------------------------- destinations */
const destSeg = slice("1e344ab", "ef9e95d");
const destHeadings = [
  ...slice("dc2b2ab", "711bd23").matchAll(
    /<(h[1-6]) class="elementor-heading-title[^"]*">([\s\S]*?)<\/\1>/g,
  ),
].map((m) => text(m[2]));

// Each loop item is preceded by a <style> that carries its background image.
const cardBg = {};
for (const m of destSeg.matchAll(
  /e-loop-item-(\d+)[^{]*\{background-image:url\("([^"]+)"\)/g,
)) {
  cardBg[m[1]] = m[2];
}
const destinations = {
  eyebrow: destHeadings[0],
  heading: destHeadings[1],
  cards: [
    ...destSeg.matchAll(
      /e-loop-item-(\d+)[\s\S]*?<h3 class="elementor-heading-title[^"]*">([^<]+)<\/h3>[\s\S]*?href="([^"]+)"[\s\S]*?elementor-button-text">([^<]+)</g,
    ),
  ].map((m) => ({
    country: text(m[2]),
    href: localHref(m[3]),
    image: localImage(cardBg[m[1]]),
    cta: decode(m[4]).trim(),
  })),
};

/* ------------------------------------------------------------- what you get */
const wygSeg = slice("ef9e95d", "8bd726b");
const wygHeadings = [
  ...wygSeg.matchAll(/<(h[1-6]) class="elementor-heading-title[^"]*">([\s\S]*?)<\/\1>/g),
].map((m) => text(m[2]));

const whatYouGet = {
  eyebrow: wygHeadings[0],
  heading: wygHeadings[1],
  body: paragraphs(wygSeg)[0],
};

/* ------------------------------------------------------- services grid + CTA */
const cardIds = [
  "682a633",
  "b508572",
  "092c7e9",
  "4e81279",
  "64227e9",
  "95e4ca8",
  "ff0468b",
];
const serviceCards = cardIds.map((id, i) => {
  const seg = slice(id, cardIds[i + 1] ?? "39dd4f8");
  return {
    title: heading(seg),
    image: firstImage(seg).src,
    paragraphs: paragraphs(seg),
  };
});

// The CTA is the last element of the page template; bound it at the footer template so the
// footer's inline loop-item <style> blocks cannot leak into the matches below.
const footerStart = html.indexOf('data-elementor-type="footer"');
const ctaSeg = html.slice(at("39dd4f8"), footerStart === -1 ? undefined : footerStart);
const ctaHeadings = [
  ...ctaSeg.matchAll(/<(h[1-6]) class="elementor-heading-title[^"]*">([\s\S]*?)<\/\1>/g),
].map((m) => text(m[2]));

// The CTA's background lives in the page stylesheet, not inline in the markup.
const pageCss = await readFile(
  resolve(captureDir, "css/23-post-3050.css"),
  "utf8",
).catch(() => "");
const ctaBg = pageCss
  .split("\n")
  .find((l) => l.includes("elementor-element-39dd4f8") && l.includes("background-image"))
  ?.match(/background-image:url\("([^"]+)"\)/);

const services = {
  cards: serviceCards,
  cta: {
    eyebrow: ctaHeadings[0],
    heading: ctaHeadings[1],
    body: paragraphs(ctaSeg)[0],
    // The source opens Elementor popup 5542, which this clone does not implement;
    // point at the real contact page instead (same convention as the Header CTA).
    buttonLabel: text(
      ctaSeg.match(/elementor-button-text">([^<]+)</)?.[1] ?? "GET STARTED",
    ),
    buttonHref: "/contact-us/",
    image: localImage(
      ctaBg?.[1] ??
        "https://niec.edu.np/wp-content/uploads/2024/04/8-e1712645895727.jpg",
    ),
  },
};

const data = { hero, overview, destinations, whatYouGet, services };
await writeFile(outFile, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(
  `wrote ${outFile}: ${hero.nav.length} nav items, ${destinations.cards.length} destinations, ${services.cards.length} service cards`,
);
