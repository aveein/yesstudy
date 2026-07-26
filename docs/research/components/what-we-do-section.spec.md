# WhatWeDoSection Specification

## Overview
- **Target file:** `src/components/WhatWeDoSection.tsx`
- **Screenshot:** `docs/design-references/03-what-we-do.jpg`
- **Interaction model:** **static**. Two side-by-side cards. No carousel, no tabs, no scroll effects.

## DOM Structure

```
section                       transparent, padding 0 20px
  └─ inner                    max-width 1200px, flex row, column-gap 30px
      ├─ card A  585 × 799    background #F1F7FF
      └─ card B  585 × 799    background #FFF5F0
           each card: flex column, gap 30px, padding 80px 40px, border-radius 20px
             ├─ image   300 × 345, centred
             ├─ heading 28px/28px bold, centred
             ├─ body    16px/24px, centred
             └─ button  outlined pill, centred
```

585 + 30 + 585 = 1200 ✓

## Computed Styles (exact values from getComputedStyle)

### Inner
- display flex; flexDirection row; columnGap `30px`; maxWidth 1200px; padding 0

### Card (both)
- borderRadius: `20px`
- padding: `80px 40px`
- display flex; flexDirection column; gap `30px`
- **Card A background:** `#F1F7FF` (rgb(241,247,255))
- **Card B background:** `#FFF5F0` (rgb(255,245,240))

### Image
- width `300px`; height `345px`; objectFit `fill`; borderRadius 0; centred in the card
- Each image is a **single composed PNG** — the circular photo crop and the orange / cyan
  circle decorations behind it are baked into the artwork. Do NOT build overlay layers.

### Heading
- fontSize `28px`; lineHeight `28px`; fontWeight `700`; color `#111111`; textAlign `center`

### Body
- fontSize `16px`; lineHeight `24px`; fontWeight `400`; color `#111111`; textAlign `center`

### Button
- fontSize `15px`; fontWeight `400`; color `#FC6E1F`
- backgroundColor transparent; border `1px solid #FC6E1F`; borderRadius `100px`
- padding `12px 24px`; renders `125 × 41`; centred

## States & Behaviors

### Button hover
- Global Elementor kit rule: background transparent → `#FC6E1F`, color `#FC6E1F` → `#FFFFFF`.

### Card hover
None — these cards have no hover treatment.

## Per-State Content
N/A — static.

## Text Content (verbatim)

### Card A
- Heading: `What we do`
- Body: `At Yes Study, we specialize in comprehensive test preparation services, guiding students to excel in exams like TOEFL, IELTS, PTE, SAT 1, GRE, and GMAT, with a focus on facilitating their aspirations to study abroad in top destinations worldwide.`
- Button: `Learn More` → `/test-preparation/`
- Image: `/images/what-we-do-website-banner.png`

Note: in the source, the exam names inside the body are inline links
(`TOEFL` → `/course/toefl/`, `IELTS,` → `/course/ielts/`, `PTE` → `/course/pte-a/`,
`SAT 1` → `/course/sat-1/`, `GRE` → `/course/gre/`, `GMAT,` → `/course/gmat/`).
Rendering them as plain text is acceptable; as links they inherit `#111111` and hover `#FC6E1F`.

### Card B
- Heading: `How we can help`
- Body: `At Yes Study, we provide personalized guidance and expert instruction to help students achieve their goals. Our tailored test preparation programs, experienced instructors, and extensive resources ensure that each student receives the support they need to excel in their chosen exams and pursue their dreams of studying abroad.`
- Button: `Learn More` → `/about/services/`
- Image: `/images/how-can-we-help-banner-1-1.png`

## Assets
- `/images/what-we-do-website-banner.png` (card A)
- `/images/how-can-we-help-banner-1-1.png` (card B)

## Responsive Behavior
- **Desktop (>1024px):** two equal columns, 30px gap, cards 585px wide.
- **Tablet (768–1024px):** stays two columns (`1fr 1fr`) inside the 1024px container; card
  padding can stay `80px 40px` but will compress — allow it to shrink to `60px 30px`.
- **Mobile (≤767px):** stacks to a single column, cards full width, 30px row gap.
- **Breakpoint:** stack at **767px**.
