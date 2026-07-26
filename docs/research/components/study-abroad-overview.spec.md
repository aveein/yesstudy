# StudyAbroadOverview Specification

Source: `https://niec.edu.np/study-abroad/` — Elementor page `3050`, container `37a26b4`
(`id="overview"`).

## Overview
- **Target file:** `src/components/study-abroad-landing/StudyAbroadOverview.tsx`
- **Interaction model:** static. Anchor target for the hero nav's `Overview` pill.

## DOM Structure
```
container 37a26b4  (boxed, row, align-center, gap 20px/50px, margin 100px 0, id="overview")
├─ container fafeeb9  (e-con-full, column, --width 50% ≥768px, default padding 10px)
│  └─ image 2e5f7c2 → 520×600 PNG
└─ container 4c9b830  (e-con-full, column, --width 50% ≥768px, default padding 10px, gap 30px)
   ├─ heading 1bd89c5 → <span>Overview</span>
   ├─ heading 3034cb4 → <h2>NIEC Eases Post-Exam Stress: …</h2>
   └─ text-editor aa799a0 → <p>Once the students …</p>
```

## Computed Styles

### Container `37a26b4`
- display: flex; flex-direction: row; flex-wrap: wrap (mobile)
- align-items: center
- gap: **20px 50px** (row-gap 20px, column-gap 50px)
- margin: **100px 0** (top and bottom)
- padding: 10px (`.e-con` default)
- content column: `min(100%, 1200px)`, centred
- no background (inherits page white)

### Columns
- `fafeeb9`: `--width: 50%` at `@media(min-width:768px)`; padding 10px (default)
- `4c9b830`: `--width: 50%` at `@media(min-width:768px)`; column; gap 30px; padding 10px

### Image (`2e5f7c2 img`)
- src: `https://niec.edu.np/wp-content/uploads/2024/04/Layer-660.png` (natural 520 × 600)
- **width: 520px; max-width: 100%** — the image keeps its intrinsic width and does **not**
  stretch to the column. Verified by `getComputedStyle`: the column's content box is 555px
  while the image measures 520px, centred (offset 17.5px each side) by the widget
  container's `text-align: center`.
- **height: 650px** — taller than the natural height
- object-fit: cover; object-position: center center (`50% 50%`)
- border-radius: **21px**
- **mobile (≤767px): height: 300px** (width still capped by `max-width: 100%`)

### Eyebrow (`1bd89c5 .elementor-heading-title`)
- tag: `<span>`
- font-size: 18px; font-weight: 500
- line-height: 1 (global `.elementor-heading-title`); margin 0
- color: #111111

### Heading (`3034cb4 .elementor-heading-title`)
- tag: `<h2>`
- font-size: 32px (kit `h2`); font-weight: bold (kit)
- **line-height: 1.3em** (explicit override of the global `1`)
- color: #111111; margin 0

### Body (`aa799a0`)
- no widget CSS → kit body: font-size 16px, line-height 1.5, color #111111
- `p { margin-block-end: .9rem }` → 14.4px below

## States & Behaviors
N/A — static section. No hover, scroll or click behaviour; the image has no transition and
the text is not animated in.

## Text Content (verbatim)
- Eyebrow: `Overview`
- Heading: `NIEC Eases Post-Exam Stress: Expert Counsel for Higher Education Abroad`
  (the source has literal newlines inside the `<h2>`; HTML collapses them to spaces)
- Body: `Once the students take their final exams at various local testing centers, NIEC counsels prospective students for their higher education in popular study destinations like Australia, USA, UK, Canada, New Zealand and Ireland. Selecting the right college/ university and course is usually very challenging for students but our well trained counselors provide you with all the necessary information including application procedures, entry requirements, immigration rules and visa application procedures. NIEC’s study abroad counselors undergo an intensive training before they are delegated to provide any information on college/ universities or visa application processes.`

## Assets
- `public/images/layer-660.png`

## Responsive Behavior
- **≥768px:** two 50% columns side by side, vertically centred, 50px column gap.
  Image renders 650px tall.
- **≤767px:** columns wrap to 100% and stack (image first, then text), 20px row gap.
  Image height drops to **300px**.
- **Breakpoint:** 768px.
