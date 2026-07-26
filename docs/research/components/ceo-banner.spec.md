# CEO Banner Specification (PageBanner `subtitle` variant)

Source: `https://niec.edu.np/about/ceos-message/` — Elementor page `5973`, container `7b1a248`.

> **This banner is page-local, not the shared template.** `/about/` and `/contact-us/` get
> their banner from single-page template **`2866`** (Elementor `779a760`). This page does
> **not** load `post-2866.css` at all — it declares its own banner inside the page template.
> Visually it is the same shell (same `header-bg.png`, same 700px column, same breadcrumb),
> but it stacks **two** headings instead of one.

## Overview
- **Target file:** `src/components/PageBanner.tsx` (extended with an optional `subtitle`)
- **Interaction model:** static — link hover only.

## DOM Structure
```
container 7b1a248  (boxed, column, --content-width 700px ≥768px, bg header-bg.png)
├─ heading f8799bc  → <h1>CEO’s Message</h1>
├─ heading 99acf0e  → <h2>Sapana Rajbhandari</h2>
└─ icon-list 107dd1d (inline, centered)
   ├─ <li><a href="https://niec.edu.np"><span>Home</span></a></li>
   └─ <li><span>/ CEO’s Message</span></li>
```

## Computed Styles

### Container `7b1a248`
- display: flex; flex-direction: column
- background-image: `header-bg.png`; background-size: **cover**; background-position: center center
- background-color: transparent
- padding: **80px 0** (`--padding-top/bottom: 80px`, left/right 0)
- `--content-width: 700px` at `@media(min-width:768px)` — **not** the site's usual 1200px
- inner gap: **30px** (kit `--widgets-spacing`)
- measured box: `1905 × 326`, inner `700 × 326`
- **mobile (≤767px): padding: 50px 20px**

### `h1` (`f8799bc .elementor-heading-title`)
- tag `<h1>`; font-size: **32px**; font-weight: 700
- line-height: **32px** (global `.elementor-heading-title { line-height: 1 }`)
- color: `#111111`; text-align: **center**; margin 0
- ⚠ The `/about/` and `/contact-us/` banners use **40px** here. This page is 32px because the
  large name below carries the visual weight.

### `h2` (`99acf0e .elementor-heading-title`)
- tag `<h2>`; font-size: **50px**; font-weight: 700
- line-height: **50px** (line-height 1); color: `#111111`; text-align: center; margin 0

### Breadcrumb (`107dd1d`)
- `ul.elementor-icon-list-items.elementor-inline-items`
  - display: flex; flex-direction: row; **justify-content: center**
  - `margin-inline: calc(-5px/2)` → **-2.5px**
- `li.elementor-inline-item`: `margin-inline: calc(5px/2)` → **2.5px**
- `.elementor-icon-list-text`: font-size: **16px**; font-weight: 400; color `#111111`;
  line-height: **24px**; `transition: color 0.3s`
- **hover:** `.elementor-icon-list-item:hover .elementor-icon-list-text { color: #FC6E1F }`
  (→ `brand-primary` in this clone)
- `--e-icon-list-icon-size: 14px`, `.elementor-icon-list-icon { padding-inline-end: 0 }`
  — declared but **no icons are present** in the markup, so nothing renders from it.

## States & Behaviors
- **Breadcrumb link hover:** colour `#111111` → `#FC6E1F`, `transition: color 0.3s`.
- Nothing else: no scroll, click or time-driven behaviour.

## Text Content (verbatim)
- H1: `CEO’s Message`
- H2: `Sapana Rajbhandari`
- Breadcrumb: `Home` (links to `/`) · `/ CEO’s Message`

Note the apostrophes are the curly `’` (U+2019), not `'`.

## Assets
- `public/images/header-bg.png` (already downloaded in session 4)

## Responsive Behavior
- **≥768px:** 700px centred column, 80px vertical padding.
- **≤767px:** full width with **20px** horizontal padding and **50px** vertical padding.
  Headings do not change size (no mobile font-size override in the source).
- **Breakpoint:** 768px.
