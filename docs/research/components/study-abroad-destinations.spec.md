# StudyAbroadDestinations Specification

Source: `https://niec.edu.np/study-abroad/` — Elementor page `3050`, container `1e344ab`.
Cards come from loop template **`2566`** — the *same* template the homepage "Study Abroad"
section uses, so `src/components/StudyAbroadSection.tsx` is the reference implementation and
the six card images are already in `public/images/`.

> Colour note: source peach `#FFF5F0` → clone token `brand-tint`; source orange `#FC6E1F` →
> `brand-primary`.

## Overview
- **Target file:** `src/components/study-abroad-landing/StudyAbroadDestinations.tsx`
- **Interaction model:** static grid with hover states. **Not a carousel** — this page uses a
  `loop-grid` widget (`d779cdb`), unlike the homepage which uses a loop *carousel*.

## Differences from the homepage section (do not copy blindly)
| | Homepage `4744718` | This page `1e344ab` |
|---|---|---|
| Widget | loop **carousel** | loop **grid** (`elementor-grid-3/-tablet-2/-mobile-1`) |
| Background | `#F1F7FF` (sky) | **`#FFF5F0`** (peach → `brand-tint`) |
| "View More" pill | present | **absent** (container `8562a25` is empty) |
| Card radius | 15px mobile / 20px | same |

## DOM Structure
```
container 1e344ab  (boxed, column, padding 100px 0 0, bg #FFF5F0)
├─ container dc2b2ab  (boxed, row, padding 0 40px 20px 40px)
│  ├─ container 1e0ce5b  (e-con-full, --width 60% ≥768px, flex-grow 0, flex-shrink 0, padding 0)
│  │  ├─ heading 62882d4 → <h2>Study Abroad</h2>
│  │  └─ heading 60d0bc3 → <h3>Expert guidance for study abroad success</h3>
│  └─ container 8562a25  (EMPTY — reserved space, justify-center / align-items flex-end)
└─ container 711bd23  (boxed, padding 0 40px 100px 40px, border-radius 20px)
   └─ container 7eb47fc  (boxed, column, gap 0)
      └─ loop-grid d779cdb  (--grid-columns: 3)
```

## Computed Styles

### Section `1e344ab`
- display: flex; flex-direction: column
- **gap: 30px** — no `--gap` is declared, so it inherits the kit's `--widgets-spacing`.
  This 30px sits between the heading row and the grid wrapper and is easy to miss: without
  it the section measures 1206px instead of the live **1236px**.
- padding: **100px 0 0 0**; margin: 0
- background-color: `#FFF5F0` (`--e-global-color-cf9680f`) → **`brand-tint`**
- **mobile (≤767px): padding: 40px 0 0 0**

### Header row `dc2b2ab`
- display: flex; flex-direction: row; flex-wrap: wrap (mobile)
- padding: **0 40px 20px 40px**
- **mobile: padding: 20px 20px 0 20px**

### Heading column `1e0ce5b`
- `--width: 60%` at `@media(min-width:768px)`
- `--flex-grow: 0; --flex-shrink: 0`
- padding: 0; gap 30px (default widget spacing)

### Eyebrow (`62882d4 .elementor-heading-title`)
- tag `<h2>`; font-size: 20px; font-weight: 500; color #111111
- line-height: 1 (global); text-align: start

### Heading (`60d0bc3 .elementor-heading-title`)
- tag `<h3>`; font-size: 32px; font-weight: bold; **line-height: 1.3em**; color #111111
- `> .elementor-widget-container { margin: 0; padding: 0 0 4px 0 }`
- text-align: start

### Grid wrapper `711bd23`
- padding: **0 40px 100px 40px**; border-radius: 20px
- **mobile: padding: 0 20px 20px 20px**

### Loop grid `d779cdb`
- `--grid-columns: 3`; tablet 2; **mobile 1**
- `grid-column-gap: 30px; grid-row-gap: 30px` (loop-grid default)
- `.elementor-loop-container { grid-auto-rows: 1fr }` and `.e-loop-item > .e-con { height: 100% }`
  → every card in a row stretches to equal height.
  ⚠ Use `auto-rows-[1fr]`, **not** Tailwind's `auto-rows-fr` — the named utility emits
  `minmax(0,1fr)`, which is not the same value.
- Measured at 1200px content width: columns are `353.328px 353.328px 353.344px`, grid box
  `1120 × 890`, each card `353 × 430`.

### Card (loop template `2566`, container `4da02aff`)
- display: flex; flex-direction: column
- padding: **40px**; border-radius: **20px** (mobile **15px**)
- background-image: per-card `.jpg`; background-position: center center; background-size: cover
- overlay `::before`: `background-color: #111111` with **`--overlay-opacity: 0`** — the dark
  overlay is fully transparent, i.e. **invisible**. Do not render a scrim.
- **hover:** `box-shadow: 0px 16px 30px 0px rgba(0,0,0,0.145098)`; transition .3s

### Card title (`b30ea92 .elementor-heading-title`)
- tag `<h3>`; font-size: **40px**; font-weight: 700; color `#FFFFFF`; line-height 1

### Card spacer (`1c03f31`)
- `--spacer-size: 280px` (**mobile: 200px**) — the card's height comes from this spacer,
  not from its content.

### Card button (`3c7efc15`)
- `position: absolute; bottom: 40px; left: 40px`
- background-color: `#FFFFFF00` (transparent)
- font-size: 16px; font-weight: 500; **text-transform: uppercase**
- color / fill: `#FFFFFF`; border: **1px solid #FFFFFF**; border-radius: **25px**
- padding: **16px 40px**; line-height: 1; transition: all .3s
- **hover/focus:** `background-color: #FFFFFF`, `color: #FC6E1F` (→ `brand-primary`),
  `border-color: #FFFFFF`

## Per-card Content (verbatim, in source order)
| # | Title | href | Image (already in `public/images/`) |
|---|---|---|---|
| 1 | Germany | `/study-abroad/study-in-germany/` | `germany-2025.jpg` |
| 2 | USA | `/study-abroad/study-in-usa/` | `usa.jpg` |
| 3 | Australia | `/study-abroad/study-in-australia/` | `australia.jpg` |
| 4 | UK | `/study-abroad/study-in-uk/` | `uk.jpg` |
| 5 | Ireland | `/study-abroad/study-in-ireland/` | `irealand.jpg` |
| 6 | Canada | `/study-abroad/study-in-canada/` | `canada.jpg` |

Button label on every card: `Read More`.
(The Ireland file is misspelled `Irealand.jpg` upstream — kept so the path resolves.)

## States & Behaviors
- **Card hover:** box-shadow fades in over .3s.
- **Button hover:** fill inverts to white-on-primary over .3s.
- No scroll, click or time-driven behaviour — it is a plain grid.

## Responsive Behavior
- **≥1024px:** 3 columns.
- **768–1023px:** 2 columns.
- **≤767px:** 1 column; section padding 40px top, header/grid gutters drop 40px → 20px;
  card radius 15px; spacer 200px.
- **Breakpoint:** 768px and 1024px.
