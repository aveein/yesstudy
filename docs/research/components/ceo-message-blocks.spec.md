# CeoMessageBlock Specification

Source: `https://niec.edu.np/about/ceos-message/` — Elementor page `5973`, containers
`3cb4bd9`, `20db9c6`, `decd8dc`, `e007dc7`.

Four prose blocks in three layouts. One parameterized component serves all four.

## Overview
- **Target file:** `src/components/about/CeoMessageBlock.tsx`
- **Interaction model:** static. No hover, scroll, click or time-driven behaviour anywhere
  on this page.

## Layouts

| # | Elementor id | Layout | Background | Columns (`--width` ≥768px) | Column gap |
|---|---|---|---|---|---|
| 1 | `3cb4bd9` | image left, text right | white | **40% / 70%** | 50px |
| 2 | `20db9c6` | text left, image right | `#F1F7FF` sky | 60% / 40% | 40px |
| 3 | `decd8dc` | quote, no image | white | — (800px column) | — |
| 4 | `e007dc7` | image left, text right | `#F1F7FF` sky | 40% / 60% | 40px |

### ⚠ Block 1's columns sum to 110%
`40% + 70% = 110%`, and the row is `flex-wrap: nowrap` on desktop, so **flex-shrink resolves
the overflow**. Available = `1200 − 50` gap = 1150px; bases are 480 and 840 (total 1320);
the 170px overflow is distributed in proportion to basis, yielding the measured
**418.906px / 731.094px**. Reproduce by declaring the same two percentages inside a
`flex-nowrap` row and letting the browser shrink them — do **not** hard-code the pixel widths.

Blocks 2 and 4 sum to exactly 100%, so their shrink is only the gap:
measured **695.859px / 464.141px**.

## Computed Styles

### Block 1 container `3cb4bd9`
- display: flex; flex-direction: row; flex-wrap: nowrap (desktop) / wrap (≤767px)
- align-items: **center**; gap: **20px 50px**
- **margin: 60px 0**; padding: `0 10px` outer + `10px 0` inner (`.e-con` default)
- background: none (white); measured box `1905 × 614`

### Blocks 2 & 4 containers `20db9c6` / `e007dc7`
- display: flex; flex-direction: row; align-items: center; gap: **20px 40px**
- margin: 0; **padding: 60px 0** (vertical on `.e-con-inner`)
- background-color: `#F1F7FF` (`--e-global-color-a86860a`) → **`niec-sky`**
- measured boxes `1905 × 464` and `1905 × 437`

### Block 3 container `decd8dc`
- display: flex; flex-direction: column
- padding: **40px** (horizontal `0 40px` on the outer, vertical `40px 0` on the inner)
- `--content-width: **800px**` at `@media(min-width:768px)` — narrower than the 1200px default
- background: none (white); measured box `1905 × 270`, inner `800 × 270`

### Columns (all blocks)
- Every column is a `column` flex container with the `.e-con` default **10px padding**
  (session-4 trap #2 — not in the section CSS, only in `getComputedStyle`).
- Text columns carry the kit's **30px** widget gap.
- Below 768px `--width` is unset, so each column falls back to `.e-con`'s `--width: 100%`
  and the blocks stack.

### Images (`17eb0ec`, `9661fb4`, `1cfce14`)
- Each is `img { width: 100% }`; height is auto, so the intrinsic aspect ratio is preserved.
- No border-radius, no object-fit that matters (`fill` is declared but never applies).

| Block | File | Natural | Rendered @1200px |
|---|---|---|---|
| 1 | `webpc-passthru-8-2.webp` | 370 × 532 | 398.906 × 573.562 |
| 2 | `webpc-passthru-9-1.webp` | 370 × 270 | 444.141 × 324.094 |
| 4 | `webpc-passthru-10-1.webp` | 350 × 234 | 444.141 × 296.938 |

Alt text on all three (verbatim, identical):
`Best Consultancy in Nepal for USA, UK, Australia, Canada, Ireland, New Zealand and Germany`

### Body copy (all text-editor widgets)
- font-size: **16px**; line-height: **24px** (1.5); color `#111111`
- `p { margin-block-end: .9rem }` → 14.4px between paragraphs

### Block 3's quote rule — easy to miss
`b705ab5 > .elementor-widget-container`:
- `padding: 40px`
- `border-style: solid; border-width: **0 0 0 6px**`
- **no `border-color` is declared**, so it resolves to `currentColor` → **`#111111`**

That 6px black left rule plus 40px inset is the entire "quote" treatment — there is **no
`<blockquote>` element**; the paragraph is a plain `<p>` wrapped in `<strong>`.

## Text Content (verbatim)
Extracted programmatically into `src/data/ceos-message.json` by
`scripts/extract-ceos-message.mjs`. Paragraphs are stored as arrays of runs
(`{ text, bold }`) because the prose carries inline `<strong>`:

- **Block 1** — 3 paragraphs, no emphasis. Opens `Dear Students and Parents,`
- **Block 2** — 1 paragraph with a bold clause mid-sentence:
  `Your greatest resource is yourself, and if utilized properly, this is the most powerful resource in the world.`
- **Block 3** — 1 paragraph, **entirely bold**
- **Block 4** — 2 paragraphs; the first ends with the CEO's email address, the second is
  entirely bold: `All the best for your future plans!`

## States & Behaviors
N/A — verified: no hover rules on any container or image, no animation classes, no scroll
handlers. The only interactive element on the whole page is the banner's `Home` link.

## Assets
- `public/images/webpc-passthru-8-2.webp`
- `public/images/webpc-passthru-9-1.webp`
- `public/images/webpc-passthru-10-1.webp`

(The `webpc-passthru-` prefix is the upstream WebP-converter's filename, kept verbatim so the
extractor's mechanical URL→path mapping keeps working.)

## Responsive Behavior
- **≥768px:** as tabled above.
- **≤767px:** every column becomes 100% and the blocks stack in DOM order — so blocks 1 and 4
  put the image above the text, and block 2 puts the text above the image. Vertical padding
  and margins are unchanged (no mobile override exists for these containers).
- **Breakpoint:** 768px.
