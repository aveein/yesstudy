# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/01-hero.jpg` (top 114px)
- **Interaction model:** static position + hover-driven dropdowns. **NOT sticky** — verified at
  scroll 0 / 600 / 3000: `position: static`, height stays 114px, no background or shadow change.

## DOM Structure

Two sibling containers, only one visible at a time:

```
<header>                                  (114px tall, transparent)
  ├─ DESKTOP container  e8c705c           .elementor-hidden-tablet .elementor-hidden-mobile  → shown >1024px
  │   └─ pill  5c8a035                    the white translucent rounded bar
  │       ├─ logo widget  df54bcd         <img src="/images/niec-logo.png">
  │       └─ nav container  4f12899       flex row, justify-end, align-center, gap 10px
  │           ├─ nav menu  2f31b01        <ul> horizontal, 11 top-level items, 3 with dropdowns
  │           └─ button  c69f26d          "Contact Us" pill
  └─ MOBILE container  3365990            .elementor-hidden-desktop  → shown <=1024px
      ├─ logo  3911b2c                    <img> width 165px
      └─ nav toggle  c2195e2              hamburger, opens dropdown panel
```

## Computed Styles (exact values from getComputedStyle)

### Outer container `e8c705c`
- display: flex; alignItems: center
- padding: `10px 40px 20px 40px`
- width: 100% (full-bleed — **not** the 1200px content column)
- z-index: 100
- background: transparent

### Pill `5c8a035`
- display: flex; flexDirection: row; gap: `30px`
- backgroundColor: `rgba(255, 255, 255, 0.64)`  (source authored as `#FFFFFFA3`)
- backdropFilter: `blur(10px)`
- borderRadius: `40px`
- boxShadow: `0px 5px 10px 0px rgba(0, 0, 0, 0.06)`
- padding: `5px 15px`
- Rendered box at 1920px viewport: `1825 × 84`

### Logo `df54bcd img`
- Declared `width: 165px`; the image is allowed to shrink under flex pressure —
  at a 1920px viewport it renders **148 × 74**. Keep it shrinkable, do not set `flex-shrink: 0`.
- Natural size 800×400 (2:1). Asset: `/images/niec-logo.png`, alt `Yes Study`.

### Nav container `4f12899`
- display: flex; flexDirection: row; justifyContent: `flex-end`; alignItems: center; gap: `10px`

### Nav item `.elementor-item` (top level)
- padding: `13px 20px`
- fontSize: `16px`; fontWeight: `400`; lineHeight: `20px`
- color: `#111111`
- Active item ("Home"): color `#FC6E1F`
- Items with children render a caret — use `CaretDownIcon` from `icons.tsx`, ~11px, inline after the label.

### Dropdown panel `.elementor-nav-menu--dropdown`
- backgroundColor: `#FFFFFF`
- boxShadow: none; borderRadius: 0; padding: 0
- Sub-item: padding `13px 20px`; fontSize `15px`; fontWeight `500`; color `#111111`

### CTA button `c69f26d .elementor-button`
- backgroundColor: `#FC6E1F`; color: `#FFFFFF`
- padding: `12px 24px`; borderRadius: `100px`
- fontSize: `16px`; fontWeight: `500`; border: none
- Rendered box: `128 × 40`. Label: `Contact Us`, href `/contact/`

## States & Behaviors

### Nav link hover
- **Trigger:** hover / focus
- color: `#111111` → `#FC6E1F`. No transition declared (instant).

### Dropdown open
- **Trigger:** hover on a parent item (desktop). Elementor default — panel is absolutely
  positioned directly under the item, left-aligned.
- Sub-item hover: color `#111111` → `#FC6E1F`, background stays `#FFFFFF`.

### CTA button hover
- **Trigger:** hover / focus
- backgroundColor: `#FC6E1F` → `#00ADEF`  (blue — *not* the global transparent-hover style)
- color stays `#FFFFFF`

### Mobile toggle
- Hamburger icon (`MenuIcon`), colour `#FC6E1F`, icon size 30px, `margin-left: auto`.
- Open state swaps to `CloseIcon`. Dropdown panel background `#FDFDFD`, item font-size 14px.

## Per-State Content
N/A — no tabbed content.

## Assets
- Logo: `public/images/niec-logo.png`
- Icons: `CaretDownIcon`, `MenuIcon`, `CloseIcon` from `@/components/icons`

## Text Content (verbatim)

Top-level nav, in order, with hrefs:

```
Home              /
About Us          /about/
    CEO’s Message         /about/ceos-message/
    Services              /about/services/
Study Abroad      /study-abroad/
    STUDY IN USA          /study-abroad/study-in-usa/
    STUDY IN THE UK       /study-abroad/study-in-uk/
    STUDY IN AUSTRALIA    /study-abroad/study-in-australia/
    STUDY IN CANADA       /study-abroad/study-in-canada/
    STUDY IN IRELAND      /study-abroad/study-in-ireland/
    STUDY IN NEW ZEALAND  /study-abroad/study-in-new-zealand/
    STUDY IN GERMANY      /study-abroad/study-in-germany/
    STUDY IN JAPAN        /study-in-japan/
    STUDY IN CHINA        /study-in-china/
Test Preparation  /test-preparation/
    IELTS                 /course/ielts/
    TOEFL                 /course/toefl/
    PTE-A                 /course/pte-a/
    GMAT                  /course/gmat/
    GRE                   /course/gre/
    Digital SAT           /course/sat-1/
Events            /events/
Universities      /universities/
Blogs             /blogs/
Testimonials      /testimonials/
Elearning         https://elearning.niec.edu.np/login/index.php
```

Note the curly apostrophe in `CEO’s Message` — reproduce it exactly.
CTA button: `Contact Us` → `/contact/`

## Responsive Behavior
- **Desktop (>1024px):** pill bar as specced above. Full horizontal nav + CTA.
- **Tablet & Mobile (≤1024px):** desktop container hidden; mobile container `3365990` shown —
  white background, logo left (165px), hamburger right (`margin-left: auto`, 30px, orange).
  Tapping it opens a full-width dropdown panel, background `#FDFDFD`.
- **≤767px:** dropdown item font-size drops to `14px`.
- **Breakpoint:** the desktop/mobile swap is at **1024px** (Elementor `hidden-tablet` = ≤1024).
