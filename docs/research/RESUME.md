# Resume Notes — niec.edu.np clone

**Session 3 completed the clone.** All 17 planned sections are resolved: 16 built + committed,
1 (`Success Stories`, `8b44307`) intentionally skipped because it is `display: none` live.

## Status: DONE

- **16 components built & committed**, assembled into `src/app/page.tsx` in topology order.
- `npm run build` passes clean (Next.js 16, Turbopack). `npx tsc --noEmit` clean.
- Phase 5 visual QA done in-browser against the dev server — every section matches the
  reference screenshots (header, hero, about, what-we-do, latest events, study abroad,
  why choose us, our classes, featured universities, testimonials, career path, blog,
  video, contact, our offices marquee, footer).

### Components (all in `src/components/`)
`Header`, `HeroCarousel`, `AboutSection`, `WhatWeDoSection`, `LatestEventsSection`,
`StudyAbroadSection`, `WhyChooseUsSection`, `OurClassesSection`, `FeaturedUniversitiesSection`,
`TestimonialsSection`, `CareerPathSection`, `BlogSection`, `VideoSection`, `ContactSection`,
`OurOfficesSection`, `Footer`. Shared: `ui/carousel.tsx`, `icons.tsx`.

### Notes for future work
- `OurOfficesSection` is a **CSS marquee** (not the shared `Carousel`) — Swiper delay:0 speed:10000
  is a continuous drift; implemented with an injected `@keyframes` translating the doubled track.
- `ContactSection` form is **visual only** (`<form method="dialog">`, no backend).
- Specs for every section are in `docs/research/components/*.spec.md`.
- Global site-wide CSS rules are in `docs/research/GLOBAL_DEFAULTS.md` (read before touching any
  heading/button — Elementor headings/buttons are `line-height: 1`).

## Session 3b: interior guide pages (study-abroad)

Cloned two country-guide pages that share one Elementor template with different content:
`/study-abroad/study-in-usa` and `/study-abroad/study-in-australia`.

- **Architecture:** parameterized components in `src/components/study-abroad/` (`StudyHero`,
  `OverviewSection`, `ShapeYourFuture`, `ChapterSection`, `UniversityListCarousel`,
  `FaqAccordion`, `CtaCarousel`) driven by per-country JSON in `src/data/study-in-*.json`.
  Header, Footer, Contact and Our Offices are reused from the homepage.
- **Content extraction is programmatic** — `scripts/extract-page.mjs` parses the offline
  capture (`docs/research/_capture-usa|-australia/`) into structured JSON so verbatim prose
  and image paths never pass through a hand-copy step. Re-run per capture dir. It is
  heading-driven for the nav/FAQ/Shape/CTA sections so one extractor serves both pages, and
  handles both the UiCore (`uc_trigger`) and Elementor nested-accordion FAQ widgets.
- **Capture tooling:** `scripts/../_capture/fetch-url.mjs <url> <outDir>` mirrors any page;
  `qx.mjs <dir> css|html|text|find` queries it. Images bulk-downloaded via
  `scripts/download-usa.mjs <urlListFile>`.
- Australia has **no "Shape Your Future" section** (shape=null in its data; the route guards
  it) and a different hero H1 ("Best Consultancy in Nepal For Australia") — both are faithful
  to the live page, not bugs.

## Session 4: `/about/` and `/contact-us/`

Both interior pages cloned. Routes: `src/app/about/page.tsx`, `src/app/contact-us/page.tsx`.

- **Most of both pages was already built.** The site-wide Elementor **footer template `3223`**
  contains the contact form, the Our Offices marquee *and* the footer links — so `ContactSection`,
  `OurOfficesSection` and `Footer` are reused verbatim on every interior page. Only 5 components
  were genuinely new:
  - `PageBanner` — shared breadcrumb hero (Elementor `779a760`, in the single-page template
    `2866`, so **every** interior page gets it). Its content column is **700px**, not the site's
    usual 1200px.
  - `about/AboutOverview`, `about/MissionVisionSection` (one parameterized component rendered
    twice — Mission is image-left/cream, Vision is text-left/white)
  - `contact/ContactInfoBar`, `contact/GetInTouchSection`
- New icons in `icons.tsx`: `MapMarkerIcon`, `EnvelopeOutlineIcon` (the pre-existing
  `EnvelopeIcon` is the **solid** variant; the contact page uses the outlined one).
- New assets: `header-bg.png`, `about-our-mission.webp`, `about-our-vision.webp`.
- Specs: `docs/research/components/{page-banner,about-overview,about-mission-vision,contact-info-bar,contact-get-in-touch}.spec.md`.
  Topology appended to `PAGE_TOPOLOGY.md`.

### Traps found this session (read before cloning another interior page)

1. **`_capture/qx.mjs` had a parser bug** — it treated SVG `<path>` as a void tag, but this
   corpus closes it explicitly, so every subtree ended one level early *per icon*. That made
   the contact page's email box look like a sibling of the address/phone row when it is
   actually the third column of it. **Fixed** in `qx.mjs` and the new `_capture/topology.mjs`.
   If a subtree looks truncated, suspect this class of bug first.
2. **Elementor inner containers carry a default `padding: 10px`** that is *not* in the
   per-section CSS. Every half/third-width column on both pages has it. Miss it and text
   columns come out 20px too wide. Not visible in the CSS dump — only in `getComputedStyle`.
3. **Buttons are 15px, not 16px.** The kit's nominal size is 16 but the live submit button
   computes to `15px/15px` (41px tall).
4. **A native `<select>` does not inherit `elementor-size-lg`'s font-size.** The text inputs
   render 18px/1.4; the select renders **16px/24px** at the same 59px height.
5. Composing two `text-[…]` utilities into one class string is a coin flip — they are the same
   Tailwind utility, so CSS order wins, not string order. Split the base class instead.
6. **`resize_window` does not change the viewport in this Chrome setup** (it stayed 1905px).
   Responsive work was verified by extracting the media queries from the capture and then
   asserting the built CSS scopes each rule correctly — Tailwind v4 emits
   `@media (min-width:48rem)` and there are **two** such blocks in the bundle.

### New tooling
- `docs/research/_capture/topology.mjs <dir> [depth]` — prints the Elementor section tree
  (data-id, widget type, image count, text preview) for any capture dir. Use it to map a page
  before writing specs.

### Possible polish items (none blocking)
- `npm run check` fails on a **pre-existing** lint error in `AboutSection.tsx`
  (`react-hooks/set-state-in-effect`, homepage counter animation) — unrelated to sessions 3b/4,
  but it blocks the combined script, so use `npx tsc --noEmit && npm run build` until it is fixed.
- The clone's `.niec-container` uses a 20px horizontal gutter; the live `.e-con` uses 10px.
  Only differs below ~1240px. Left as-is for consistency with the 23 existing components.
- Header CTA still points at `/contact/` while the real page is `/contact-us/`.
- Footer column headings are `11px/700` verbatim from the capture (smaller than their 14px links)
  — kept faithful; revisit only if the client wants them enlarged.
- `metadataBase` warning at build time (cosmetic; set it if OG images matter).

## Session 5: `/study-abroad/` landing page

Cloned the study-abroad **landing** page (Elementor page `3050`). Route:
`src/app/study-abroad/page.tsx`. Five new components in
`src/components/study-abroad-landing/`:

`StudyAbroadHero` (hero + anchor nav), `StudyAbroadOverview`, `StudyAbroadDestinations`,
`WhatYouGetSection`, `StudyAbroadServices` (7 cards + the "Get in touch" CTA, which is the
8th cell of the same grid — not a sibling section).

- **Content is programmatic.** `scripts/extract-study-abroad.mjs` parses
  `docs/research/_capture-studyabroad/` into `src/data/study-abroad-landing.json`; types in
  `src/types/study-abroad-landing.ts`. Re-run the script after any fresh capture.
- **Reuse:** `Header`, `ContactSection`, `OurOfficesSection`, `Footer` verbatim. The six
  destination images were already in `public/images/` from the homepage section.
- **New assets:** `layer-660.png`, `s1.png`–`s7.png`, `8-e1712645895727.jpg` (9 files).
  The hero banner was already present as `study-abroad-website-banner-2025-new.png`.
- Specs: `docs/research/components/study-abroad-{hero,overview,destinations,what-you-get,services}.spec.md`.
  Topology + the five traps for this page appended to `PAGE_TOPOLOGY.md`.

### Phase 5 visual QA — done, passing

Run in-browser at 1920px against the live page, comparing `getComputedStyle` and bounding
boxes element by element. **All five sections match the live page's height exactly:**
hero `583` · nav `96` · overview `690` · destinations `1236` · what-you-get `219` ·
services grid `2433`. Grid tracks match to the sub-pixel (`353.328 353.328 353.344`).

Three real defects were found and fixed. None of them is visible in the section CSS — only a
live `getComputedStyle` pass catches this class of bug:

1. **Overview image was stretched.** It keeps its intrinsic `width: 520px` (`max-width: 100%`)
   and is *centred* by the widget's `text-align: center`, while the column's content box is
   555px. The clone had `w-full`. Now `mx-auto w-[520px] max-w-full`.
2. **Missing 30px gap in the destinations section.** `1e344ab` declares no `--gap`, so it
   inherits the kit's 30px `--widgets-spacing` between the heading row and the grid. The
   section measured 1206px against the live 1236px until this was added.
3. **Nav buttons were `block`.** Elementor's `.elementor-button` is `inline-block`; the
   baseline descender makes each column 36px against a 33px button, so the nav is 96px, not 93px.

Also switched `auto-rows-fr` → `auto-rows-[1fr]`: Tailwind's named utility emits
`minmax(0,1fr)`, which is not the value Elementor sets.

Verified visually section by section. The only remaining differences from the live page are
the two **intentional** re-theme swaps (`#FFF5F0` → `brand-tint`, `#FC6E1F` → `brand-primary`).

### Gaps / follow-ups
- **Mobile (≤767px) was not visually verified.** `resize_window` still does not change the
  viewport in this Chrome setup (session-4 trap #6 reconfirmed — it stayed 1920px). The
  mobile rules were verified by asserting the compiled Tailwind output instead: the base
  `grid-template-rows:repeat(2,1fr)` sits at the top level of `@layer utilities` while the
  `repeat(4,1fr)` variant is scoped to `@media (min-width:48rem)`, matching Elementor's
  767/768 breakpoint.
- The "GET STARTED" button opens Elementor **popup 5542** upstream. No popup has been built in
  any session; it links to `/contact-us/` instead (same convention as the Header CTA).
- `npm run check` still fails on the **pre-existing** lint error in `AboutSection.tsx`
  (`react-hooks/set-state-in-effect`). Use `npx tsc --noEmit && npm run build`.

## Session 6: `/about/ceos-message/`

Cloned the CEO's Message page (Elementor page `5973`). Route:
`src/app/about/ceos-message/page.tsx`.

- **One new component:** `src/components/about/CeoMessageBlock.tsx`, parameterized over three
  layouts (`image-left`, `image-right`, `quote`) and driven by `src/data/ceos-message.json`.
- **`PageBanner` gained an optional `subtitle` prop.** When present the title renders at 32px
  instead of 40px, matching this page's banner. `/about/` and `/contact-us/` pass no
  subtitle and are unchanged.
- **Content is programmatic:** `scripts/extract-ceos-message.mjs` parses
  `docs/research/_capture-ceo/`. Because the prose carries inline `<strong>`, paragraphs are
  emitted as arrays of runs (`{ text, bold }`) rather than strings — no
  `dangerouslySetInnerHTML`, no hand-copied prose.
- **3 new assets:** `webpc-passthru-{8-2,9-1,10-1}.webp`. `header-bg.png` was already present.
- Specs: `docs/research/components/{ceo-banner,ceo-message-blocks}.spec.md`.
  Topology + four traps appended to `PAGE_TOPOLOGY.md`.

### Phase 5 visual QA — done, passing, zero fixes needed

Measured live-vs-clone at 1920px. **Every section matched on the first build:**

| Section | Live | Clone |
|---|---|---|
| Banner | 326 | 326 |
| Message 1 | 614 | 614 |
| Message 2 | 464 | 464 |
| Pull quote | 270 | 270 |
| Message 3 | 437 | 437 |

Sub-pixel column widths match too (`418.906 / 731.094` and `695.859 / 464.141`), which is the
real check that the flex-shrink reproduction of the 110% column pair is correct rather than
coincidentally close. Quote rule verified as `6px solid rgb(17,17,17)` with 40px padding on an
800px column.

> One false alarm worth remembering: the portrait looks **blank** in a screenshot taken
> immediately after `scrollTo`. It is `next/image` lazy loading, not a broken asset — the
> element reports `complete: true` / `naturalWidth: 370`. Re-screenshot after a short wait
> before chasing an "empty image" on this page.
