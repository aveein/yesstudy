# HeroCarousel Specification

## Overview
- **Target file:** `src/components/HeroCarousel.tsx`
- **Screenshot:** `docs/design-references/01-hero.jpg`
- **Interaction model:** **time-driven** — Swiper autoplay. Not click-driven, not scroll-driven.
  3 slides, `autoplay 4000ms`, `speed 400ms`, `loop: yes`, 1 slide per view, bullets.

## DOM Structure

```
section (full-bleed, background #F1F7FF, padding 0 10px)
  └─ inner  (max-width 1200px, margin auto, display flex row,
             justify-content space-between, align-items center, padding 10px 0)
      ├─ text column   660 × 413, padding 10px
      │    ├─ h2       80px/80px bold
      │    ├─ body     22px/33px, padding-right 64px
      │    └─ button   pill
      └─ image column  516 × 563, text-align center
           └─ img      472 × 543
  └─ pagination  absolute, bottom 5px, centred
```

Vertical spacing between the three widgets in the text column is Elementor's
`--widgets-spacing: 30px` (`margin-block-end: 30px` on every widget except the last).
Check: 160 + 30 + 132 + 30 + 41 = 393, + 20px padding = 413 ✓.

## Computed Styles (exact values from getComputedStyle)

### Slide root
- backgroundColor: `#F1F7FF` (rgb(241, 247, 255))
- padding: `0px 10px`; width: 100%
- Slide height: `583px`; section height `600px`

### Inner container
- width: `1200px`; margin-inline auto
- display: flex; flexDirection: row; justifyContent: `space-between`; alignItems: `center`
- padding: `10px 0px`; gap: 0

### Text column
- width: `660px`; padding: `10px`; display flex column

### Heading `h2`
- fontSize: `80px`; lineHeight: `80px`; fontWeight: `700`
- color: `#111111`; letterSpacing: normal; margin: 0
- width 640px (wraps to 2 lines for the long titles)

### Body text
- fontSize: `22px`; lineHeight: `33px`; fontWeight: `400`
- color: `#111111`; padding: `0px 64px 0px 0px`; margin 0

### Button
- fontSize: `15px`; fontWeight: `400`; color: `#FFFFFF`
- backgroundColor: `#FC6E1F`; border: `1px solid #FC6E1F`
- padding: `12px 24px`; borderRadius: `100px`
- Rendered `125 × 41`

### Image
- width `472px`; height `543px`; objectFit: `fill`; borderRadius 0
- Wrapper column is `516px` wide, `text-align: center`

### Pagination
- position absolute; bottom `5px`; horizontally centred
- 3 bullets, `7 × 7px`, borderRadius `50%`, margin `0 6px`
- colour `#00ADEF` (blue) — inactive `opacity: 0.2`, active `opacity: 1`

## States & Behaviors

### Autoplay advance
- **Trigger:** timer, every `4000ms`
- **Transition:** `400ms` slide translate, loops infinitely
- Pauses while the pointer is over the carousel.

### Bullet click
- Jumps to that slide, same 400ms transition.

### Button hover
- Global Elementor kit rule: background `#FC6E1F` → transparent, color `#FFFFFF` → `#FC6E1F`,
  border stays `1px solid #FC6E1F`.

## Per-State Content

Three slides, in DOM order. Each image is a **single composed PNG** — the circular crop and
the orange circle decoration are baked into the artwork, so do **not** build overlay layers.

### Slide 1
- Title: `Study Abroad`
- Body: `Discover top destinations for education: USA, UK, Australia, Canada, New Zealand, Ireland, and Germany for global opportunities.`
- Button: `Learn More`
- Image: `/images/study-abroad-website-banner-2025-new.png`

### Slide 2
- Title: `Test Preparation`
- Body: `Prepare for Best IELTS, PTE, TOEFL, SAT, GRE, and GMAT with expert guidance and personalized strategies to achieve your highest scores and academic goals.`
- Button: `Learn More`
- Image: `/images/website-banner-2005-test-preparation.png`

### Slide 3
- Title: `Expert Guidance and Support`
- Body: `Get expert guidance and support for studying abroad, career planning, and test preparation at the best consultancy in Nepal for USA, UK, Canada, Ireland, New Zealand, and Germany.`
- Button: `Learn More`
- Image: `/images/study-abroad-website-banner-2005.png`

## Assets
- `/images/study-abroad-website-banner-2025-new.png`
- `/images/website-banner-2005-test-preparation.png`
- `/images/study-abroad-website-banner-2005.png`
- Shared: `@/components/ui/carousel` → `Carousel`

## Responsive Behavior

Verified from the site's own `@media` blocks (loop template `elementor-4422`):

- **≥768px:** text column `--width: 55%` (image column takes the rest). Two columns side by
  side, `justify-content: space-between`, `align-items: center`. Heading `80px/80px`.
- **≤767px:** `@media(max-width:767px)` sets the heading to **`font-size: 40px`** — this is the
  only declared mobile override. The columns stack (Elementor containers wrap via
  `--flex-wrap-mobile: wrap`): text above image. Body stays `22px`, button unchanged.
- Body text keeps its `padding: 0% 10% 0% 0%` (10% of the column — 64px at desktop).
- **Breakpoint:** stack at **767px**.
- Keep **1 slide per view at every width** (each slide is itself a full two-column layout).
