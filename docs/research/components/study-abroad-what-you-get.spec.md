# WhatYouGetSection Specification

Source: `https://niec.edu.np/study-abroad/` — Elementor page `3050`, container `ef9e95d`
(`id="get"`).

## Overview
- **Target file:** `src/components/study-abroad-landing/WhatYouGetSection.tsx`
- **Interaction model:** static. Anchor target for the hero nav's `What you get` pill.

## DOM Structure
```
container ef9e95d  (boxed, row, align-center, gap 0, margin 60px 0 40px, id="get")
├─ container fc47c24  (e-con-full, column, --width 40% ≥768px, default padding 10px, gap 30px)
│  ├─ heading e46e477 → <h2>What you get</h2>
│  └─ heading c4e3db4 → <h3>NIEC offers test preparation classes …</h3>
└─ container 50d29c8  (e-con-full, column, --width 60% ≥768px, default padding 10px)
   └─ text-editor 2ed69bb → <p>Our certified and highly experienced instructors …</p>
```

## Computed Styles

### Container `ef9e95d`
- display: flex; flex-direction: row; flex-wrap: wrap (mobile)
- align-items: center
- gap: **0px 0px**
- margin: **60px top, 40px bottom**
- padding: 10px (`.e-con` default)
- content column: `min(100%, 1200px)`, centred
- no background

### Columns
- `fc47c24`: `--width: 40%` at `@media(min-width:768px)`; column; gap 30px; padding 10px
- `50d29c8`: `--width: 60%` at `@media(min-width:768px)`; column; padding 10px

### Eyebrow (`e46e477 .elementor-heading-title`)
- tag `<h2>`; font-size: 20px; font-weight: 500; color #111111
- line-height: 1 (global); text-align: start; margin 0

### Heading (`c4e3db4 .elementor-heading-title`)
- tag `<h3>`; font-size: **32px**; font-weight: bold; **line-height: 1.3em**; color #111111
- `> .elementor-widget-container { margin: 0; padding: 0 0 4px 0 }`
- text-align: start
- **mobile (≤767px): font-size: 28px**

### Body (`2ed69bb`)
- no widget CSS → kit body: font-size 16px, line-height 1.5, color #111111
- `p { margin-block-end: .9rem }` → 14.4px below

## States & Behaviors
N/A — static. No hover, scroll or click behaviour.

## Text Content (verbatim)
- Eyebrow: `What you get`
- Heading: `NIEC offers test preparation classes for SAT, GRE, GMAT, IELTS, TOEFL and PTE`
  (literal newlines in the source `<h3>` collapse to spaces)
- Body: `Our certified and highly experienced instructors help you achieve your required scores delivering the courses in the most simplified techniques. NIEC also offers mock tests for students where our instructors follow the standard guidelines for assessment in order to advice you on your strengths and weaknesses.`

## Assets
None.

## Responsive Behavior
- **≥768px:** 40% heading column + 60% body column, side by side, vertically centred,
  **zero gap** between them.
- **≤767px:** both wrap to 100% and stack (heading block first). Heading → 28px.
- **Breakpoint:** 768px.
