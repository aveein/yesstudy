# WhyChooseUsSection Specification

## Overview
- **Target file:** `src/components/WhyChooseUsSection.tsx`
- **Screenshots:** `docs/design-references/06-why-choose-us-top.jpg` (top half),
  `docs/design-references/07-why-choose-us-bottom.jpg` (bottom half)
- **Elementor id:** `9b3db37` (section 5)
- **Interaction model:** **fully static**. No carousel, no hover, no scroll effect.
  The only interactive element is the eyebrow heading, which is a link.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure

```
section  9b3db37          white, padding 100px 20px, flex column, gap 30px
  └─ inner                max-width 1200px
      └─ 0cc73e7          flex column, gap 10px, --border-radius 20px, padding 0
          ├─ 252b5f6  <h2><a>Why choose us?</a></h2>   centred, 20px/500, line-height 1
          ├─ de1e17e  <h3> headline                    centred, 32px/700, 1.3em
          │                                            wrapper margin 0 20%, padding-bottom 40px
          └─ e030a8d  flex ROW, align-items center, gap 50px
               ├─ 1dcfe84   image column   (575px)
               │    └─ d8df1c2  img  h 650px, cover, radius 21px
               └─ 95bd848   copy column    (575px), flex column, gap 50px
                    ├─ 26736ca  icon box — Expert Guidance      (paper-plane)
                    ├─ d2c9503  icon box — Study Support        (file-alt)
                    └─ 7dfedbb  icon box — Proven Track Record  (crown)
```

Neither column of `e030a8d` declares a `--width`, so both default to `--width:100%` with
`flex-shrink: 1` and split the row evenly: `(1200 − 50) / 2 = 575px` each.
Screenshot check: the image measures ≈573px wide ✓.

## Computed Styles (verbatim from the capture)

### Section `9b3db37`
- `--display:flex; --flex-direction:column`; gap 30px (kit default)
- padding `100px 20px` (source literally reads `--padding-top: 0100px`, i.e. 100px)
- margin 0; no background → white page shows through

### `0cc73e7`
- `--display:flex` → column; `--gap:10px`; `--border-radius:20px`; padding 0
- `@media(max-width:767px)`: `padding: 40px 0`

### `252b5f6` — eyebrow, renders as `<h2>` wrapping an `<a>`
- `text-align:center`
- `font-size:20px; font-weight:500; color:#111111`
- `line-height: 1` (global `.elementor-heading-title`)
- Link target: `/about/services/`; inherits colour, hovers to `#FC6E1F` (kit link rule)

### `de1e17e` — headline, renders as `<h3>`
- widget container: `margin: 0 20% 0 20%`, `padding: 0 0 40px 0`
  → at 1200px the text block is inset 240px each side, i.e. **720px wide, centred**
- `text-align:center`
- `font-size:32px; font-weight:700; line-height:1.3em; color:#111111`

### `e030a8d` — two-column row
- `--flex-direction:row`; `--align-items:center`; `--gap:50px`; padding 0
- `--flex-wrap-mobile: wrap` → stacks at ≤767px

### `1dcfe84` (image column)
- `--display:flex` → column; padding 0; margin 0

### `d8df1c2 img`
- `height:650px; object-fit:cover; object-position:center center;
   border-radius:21px 21px 21px 21px`
- width fills the column (575px)
- `@media(max-width:767px)`: `height: 300px`
- The photo, the blue circle, the yellow circle and the orange half-circle are **all baked into
  the single source JPEG** (same approach as the What-we-do cards). Do **not** build decoration
  layers.

### `95bd848` (copy column)
- `--display:flex` → column; `--gap:50px`; padding 0; margin 0

### Icon boxes `26736ca` / `d2c9503` / `7dfedbb` — identical styling

All three are `elementor-position-inline-start` + `elementor-view-default`.

- wrapper: `display:flex; flex-direction:row; text-align:start;`
  **overridden → `align-items: start; gap: 28px`**
- icon holder: `flex: 0 0 auto; line-height: 0`
- `.elementor-icon`: `font-size: 33px; line-height: 1; fill/color/border-color: #00ADEF`
  with `svg { display:block; width:1em; height:1em }` → the icon renders **33 × 33 px in
  `#00ADEF`**. `view-default` means **no background chip and no border** — just the glyph.
- content column: `flex-grow: 1; width: 100%`
- title `<h3 class="elementor-icon-box-title"><span>…</span></h3>`:
  `font-size:24px; font-weight:700; line-height:0px; color:#111111`
  plus the theme's `margin-block-start: .5rem` (8px) and the section's
  **`margin-block-end: 20px`**.
  **`line-height: 0px` is deliberate** — same trick as the Latest Events day number; the glyph
  overflows a zero-height box. Reproduce literally.
- description `<p class="elementor-icon-box-description">`:
  `font-size:16px; margin:0; line-height:1.5` (body default); colour inherits `#111111`

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Eyebrow link "Why choose us?" | hover | `#111111` → `#FC6E1F` (global kit rule) |
| Everything else | — | none |

No entrance animation, no scroll trigger, no hover on the image or the icon boxes.

## Text Content (verbatim)

- Eyebrow: `Why choose us?` → `/about/services/`
- Headline: `Nepal’s Number One Educational Consultancy`
  **Note the curly apostrophe U+2019 (`’`) — the source uses it here.** The three body
  paragraphs below use plain ASCII `'`.

### Icon box 1 — icon `paper-plane`
Title: `Expert Guidance`

> At Yes Study, our team of experienced instructors and counsellors specializes in providing expert guidance not only for test preparation but also for achieving success in studying abroad. With years of expertise in both areas, we offer personalized support tailored to each student's needs, ensuring they are well-equipped to excel in their exams and pursue their dreams of studying abroad. If you are looking for the best IELTS, PTE, TOEFL, SAT, GRE, and GMAT classes in Kathmandu, Nepal, Yes Study could be the right place for you.

### Icon box 2 — icon `file-alt`
Title: `Study Support`

> We recognise the significance of effective study support in both test preparation and studying abroad. That's why, at Yes Study, we provide a wide array of study materials and resources to support our students on their journey. From practice tests and study guides for exam preparation to guidance on application procedures and visa requirements for studying abroad, we offer everything our students need to succeed in both endeavors.

### Icon box 3 — icon `crown`
Title: `Proven Track Record`

> With over twenty six years of experience, Yes Study has established a proven track record in both test preparation and study abroad placements. Our commitment to student success is evident in the thousands of students who have passed through our doors and gone on to achieve their academic and career aspirations abroad. When you choose Yes Study, you're choosing a trusted partner for success in both test preparation and studying abroad. Thousands of students have found success through Yes Study's test preparation and study abroad services. If you're searching for the best consultancy in Nepal for USA, UK, Canada, Australia, Ireland, New Zealand, or Germany, Yes Study might be your next destination.

## Assets
- `/images/1193x795-website-banner-i.jpg` — alt `Best IELTS Classes in Kathmandu - banner`
  (source is 682 × 1024, rendered 575 × 650 with `object-fit: cover`)

Icons come from `src/components/icons.tsx`, already extracted:
`PaperPlaneIcon`, `FileTextIcon`, `CrownIcon`.

## Responsive Behavior

- **Desktop (>1024px):** two 575px columns, 50px gap, image 650px tall, headline inset 20%
  each side.
- **Tablet (768–1024px):** container 1024px; the row keeps two columns and both shrink to
  `(1024 − 50) / 2 = 487px`. No tablet-specific overrides exist.
- **Mobile (≤767px):**
  - `0cc73e7` padding becomes `40px 0`.
  - The row wraps to a single column (`--flex-wrap-mobile: wrap`): image first, copy below,
    50px row gap.
  - Image height drops to **300px**.
  - The headline's `margin: 0 20%` still applies (it is not overridden) — keep it.
