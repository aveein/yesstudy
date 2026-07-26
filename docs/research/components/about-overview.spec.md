# AboutOverview Specification

The first content block of `/about/`: a centred "Overview / WHO WE ARE" heading pair followed
by a two-column prose block.

## Overview
- **Target file:** `src/components/about/AboutOverview.tsx`
- **Source:** `docs/research/_capture-about/index.html` → `33037ba` + `6b4b0ec` (post `elementor-5691`)
- **Interaction model:** static — no scroll, click, hover, or time-driven behaviour anywhere.

## DOM Structure
```
section (33037ba)              ← heading block
  .e-con-inner
    div (48f37af)              ← row, justify-content:center
      .e-con-inner
        div (0267e8f)          ← column, align-items:center, 70% wide
          h2 (b70c97f)  "Overview"
          h3 (7523a78)  "WHO WE ARE"

section (6b4b0ec)              ← prose block, row
  .e-con-inner
    div (cb740bb)  50%   ← left column, 2 paragraphs
    div (e6f0444)  50%   ← right column, 1 paragraph
```

## Computed Styles (exact, from `22-post-5691.css`)

### Heading section `33037ba`
- display: flex; flex-direction: column; align-items: **flex-start**
- padding: `60px 0 30px` (top 60, bottom 30)
- margin: 0
- Content column: standard site width — `min(100%, 1200px)`, centred

### `48f37af` (inner row)
- display: flex; flex-direction: **row**; justify-content: **center**
- padding: `0 40px 20px 40px`
- margin: 0

### `0267e8f` (heading column)
- display: flex; flex-direction: column (Elementor default); **align-items: center**
- `--flex-grow: 0; --flex-shrink: 0`
- width: **70%** at ≥768px; full width below
- padding: 0; margin: 0
- gap: 30px (Elementor default)

### `h2` "Overview" (b70c97f)
- text-align: start
- font-size: **20px**; font-weight: **500**; color: `#111111`
- line-height: **1** (`.elementor-heading-title`)
- margin: 0; padding: 0
- Renders visually centred because its parent is `align-items: center`.

### `h3` "WHO WE ARE" (7523a78)
- text-align: **center**
- font-size: **45px**; font-weight: **bold**; line-height: **1.3em**; color: `#111111`
- Widget container: `margin: 0; padding: 0 0 4px 0`

### Prose section `6b4b0ec`
- display: flex; flex-direction: **row**
- gap: **15px row / 30px column**
- No padding of its own; content column is `min(100%, 1200px)` centred

### Columns `cb740bb` / `e6f0444`
- display: flex; flex-direction: column
- width: **50%** each at ≥768px; stack full-width below

### Paragraphs (text-editor widgets `0ab7635`, `2061239`)
- font-size: **16px**; color: `#111111`; font-family: Satoshi
- line-height: **1.5** (body default)
- `margin-block-start: 0; margin-block-end: 0.9rem` (**14.4px**) — the reset's paragraph
  spacing; Tailwind preflight zeroes this, so it must be added back explicitly.

## States & Behaviors
N/A — this block is entirely static. No hover states (no links or buttons), no scroll triggers,
no animation. Verified by scrolling and hovering the live section.

## Assets
- Images: **none** in this section
- Icons used: none

## Text Content (verbatim)

**h2:** `Overview`

**h3:** `WHO WE ARE`

**Left column (cb740bb) — two paragraphs:**

> Once the students have sat for their final exam at various local testing centers in Kathmandu, Yes Study counsels prospective students for their higher education in foreign countries. To select the right college and university for a Nepali student is very difficult, but well-trained counselors provide all the necessary information about colleges and universities and the lengthy processing system for the student visa application in various embassies.

> Yes Study’s student counselors undergo an intensive training before they are delegated to provide any information on colleges or universities in the USA, UK, Australia, New Zealand, Ireland, Canada.

**Right column (e6f0444) — one paragraph (deliberately duplicates the left column's first paragraph; this is what the live site shows):**

> Once the students have sat for their final exam at various local testing centers in Kathmandu, Yes Study counsels prospective students for their higher education in foreign countries. To select the right college and university for a Nepali student is very difficult, but well-trained counselors provide all the necessary information about colleges and universities and the lengthy processing system for the student visa application in various embassies.

Note: the apostrophe in "Yes Study’s" is a **right single quotation mark** (U+2019), not a straight quote.

## Responsive Behavior
- **Desktop (≥768px):** heading column 70% wide and centred; prose is 2 × 50% columns with a 30px column gap.
- **Mobile (≤767px):**
  - `33037ba` padding becomes **`40px 0 0`** (top 40, bottom 0)
  - `h3` "WHO WE ARE" font-size drops **45px → 28px**
  - Both prose columns go full-width and stack, separated by the 15px row gap
- **Breakpoint:** 767/768px. No tablet-specific rules exist.
