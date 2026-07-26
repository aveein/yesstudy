# PageBanner Specification

Shared breadcrumb hero used by **both** `/about/` and `/contact-us/`. It lives in the
site-wide Elementor single-page template (`elementor-2866`, container `779a760`), so every
interior page renders it with only the title / breadcrumb label swapped.

## Overview
- **Target file:** `src/components/PageBanner.tsx`
- **Source:** `docs/research/_capture-about/index.html` → `elementor-element-779a760`
- **Interaction model:** static (hover on the "Home" link only)
- **Props:** `title: string`, `breadcrumb: string` (the trailing label, e.g. `"About Us"`)

## DOM Structure
```
section (779a760)               ← full-bleed, background image
  div .e-con-inner              ← centred content column
    h1  (b4044df)               ← page title, centred
    ul  (9aecec9)               ← inline breadcrumb
      li > a[href="/"]  "Home"
      li > span         "/ About Us"
```

## Computed Styles (exact, from `22-post-5691.css` / `25-post-2866.css`)

### Section `779a760`
- display: flex; flex-direction: column
- padding: `80px 0` (desktop)
- background-image: `url(/images/header-bg.png)`
- background-position: `center center`
- background-size: `cover`
- background-repeat: no-repeat
- The image is a peach dotted world-map on a `#FFF5F0`-ish field; no extra background-color is set.

### `.e-con-inner`
- max-width: **700px** at ≥768px (`--content-width: 700px`) — narrower than the site's usual 1200px
- margin-inline: auto
- gap: 30px (Elementor default `--widgets-spacing`, no explicit `--gap` on this container)

### `h1` (b4044df)
- text-align: center
- font-size: **40px**, font-weight: **bold**, color: `#111111`, font-family: Satoshi
- line-height: **1** — `.elementor-heading-title` overrides the reset's 1.2
- margin: 0; padding: 0

### Breadcrumb list (9aecec9)
- display: flex; inline items; justify-content: center (`elementor-align-center`)
- Each `li` has `margin-inline: 2.5px` (`calc(5px/2)`), list wrapper `margin-inline: -2.5px`
- Text: font-size **16px** (kit body), color `#111111`, font-weight normal
- `a` inherits the same size/colour

## States & Behaviors

### Breadcrumb link hover
- **Trigger:** hover on the `Home` list item
- color: `#111111` → `#FC6E1F`
- transition: `color 0.3s`
- The trailing `/ About Us` item is a plain `<span>` — **not** a link, no hover.

### Everything else
- N/A — the banner is static: no scroll, click, or time-driven behaviour.

## Assets
- Background: `public/images/header-bg.png` (already downloaded, 42,864 bytes)
- Icons used: none

## Text Content (verbatim)
- **/about/** → h1 `About Us`; breadcrumb `Home` + `/ About Us`
- **/contact-us/** → h1 `Contact Us`; breadcrumb `Home` + `/ Contact Us`

## Responsive Behavior
- **Desktop (≥768px):** padding `80px 0`; content column capped at 700px and centred.
- **Mobile (≤767px):** padding becomes **`50px 20px`** (vertical shrinks, horizontal gutter appears).
- **Breakpoint:** exactly 767/768px. No tablet-specific rule exists.
- Heading size does **not** change at any breakpoint — it stays 40px.
