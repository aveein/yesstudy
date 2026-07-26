# Global CSS Defaults — niec.edu.np

Rules that apply site-wide and are **not** repeated in the per-section CSS. Session 1 worked
from `getComputedStyle` so these were baked into its numbers; sessions reading the raw capture
must apply them by hand or every spec will drift.

Every remaining component spec assumes these.

## Typography

| Rule | Source | Effect |
|---|---|---|
| `.elementor-heading-title { line-height: 1; margin: 0; padding: 0 }` | `05-frontend.min.css` | **Every Elementor heading widget is `line-height: 1`** unless the section CSS overrides it. This is the single easiest thing to get wrong — Tailwind preflight gives headings `1.5`. |
| `body { line-height: 1.5 }` | `02-theme.css` (Hello Elementor) | Body copy and `.elementor-icon-box-description` are `1.5`. Matches Tailwind preflight. |
| `h1…h6 { line-height: 1.2; margin-block-start: .5rem; margin-block-end: 1rem; font-weight: 500 }` | `01-reset.css` | Applies only to headings that are **not** `.elementor-heading-title` — notably `.elementor-icon-box-title`. |
| Kit heading sizes | `06-post-6.css` | `h1 40 · h2 32 · h3 28 · h4 24 · h5 20 · h6 16`, all `bold`, colour `#111111`, family Satoshi. |
| Kit body | `06-post-6.css` | `16px`, `#111111`, Satoshi. |
| `p { margin-block-start: 0; margin-block-end: .9rem }` | `01-reset.css` | Paragraphs carry a **14.4px** bottom margin. Tailwind preflight zeroes it, so add it back where the source relies on it. |

## Global colours (`.elementor-kit-6`)

| Elementor var | Hex | Clone token |
|---|---|---|
| `--e-global-color-primary` | `#FC6E1F` | `niec-orange` |
| `--e-global-color-secondary` | `#00ADEF` | `niec-blue` |
| `--e-global-color-text` | `#111111` | `niec-ink` |
| `--e-global-color-accent` | `#A4A4A4` | `niec-grey` |
| `--e-global-color-803f4dc` | `#FFFFFF` | `niec-white` |
| `--e-global-color-cf9680f` | `#FFF5F0` | `niec-cream` |
| `--e-global-color-a86860a` | `#F1F7FF` | `niec-sky` |
| `--e-global-color-fffd53e` | `#FDFDFD` | `niec-offwhite` |
| `--e-global-color-5cfed48` | `#FFAE81` | `niec-peach` |
| `--e-global-color-90e765e` | `#FCD51F` | `niec-yellow` |

## Containers (`.e-con`)

- **Flex containers default to `column`.** `.e-con.e-flex { --flex-direction: column }`.
  A container that declares only `--justify-content` / `--align-items` and no
  `--flex-direction` is therefore a **column**: `justify-content` controls the **vertical**
  axis and `align-items` the **horizontal** one. Several sections rely on this to right-align
  and vertically-centre their "View More" pill.
- **Default gap is 30px, not 20px.** `.e-con { --gap: var(--widgets-spacing, 20px) }` and the
  kit sets `--widgets-spacing: 30px 30px`. Any container without an explicit `--gap` is 30px.
- **Content column:** `.e-con > .e-con-inner { max-width: var(--content-width); margin: 0 auto }`
  with `--content-width: min(100%, var(--container-max-width, 1140px))` and the kit's
  `--container-max-width: 1200px` (→ `1024px` ≤1024, `767px` ≤767).
- **Padding split:** horizontal padding sits on the full-width `.e-con`; vertical padding sits
  on the centred `.e-con-inner`. That is why sections read as `padding: 100px 20px` yet the
  content column is still exactly 1200px wide.
- `.elementor-absolute { position: absolute }`, positioned against the nearest `.e-con`
  (Elementor gives every container `--position: relative`).

### Shrink-to-fit traps

Two Elementor idioms make a child narrower than its parent. Both bit this clone; check for
them before assuming a child fills its column.

1. **A lone child of a `--flex-direction: row` container.** Flex items default to
   `flex: 0 1 auto`, so a single item sizes to `min(max-content, available)` — it does **not**
   stretch. The Latest Events featured card sits in such a column (`2d3f16b`) and therefore
   renders **577px**, not the 671.7px its parent's `--width: 55.974%` would suggest; its
   max-content is set by the longest unwrapped line (the venue) plus 60px of padding.
   Verified against the screenshot: the card background stops at x=756 and the mini cards
   start at x=869, a ~138px gap, not the 30px container gap.
2. **`--align-items: flex-start` on a column container.** Children are not stretched, so each
   widget shrinks to its content. The Featured Universities card (`bd9763b`) uses this, which
   is why its logos render ~70 × 70 at the left edge instead of spanning the 320px content box
   — even though the CSS literally says `img { width: 100% }`.

## Widgets

- **Buttons (kit default):** `background #FC6E1F`, `color #FFFFFF`, `border 1px solid #FC6E1F`,
  `border-radius 100px`, `padding 12px 24px`.
  Hover: `background transparent`, `color #FC6E1F`.
- `.elementor-size-sm` → `padding: 12px 24px`.
- **`.elementor-button { display: inline-block; line-height: 1; text-align: center;
  transition: all .3s }`** — every button is `line-height: 1` (so a 16px button with
  `padding: 12px 24px` renders exactly 40px tall) and every button hover is a 0.3s transition.
- **Links (kit):** `color #111111`, hover `#FC6E1F`.
- **Loop grid:** `.elementor-widget-loop-grid .elementor-grid { grid-column-gap: 30px;
  grid-row-gap: 30px }` by default; `grid-auto-rows: 1fr` plus `.e-loop-item > .e-con
  { height: 100% }` makes every card in a row stretch to equal height.
- **Icon box** (`.elementor-position-inline-start`): wrapper is `flex-direction: row;
  text-align: start`; `.elementor-icon-box-icon { flex: 0 0 auto; line-height: 0 }`;
  `.elementor-icon { display: inline-block; line-height: 1 }` with `svg { width: 1em;
  height: 1em }`, so the icon's `font-size` **is** its pixel size;
  `.elementor-icon-box-description { margin: 0 }`.
- **Spacer:** `.elementor-spacer-inner { height: var(--spacer-size) }`.

## Breakpoints

Elementor: **tablet ≤ 1024px**, **mobile ≤ 767px**. Desktop rules are written as
`@media(min-width:768px)`, so Tailwind's mobile-first `md:` (≥768px) lines up exactly.
`lg:` (≥1024px) covers the desktop-only band.
