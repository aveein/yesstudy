# TestimonialsSection Specification

## Overview
- **Target file:** `src/components/TestimonialsSection.tsx`
- **Screenshot:** `docs/design-references/10-testimonials.jpg`
- **Elementor id:** `df39bfa` (section 8). Card loop template `1866`.
- **Interaction model:** **time-driven carousel** — 3/2/1 per view, autoplay 5000ms,
  speed 1000ms, gap 20px, bullets **and arrows**. Reuses `src/components/ui/carousel.tsx`.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure

```
section  df39bfa           bg #F1F7FF, padding 60px 0 0 0, flex column, gap 30px
  └─ inner                 max-width 1200px
      ├─ fd7892f   header row   flex row, gap 30px, padding 0 40px 20px 40px
      │    ├─ 0938765   flex column, padding 0
      │    │    ├─ f7aeb12  "Testimonial"   <h3>, 20px/600
      │    │    └─ efb9018  headline        <h3>, 32px/700, 1.3em
      │    └─ 3621766   flex COLUMN, justify-center, items-end
      │         └─ 6c33025  "View More" outlined pill
      └─ 62c3b9d   carousel wrapper, --border-radius 20px, padding 0 40px 100px 40px
           └─ 7ce1baa > c815b96   loop carousel, 6 slides
```

**The 40px side padding on both `fd7892f` and `62c3b9d` is what insets this whole section
40px further than its neighbours** — in the screenshot its content starts at x≈320 while every
other section starts at x≈288. Reproduce it; do not fold it into the container.

Usable track width: `1200 − 80 = 1120px`.
Slide width: `(1120 − 2×20) / 3 = 360px`. Measured ≈361px ✓.

Note the section's own padding is `60px 0 0 0` — **no bottom padding and no side padding**.
The bottom space comes from the carousel wrapper's `padding-bottom: 100px`.

## Carousel settings (from `c815b96`'s CSS custom properties)

| Property | Value |
|---|---|
| `--swiper-slides-to-display` | `3` · `2` @≤1024px · `1` @≤767px |
| `--swiper-slides-gap` | `20px` |
| autoplay delay | `5000ms` |
| speed | **`1000ms`** (slower than the other card carousels, which use 500ms) |
| loop | yes |
| `--swiper-pagination-size` | `7px` |
| `--dots-normal-color` | **`#00ADEF`** (`--e-global-color-secondary`) — blue here, orange elsewhere |
| `--swiper-pagination-spacing` | `20px` |
| `--dots-vertical-offset` | not set → `0px` |

Bullet gap from the cards: swiper `padding-bottom = 7 + 20 = 27px`, pagination
`top: 100%` + `translateY(-100%)` → the bullets' top edge sits **20px below the cards**
(same net offset as Featured Universities, reached by different numbers).

→ `paginationPosition="below"`, `paginationOffset={20}`, `bulletSize={7}`,
`bulletColor="#00ADEF"`.

### Arrows

| Property | Value |
|---|---|
| prev | `left: calc(0% + 0px)`, `translateX(0)`, `top: 50%`, `translateY(-50%)` |
| next | `right: calc(0% + 0px)`, `translateX(0)`, `top: 50%`, `translateY(-50%)` |
| glyph | Elementor `eicon-chevron-left` / `-right` — **identical to `ChevronLeftIcon` / `ChevronRightIcon` already in `src/components/icons.tsx`** |
| size | `--arrow-size` not set → **25px** (`svg { width: 1em; height: 1em }`) |
| colour | `--arrow-normal-color` not set → **`hsla(0, 0%, 93%, .9)`** — a very light grey |
| transition | `250ms` |

**The arrows sit at the track's own left/right edges and overlap the first/last card** — they
are not outside the track. `src/components/ui/carousel.tsx` was updated to match
(`arrows`, `arrowSize`, `arrowColor` props); pass `arrows` and take the defaults.

`.elementor-element-c815b96 .swiper-slide > .elementor-element { height: 100% }`
→ all cards stretch to the tallest card in view, content top-aligned, whitespace at the bottom.

## Computed Styles (verbatim from the capture)

### Section `df39bfa`
- flex column, gap 30px; `padding: 60px 0 0 0`; margin 0
- `background-color: #F1F7FF` (`--e-global-color-a86860a`)

### Header row `fd7892f`
- `--flex-direction:row`; gap 30px; `padding: 0 40px 20px 40px`

#### `f7aeb12` — eyebrow, **`<h2>`** in the source (an earlier draft of this spec said `<h3>`)
- `text-align:start; font-size:20px; **font-weight:600**; color:#111111`; line-height 1
- (Other sections' eyebrows are weight 500; this one is 600.)

#### `efb9018` — headline, `<h3>`
- wrapper `margin:0; padding:0 0 4px 0`
- `text-align:start; font-size:32px; font-weight:700; line-height:1.3em; color:#111111`
- **No mobile font-size override.**

#### `3621766` (button cell)
- `--display:flex` with no `--flex-direction` → **column** → `justify-content:center` centres
  vertically, `align-items:flex-end` right-aligns

#### `6c33025` — "View More"
- `background:#FFFFFF00`; `font-size:16px; font-weight:500; color:#FC6E1F`
- `border:1px solid #FC6E1F; border-radius:100px`; padding `12px 24px`; line-height 1
- hover/focus: `background:#FC6E1F; color:#FFFFFF`
- `elementor-hidden-mobile` → hidden ≤767px. A centred mobile copy (`62c97c5` / `0c58ca5`,
  `elementor-hidden-desktop elementor-hidden-tablet`) sits after the carousel.
- **The two copies point at different URLs upstream:** desktop → `/testimonials/`,
  mobile → `/testimonial/` (singular). Keep both exactly as they are.

### Carousel wrapper `62c3b9d`
- `--display:flex`; `--border-radius:20px`; `padding: 0 40px 100px 40px`

### Testimonial card — loop template `1866`

#### `416e1f5` (card root)
- `--display:flex` → **column**; `--gap: 20px`
- `--border-radius: 8px`; `--padding: 30px`
- `background-color: #FFFFFF`
- `--flex-grow:0; --flex-shrink:0`
- No hover treatment at all.

#### `29d27a4` (avatar)
- `img { width:70px; height:70px; object-fit:cover; object-position:center center;
   border-radius:100px }`
- Centred by Elementor's image-widget default `text-align: center`

#### `cf380a1` (quote) — post-content widget
- widget container `margin: 0`
- `text-align:center; **line-height:22px**`
- font-size not overridden → **16px**; colour `#111111`
- Contains a `<p>`, which keeps the theme's `margin-block-end: .9rem` (14.4px)
- Every quote contains one or more inline `<a href>` links around "Yes Study" / "US study".
  They inherit `#111111` and only change on hover, so **rendering them as plain text is
  visually identical** and is what this clone does (same call as `WhatWeDoSection`).

#### `b95e33b` (name) — renders as a `<p class="elementor-heading-title">`
- widget container `margin:0; padding:0`
- `text-align:center; font-size:16px; font-weight:600; line-height:1.3em; color:#111111`

#### `1246271` (meta block)
- `--display:flex; --flex-direction:column; --justify-content:center`
- `--row-gap: 0; --column-gap: 10px`
- **`margin-top: -10px`** — pulls the block up so the visible gap under the name is 10px, not
  the card's 20px
- border none, radius 0, padding 0

#### `94bc08c` (university) and `0510769` (scholarship) — both `<h5>`
- widget container `margin: 0`
- `text-align:center; font-size:13px; font-weight:500; line-height:1.3em; color:#111111`

### Height check (tallest card, #3 — 7 quote lines)
`30 + 70 + 20 + (7×22 + 14.4) + 20 + 20.8 + (20 − 10) + 16.9 + 16.9 + 30 ≈ 403px`.
Measured in the screenshot ≈401px ✓.

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Card | — | **none** — template 1866 declares no hover |
| "View More" pill | hover | bg transparent → `#FC6E1F`; text → `#FFFFFF` |
| Arrows | click | step one slide; `250ms` colour transition on hover |
| Carousel | pointer over track | autoplay pauses |
| Bullet | click | jump to that slide |

## Text Content (verbatim)

- Eyebrow: `Testimonial`
- Headline: `Thousands of students can't be wrong`  (plain ASCII apostrophe)
- Desktop button: `View More` → `/testimonials/`
- Mobile button: `View More` → `/testimonial/`  (singular — upstream inconsistency, kept)

### Slides, in source order

| # | Name | University | Scholarship | Avatar |
|---|---|---|---|---|
| 1 | `Arbin Bhandari` | `Gannon University` | `Scholarship: $30421` | `/images/arbin.webp` |
| 2 | `Preshna Karki` | `Gannon University` | `Scholarship: $30421` | `/images/img-4172.jpg` |
| 3 | `Lemon Dhakal` | `Juniata College` | `Scholarship: $49000` | `/images/img-2944-1.jpg` |
| 4 | `Tenzing Gurung` | `Gannon University` | `Scholarship: $5000` | `/images/img-2942-1.jpg` |
| 5 | `Sajan Banjara` | `University of Utah` | _(none)_ | `/images/webpc-passthru-7.webp` |
| 6 | `Tsering Choden Gurung` | `University of Louisiana Monroe` | _(none)_ | `/images/webpc-passthru-5.webp` |

Cards 5 and 6 genuinely have **no scholarship element** — skip it entirely when empty.

Quotes:

1. `Thank you for helping me through the process. I had a great time here in Yes Study. Thank you.`
2. `It was a really great experience joining Yes Study for my abroad study counseling. I am immensely grateful to Pramila ma’am and Sohail sir for helping me to get through all the processes regarding US study. Thank you for everything Yes Study.`
   — note the curly `’` in `ma’am`
3. `I would like to thank Yes Study, for being my mentor and guide throughout my whole process of my abroad journey. After being denied for Australia visa, they guided me, especially Pramila maam and Suhail Dai, to make my process as short as around 2 weeks.`
   — the source has a double space in "denied  for"; HTML collapses it, so a single space is correct
4. `I would like to thank Yes Study for being a part of my abroad journey as a mentor and complete guide. Thank you so much again.`
5. `Thank you Yes Study, it was a very amazing six months with you guys. The staffs and friends I made here during my study were very much supportive. It was one of my best decision that I chose Yes Study.`
6. `My experience in Yes Study was amazing. All of the staffs are very helpful towards the students. I will always be grateful towards Yes Study family for the experience i got and the guidance that led me towards my dream!`

Typos ("staffs", "i got", "maam") are upstream — keep them.

## Assets
All six already downloaded to `public/images/`:
`arbin.webp`, `img-4172.jpg`, `img-2944-1.jpg`, `img-2942-1.jpg`,
`webpc-passthru-7.webp`, `webpc-passthru-5.webp`.

## Responsive Behavior

- **Desktop (>1024px):** 3 slides per view, 360px each, 20px gap, 40px side padding.
- **Tablet (768–1024px):** 2 slides per view.
- **Mobile (≤767px):** 1 slide per view; the desktop "View More" is hidden and the centred
  mobile copy shows. **No other overrides exist for this section** — the 40px side padding,
  the 60px top padding, the 100px bottom padding and the heading sizes all stay exactly as
  they are at desktop.
