# BlogSection Specification

## Overview
- **Target file:** `src/components/BlogSection.tsx`
- **Screenshot:** `docs/design-references/12-our-blog.jpg` (top half; the lower part is the
  next section)
- **Elementor id:** `4ed9fb9` (section 12). Card loop template `2535`.
- **Interaction model:** **time-driven carousel** — 3/2/1 per view, autoplay 5000ms,
  speed 500ms, gap 20px, bullets, no arrows.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure

```
section  4ed9fb9           white, margin 80px 0 100px 0, padding 0 20px, boxed to 1200px
  └─ inner
      ├─ 6ccbd77   header row    flex row, gap 30px, padding 0
      │    ├─ 1a548e7   flex column   (no --width → 50%, 585px)
      │    │    ├─ c511f56  "Our Blog"   <h2>, 20px/500
      │    │    └─ 17bcaf9  headline     <h3>, 32px/700, 1.3em
      │    └─ 57c4630   flex COLUMN, justify-center, items-end   (50%, 585px)
      │         └─ a027e7c  "View More Articles" pill   (hidden ≤767px)
      └─ 9fd4dcd   carousel wrapper, flex row, --border-radius 20px, padding 0
           └─ af9195e > 87dacb3   loop carousel, 6 slides
      └─ (mobile-only "View More", centred — `a6efe29`)
```

**Column split differs from the other sections.** `1a548e7` declares **no `--width`** and
does **not** set `--flex-shrink: 0`, unlike the 55%/60% heading columns elsewhere. Both
children therefore default to `--width: 100%` with `flex-shrink: 1` and split evenly:
`(1200 − 30) / 2 = 585px` each. Screenshot confirms: the headline wraps at ≈555px and the
pill is right-aligned at x=1200.

Slide width: `(1200 − 2×20) / 3 ≈ 386.7px`. Measured ≈385px ✓.

## Carousel settings (`87dacb3`)

| Property | Value |
|---|---|
| `--swiper-slides-to-display` | `3` · `2` @≤1024px · `1` @≤767px |
| `--swiper-slides-gap` | `20px` |
| autoplay delay | `5000ms` |
| speed | `500ms` |
| `--swiper-pagination-size` | `7px` |
| `--dots-normal-color` / `--dots-hover-color` | `#FC6E1F` |
| `--swiper-pagination-spacing` | `20px` |
| `--dots-vertical-offset` | not set → `0px` |
| arrows | none |

Bullet offset from the cards: `27 + 0 − 7 = 20px` → `paginationOffset={20}`.

`.elementor-element-87dacb3 .swiper-slide > .elementor-element { height: 100% }`
→ cards stretch to equal height.

## Computed Styles (verbatim from the capture)

### Section `4ed9fb9`
- flex column, gap 30px
- **`margin: 80px 0 100px 0`**; `padding: 0 20px` — this section is spaced with *margin*,
  not padding, unlike its neighbours
- no background → white
- `@media(max-width:767px)`: `margin: 40px 0 0 0`

### Header row `6ccbd77`
- `--flex-direction:row`; padding 0; gap 30px

#### `c511f56` — eyebrow, `<h2>`
- `text-align:start; font-size:20px; font-weight:500; color:#111111`; line-height 1

#### `17bcaf9` — headline, `<h3>`
- widget container `margin:0; padding:0 0 4px 0`
- `text-align:start; font-size:32px; font-weight:700; line-height:1.3em; color:#111111`
- **≤767px: `font-size:28px`**

#### `57c4630` (button cell)
- `--display:flex` with no `--flex-direction` → **column** → `justify-content:center`
  centres vertically, `align-items:flex-end` right-aligns

#### `a027e7c` — "View More Articles"
- `background:#FFFFFF00`; `font-size:16px; font-weight:500; color:#FC6E1F`
- `border:1px solid #FC6E1F; border-radius:100px`; padding `12px 24px`; line-height 1
- hover/focus: `background:#FC6E1F; color:#FFFFFF`
- `elementor-hidden-mobile` → hidden ≤767px

### Carousel wrapper `9fd4dcd`
- `--flex-direction:row`; `--border-radius:20px`; padding 0
- `@media(max-width:767px)`: `padding: 0 20px`

### Blog card — loop template `2535`

#### `2c94c76` (card root)
- `--display:flex; --flex-direction:column`
- `--border-radius: 20px`; `--padding: 220px 20px 40px 20px`
- background: the post's featured image, `background-position: center center;
  background-size: cover`
- **`--overlay-opacity: 0.5`** with `::before`:
  `background-color: transparent; background-image:
   linear-gradient(180deg, #FFFFFF2E 33%, #111111 100%)`
  → **a real, visible 50%-opacity gradient scrim** running from near-transparent white at 33%
  of the card's height to solid `#111111` at the bottom. This is what makes the white title
  readable. (Contrast with the Study Abroad cards, whose overlay is `opacity: 0` and must not
  be rendered — here it must.)
- **hover:** `box-shadow: 0px 16px 30px 0px rgba(0,0,0,0.25)`
- `@media(max-width:767px)`: `--padding: 140px 20px 40px 20px`
- The 220px top padding is what pushes the title block down to the lower half of the card.

#### `6c8e968` (title) — renders as `<h3>`
- `text-align: center`; `color: #FFFFFF`
- size/weight not overridden → kit `h3` = **28px / 700**; `line-height: 1` (global)
- Screenshot check: the two-line titles sit exactly 28px apart ✓

#### `fa02391` (date) — post-info widget, `elementor-align-center`
- `.elementor-icon-list-text` colour **`#FFFFFFBF`** (white at 75%)
- No icon is emitted — it renders as one centred line
- size not overridden → **16px**, line-height 1.5
- The date is wrapped in an `<a>` pointing at the WordPress date archive

#### `685ce8e` ("READ MORE" button)
- `background-color: #FC6E1F00` (transparent)
- `font-size:16px; font-weight:500; text-transform:uppercase; color:#FC6E1F; fill:#FC6E1F`
- `border: 1px solid` — **`border-color` is not set here**, so it falls back to the kit's
  `#FC6E1F`
- `border-radius: 25px`; `padding: 16px 40px`; `line-height: 1` → 48px tall
- **hover/focus:** `background:#FFFFFF; color:#FC6E1F; border-color:#FFFFFF`

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Card | hover | `box-shadow: 0 16px 30px rgba(0,0,0,.25)` |
| Card "READ MORE" | hover | bg transparent → `#FFFFFF`; border → `#FFFFFF`; text stays `#FC6E1F` |
| "View More Articles" | hover | bg transparent → `#FC6E1F`; text → `#FFFFFF` |
| Carousel | pointer over track | autoplay pauses |
| Bullet | click | jump to that slide |

No entrance animation, no scroll trigger.

## Text Content (verbatim)

- Eyebrow: `Our Blog`
- Headline: `Insightful articles for studying abroad and test preparation`
- Desktop button: `View More Articles` → `/blogs/`
- Mobile button: `View More` → `/blogs/`  (**different label from the desktop copy** — keep both)

### Slides, in source order

| # | Title | Date | href | image |
|---|---|---|---|---|
| 1 | `Ultimate IELTS Preparation Guide in Nepal 2026 – Yes Study` | `July 16, 2026` | `/ultimate-ielts-preparation-guide-in-nepal-2026-niec/` | `/images/ielts-preparation-guide-in-nepal-2026.jpg` |
| 2 | `Dedicated PC-Based IELTS Practice at Yes Study Kathmandu` | `July 14, 2026` | `/dedicated-pc-based-ielts-practice-niec/` | `/images/dedicated-pc-ielts.jpg` |
| 3 | `Unlimited IELTS Speaking Practice at Yes Study` | `July 13, 2026` | `/unlimited-ielts-speaking-practice-niec/` | `/images/unlimited-ielts-speaking-niec.jpg` |
| 4 | `How IELTS Trainers Improve Your IELTS Score \| Yes Study` | `July 12, 2026` | `/how-ielts-trainers-improve-your-score/` | `/images/ielts-trainer-2026.jpg` |
| 5 | `How to Score Band 8 in IELTS \| Expert Tips by Yes Study` | `July 10, 2026` | `/how-to-score-band-8-in-ielts/` | `/images/ielts-score-8-tips.jpg` |
| 6 | `26+ Years of IELTS Excellence at Yes Study \| Kathmandu` | `July 9, 2026` | `/26-years-ielts-excellence-niec-kathmandu/` | `/images/26-years-of-excellence-in-ielts.jpg` |

**Title 1 contains an en dash `–` (U+2013), not a hyphen** — the source encodes it as `&#8211;`.
Titles 4, 5 and 6 contain a literal pipe `|`.

Every card button reads `Read More` (CSS uppercases it to `READ MORE`).

## Assets
All six already downloaded to `public/images/`. Note the upstream extensions differ from the
local ones for two of them (`.jpeg` upstream → `.jpg` locally):
`ielts-preparation-guide-in-nepal-2026.jpg`, `dedicated-pc-ielts.jpg`,
`unlimited-ielts-speaking-niec.jpg`, `ielts-trainer-2026.jpg`, `ielts-score-8-tips.jpg`,
`26-years-of-excellence-in-ielts.jpg`.

These are CSS **background images**, not `<img>`.

## Responsive Behavior

- **Desktop (>1024px):** header 50% / 50%; 3 slides per view, ≈387px each, 20px gap;
  card padding `220px 20px 40px`.
- **Tablet (768–1024px):** **2 slides per view**; everything else unchanged.
- **Mobile (≤767px):** section margin `40px 0 0 0`; headline 28px; carousel wrapper gains
  `padding: 0 20px`; **1 slide per view**; card padding `140px 20px 40px`; desktop button
  hidden and the centred mobile one shown.
