# OurOfficesSection Specification

## Overview
- **Target file:** `src/components/OurOfficesSection.tsx`
- **Elementor id:** `4bb762f` (section F1). Loop carousel `d7eb425`, card template `4834`.
- **Interaction model:** **continuous marquee** — autoplay delay 0, speed 10000ms linear, gap 50px,
  3/2/1 per view, infinite, pause on hover.

**Do NOT use the shared `Carousel` primitive** (it steps). Implement a CSS `@keyframes` linear-infinite
marquee: render the slides **twice**, translateX 0 → -50% over ~60s, `animation-timing-function: linear`,
`infinite`; pause on `:hover`.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure
```
section 4bb762f   FULL-BLEED (e-con-full), white, flex column, gap 50px, margin-top 100px
  2d0925d   header row (BOXED 1200px, padding 0 20px), flex row, gap 10px. Two children:
    e9b0baf   heading column
      f101bcb  "Our Offices"  <h2> 20px/400, color #FC6E1F (ORANGE), text-align start (tablet: center)
      18ddd78  "We are located at your favourite city "  <p> heading 45px/700 (mobile 32px),
               line-height 1.2em, niec-ink, text-align start (tablet ≤1024: center)
    f4a4549   button cell, justify-content center
      c88d6a9  "Visit Us" pill, align-right (mobile center) → the long google.com/search?q=niec+nepal URL, target _blank
  3a271b2   FULL-BLEED carousel container (width 100%)
    d7eb425  marquee track
```
Note: the "Our Offices" eyebrow is **orange**, and the headline is **45px** — both differ from other sections.

## Office card — template 4834 (the whole card is a link `<a>`)
Card root 042963d:
- flex column, **justify-content flex-end** (content pinned to bottom), gap 10px
- **min-height 500px** (mobile ≤767: 400px), border-radius 20px, padding 35px
- bg image per card (cover, center)
- gradient scrim ::before at overlay-opacity 0.5:
  `linear-gradient(180deg, #00ADEF00 0%, #00000094 89%)` → bake the 0.5 opacity in:
  `linear-gradient(180deg, rgba(0,173,239,0) 0%, rgba(0,0,0,0.29) 89%)`
- hover on card: nothing extra required (whole card links)
Content (bottom of card):
- 9f45fb7  location name  <p> heading, **36px/500, line-height 50px, color #FFFFFF**
- 17e7daa  `Yes Study Centre`  <h3> 16px/500, color #FFFFFF

## Cards (source order) — title / subtitle "Yes Study Centre" / href / image
1. `Head Office – Putalisadak, Kathmandu` (EN DASH) → `/centre/head-office/` · `/images/kathmandu-1.jpg`
2. `Pakistan` → `#` · `/images/oren-yomtov-da46ckq88ji-unsplash-medium1.jpg`
3. `Palpa` → `/centre/niec-palpa/` · `/images/800x911-revised-palp.jpg`
4. `Pokhara` → `/centre/niec-pokhara/` · `/images/niec-pkr-revised-pokhar.jpg`
5. `Chitwan` → `/centre/niec-chitwan/` · `/images/800x911-revised-chitwa.jpg`
6. `Butwal` → `/centre/niec-butwal/` · `/images/butwal-revise.jpg`

All subtitles are `Yes Study Centre`.

## "Visit Us" button
transparent bg, 16px/500, color/border #FC6E1F, radius 100px, padding 12px 24px, line-height 1;
hover/focus bg #FC6E1F color #FFFFFF, transition-colors duration-300.
Desktop right-aligned; mobile centred. Single copy is fine (align changes by breakpoint).

## Marquee layout
- Slide width: desktop `(100% - 100px)/3` (3 across, two 50px gaps), tablet `(100% - 50px)/2`, mobile `100%`.
  Simpler: fixed `flex: 0 0` basis using calc with the 50px gap. Cards `h-full` won't apply (fixed min-height 500).
- Track: `display:flex; gap:50px; width:max-content;` duplicated slide set; `animation: marquee 60s linear infinite;`
  `@keyframes marquee { to { transform: translateX(calc(-50% - 25px)); } }` (−50% minus half the gap to keep it seamless).
  Pause on hover via a `group` + `group-hover:[animation-play-state:paused]` or a state class.
- The section is full-bleed (no niec-container) except the header row which is boxed.

## Responsive
- Header text left-aligned desktop; centred ≤1024. Headline 45px → 32px ≤767. Card min-height 500 → 400 ≤767.
- Marquee slide count 3 → 2 → 1 (adjust basis; the marquee still scrolls continuously).
