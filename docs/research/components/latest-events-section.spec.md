# LatestEventsSection Specification

## Overview
- **Target file:** `src/components/LatestEventsSection.tsx`
- **Screenshot:** `docs/design-references/04-latest-events.jpg`
- **Elementor id:** `5737c7a` (section 3). Loop templates `2618` (featured) and `2628` (mini).
- **Interaction model:** **static**. No carousel, no scroll effects, no click behaviour.
  The only state is a CSS hover on the featured card.

## DOM Structure

```
section  5737c7a          transparent, padding 100px 20px, flex column, gap 30px
  └─ inner                max-width 1200px
      ├─ 9591b65   header row          flex row, gap 30px, padding 0
      │    ├─ 6e241b5   width 55% (660px)   flex column, gap 10px, flex-shrink 0
      │    │    ├─ 5bc3234  "Latest Events"   20px/500
      │    │    └─ c40101e  headline          32px/700, line-height 1.3em
      │    └─ 10b2811   remaining 510px     flex COLUMN, justify-center, align-items flex-end
      │         └─ 32f35dc  "View More" outlined pill  (hidden ≤767px)
      ├─ 460682c   content row         flex row, gap 30px, --content-width 100%
      │    ├─ 2d3f16b  width 55.974% (671.7px), flex-grow 0, flex-shrink 0
      │    │    └─ featured card  (loop template 2618)
      │    └─ d43bc1d  fills remainder (498.3px)
      │         └─ 3 mini cards stacked, 30px row gap  (loop template 2628)
      └─ 014e6bf   mobile-only "View More"   (hidden >767px, centred)
```

Row arithmetic at 1200px: `671.7 + 30 + 498.3 = 1200` ✓ and `660 + 30 + 510 = 1200` ✓.

> **Correction (verified against the screenshot during the build).** The featured *column*
> `2d3f16b` is 671.7px, but the featured *card* inside it renders **577px**. `2d3f16b` is
> `--flex-direction: row` and holds a single child, which therefore gets flex's default
> `flex: 0 1 auto` and sizes to `min(max-content, available)` instead of stretching. Its
> max-content is the venue line's advance width plus the card's 60px of padding.
> Measured: the `#FDFDFD` card background runs x 288–756 (577px) and the cream mini cards
> start at x 869 — a ~138px gap, not the 30px container gap. Build the featured column as a
> **row** with `gap: 0`, not a column. At 768–1024px and ≤767px the available width becomes
> the binding constraint, so the card fills its column there.

## Computed Styles (verbatim from the capture)

### Section `5737c7a`
- `--display:flex; --flex-direction:column`
- padding `100px 20px`; margin 0
- gap: none declared → Elementor kit `--widgets-spacing: 30px` → **30px**
- background: none (transparent over the white page)

### Header row `9591b65`
- `--flex-direction:row`; padding 0; gap 30px (kit default)

#### `6e241b5` (heading stack)
- `--width: 55%` @ ≥768px; `--flex-grow:0; --flex-shrink:0`
- `--gap: 10px`; padding 0

#### `5bc3234` — eyebrow, renders as `<h3>`
- `text-align: start`
- `font-size:20px; font-weight:500; color:#111111`

#### `c40101e` — headline, renders as `<h3>`
- widget container: `margin:0; padding:0 0 4px 0`
- `text-align:start`
- `font-size:32px; font-weight:700; line-height:1.3em; color:#111111`
- **≤767px: `font-size:28px`**

#### `10b2811` (button cell)
- `--display:flex` with **no `--flex-direction`** → Elementor default is **column**.
  Therefore `--justify-content:center` centres **vertically** and
  `--align-items:flex-end` pushes the button to the **right edge**. This is confirmed by the
  screenshot: the pill sits flush against the 1200px right edge, vertically centred against
  the two-line headline.
- padding 0; margin 0

#### `32f35dc` — "View More" button
- `background-color:#FFFFFF00` (transparent)
- `font-size:16px; font-weight:500; color:#FC6E1F; fill:#FC6E1F`
- `border:1px solid #FC6E1F; border-radius:100px`
- Elementor `.elementor-size-sm` padding → `12px 24px` (renders ≈126 × 41)
- **hover/focus:** `background-color:#FC6E1F; color:#FFFFFF; border-color:#FC6E1F`
- class `elementor-hidden-mobile` → **hidden ≤767px**

### Content row `460682c`
- `--flex-direction:row`; `--border-radius:20px`; padding 0; gap 30px (kit default)
- `@media(min-width:768px) { --content-width:100% }`
- `@media(max-width:767px) { padding:0 }`
- Elementor `--flex-wrap-mobile:wrap` → wraps to one column ≤767px

#### `2d3f16b` (featured column)
- `--flex-direction:row`; `--gap:0`; padding 0; `--border-radius:0`
- `--flex-grow:0; --flex-shrink:0`
- `--width:55.974%` @ ≥768px
- `--width:50%` @ 768–1024px
- no width @ ≤767px → 100%

#### `d43bc1d` (mini column)
- `--display:flex` only → column; takes the remaining width; children stack.
- Loop grid `5683bbb` is `--grid-columns:1` at every breakpoint;
  `.elementor-widget-loop-grid .elementor-grid` default gap → **row gap 30px**

### Featured card — loop template `2618`

#### `2cd7250` (card root, class `main_container`)
- `--display:flex` → column; `--gap:0`
- `--overflow:hidden`
- `--border-radius:15px`; border-width 0
- `background-color: #FDFDFD` (`--e-global-color-fffd53e`)
- **hover:** `background-color:#FC6E1F` + `box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.25)`
- Custom CSS attached to this card:
  ```css
  .main_container:hover .elementor-heading-title      { color:#fff !important; }
  .main_container:hover .custom_field .elementor-heading-title { opacity:70% !important; }
  .main_container:hover .date .elementor-heading-title { color:#FC6E1F !important; }
  ```
  i.e. on hover the whole card turns orange, the title goes white, the venue/organiser lines
  (`custom_field`) go white at 70% opacity, and the date badge text **stays** `#FC6E1F`
  (it sits on a white badge).

#### `5aa8972` (image)
- `img { width:100%; height:280px; object-fit:cover; object-position:center center; }`
- `@media(max-width:767px) { height:280px }` (unchanged)
- Clipped by the card's `overflow:hidden` + `15px` radius.

#### `f5d9468` (date badge)
- `--position:absolute; top:15px; left:15px` (RTL: `right:15px`)
- `--width:75px` (both `@min-width:768px` and `@max-width:767px`)
- `--min-height:40px`
- `--flex-direction:column; --justify-content:center; --align-items:center`
- `--border-radius:10px`; `--padding: 10px`
- `background-color:#FFFFFF`

#### `c52bb0b` (date text, class `date`) — renders as `<p>`
- `text-align:center`
- `font-size:15px; font-weight:500; text-transform:uppercase; line-height:1.2em;
   letter-spacing:1.5px; color:#FC6E1F`
- In a 75px badge "July 17" wraps to two lines: `JULY` / `17` — matches the screenshot.

#### `0e3b62f` (card body)
- `--display:flex` → column; `--gap:10px`; `--padding:30px`
- no background → inherits the card's `#FDFDFD`

#### `4ded323` (title) — renders as `<h3>`
- widget container: `margin:0; padding:0 0 4px 0`
- `text-align:start`
- `font-size:22px; font-weight:700; line-height:1.2em; color:#111111`
- **≤767px: `font-size:28px`**

#### `417a19a` and `b70fd51` (venue / organiser, class `custom_field`) — `<p>`
- `font-size:15px; font-weight:400; line-height:1.3em; color:#111111`

#### `48a6912` ("Read More" button)
- widget container: `margin:20px 0 0 0; padding:0; border-style:none`
- `background-color:#FFFFFF`
- `font-size:16px; font-weight:500; color:#FC6E1F; fill:#FC6E1F`
- `border:1px solid #FFFFFF; border-radius:100px`
- `padding:20px 40px`
- **hover/focus:** `background-color:#00ADEF00` (transparent), `color:#FFFFFF`,
  `border-color:#FFFFFF` — reads as a white outline pill once the card has gone orange.
- Left-aligned (inherits `text-align:start`).

### Mini card — loop template `2628`

#### `43b2253` (card root)
- `--flex-direction:row; --align-items:center`
- `--gap:18px`
- `--border-radius:20px`; `--padding:20px`
- `background-color:#FFF5F0` (`--e-global-color-cf9680f`)
- **no hover treatment** — template 2628 declares none.

#### `3862cfd` (date box)
- `--flex-direction:column`; `--min-height:80px`
- `--border-radius:20px`; `--padding: 30px 10px`
- `background-color:#FFFFFF`
- `box-shadow: 0px 1px 5px 0px rgba(252,110,31,0.1450980392156863)`
- `--flex-grow:0; --flex-shrink:0`
- `--width:100.212px` @ ≥768px  ·  `--width:30%` @ ≤767px
- gap between its two children: kit default **30px**

#### `78063df` (day number, class `date`) — `<p>`
- widget container `margin:10px 0 0 0`
- `text-align:center`
- `font-size:36px; font-weight:500; line-height:0em; color:#FC6E1F`
- **`line-height:0em` is deliberate** — the glyph overflows a zero-height line box, which is
  why the number and month sit so tightly together in the screenshot. Reproduce it literally.

#### `765cc29` (month, class `date`) — `<p>`
- `text-align:center`
- `font-size:18px; font-weight:500; text-transform:uppercase; line-height:1.2em;
   letter-spacing:1.5px; color:#FC6E1F`

#### `ec2b5a8` (title cell)
- `--flex-direction:column`
- `--width:66.6666%` @ ≥768px  ·  `--width:60%` @ ≤767px

#### `629edee` (title) — renders as `<h4>` wrapping an `<a>`
- Kit `h4`: `font-size:24px; color:#111111` (family Satoshi)
- Template override: `font-weight:500; line-height:1.3em`
- The `<a>` inherits colour; global link hover is `#FC6E1F`.

## States & Behaviors

| Element | Trigger | Change |
|---|---|---|
| Featured card | hover | bg `#FDFDFD` → `#FC6E1F`; shadow `0 0 30px rgba(0,0,0,.25)`; title → `#fff`; venue/organiser → `#fff` at 70% opacity; date badge text stays `#FC6E1F` |
| Featured "Read More" | hover | bg `#FFFFFF` → transparent; text `#FC6E1F` → `#FFFFFF`; border `#FFFFFF` (unchanged) |
| "View More" pill | hover | bg transparent → `#FC6E1F`; text `#FC6E1F` → `#FFFFFF` |
| Mini card | — | none |
| Mini card title link | hover | `#111111` → `#FC6E1F` (global kit rule) |

No entrance animation, no scroll trigger, no autoplay.

## Text Content (verbatim)

- Eyebrow: `Latest Events`
- Headline: `Check out our latest educational events we run across Nepal`
  (source has a hard line break before "we"; it wraps there naturally at 660px)
- Button: `View More` → `/events/`

### Featured event
- Image: `/images/europe-discover-niec.jpg` — alt `Europe Discover - Yes Study 2026`
- Badge: `July 17` (rendered uppercase → `JULY 17`)
- Title: `Europe Discovery Day July 17, 2026`
- Venue: `VENUE: Yes Study 4th & 5th Floor Share Market Complex, Putalisadak, Kathmandu`
- Organiser: `ORGANISER: Yes Study`
- Button: `Read More` → `/events/europe-discovery-day-july-17-2026/`

### Mini events (in order)
| Day | Month | Title | href |
|---|---|---|---|
| `15` | `July` | `UK Admission Day July 15, 2026` | `/events/uk-admission-day-july-15-2026/` |
| _(none)_ | `Sun` | `Your Study Abroad Journey Starts LIVE!` | `/events/your-study-abroad-journey-starts-live/` |
| `12` | `June` | `Yes Study Global Study & Scholarship Day!` | `/events/niec-global-study-scholarship-day/` |

The second card genuinely has **no day number widget** — only the month line renders. The
component must skip the number when `day` is empty.

## Assets
- `/images/europe-discover-niec.jpg` (already downloaded, 1024×536 source)

## Responsive Behavior

- **Desktop (>1024px):** header row 55% / 45%; content row 55.974% / remainder, 30px gap.
- **Tablet (768–1024px):** container 1024px. Header row unchanged (55%).
  Featured column drops to `--width:50%`; the mini column takes the remainder.
- **Mobile (≤767px):**
  - Section margin becomes `40px 0` (padding stays `100px 20px`).
  - Header row inner padding 0; headline drops to `28px`.
  - Desktop "View More" is hidden; the mobile one (`014e6bf` / `47e09f2`) shows, centred.
  - Content row padding 0 and `flex-wrap: wrap` → featured card full width, mini list below.
  - Featured card title grows to `28px`.
  - Mini card date box `--width:30%`, title cell `--width:60%`.
