# ContactInfoBar Specification

The three icon-boxes (address / phones / email) at the top of `/contact-us/`, plus the thin
divider beneath them.

## Overview
- **Target file:** `src/components/contact/ContactInfoBar.tsx`
- **Source:** `docs/research/_capture-contact/index.html` → `fdd2a3d` (+ divider `6c0a4db`/`b6bb4a1`)
- **Interaction model:** static, except link hover on the `tel:` / `mailto:` anchors.

> **Nesting note:** all three boxes are children of `fdd2a3d` — one wrapping row. (An earlier
> parse suggested the email box was a sibling; that was a bug in `_capture/qx.mjs`, which
> treated the explicitly-closed SVG `<path>` as a void tag and ended subtrees early. Fixed.)

## DOM Structure
```
section (fdd2a3d)                   ← row, flex-wrap:wrap
  .e-con-inner
    div (99cdce4) 33.3333%          ← address
      icon-box: [map-marker] + <p>
    div (c956038) 33.3333%          ← phones
      icon-box: [phone] + <p> with two tel: links separated by <br>
    div (a9ae2e7) 33.3333%          ← email
      icon-box: [envelope] + <p> with one mailto: link

section (6c0a4db)                   ← divider row
  hr-style separator (b6bb4a1)
```

## Computed Styles (exact, from `24-post-4457.css`)

### Section `fdd2a3d`
- display: flex; flex-direction: **row**; **flex-wrap: wrap**
- gap: **0** (`--gap: 0px 0px`)
- **margin-top: 30px**; margin bottom/left/right: 0
- border-style: none
- Content column: `min(100%, 1200px)`, centred

### Each column (`99cdce4`, `c956038`, `a9ae2e7`)
- display: flex; flex-direction: column
- width: **33.3333%** at ≥768px; full-width below

### Icon-box wrapper (all three are styled identically)
- display: flex; flex-direction: **row** (`elementor-position-inline-start`)
- **align-items: center**
- **gap: 15px**
- text-align: start

### `.elementor-icon` (the coloured tile)
- **font-size: 25px** → the inline SVG is `width: 1em; height: 1em` = **25 × 25px**
- **padding: 15px** → tile is **55 × 55px** total
- **border-radius: 5px**
- **background-color: `#FFF5F0`** (`--e-global-color-cf9680f`, token `niec-cream`)
- **color / fill: `#FC6E1F`** (`--e-global-color-primary`, token `niec-orange`)
- display: inline-block; line-height: 1; flex: 0 0 auto (does not shrink)

### `.elementor-icon-box-description` (the text)
- **font-size: 18px**; **font-weight: 500**; color: `#111111`
- line-height: **1.5** (body default)
- **margin: 0** (Elementor zeroes the description's paragraph margin)

### Divider (`6c0a4db` / `b6bb4a1`)
- Separator: `border-top: 2px solid #FFF5F0`, **width: 100%**
- Wrapper padding: **`10px 0`** (`padding-block-start/end: 10px`)
- Sits in its own full-width row inside the 1200px content column

## States & Behaviors

### Link hover (phones + email)
- **Trigger:** hover on any `<a href="tel:…">` or `<a href="mailto:…">`
- color: `#111111` → `#FC6E1F` (kit link hover)
- transition: none declared on links — the colour change is instant.
- The address box contains **no link** — it is plain text, so it has no hover state.

### Everything else
N/A — static. No scroll, click, or time-driven behaviour.

## Assets
- Images: none
- **Icons — two already exist in `src/components/icons.tsx`, one must be added:**
  - `PhoneIcon` — **already exists** and its path matches this page's `fa-phone-alt` exactly. Reuse it.
  - **`MapMarkerIcon` — NEW**, add to `icons.tsx`. `viewBox="0 0 384 512"`, `fill="currentColor"`, path:
    `M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z`
  - **`EnvelopeOutlineIcon` — NEW**, add to `icons.tsx`. The existing `EnvelopeIcon` is the
    **solid** (`fas`) variant; this page uses the **regular/outline** (`far`) variant, so add a
    second icon rather than reusing it. `viewBox="0 0 512 512"`, `fill="currentColor"`, path:
    `M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z`

## Text Content (verbatim)
1. **Address** (plain text, no link):
   `4th and 5th Floor Share Market Complex, Putalisadak, Kathmandu, Nepal`
2. **Phones** (two links, separated by `<br />`):
   - `+977-9801030907` → `tel:+977-9801030907`
   - `+977-01-5356600` → `tel:+977-01-5356600`
3. **Email** (one link):
   - `admin@yesstudyusa.com` → `mailto:admin@yesstudyusa.com`

## Responsive Behavior
- **Desktop (≥768px):** three equal 33.3333% columns on one row, no gap between them; the
  icon tile and its text are vertically centred against each other.
- **Mobile (≤767px):** each column becomes full-width and they stack. The row has `gap: 0`, so
  the boxes sit flush against each other vertically — do **not** invent extra spacing.
  The icon stays inline-start (the `elementor-mobile-position-block-start` class is present in
  the markup but no CSS in this page's stylesheet activates a stacked layout).
- **Breakpoint:** 767/768px. No tablet-specific rules exist.
