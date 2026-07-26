# OurClassesSection Specification

## Overview
- **Target file:** `src/components/OurClassesSection.tsx`
- **Screenshot:** `docs/design-references/08-our-classes.jpg`
- **Elementor id:** `e5e97d2` (section 6)
- **Interaction model:** **static grid**, 6 gradient cards. No carousel. Card hover = shadow only.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure

```
section  e5e97d2          bg #F1F7FF, padding 100px 20px, flex column, gap 30px
  └─ inner                max-width 1200px
      ├─ 94f5546   header row      flex row, gap 30px, padding 0
      │    ├─ cdf8fd7   width 60% (720px), flex column, gap 10px, flex-shrink 0
      │    │    ├─ 861307b  "Our Classes"   <h2>, 20px/500
      │    │    └─ efc309b  headline        <h3>, 32px/700, 1.3em
      │    └─ 1479be4   remaining 450px — flex COLUMN, justify-center, items-end
      │         └─ 1aac27c  "View More" outlined pill   (hidden ≤767px)
      └─ aae46d4   CSS GRID   3 cols × 2 rows, gap 30px, --border-radius 20px
           ├─ 9d2be05  TOEFL   ├─ 860a47c  IELTS   ├─ b5d0d57  PTE-A
           ├─ 9a87654  SAT     ├─ e3cc992  GMAT    └─ 0253ab3  GRE
```

Row arithmetic: `720 + 30 + 450 = 1200` ✓ · card width `(1200 − 2×30) / 3 = 380px`.

## Computed Styles (verbatim from the capture)

### Section `e5e97d2`
- `--display:flex; --flex-direction:column`; gap 30px (kit default)
- `background-color: #F1F7FF` (`--e-global-color-a86860a`)
- padding `100px 20px`; margin 0

### Header row `94f5546`
- `--flex-direction:row`; padding 0; gap 30px

#### `cdf8fd7`
- `--width: 60%` @ ≥768px; `--flex-grow:0; --flex-shrink:0`; `--gap:10px`; padding 0

#### `861307b` — eyebrow, `<h2>`
- `text-align:start; font-size:20px; font-weight:500; color:#111111`; line-height 1 (global)

#### `efc309b` — headline, `<h3>`
- widget container `margin:0; padding:0 0 4px 0`
- `text-align:start; font-size:32px; font-weight:700; line-height:1.3em; color:#111111`
- **≤767px: `font-size:28px`**

#### `1479be4` (button cell)
- `--display:flex`, no `--flex-direction` → **column**, so `--justify-content:center` centres
  vertically and `--align-items:flex-end` right-aligns. padding 0

#### `1aac27c` — "View More"
- `background:#FFFFFF00`; `font-size:16px; font-weight:500; color:#FC6E1F`
- `border:1px solid #FC6E1F; border-radius:100px`; padding `12px 24px`
- hover/focus: `background:#FC6E1F; color:#FFFFFF; border-color:#FC6E1F`
- `elementor-hidden-mobile` → hidden ≤767px
- **There is no mobile replacement button in this section** (unlike Latest Events and Study
  Abroad). At ≤767px the "View More" simply disappears.

### Grid `aae46d4`
- `--display: grid`
- `--e-con-grid-template-columns: repeat(3, 1fr)`
- `--e-con-grid-template-rows: repeat(2, 1fr)` → **both rows are equalised to the tallest row**
- `--grid-auto-flow: row`
- gap 30px (kit default); `--border-radius:20px`; padding 0
- `@media(max-width:1024px)`: only `--grid-auto-flow:row` — **the grid stays 3 columns at
  tablet.** (This differs from the Study Abroad loop grid, which does drop to 2. `PAGE_TOPOLOGY.md`
  generalised "3 → 2 → 1" for both; that is wrong for this section.)
- `@media(max-width:767px)`: `--e-con-grid-template-columns: repeat(1, 1fr)`;
  `padding: 0 20px`

### Course card (all six share this; only the gradient differs)
- `--display:flex` → **column**; `--justify-content:center`; `--align-items:center`
- `--gap: 0`; `--border-radius: 20px`; `--padding: 40px`
- `border-width: 0`
- `background-color: transparent` + `background-image: linear-gradient(180deg, <A> 0%, <B> 100%)`
- **hover:** `box-shadow: 0px 16px 30px 0px rgba(0,0,0,0.25)` — the only hover change
- Because the container is a **column** with `justify-content:center`, the card's content is
  **vertically centred**; with rows equalised to the tallest card, shorter cards centre their
  content. The screenshot confirms this: the TOEFL card (3 body lines) starts its title higher
  than the IELTS card (2 body lines).

#### Title `<h3>`
- `text-align:center; font-size:40px; text-transform:uppercase; color:#FFFFFF`
- weight not overridden → kit `h3` = **700**; line-height 1 (global)

#### Body (text-editor widget)
- widget container `margin: 20px 0`
- `text-align:center; font-weight:400; line-height:1.2em; color:#FFFFFF`
- font-size not overridden → kit body **16px**
- The inner `<p>` keeps the theme's `margin-block-end: .9rem` (14.4px).
  (The TOEFL card's body is a bare `<div>` rather than a `<p>` in the source — a genuine
  upstream inconsistency. Harmless: content is centred and rows are equalised.)

#### Button `Read More`
- `background:#FFFFFF00` (transparent)
- `font-size:16px; font-weight:500; text-transform:uppercase; color:#FFFFFF`
- `border:1px solid #FFFFFF73` (white at 45%); `border-radius:25px`; `padding:16px 40px`
- **hover/focus:** `background:#FFFFFF; color:#FC6E1F; border-color:#FFFFFF`
- `line-height:1` (global) → renders 48px tall

## Card gradients (all `linear-gradient(180deg, A 0%, B 100%)`)

| # | Card | A | B |
|---|---|---|---|
| 1 | TOEFL | `#FC6E1F` | `#FFB763` |
| 2 | IELTS | `#672767` | `#CB87B7` |
| 3 | PTE-A | `#566FA7` | `#A6C0F8` |
| 4 | SAT   | `#216383` | `#71BFBC` |
| 5 | GMAT  | `#B6325F` | `#FF887C` |
| 6 | GRE   | `#008CC1` | `#50CFFF` |

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Card | hover | `box-shadow: 0 16px 30px rgba(0,0,0,.25)`. Nothing else. |
| Card "READ MORE" | hover | bg transparent → `#FFFFFF`; text `#FFFFFF` → `#FC6E1F`; border → `#FFFFFF` |
| "View More" pill | hover | bg transparent → `#FC6E1F`; text `#FC6E1F` → `#FFFFFF` |

No entrance animation, no scroll trigger, no flip (the stray `box_flip` / `box_back` wrapper
divs in the source markup are dead WordPress cruft — there is no CSS for them).

## Text Content (verbatim)

- Eyebrow: `Our Classes`
- Headline: `Your gateway to global education with top-notch Test Preparation`
  (source has a hard line break before "top-notch"; it collapses to a space and rewraps)
- Button: `View More` → `/test-preparation/`

| Card title (source casing) | Body | href |
|---|---|---|
| `Toefl` | `Our TOEFL Preparation classes stand out as the premier choice for achieving exceptional TOEFL scores` | `/course/tofel/` |
| `ielts` | `We offer the Best IELTS Preparation classes for achieving high IELTS scores` | `/course/ielts/` |
| `PTE-A` | `Our PTE-A Preparation classes are tailored to ensure remarkable PTE-A scores` | `/course/pte-a/` |
| `SAT` | `Our SAT Preparation classes are designed to maximize your SAT scores` | `/course/sat-1/` |
| `GMAT` | `Our GMAT Preparation classes are crafted to elevate your GMAT scores` | `/course/gmat/` |
| `GRE` | `Our GRE Preparation classes are meticulously designed to boost your GRE scores` | `/course/gre/` |

Titles are stored mixed-case and uppercased by CSS. Every card button reads `Read More`
(→ `READ MORE`).

**The TOEFL href is `/course/tofel/` — misspelled upstream. Keep it.**

## Assets
None — the cards are pure CSS gradients.

## Responsive Behavior

- **Desktop (>1024px):** header 60% / 40%; grid 3 × 380px, 2 equal rows, 30px gaps.
- **Tablet (768–1024px):** container 1024px; **grid stays 3 columns** (cards ≈ 321px);
  header row unchanged.
- **Mobile (≤767px):** headline drops to 28px; grid becomes **1 column** with
  `padding: 0 20px`; the "View More" pill is hidden with no replacement.
