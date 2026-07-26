# StudyAbroadHero Specification

Source: `https://niec.edu.np/study-abroad/` — Elementor page `3050`, containers `2ee91af`
(hero) + `e0a5daf` (anchor nav). Both share the same sky background, so they are built as one
component.

> Colour note: this spec records the **source** site's values. The clone is re-themed
> (`#FC6E1F` → `brand-primary`, `#FFF5F0` → `brand-tint`) per the header of `globals.css`.

## Overview
- **Target file:** `src/components/study-abroad-landing/StudyAbroadHero.tsx`
- **Interaction model:** static (anchor links only — the nav is **not** sticky; there is no
  `menu_list` rule anywhere in the captured CSS, and no scroll-spy JS).

## DOM Structure
```
container 2ee91af  (boxed, row, wrap, space-between, align-center, gap 0, bg #F1F7FF)
├─ container d55e4bf  (e-con-full, column, --width 55% ≥768px, default padding 10px, gap 30px)
│  ├─ heading cabaaa5  → <h1>Study Abroad</h1>
│  └─ text-editor f3e82fe → <p>Higher education …</p>
└─ container 4bf2696  (e-con-full, column, --width 43% ≥768px, default padding 10px)
   └─ image 7561dac → 472×543 PNG

container e0a5daf  (boxed, row, wrap, padding 30px 0, bg #F1F7FF)
└─ 4 × container (--width 25% ≥768px / 50% ≤767px, padding 0)
   └─ button widget → <a class="elementor-button elementor-size-sm">
```

## Computed Styles (exact values from the captured CSS + kit defaults)

### Hero container `2ee91af`
- display: flex; flex-direction: row; flex-wrap: wrap
- justify-content: space-between; align-items: center
- gap: 0px 0px
- background-color: `#F1F7FF` (`--e-global-color-a86860a`)
- padding: 10px (Elementor `.e-con` default — **not** in the section CSS)
- content column: `max-width: min(100%, 1200px); margin: 0 auto`

### Columns
- `d55e4bf`: `--width: 55%` at `@media(min-width:768px)`; column; gap 30px (kit
  `--widgets-spacing: 30px 30px`); padding 10px (default)
- `4bf2696`: `--width: 43%` at `@media(min-width:768px)`; padding 10px (default)
- Below 768px both are 100% (flex-wrap: wrap).

### `h1` (`cabaaa5 .elementor-heading-title`)
- font-size: 80px; **mobile (≤767px): 40px**
- font-weight: 700
- line-height: 1 (global `.elementor-heading-title`)
- margin: 0; padding: 0
- color: #111111 (kit); font-family: Satoshi

### Intro paragraph (`f3e82fe`)
- font-size: 22px; **mobile (≤767px): 18px**
- line-height: 1.5 (body default)
- color: #111111
- `> .elementor-widget-container { padding: 0% 10% 0% 0% }` — 10% right inset
- `p { margin-block-end: .9rem }` (reset) → 14.4px below

### Image (`7561dac`)
- src: `https://niec.edu.np/wp-content/uploads/2024/04/Study-Abroad-Website-Banner-2025-NEW.png`
- natural size 472 × 543; no width/height/radius override → renders at intrinsic size,
  `max-width: 100%`
- alt (verbatim upstream): `Best Consultancy in Nepal for Australia`

### Nav container `e0a5daf`
- display: flex; flex-direction: row; flex-wrap: wrap
- gap: 0px; padding: 30px 0px
- background-color: `#F1F7FF`

### Nav buttons (`ee1afbb`, `25fc5d9`, `8f0f093`, `7b0391a`)
All four share one rule set:
- background-color: `#F1F7FF`
- font-size: 20px; font-weight: 500
- color / fill: `#111111` (`--e-global-color-text`)
- border-style: solid; border-width: **3px 0 0 0**; border-color: `#11111110`
- border-radius: 0
- padding: **10px 0 0 0** (overrides `.elementor-size-sm`'s 12px 24px)
- line-height: 1 (global `.elementor-button`)
- text-align: center; `elementor-align-justify` → the button fills its column (measured 300px
  wide at a 1200px content width, i.e. 25%)
- **display: inline-block** (global `.elementor-button`) — keep it `inline-block`, not
  `block`: the baseline descender adds ~3px, so the column measures **36px** against a
  **33px** button. Using `block` makes the whole nav 93px instead of the live 96px.
- transition: all .3s (global `.elementor-button`)

**Hover / focus:** `color → #FC6E1F`, `border-color → #FC6E1F` (`--e-global-color-primary`).

## States & Behaviors
- **Nav hover:** colour + top-border colour swap to the primary, `transition: all .3s`.
- **Not sticky.** No `position: sticky`, no scroll listener, no IntersectionObserver.
- No entrance animations on this page (no `elementor-invisible` / animation classes present).

## Text Content (verbatim)
- H1: `Study Abroad`
- Intro: `Higher education is an integral part of a student’s life and pursuing higher education in abroad countries has become a popular trend.`
- Nav: `Overview` → `#overview`, `Our Classes` → `#class`, `What you get` → `#get`,
  `Get Started` → `#started`

> **Upstream bug, reproduced faithfully:** `#overview`, `#get` and `#started` resolve to
> containers `37a26b4`, `ef9e95d` and `39dd4f8`. **`#class` has no target** — no element on
> the page carries `id="class"`. The link is kept verbatim; it simply does nothing, exactly
> as on the live site.

## Assets
- `public/images/study-abroad-website-banner-2025-new.png` (already downloaded)

## Responsive Behavior
- **≥768px:** 55% / 43% row, space-between, vertically centred. Nav = 4 × 25%.
- **≤767px:** columns wrap to 100% and stack. `h1` → 40px, intro → 18px.
  Nav columns → **50%** each (2 × 2) with `padding: 0 0 10px 0`.
- **Breakpoint:** 768px (Elementor mobile ≤767px) — lines up with Tailwind `md:`.
