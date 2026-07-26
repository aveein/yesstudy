# Behaviour Bible — https://niec.edu.np/

Findings from the mandatory scroll / click / hover / responsive sweep.

## Scroll sweep

| Observation | Result |
|---|---|
| Header on scroll | **No change.** `position: static` at scroll 0, 600 and 3000 — `rectTop` tracks scroll 1:1 (0, −600, −3000). Height stays 114px, background stays transparent, no shadow appears. There is **no sticky header**. |
| Scroll-snap | None. No `scroll-snap-type` on any container. |
| Smooth-scroll library | **None.** No `.lenis`, no Locomotive, no custom scroll wrapper. Native scrolling. |
| Entrance animations | **None.** Zero widgets carry Elementor's `animation` / `_animation` setting — nothing fades or slides in on viewport entry. |
| Parallax | None. |
| Counters | The only scroll-triggered behaviour on the page — see below. |

### Counter animation (About section, id `167fe24`)

Elementor's counter widget. Fires once when the widget enters the viewport.

| Counter | From | To | Suffix | Duration |
|---|---|---|---|---|
| Years of Excellence | 0 | 26 | — | 1000ms |
| Students Served | 0 | 50 | `K+` | 1000ms |
| Affiliated Universities | 0 | 300 | `+` | 1000ms |

Implementation: `IntersectionObserver`, then `requestAnimationFrame` ramp over 1000ms.
Before triggering, the DOM genuinely shows `0`, `0K+`, `0+` (confirmed in the scroll-0 screenshot).

## Time-driven behaviour (carousels)

All six are Swiper 8 loop carousels configured by Elementor. Settings read from each
widget's `data-settings` attribute:

| Section | Slides | Per view (desktop/tablet/mobile) | Autoplay | Speed | Gap | Bullets |
|---|---|---|---|---|---|---|
| Hero | 3 | 1 / 2 / 1 | 4000ms | 400ms | 10 | yes |
| Featured Universities | 6 | 3 / 2 / 1 | 5000ms | 500ms | 30 | yes |
| Testimonials | 6 | 3 / 2 / 1 | 5000ms | 1000ms | 20 | yes + arrows |
| Career path | 6 | 3 / 2 / 1 | 5000ms | 500ms | 30 | yes |
| Our Blog | 6 | 3 / 2 / 1 | 5000ms | 500ms | 20 | yes |
| Our Offices (footer) | 6 | 3 / 2 / 1 | **delay 0** | **10000ms** | 50 | none |

"Our Offices" with `delay: 0` + `speed: 10000` is Swiper's continuous-marquee idiom:
the track drifts steadily rather than stepping. Clone it with a linear CSS animation,
not a stepped transition.

All carousels are `infinite: yes` (loop) and pause on pointer hover.

## Click sweep

- **Nav dropdowns** — "About Us", "Study Abroad" and "Test Preparation" each own a submenu.
  They open on **hover** on desktop (Elementor nav-menu default), and via the hamburger
  toggle on mobile. Full tree is in `PAGE_TOPOLOGY.md` / the Header spec.
- **No tabs, pills, accordions, modals or lightboxes anywhere on the page.** Nothing on this
  page switches content on click except carousel bullets/arrows.
- Every card's "READ MORE" / "View More" is a plain link to another route.
- The contact form posts to WordPress; in the clone it is visual only.

## Hover sweep

| Element | Change | Source |
|---|---|---|
| Nav link | `color: #111111` → `#FC6E1F` | header CSS `2f31b01` |
| Nav dropdown link | `color: #111111` → `#FC6E1F`, background stays `#FFFFFF` | header CSS |
| Header "Contact Us" button | `background: #FC6E1F` → `#00ADEF` (blue), text stays `#FFFFFF` | header CSS `c69f26d` |
| Global button default | `background: #FC6E1F` → transparent, `color: #FFFFFF` → `#FC6E1F` | Elementor kit |
| Links (global) | `color: #111111` → `#FC6E1F` | Elementor kit |
| Carousel | autoplay pauses while the pointer is over the track | Swiper default |

Per-section card hover effects are recorded in each component spec.

## Responsive sweep

Elementor breakpoints — **tablet ≤ 1024px**, **mobile ≤ 767px**. Container max-width steps
`1200px → 1024px → 767px`.

- **Header:** two separate Elementor containers. The desktop pill nav (`5c8a035`) is the
  one visible ≥768px; a distinct mobile header (`3365990`) with logo + hamburger takes over
  at ≤767px, with dropdown font-size 14px and a 30px toggle icon.
- **Carousels:** slides-per-view drops 3 → 2 → 1 (hero is 1 → 2 → 1).
- **Grids** (Study Abroad, Our Classes): 3 columns → 2 → 1.
- The window could not be resized below 1920px via the extension (Chrome refused to resize a
  maximized window), so responsive rules were read from the site's own `@media` blocks in
  `post-2494.css` / `post-2857.css` rather than by visual inspection. Those blocks are the
  authoritative source and are quoted per-section in each spec.
