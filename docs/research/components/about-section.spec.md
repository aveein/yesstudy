# AboutSection Specification

## Overview
- **Target file:** `src/components/AboutSection.tsx`
- **Screenshot:** `docs/design-references/02-about.jpg`
- **Interaction model:** **scroll-driven** — the three counters animate 0 → target when the
  section enters the viewport. Everything else is static.

## DOM Structure

```
section                     background transparent (white page), padding 0 20px
  └─ inner                  max-width 1200px, margin auto, flex column, gap 30px, padding 100px 0
      └─ stack  26e8ca0     flex column, gap 10px
          ├─ eyebrow        "About", centred, 20px/20px w500
          ├─ heading        <p>, centred, 32px/41.6px w700, container padding 0 204px, margin-bottom 30px
          ├─ counters       CSS grid, 3 × 380px columns, gap 30px  (380*3 + 30*2 = 1200)
          │    └─ each cell: counter block, flex, justify-content center
          └─ cta            centred button
```

## Computed Styles (exact values from getComputedStyle)

### Section
- backgroundColor: transparent (page white); padding: `0px 20px`
- Total height 690px

### Inner
- maxWidth: `min(100%, 1200px)`; margin-inline auto
- display flex; flexDirection column; gap `30px`; padding `100px 0px`

### Eyebrow "About"
- fontSize `20px`; lineHeight `20px`; fontWeight `500`; color `#111111`; textAlign `center`; margin 0

### Heading (a `<p>`, not an `<h*>`)
- fontSize `32px`; lineHeight `41.6px`; fontWeight `700`; color `#111111`; textAlign `center`; margin 0
- Its wrapper has `padding: 0px 204px` → text column is 792px wide inside the 1200px container.
  Express as `padding-inline: 17%` so it scales.
- Wrapper `margin-bottom: 30px`

### Counters grid
- display `grid`; gridTemplateColumns `380px 380px 380px`; gap `30px`
- Each cell `380 × 150`, content flex-centred (`justify-content: center`), inner block 172px wide
- Number: fontSize `100px`; lineHeight `100px`; fontWeight `400`; color `#FC6E1F`; textAlign center
- Title: fontSize `20px`; lineHeight `50px`; fontWeight `500`; color `#111111`; textAlign center

### CTA button
- label `Learn more`
- fontSize `16px`; fontWeight `500`; color `#FC6E1F`
- backgroundColor transparent; border `1px solid #FC6E1F`; borderRadius `100px`
- padding `18px 40px 16px` (note the asymmetric vertical padding); renders `164 × 52`
- Centred in the row.

## States & Behaviors

### Counter count-up (the only behaviour in this section)
- **Trigger:** the counters entering the viewport — `IntersectionObserver`, fires **once**.
- **State A (before):** displays `0`, `0K+`, `0+` — confirmed in the scroll-0 screenshot.
- **State B (after):** `26`, `50K+`, `300+`
- **Transition:** ramp from 0 to the target over **1000ms** (Elementor's `data-duration`).
  Use `requestAnimationFrame`; the suffix is static text appended after the number.
- Implementation: client component, `IntersectionObserver` + rAF. Respect
  `prefers-reduced-motion` by jumping straight to the final value.

### Button hover
- Global kit rule: background transparent → `#FC6E1F`, color `#FC6E1F` → `#FFFFFF`.

### Heading link hover
- The heading contains inline links styled like plain text (`color: #111111`); on hover they
  turn `#FC6E1F`. No underline.

## Per-State Content

### Counters (in order)
| Number | Suffix | Title |
|---|---|---|
| 26 | — | `Years of Excellence` |
| 50 | `K+` | `Students Served` |
| 300 | `+` | `Affiliated Universities` |

## Assets
None — this section has no images or icons.

## Text Content (verbatim)

Eyebrow: `About`

Heading, with inline links exactly as authored (plain text between the links):

```
Yes Study is one of the Best Consultancy in Nepal for <a href="/study-abroad/study-in-usa/">USA</a>,
<a href="/study-abroad/study-in-uk/">UK</a>, <a href="/study-abroad/study-in-australia/">Australia</a>,
<a href="/study-abroad/study-in-canada/">Canada</a>, <a href="/study-abroad/study-in-new-zealand/">New Zealand</a>,
<a href="/study-abroad/study-in-ireland/">Ireland</a>, and <a href="/study-abroad/study-in-germany/">Germany</a>.
We provide the best <a href="/course/ielts/">IELTS</a>, <a href="/course/pte-a/">PTE</a>,
<a href="/course/toefl/">TOEFL</a>, <a href="/course/sat-1/">SAT</a>, <a href="/course/gre/">GRE</a>,
and <a href="/course/gmat/">GMAT</a> classes in Kathmandu, Nepal.
```

CTA: `Learn more` → `/about/`

## Responsive Behavior
- **Desktop (>1024px):** 3-column grid as specced, 1200px container, 100px vertical padding.
- **Tablet (768–1024px):** container narrows to 1024px; keep 3 columns but let them be
  `1fr 1fr 1fr` rather than fixed 380px so they fit. Heading side padding should reduce
  (use the 17% percentage form so it scales automatically).
- **Mobile (≤767px):** counters stack to a single column (Elementor grid containers collapse
  to 1 column at mobile), each centred. Reduce section padding to ~60px 0. Heading side
  padding effectively 0 at this width.
- **Breakpoint:** single column at **767px**.
