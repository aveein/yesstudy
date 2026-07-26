# StudyAbroadSection Specification

## Overview
- **Target file:** `src/components/StudyAbroadSection.tsx`
- **Screenshot:** `docs/design-references/05-study-abroad.jpg`
- **Elementor id:** `4744718` (section 4). Card loop template `2566`.
- **Interaction model:** **static grid**, 6 country cards. No carousel.
  **Correction to `PAGE_TOPOLOGY.md`:** there is **no hover overlay**. The card's Elementor
  background overlay is `--overlay-opacity: 0` and nothing raises it on hover. The card's only
  hover change is a box-shadow. The "READ MORE" button is **always visible** (absolutely
  positioned at the card's bottom-left), which the screenshot confirms.

## DOM Structure

```
section  4744718           bg #F1F7FF, padding 100px 20px, flex column, gap 30px
  └─ inner                 max-width 1200px
      ├─ 3dd003b   header row      flex row, gap 30px, padding 0
      │    ├─ a43fdbb   width 60% (720px), flex column, gap 10px, flex-shrink 0
      │    │    ├─ 36dc135  "Study Abroad"    <h2>, 20px/500
      │    │    └─ 2366f76  headline          <h3>, 32px/700, line-height 1.3em
      │    └─ b41bbb4   remaining 450px  — flex COLUMN, justify-center, items-end
      │         └─ 28e7ff7  "View More" outlined pill   (hidden <=767px)
      ├─ f5e60ad   grid wrapper    --border-radius 20px, padding 0
      │    └─ c584e63 > c9f857a   loop grid, 3 cols / 2 / 1, gap 30px
      │         └─ 6 country cards (loop template 2566)
      └─ 2da23d3   mobile-only "View More", centred  (hidden >767px)
```

Row arithmetic at 1200px: `720 + 30 + 450 = 1200` ✓
Card width: `(1200 − 2×30) / 3 = 380px`; row gap 30px.

## Computed Styles (verbatim from the capture)

### Section `4744718`
- `--display:flex; --flex-direction:column`
- `background-color: #F1F7FF` (`--e-global-color-a86860a`)
- padding `100px 20px`; margin 0; gap 30px (kit `--widgets-spacing`)
- `@media(max-width:767px)`: `padding: 40px 0 0 0`

### Header row `3dd003b`
- `--flex-direction:row`; padding 0; gap 30px
- `@media(max-width:767px)`: `padding: 20px 20px 0 20px`

#### `a43fdbb` (heading stack)
- `--width: 60%` @ ≥768px; `--flex-grow:0; --flex-shrink:0`; `--gap:10px`; padding 0

#### `36dc135` — eyebrow, renders as `<h2>`
- `text-align:start; font-size:20px; font-weight:500; color:#111111`

#### `2366f76` — headline, renders as `<h3>`
- widget container `margin:0; padding:0 0 4px 0`
- `text-align:start; font-size:32px; font-weight:700; line-height:1.3em; color:#111111`
- No mobile font-size override for this one (unlike Latest Events).

#### `b41bbb4` (button cell)
- `--display:flex`, no `--flex-direction` → Elementor default **column**, so
  `--justify-content:center` = vertical centring and `--align-items:flex-end` = **right aligned**.
- padding 0

#### `28e7ff7` — "View More"
- `background:#FFFFFF00`; `font-size:16px; font-weight:500; color:#FC6E1F`
- `border:1px solid #FC6E1F; border-radius:100px`; `.elementor-size-sm` padding `12px 24px`
- hover/focus: `background:#FC6E1F; color:#FFFFFF; border-color:#FC6E1F`
- `elementor-hidden-mobile` → hidden ≤767px

### Grid `f5e60ad` / `c584e63` / `c9f857a`
- `f5e60ad`: `--display:flex; --border-radius:20px`; padding 0.
  `@media(max-width:767px)`: `padding: 0 20px 20px 20px`
- `c584e63`: flex column, `--gap: 0`, padding 0, border-width 0
- `c9f857a`: `--grid-columns:3`  ·  `2` @ ≤1024px  ·  `1` @ ≤767px
- `.elementor-widget-loop-grid .elementor-grid` default gap → **30px row and column**
- `.elementor-loop-container { grid-auto-rows: 1fr }` and
  `.e-loop-item > .e-con { height: 100% }` → **all cards in a row stretch to equal height**

### Country card — loop template `2566`

#### `4da02aff` (card root)
- `--display:flex; --flex-direction:column`; gap 30px (kit default)
- `--border-radius:20px`  ·  `15px` @ ≤767px
- `--padding: 40px` (all sides)
- `background-image: url(<per-country image>)`; `background-position:center center;
  background-size:cover`
- `--overlay-opacity: 0` with a `::before` overlay whose `background-color` is `#111111`.
  **Opacity 0 → the overlay is invisible and never animates.** Do not implement it.
- **hover:** `box-shadow: 0px 16px 30px 0px rgba(0,0,0,0.1450980392156863)` — that is the
  card's only hover change.
- Elementor default `--position: relative` → this is the containing block for the absolute button.

#### `b30ea92` (country name) — renders as `<h3>`
- `font-size:40px; font-weight:700; color:#FFFFFF` (`--e-global-color-803f4dc`)
- line-height not overridden → kit default (≈1.2)

#### `1c03f31` (spacer widget)
- `--spacer-size: 280px`  ·  `200px` @ ≤767px
- This is what gives the card its height: `40 + ~48 + 30 + 280 + 40 ≈ 438px`.

#### `3c7efc15` ("READ MORE" button, `elementor-absolute`)
- `position:absolute; left:40px; bottom:40px` (RTL: `right:40px`)
- `background-color:#FFFFFF00` (transparent)
- `font-size:16px; font-weight:500; text-transform:uppercase; color:#FFFFFF; fill:#FFFFFF`
- `border:1px solid #FFFFFF; border-radius:25px`; `padding:16px 40px`
- **hover/focus:** `background:#FFFFFF; color:#FC6E1F; border-color:#FFFFFF`

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Card | hover | `box-shadow: 0 16px 30px rgba(0,0,0,.145)`. Nothing else. |
| Card "READ MORE" | hover | bg transparent → `#FFFFFF`; text `#FFFFFF` → `#FC6E1F` |
| "View More" pill | hover | bg transparent → `#FC6E1F`; text `#FC6E1F` → `#FFFFFF` |

No entrance animation, no scroll trigger.

## Text Content (verbatim)

- Eyebrow: `Study Abroad`
- Headline: `Expert guidance for study abroad success`
- Button (desktop + mobile copies): `View More` → `/study-abroad/`

### Cards, in source order
| Country | href | image |
|---|---|---|
| `Germany` | `/study-abroad/study-in-germany/` | `/images/germany-2025.jpg` |
| `USA` | `/study-abroad/study-in-usa/` | `/images/usa.jpg` |
| `Australia` | `/study-abroad/study-in-australia/` | `/images/australia.jpg` |
| `UK` | `/study-abroad/study-in-uk/` | `/images/uk.jpg` |
| `Ireland` | `/study-abroad/study-in-ireland/` | `/images/irealand.jpg` |
| `Canada` | `/study-abroad/study-in-canada/` | `/images/canada.jpg` |

Every card's button label is `Read More` (uppercased by CSS → `READ MORE`).

Note the Ireland asset filename is misspelled **`irealand.jpg`** upstream; the local copy keeps
that spelling.

## Assets
All six already downloaded to `public/images/`:
`germany-2025.jpg`, `usa.jpg`, `australia.jpg`, `uk.jpg`, `irealand.jpg`, `canada.jpg`.

They are CSS **background images**, not `<img>` — the card is a background-cover panel.

## Responsive Behavior

- **Desktop (>1024px):** header 60% / 40%; grid 3 columns × 380px, 30px gaps; card radius 20px,
  spacer 280px.
- **Tablet (768–1024px):** container 1024px; grid drops to **2 columns**; header row unchanged.
- **Mobile (≤767px):**
  - Section padding `40px 0 0 0`.
  - Header row padding `20px 20px 0`.
  - Grid wrapper padding `0 20px 20px`.
  - Grid drops to **1 column**.
  - Card radius `15px`, spacer `200px`.
  - Desktop "View More" hidden; mobile one (`2da23d3` / `5988b9f`) shown, centred.
