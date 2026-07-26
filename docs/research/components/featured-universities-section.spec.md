# FeaturedUniversitiesSection Specification

## Overview
- **Target file:** `src/components/FeaturedUniversitiesSection.tsx`
- **Screenshot:** `docs/design-references/09-featured-universities.jpg`
- **Elementor id:** `8479231` (section 7). Card loop template `2787`.
- **Interaction model:** **time-driven carousel** — Swiper loop, 3/2/1 per view,
  autoplay 5000ms, speed 500ms, gap 30px, bullets. Reuses `src/components/ui/carousel.tsx`.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure

```
section  8479231           bg #FFF5F0, padding 100px 20px, flex column, gap 30px
  └─ inner                 max-width 1200px
      ├─ c77958b   header row    flex row, gap 30px, padding 0
      │    ├─ 43e1e20   width 60% (720px), flex column, flex-shrink 0
      │    │    └─ 5ecde22  "Featured Universities"  <h3>, 32px/700, 1.3em
      │    └─ 4cf6ee3   remaining 450px — flex COLUMN, justify-center, items-end
      │         └─ 30aede4  "View More" outlined pill   (hidden ≤767px)
      ├─ d94f02c   carousel wrapper, padding 0
      │    └─ 206bf4c  loop carousel, 6 slides
      └─ 9828a17   mobile-only "View More", centred  (hidden >767px)
```

**This section has no eyebrow line** — just the one 32px heading. (Latest Events, Study Abroad
and Our Classes all have a 20px eyebrow above theirs; this one does not.)

## Carousel settings (from the widget's CSS custom properties)

| Property | Value |
|---|---|
| `--swiper-slides-to-display` | `3` · `2` @≤1024px · `1` @≤767px |
| `--swiper-slides-gap` | `30px` |
| autoplay delay | `5000ms` |
| speed | `500ms` |
| loop | yes (infinite) |
| `--swiper-pagination-size` | **`7px`** (Elementor's bullet default is 6px; this section overrides it) |
| `--dots-normal-color` / `--dots-hover-color` | `#FC6E1F` |
| inactive bullet opacity | `0.2` (Swiper default) |
| bullet horizontal gap | `6px` each side (Swiper default) |
| `--swiper-pagination-spacing` | `10px` (default) |
| `--dots-vertical-offset` | `10px` |

**Bullet position:** the swiper gets `padding-bottom: calc(7px + 10px) = 17px`, and the
pagination is `top: calc(100% + 10px)` with `translateY(-100%)`. Net effect: the bullets'
top edge sits **20px below the bottom of the cards**. Measured in the screenshot: ≈20px ✓.

So in `Carousel` terms: `paginationPosition="below"`, `paginationOffset={20}`, `bulletSize={7}`.

`.elementor-element-206bf4c .swiper-slide > .elementor-element { height: 100% }`
→ **all cards stretch to the height of the tallest card in view.**

## Computed Styles (verbatim from the capture)

### Section `8479231`
- flex column, gap 30px; padding `100px 20px`; margin 0
- `background-color: #FFF5F0` (`--e-global-color-cf9680f`)

### Header row `c77958b`
- `--flex-direction:row`; padding 0; gap 30px

#### `43e1e20`
- `--width: 60%` @ ≥768px; `--flex-grow:0; --flex-shrink:0`; padding 0

#### `5ecde22` — heading, `<h3>`
- widget container `margin:0; padding:0 0 4px 0`
- `text-align:start; font-size:32px; font-weight:700; line-height:1.3em; color:#111111`
- **≤767px: `font-size:28px`**

#### `4cf6ee3` (button cell)
- `--display:flex` with no `--flex-direction` → **column** → `--justify-content:center`
  centres vertically, `--align-items:flex-end` right-aligns. padding 0

#### `30aede4` — "View More"
- `background:#FFFFFF00`; `font-size:16px; font-weight:500; color:#FC6E1F`
- `border:1px solid #FC6E1F; border-radius:100px`; padding `12px 24px`
- hover/focus: `background:#FC6E1F; color:#FFFFFF`
- `elementor-hidden-mobile` → hidden ≤767px; `9828a17`/`db08fc5` is the centred mobile copy

### University card — loop template `2787`

#### `bd9763b` (card root)
- `--display:flex; --flex-direction:column`
- `--justify-content:flex-start`; **`--align-items:flex-start`**
- `--gap: 30px`; `--padding: 30px`; `--border-radius: 20px`; `border-style: none`
- `background-color: #FFFFFF`
- `box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2)`
- **hover:** `box-shadow: 0px 10px 20px 0px rgba(86,86,86,0.1)`
- `align-items: flex-start` matters — see the logo note below.

#### `17744d2` (logo, featured-image widget)
- `text-align: start`
- `img { width:100%; max-width:100%; height:70px; object-fit:contain;
   object-position:center center }`
- **The logos render 70px tall and left-aligned, NOT stretched across the card.**
  Because the card sets `align-items: flex-start`, the image widget shrinks to fit; with a
  fixed `height:70px` and an intrinsic aspect ratio the resolved box is just wide enough for
  the logo. All six source logos are square-ish (the first is 195 × 195), so each renders
  ≈70 × 70 at the content's left edge. Screenshot confirms ✓.
  In the clone the honest equivalent is `h-[70px] w-auto object-contain`.

#### `f05f5ab` (name) — renders as `<h4>`
- `text-align: start`
- No size override → kit `h4` = **24px, weight 700, colour `#111111`**
- `line-height: 1` (global `.elementor-heading-title`)
- Screenshot check: the two-line name has 24px between baselines ✓

#### `a8912d4` (country) — post-info widget, inline list
- Renders as a single line of plain text (no icon is emitted in the markup)
- No size override → **16px**, colour `#111111`, line-height 1.5 (body default)

#### `70e9801` ("READ MORE" button)
- `background-color: #FC6E1F00` (transparent); `color: #FC6E1F; fill: #FC6E1F`
- Everything else from the **kit button default**: `border: 1px solid #FC6E1F`,
  `border-radius: 100px`, `padding: 12px 24px`, `font-size: 15px`, `line-height: 1`
  → renders 39px tall
- **hover/focus:** `background:#FC6E1F; color:#FFFFFF`
- The label is stored uppercase in the source (`READ MORE`) — there is no
  `text-transform` on this one.

### Height check
`30 + 70 + 30 + 48 (2-line name) + 30 + 24 + 30 + 39 + 30 = 331px`.
Measured card height in the screenshot ≈ 331px ✓.

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Card | hover | `box-shadow: 0 0 2px rgba(0,0,0,.2)` → `0 10px 20px rgba(86,86,86,.1)` |
| Card "READ MORE" | hover | bg transparent → `#FC6E1F`; text `#FC6E1F` → `#FFFFFF` |
| "View More" pill | hover | bg transparent → `#FC6E1F`; text `#FC6E1F` → `#FFFFFF` |
| Carousel | pointer over track | autoplay pauses (Swiper default; already in `Carousel`) |
| Carousel bullet | click | jumps to that slide |

No entrance animation, no scroll trigger.

## Text Content (verbatim)

- Heading: `Featured Universities`
- Button (desktop + mobile copies): `View More` → `/universities/`

### Slides, in source order
| # | Name | Country | href | logo |
|---|---|---|---|---|
| 1 | `University of The Sunshine Coast Brisbane` | `Australia` | `/university/university-of-the-sunshine-coast-brisbane/` | `/images/university-of-the-sunshine-coast-brisbane.png` |
| 2 | `Griffith College` | `Ireland` | `/university/griffith-college/` | `/images/download.png` |
| 3 | `James Cook University, Brisbane` | `Australia` | `/university/james-cook-university-brisbane/` | `/images/download-1.png` |
| 4 | `University of Wollongong` | `Australia` | `/university/university-of-wollongong/` | `/images/download-2.png` |
| 5 | `Central Queensland University` | `Australia` | `/university/central-queensland-university/` | `/images/download-3.png` |
| 6 | `Southeast Missouri State University` | `USA` | `/university/southeast-missouri-state-university/` | `/images/download-1.jpg` |

Every card button reads `READ MORE`.

The upstream `alt` on every logo is the same generic SEO string
(`Best Consultancy in Nepal for USA, UK, Australia, Canada, Ireland, New Zealand and Germany`).
Use the university name as the `alt` instead — invisible in the render and better a11y.

## Assets
All six already downloaded to `public/images/`:
`university-of-the-sunshine-coast-brisbane.png`, `download.png`, `download-1.png`,
`download-2.png`, `download-3.png`, `download-1.jpg`.

The `download*.png` names are the upstream WordPress filenames — unhelpful but correct.

## Responsive Behavior

- **Desktop (>1024px):** header 60% / 40%; **3 slides per view**, 380px each, 30px gap.
- **Tablet (768–1024px):** container 1024px; **2 slides per view**.
- **Mobile (≤767px):** heading drops to 28px; **1 slide per view**; desktop "View More"
  hidden and the centred mobile one shown.
