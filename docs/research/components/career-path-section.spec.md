# CareerPathSection Specification

## Overview
- **Target file:** `src/components/CareerPathSection.tsx`
- **Screenshot:** `docs/design-references/11-career-path.jpg` (shows the carousel; the header
  is at the bottom of `10-testimonials.jpg`)
- **Elementor ids:** `8b5fc55` (header, sections 9) **+** `461c771` (carousel, section 10).
  Card loop template `2699`.
- **Interaction model:** **time-driven carousel** — 3/2/1 per view, autoplay 5000ms,
  speed 500ms, gap 30px, bullets, no arrows.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## The one structural surprise: the carousel is FULL-BLEED

`8b5fc55` is `e-con-boxed` → its content column is the usual **1200px**.
`461c771` is **`e-con-full`** → it is **not capped at 1200px**; it spans the whole viewport
with only its own `40px` side padding.

Screenshot confirms it: the first card's left edge sits at x≈41px (= the 40px padding) and the
third card runs off the right of the 1920px frame. Every other section on this page stops at
the 1200px column. **Do not wrap this carousel in `.niec-container`.**

At 1920px: track = `1920 − 80 = 1840`; slide = `(1840 − 2×30) / 3 ≈ 593px`.

## DOM Structure

```
section  8b5fc55            bg #FFF5F0, padding 100px 20px 0 20px, BOXED to 1200px
  └─ inner
      └─ 6037878   header row   flex row, gap 30px, padding 0
           ├─ ecfe520   width 60% (720px), flex column, flex-shrink 0
           │    └─ 1008282  "Choose your career path"  <h3>, 32px/700, 1.3em
           └─ dc76404   remaining 450px — flex COLUMN, justify-center, items-end
                └─ df43702  "View More" pill   (hidden ≤767px)

section  461c771            bg #FFF5F0, padding 40px 40px 60px 40px, FULL-BLEED
  ├─ 4b28ae9   loop carousel, 6 slides
  └─ faf1f60   mobile-only "View More", centred  (hidden >767px)
```

**Neither section has an eyebrow line** — just the one 32px heading.

## Carousel settings (`4b28ae9`)

| Property | Value |
|---|---|
| `--swiper-slides-to-display` | `3` · `2` @≤1024px · `1` @≤767px |
| `--swiper-slides-gap` | `30px` |
| autoplay delay | `5000ms` |
| speed | `500ms` |
| `--swiper-pagination-size` | `7px` |
| `--dots-normal-color` / `--dots-hover-color` | `#FC6E1F` |
| `--swiper-pagination-spacing` | `20px` |
| `--dots-vertical-offset` | `15px` |
| arrows | none |

`.elementor-element-4b28ae9 .swiper-slide > .elementor-element { height: 100% }`
→ cards stretch to equal height.

**Bullet offset:** the CSS arithmetic works out to 35px below the cards, but the screenshot
measures ≈20px. The discrepancy comes from the card's own `margin-top: 20px` sitting inside
the slide box. **Trust the measurement: use `paginationOffset={20}`.**

## Computed Styles (verbatim from the capture)

### Header section `8b5fc55`
- flex column, gap 30px; `padding: 100px 20px 0 20px`
- `background-color: #FFF5F0` (`--e-global-color-cf9680f`)
- **`padding-bottom: 0`** — the carousel section supplies the following space.

#### `6037878` header row
- `--flex-direction:row`; padding 0; gap 30px

#### `ecfe520`
- `--width: 60%` @ ≥768px; `--flex-grow:0; --flex-shrink:0`; padding 0

#### `1008282` — heading, `<h3>`
- widget container `margin:0; padding:0 0 4px 0`
- `text-align:start; font-size:32px; font-weight:700; line-height:1.3em; color:#111111`
- **No mobile font-size override.**

#### `dc76404` (button cell)
- `--display:flex` with no `--flex-direction` → **column** → `justify-content:center`
  centres vertically, `align-items:flex-end` right-aligns

#### `df43702` — "View More"
- `background:#FFFFFF00`; `font-size:16px; font-weight:500; color:#FC6E1F`
- `border:1px solid #FC6E1F; border-radius:100px`; padding `12px 24px`; line-height 1
- hover/focus: `background:#FC6E1F; color:#FFFFFF`
- `elementor-hidden-mobile` → hidden ≤767px
- **href is literally `#`** — a dead link upstream. Same for the mobile copy. Keep it.

### Carousel section `461c771`
- **`e-con-full`** — full viewport width, no 1200px cap
- flex column, gap 30px; `padding: 40px 40px 60px 40px`
- `background-color: #FFF5F0` — same as the header section, so the two read as one band

### Career card — loop template `2699`

#### `9b947bb` (card root)
- **`--flex-direction: row`**; `--gap: 30px`
- `--border-radius: 20px`; `--margin-top: 20px`; `--padding: 5px`
- `background-color: #FFFFFF` **plus** `background-image: url(<per-card photo>)` with
  `background-position: 100% 0px; background-repeat: no-repeat; background-size: contain`
  → the cut-out photo is pinned to the card's **top-right corner**, scaled to fit.
- **hover:** `box-shadow: 0px 16px 30px 0px rgba(0,0,0,0.25)`
- `--flex-grow:0; --flex-shrink:0`
- `--width: 103.415%` @ ≥768px — **but `.e-con` also carries
  `max-width: min(100%, var(--width))`, which clamps it back to 100%.** The card is exactly
  the slide width. Do not try to make it overflow.

#### `290334d` (text column)
- `--flex-direction: column`; `--width: 55%` @ ≥768px; `--flex-grow:0; --flex-shrink:0`
- `--padding: 120px 0px 40px 20px`
- `@media(max-width:767px)`: `--width: 55%`, `--padding: 80px 0px 30px 15px`

#### `bc6c621` (spacer column)
- `--flex-direction: column`; `--width: 50%` @ ≥768px · `40%` @ ≤767px
- **Empty.** It exists only to reserve the right-hand area the background photo occupies.
  55% + 50% + the 30px gap overflows 100%, but this column has the default `flex-shrink: 1`
  while the text column does not, so it simply absorbs the remainder.

#### `0752168` (title) — renders as `<h3>`
- `font-size: 40px`; `text-shadow: 2px 2px 6px rgba(255,255,255,0.76)`
- weight/colour not overridden → kit `h3` = **700**, `#111111`; `line-height: 1` (global)
- `@media(max-width:767px)`: `font-size: 30px`
- The white text-shadow exists so the copy stays legible where the photo bleeds behind it.

#### `9428d12` (body, text-editor)
- `text-shadow: 2px 2px 6px rgba(255,255,255,0.57)`
- size/colour not overridden → **16px**, `#111111`, line-height 1.5
- inner `<p>` keeps the theme's `margin-block-end: .9rem`

#### `2636509` ("READ MORE" button)
- `background-color: #FC6E1F00` (transparent); `color: #FC6E1F; fill: #FC6E1F`
- Rest from the **kit default**: `border: 1px solid #FC6E1F`, `border-radius: 100px`,
  `padding: 12px 24px`, `font-size: 15px`, `line-height: 1`
- **hover/focus:** `background: #FC6E1F; color: #FFFFFF`

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Card | hover | `box-shadow: 0 16px 30px rgba(0,0,0,.25)` |
| Card "READ MORE" | hover | bg transparent → `#FC6E1F`; text → `#FFFFFF` |
| "View More" pill | hover | bg transparent → `#FC6E1F`; text → `#FFFFFF` |
| Carousel | pointer over track | autoplay pauses |
| Bullet | click | jump to that slide |

No entrance animation, no scroll trigger.

## Text Content (verbatim)

- Heading: `Choose your career path`
- Both "View More" buttons: label `View More`, href `#`

### Slides, in source order

| # | Title | Body | href | photo |
|---|---|---|---|---|
| 1 | `Cybersecurity` | `Cybersecurity protects digital systems, prevents cyber threats, ensures data privacy, and safeguards organizations in a connected world.` | `/careers/cybersecurity/` | `/images/cyber-security.png` |
| 2 | `Agriculture & Food Science` | `Agriculture and food science advance sustainable farming, enhance nutrition, improve food security, and drive innovation in production.` | `/careers/agriculture-food-science/` | `/images/agriulture-and-food-science.png` |
| 3 | `Early Childhood Education` | `Early childhood education nurtures young minds, fostering learning, social skills, creativity, and emotional development for lifelong success.` | `/careers/early-childhood-education/` | `/images/early-childhood.png` |
| 4 | `Public Health Education` | `Public health education promotes awareness, healthy behaviors, and disease prevention, improving individual and community well-being worldwide.` | `/careers/public-health-education/` | `/images/public-health.png` |
| 5 | `Finance and Accounting` | `By 2026, finance evolves from bookkeeping to strategic leadership, leveraging AI, analytics, and global insights to guide decisions worldwide.` | `/careers/finance-and-accounting/` | `/images/fiananceaccoun.jpg` |
| 6 | `Nursing` | `Nursing delivers compassionate care, promotes health, supports patients, and advances medical knowledge through clinical expertise and advocacy.` | `/careers/nursing/` | `/images/nursing.png` |

Every card button reads `Read More` (uppercased on screen — but note this template has **no**
`text-transform`, and the source label is stored as `READ MORE`, so write it uppercase).

## Assets
All six already downloaded to `public/images/`:
`cyber-security.png`, `agriulture-and-food-science.png` (upstream misspelling of "Agriculture"
— keep it), `early-childhood.png`, `public-health.png`, `fiananceaccoun.jpg` (upstream
misspelling — keep it; note it is a **.jpg**, the rest are `.png`), `nursing.png`.

These are CSS **background images**, not `<img>`.

## Responsive Behavior

- **Desktop (>1024px):** header boxed at 1200 (60% / 40%); carousel full-bleed with 40px side
  padding, 3 slides per view.
- **Tablet (768–1024px):** header column stays 60%; carousel **2 slides per view**, still
  full-bleed.
- **Mobile (≤767px):** carousel **1 slide per view**; card title drops to `30px`; text column
  padding becomes `80px 0 30px 15px`; spacer column `40%`; desktop "View More" hidden and the
  centred mobile copy shown.
