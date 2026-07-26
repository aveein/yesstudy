# Page Topology — https://niec.edu.np/

Captured 2026-07-21 at viewport **1920×889**, document height **12,597px**.
Platform: WordPress + Elementor Pro 3.35 (Hello Elementor child theme). Page template `post-2494`.

## Global layout

- **No scroll container** — the page scrolls natively on `<body>`. No Lenis / Locomotive / smooth-scroll library.
- **No scroll-snap** anywhere.
- Content column: Elementor `.e-con-inner` — `max-width: min(100%, 1200px)`, `margin: 0 auto`.
  Breakpoints reduce it to `1024px` (≤1024) and `767px` (≤767).
- Header is **`position: static`** — it scrolls away with the page. There is no sticky/floating header.
- Only z-index layer of note: header container `--z-index: 100`.
- A tawk.to chat widget and a Google reCAPTCHA badge are third-party overlays; **excluded from the clone**.

## Section order

| # | Elementor id | Name | Top | Height | Background | Interaction model |
|---|---|---|---|---|---|---|
| — | `2857` | **Header** | 0 | 114 | transparent (inner pill `#FFFFFFA3` + blur) | hover dropdowns; separate mobile header ≤767 |
| 0 | `147485d` | **Hero carousel** | 114 | 600 | `#F1F7FF` | time-driven — autoplay 4000ms, speed 400ms, loop, 3 slides, bullets |
| 1 | `167fe24` | **About + stats** | 714 | 690 | white | scroll-driven — 3 counters animate 0→target over 1000ms on enter |
| 2 | `4a50e42` | **What we do / How we can help** | 1404 | 799 | white | static (2 cards) |
| 3 | `5737c7a` | **Latest Events** | 2203 | 873 | white | static — 1 featured card + 3 compact list cards |
| 4 | `4744718` | **Study Abroad** | 3075 | 1196 | `#F1F7FF` | static grid, 6 country cards, hover overlay |
| 5 | `9b3db37` | **Why choose us** | 4271 | 1106 | white | static — image composition + 3 icon/text blocks |
| 6 | `e5e97d2` | **Our Classes** | 5377 | 951 | `#F1F7FF` | static grid, 6 gradient cards |
| 7 | `8479231` | **Featured Universities** | 6327 | 626 | `#FFF5F0` | time-driven carousel — 3/2/1 per view, 5000ms, speed 500, gap 30 |
| 8 | `df39bfa` | **Testimonials** | 6953 | 777 | `#F1F7FF` | time-driven carousel — 3/2/1, 5000ms, speed 1000, gap 20, arrows |
| 9 | `8b5fc55` | **Career path header** | 7730 | 146 | `#FFF5F0` | static |
| 10 | `461c771` | **Career path carousel** | 7876 | 594 | `#FFF5F0` | time-driven carousel — 3/2/1, 5000ms, speed 500, gap 30 |
| 11 | `8b44307` | ~~Success Stories~~ | — | 0 | — | **`display: none` — not rendered. Excluded from clone.** |
| 12 | `4ed9fb9` | **Our Blog** | 8550 | 672 | white | time-driven carousel — 3/2/1, 5000ms, speed 500, gap 20 |
| 13 | `c33e0d1` | **Our Video** | 9322 | 842 | white | static — single YouTube embed `Q8EzK0erSyE` |
| F0 | `4721022` | **Contact form** | 10364 | 856 | `#FFF5F0` + dotted map bg | form (visual only — no backend) |
| F1 | `4bb762f` | **Our Offices** | 11320 | 732 | white | time-driven **marquee** — autoplay delay 0, speed 10000ms linear, gap 50 |
| F2 | `31616ae` | **Footer links** | 12152 | 445 | `#FAFAFA` | static — 4 link columns, accreditation logos, copyright |

Section 11 is excluded: it is `display: none` in the live CSS, so it contributes nothing visible.

## Component build plan

17 components. Sections 7/8/10/12 and F1 all consume the shared
`src/components/ui/carousel.tsx` primitive built during the foundation phase.

---

# Interior pages — `/about/` and `/contact-us/`

Captured 2026-07-26 from `docs/research/_capture-about/` and `_capture-contact/`.

Both pages are **short**: a shared breadcrumb banner, a little page-specific content, and then
the site-wide footer template. Everything from `F0` down is **identical to the homepage** and is
served by the same Elementor footer template `3223` — so `ContactSection`, `OurOfficesSection`
and `Footer` are reused verbatim, no new work.

## Shared chrome

| Elementor id | Template | Name | Notes |
|---|---|---|---|
| `2857` | header | **Header** | reused as-is |
| `779a760` | single-page `2866` | **Page banner** | **new** — breadcrumb hero, shared by both pages |
| `4721022` | footer `3223` | Contact form | reused (`ContactSection`) |
| `4bb762f` | footer `3223` | Our Offices marquee | reused (`OurOfficesSection`) |
| `31616ae` | footer `3223` | Footer links | reused (`Footer`) |

The banner's content column is capped at **700px** (`--content-width`), not the site's usual
1200px — it is the only place on the site that does this.

## `/about/` — page post `5691`

| # | Elementor id | Name | Background | Interaction model |
|---|---|---|---|---|
| 0 | `779a760` | Page banner "About Us" | `header-bg.png` dotted map | static (link hover only) |
| 1 | `33037ba` + `6b4b0ec` | **Overview / WHO WE ARE** + 2-col prose | white | static |
| 2 | `efbdf90` | **Our Mission** — image left | `#FFF5F0` | static |
| 3 | `e7d9a73` | **Our Vision** — text left | `#FFFFFF` | static |

Sections 2 and 3 are the same block mirrored, so one parameterized component serves both.
The right-hand prose column in section 1 **duplicates** the left column's first paragraph —
that is genuinely what the live page renders, not an extraction error.

## `/contact-us/` — page post `4457`

| # | Elementor id | Name | Background | Interaction model |
|---|---|---|---|---|
| 0 | `779a760` | Page banner "Contact Us" | `header-bg.png` dotted map | static (link hover only) |
| 1 | `fdd2a3d` + `6c0a4db` | **Contact info bar** — 3 icon boxes + divider | white | static + link hover |
| 2 | `ec2f911` | **Get In Touch** — form left, map + socials right | white | visual-only form, button hover |

The `/contact-us/` form is a **different** form from the footer's `ContactSection`: four fields
(Name / Email / Contact Number / Location `<select>`) versus the footer's six. Both render on
this page, one above the other. Neither has a backend in the clone.

## Notes

- **No tablet-specific CSS** on either page — the only breakpoint is 767/768px, which maps
  exactly onto Tailwind's `md:`.
- No carousels, no scroll-driven behaviour, no animation on either page. Every new component
  here is static apart from link/button hover.
- Header nav still points its CTA at `/contact/`, while the live page is `/contact-us/`.

## `/study-abroad/` — page post `3050`

The **landing** page for the study-abroad hub (the country guides `/study-in-usa` and
`/study-in-australia` are separate templates — see the session 3b notes).

| # | Elementor id | Name | Background | Interaction model |
|---|---|---|---|---|
| 1 | `2ee91af` | **Hero** — h1 + intro (55%) / banner PNG (43%) | `#F1F7FF` | static |
| 2 | `e0a5daf` | **Anchor nav** — 4 buttons, 25% each | `#F1F7FF` | static, **not sticky** |
| 3 | `37a26b4` | **Overview** — image left / prose right (`id="overview"`) | white | static |
| 4 | `1e344ab` | **Destinations** — loop **grid** 3/2/1, template `2566` | `#FFF5F0` | static + card hover |
| 5 | `ef9e95d` | **What you get** — 40% heading / 60% prose (`id="get"`) | white | static |
| 6 | `8bd726b` | **Services grid** — 2×4; 7 cards + CTA as the 8th cell | white / `#FFF5F0` cards | static + button hover |
| 6b | `39dd4f8` | ↳ **Get in touch** CTA (`id="started"`), photo + 20% scrim | photo | button hover |

No `PageBanner`: unlike `/about/` and `/contact-us/`, this template does **not** pull in
single-page template `2866`, so the page opens straight into its own hero. `ContactSection`,
`OurOfficesSection` and `Footer` come from the site-wide footer template `3223`.

### Traps on this page

1. **Section 4 is a grid, not a carousel.** It shares loop template `2566` with the homepage
   `StudyAbroadSection`, but that one is a loop *carousel* on a sky background with a
   "View More" pill. Here it is a loop *grid* on the peach wash, and the pill container
   (`8562a25`) is **empty**. Copying the homepage component wholesale would be wrong on all
   three counts.
2. **Two overlays, two opacities.** The destination cards' `::before` has
   `--overlay-opacity: 0` (invisible — do not render a scrim); the CTA panel's has
   `0.2` (real). Same markup idiom, opposite outcome.
3. **`#class` is a dead anchor.** The nav's "Our Classes" button points at `#class`, and no
   element on the page carries that id. Reproduced verbatim.
4. **The CTA's background image is only in `post-3050.css`,** not inline in the markup —
   a naive HTML-only scrape picks up the footer's Our Offices loop-item styles instead.
   `scripts/extract-study-abroad.mjs` reads it from the stylesheet for this reason.
5. **Section 6 rows are `repeat(N, 1fr)`, not `minmax(0,1fr)`.** Tailwind's `grid-rows-4`
   emits `minmax(0,1fr)`, which can clip; the components use
   `grid-rows-[repeat(4,1fr)]` to match.

## `/about/ceos-message/` — page post `5973`

| # | Elementor id | Name | Background | Interaction model |
|---|---|---|---|---|
| 1 | `7b1a248` | **Banner** — h1 32px + h2 50px + breadcrumb | `header-bg.png` | static (link hover) |
| 2 | `3cb4bd9` | **Message 1** — portrait left / 3 paragraphs right | white | static |
| 3 | `20db9c6` | **Message 2** — prose left / photo right | `#F1F7FF` | static |
| 4 | `decd8dc` | **Pull quote** — 6px left rule, 800px column | white | static |
| 5 | `e007dc7` | **Message 3** — photo left / sign-off right | `#F1F7FF` | static |

Then the site-wide footer template `3223` (`ContactSection`, `OurOfficesSection`, `Footer`).

### Traps on this page

1. **The banner is page-local, not template `2866`.** `/about/` and `/contact-us/` inherit
   their banner from the single-page template; this page never loads `post-2866.css` and
   declares its own. Same shell (`header-bg.png`, 700px column, identical breadcrumb markup)
   but it stacks **two** headings — and the title drops to **32px** because the 50px name
   below carries the weight.
2. **Block 2's columns sum to 110%** (`--width: 40%` + `70%`) in a `flex-wrap: nowrap` row.
   Flex-shrink resolves the overflow to **418.906px / 731.094px** at a 1200px container.
   Declare the percentages and let the browser shrink — hard-coding the pixels breaks at
   every other width.
3. **The pull quote is not a `<blockquote>`.** It is a plain `<p><strong>…</strong></p>`; the
   rule comes from `b705ab5 > .elementor-widget-container { padding: 40px; border-width:
   0 0 0 6px }` with **no `border-color`**, so it resolves to `currentColor` → `#111111`.
   Its container is also **800px**, not the site's 1200px.
4. **The prose carries inline `<strong>`.** Three of the four blocks have bold runs, one of
   them mid-sentence. Stripping tags during extraction silently loses all of it — the
   extractor emits paragraphs as `{ text, bold }` runs for this reason.
