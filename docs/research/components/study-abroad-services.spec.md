# StudyAbroadServices Specification

Source: `https://niec.edu.np/study-abroad/` — Elementor page `3050`, container `8bd726b`.
A **CSS grid of 8 cells**: 7 identical service cards plus the "Get in touch" CTA panel as the
8th cell (`39dd4f8`, `id="started"`). The CTA is *inside* the grid, not a sibling section.

> Colour note: source peach `#FFF5F0` → clone token `brand-tint`; source orange `#FC6E1F` →
> `brand-primary`.

## Overview
- **Target file:** `src/components/study-abroad-landing/StudyAbroadServices.tsx`
- **Interaction model:** static, with a hover state on the CTA button only.

## DOM Structure
```
container 8bd726b  (e-grid, e-con-boxed, 2 × 4 grid, gap 30px, default padding 10px)
├─ 7 × card container (e-flex, e-con-boxed, bg #FFF5F0, radius 20px)
│    ├─ image widget  → 100 × 100 PNG, border-radius 20px
│    ├─ heading widget → <h2>{title}</h2>
│    └─ text-editor    → 1–2 <p>
└─ container 39dd4f8 (id="started") — CTA panel, background photo + dark overlay
     ├─ heading dad48f8 → <h2>Get in touch</h2>
     ├─ heading 6d299d9 → <h2>Ready to get started? Get started</h2>
     ├─ text-editor 4a96407 → <p>Thank you for your interest …</p>
     └─ button e8bc14e  (absolute, hidden on mobile) → GET STARTED
```

## Computed Styles

### Grid `8bd726b`
- display: **grid**
- `--e-con-grid-template-columns: repeat(2, 1fr)`
- `--e-con-grid-template-rows: repeat(4, 1fr)`  ← plain `1fr`, **not** `minmax(0,1fr)`
- gap: **30px 30px**; `--grid-auto-flow: row`
- padding: 10px (`.e-con` default); content column `min(100%, 1200px)`, centred
- **mobile (≤767px):** `repeat(1, 1fr)` columns, `repeat(2, 1fr)` rows

### Card container (all 7 share one rule set — `682a633`, `b508572`, `092c7e9`, `4e81279`, `64227e9`, `95e4ca8`, `ff0468b`)
- display: flex; flex-direction: column (`.e-con.e-flex` default)
- justify-content: flex-start; **align-items: flex-start**
  (⚠ children shrink to content — they do **not** stretch to the card width)
- gap: 30px (kit `--widgets-spacing`)
- border-radius: **20px**
- padding: **40px 40px 80px 40px** (horizontal on `.e-con`, vertical on `.e-con-inner`)
- background-color: `#FFF5F0` (`--e-global-color-cf9680f`) → **`brand-tint`**
- no hover state

### Card image (`42429a8 img` et al.)
- natural size **100 × 100**; `border-radius: 20px`; `alt=""`

### Card title (`4d22bc2` et al. `.elementor-heading-title`)
- tag `<h2>`; **no widget CSS** → kit `h2`: font-size **32px**, font-weight bold, color #111111
- line-height: **1** (global `.elementor-heading-title`); margin 0

### Card body (`e1c4895` et al.)
- no widget CSS → kit body: font-size 16px, line-height 1.5, color #111111
- `p { margin-block-end: .9rem }` → 14.4px between paragraphs

### CTA panel `39dd4f8`
- display: flex; flex-direction: column
- border-radius: **20px**; padding: **40px 40px 100px 40px**
- background-image: `…/2024/04/8-e1712645895727.jpg`; position center center;
  repeat no-repeat; size cover
- overlay `::before`: `background-color: #111111`, **`--overlay-opacity: 0.2`**
  → a 20 %-opaque black scrim over the photo (**do render this one** — unlike the
  destination cards, whose overlay opacity is 0)
- gap: 30px (default)

### CTA eyebrow (`dad48f8`)
- tag `<h2>`; font-size: 20px; font-weight: 500; color `#FFFFFF`; line-height 1; text-align start

### CTA heading (`6d299d9`)
- tag `<h2>`; kit size **32px**, bold; color `#FFFFFF`; line-height 1

### CTA body (`4a96407`)
- color `#FFFFFF`; kit body 16px / 1.5

### CTA button (`e8bc14e`)
- `position: absolute; bottom: 40px; left: 40px`
- class `elementor-hidden-mobile` → **display: none ≤767px**
- background-color: `#FFFFFF`; color / fill: `#FC6E1F` (→ `brand-primary`)
- font-size: 16px; font-weight: 500
- border: **1px solid #FFFFFF**; border-radius: **100px**
- padding: **12px 24px** (`.elementor-size-sm`); line-height: 1; transition: all .3s
- **hover/focus:** `background-color: #FC6E1F`, `color: #FFFFFF`, `border-color: #FC6E1F`
- href: `#elementor-action:action=popup:open&settings=…id:5542` — opens Elementor popup
  **5542**. The popup itself is out of scope for this clone (no popup was built in any prior
  session); link it to `/contact-us/`, matching the Header CTA convention.

## Per-card Content (verbatim, in grid order)
| # | Title | Icon | Paragraphs |
|---|---|---|---|
| 1 | The Best Counselors | `s1.png` | 2 |
| 2 | Career Counseling | `s2.png` | 2 |
| 3 | Universities and Courses | `s3.png` | 2 |
| 4 | SOP Writing Workshops | `s4.png` | 2 |
| 5 | Scholarships | `s5.png` | 2 |
| 6 | Interview Preparation | `s6.png` | 1 |
| 7 | Pre-departure Session | `s7.png` | 1 |

Full paragraph text lives in `src/data/study-abroad-landing.ts` — extracted verbatim from the
capture, never hand-typed.

### CTA text (verbatim)
- Eyebrow: `Get in touch`
- Heading: `Ready to get started? Get started` (literal newline in source collapses to a space)
- Body: `Thank you for your interest in reaching out to us. Please click the ‘Get Started’ button below to begin your international academic journey.`
- Button: `GET STARTED`

## States & Behaviors
- **CTA button hover:** fill inverts white→primary over .3s.
- Cards have **no** hover state (no `:hover` rule for any of the 7 containers).
- No scroll-, click- or time-driven behaviour anywhere in this section.

## Assets
- `public/images/s1.png` … `s7.png` (100 × 100)
- `public/images/8-e1712645895727.jpg` (CTA background)

## Responsive Behavior
- **≥768px:** 2 columns × 4 rows, all rows equal height (`1fr`), 30px gap.
- **≤767px:** 1 column; the first two rows are `1fr` and the rest auto (upstream sets
  `repeat(2, 1fr)`), so cells simply stack. The CTA's GET STARTED button is **hidden**.
- **Breakpoint:** 768px.
