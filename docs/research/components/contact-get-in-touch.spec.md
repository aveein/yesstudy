# GetInTouchSection Specification

The two-column block on `/contact-us/`: a "Get In Touch" form on the left, a Google Map +
"Follow us on" social row on the right.

## Overview
- **Target file:** `src/components/contact/GetInTouchSection.tsx`
- **Source:** `docs/research/_capture-contact/index.html` → `ec2f911`
- **Interaction model:** static layout with a **client-side form** (native controls only —
  no submit handler, see "Form behaviour" below) and hover states on the button + social icons.

## DOM Structure
```
section (ec2f911)               ← row, gap 20px/30px
  .e-con-inner
    div (a77be9f) 50%           ← LEFT
      h2 (0c94bb1)  "Get In Touch"
      form (25e7bef)
        input  text   placeholder "Name"
        input  email  placeholder "Email"   (required)
        input  tel    placeholder "Contact Number"
        select        Location  (8 options, no placeholder option)
        checkbox + label  acceptance (checked by default, required)
        button submit "Send"
    div (2e0786c) 50%           ← RIGHT
      iframe (2ab3fe2)   Google Map
      h4 (a35796f)  "Follow us on"
      social icons (9443809)  Facebook / Instagram / Youtube
```

## Computed Styles (exact, from `24-post-4457.css` + Elementor form CSS)

### Section `ec2f911`
- display: flex; flex-direction: **row**
- gap: **20px row / 30px column**
- No explicit padding; content column `min(100%, 1200px)` centred

### Columns `a77be9f` / `2e0786c`
- display: flex; flex-direction: column; gap 30px (Elementor default)
- width: **50%** each at ≥768px; full-width below

### `h2` "Get In Touch" (0c94bb1)
- font-size: **32px** (kit h2), font-weight: **bold**, color `#111111`, family Satoshi
- **line-height: 1** (`.elementor-heading-title`, no override on this widget)
- margin: 0; padding: 0

### Form layout (25e7bef)
- Fields wrapper: `margin-left: -10px; margin-right: -10px; margin-bottom: -20px`
- Each field group: `padding: 0 10px; margin-bottom: 20px`; each is **full width** (`elementor-col-100`)
- Net effect: fields are full-width and stacked with a **20px** vertical rhythm.
  Simplest faithful implementation is a plain column with `gap: 20px` and no negative margins.

### Text inputs and the select (`.elementor-field-textual.elementor-size-lg`)
- **font-size: 18px**; **line-height: 1.4**; **min-height: 59px**; **padding: 7px 20px**
- **border: 1px solid `#69727d`**
- **background-color: `#ffffff`**
- **border-radius: 10px** (page override; the `size-lg` default of 5px is overridden)
- color: `#1f2124`; width: 100%
- Placeholder: `color: inherit; opacity: 0.6`
- Focus: `box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); outline: 0`

### Select caret
- The native select is wrapped and a caret SVG is absolutely positioned over its right edge.
- Caret glyph `viewBox="0 0 571.4 571.4"`, path:
  `M571 393Q571 407 561 418L311 668Q300 679 286 679T261 668L11 418Q0 407 0 393T11 368 36 357H536Q550 357 561 368T571 393Z`
- Rendering the select with `appearance: none` plus this caret at ~14px, right-inset ~20px,
  vertically centred, `pointer-events: none`, colour `#1f2124` reproduces the source.

### Acceptance checkbox row
- Native checkbox, **`defaultChecked`**, `required`
- Label font-size **16px** (inherits body), color `#111111`, sits inline to the right of the box
- "Privacy Policy" is a link → `/privacy-policy`, colour `#FC6E1F`

### Submit button "Send"
- **padding: `12px 50px`** (page override of the kit's 12px/24px)
- background: `#FC6E1F`; **color: `#ffffff`**; border: `1px solid #FC6E1F`
- **border-radius: 100px** (kit default — a full pill)
- font-size 16px; **line-height: 1** → renders exactly **40px** tall
- display: inline-block; **width: auto** — it does *not* stretch to the column
- transition: `all .3s`

### Map (2ab3fe2)
- `<iframe>`, **width: 100%**, **height: 300px** (`.elementor-widget-google_maps iframe{height:300px}`)
- Wrapper: `overflow: hidden`; `.elementor-custom-embed { line-height: 0 }`
- src: Google Maps embed for `Yes Study Putalisadak` (`q=Yes Study%20Putalisadak&t=m&z=16&output=embed&iwloc=near`)
- title / aria-label: `Yes Study Putalisadak`
- `loading="lazy"`

### `h4` "Follow us on" (a35796f)
- font-size: **24px** (kit h4), font-weight **bold**, color `#111111`
- **line-height: 1** (`.elementor-heading-title`)

### Social icons (9443809)
- Row, **column-gap: 8px**, row-gap 0, text-align left
- `--icon-size: 15px`; each icon is `padding: .5em` → tile is **30 × 30px**
- **border-radius: 30px** (fully round)
- SVG is `1em` = **15px**, fill **`#ffffff`**
- Background colours (Elementor brand defaults):
  - Facebook `#3b5998` · Instagram `#262626` · YouTube `#cd201f`
- All three open in a new tab: `target="_blank" rel="nofollow"` (add `noreferrer`)

## States & Behaviors

### Submit button hover
- **Trigger:** hover
- background: `#FC6E1F` → `transparent`; color: `#ffffff` → `#FC6E1F`
- **Transition:** `all .3s` (kit `.elementor-button`)

### Social icon hover
- No hover rule is defined for this widget — the icons keep their brand background. Do not invent one.

### Form behaviour
- The live form POSTs to Elementor's AJAX handler and is protected by reCAPTCHA v3.
- Backend is **out of scope** for this clone. Render it as a visual-only form using
  `<form method="dialog">` — the same approach already used by `src/components/ContactSection.tsx`.
- **Omit the reCAPTCHA field and all hidden Elementor fields** (`post_id`, `form_id`,
  `referer_title`, `queried_id`) — they carry no visual weight.

### Everything else
N/A — no scroll-driven, click-to-switch, or time-driven behaviour in this section.

## Text Content (verbatim)
- **h2:** `Get In Touch`
- Placeholders, in order: `Name`, `Email`, `Contact Number`
- Screen-reader labels, in order: `Name`, `Email`, `Contact Number`, `Location`
- **Select options** (verbatim, including the two typos — reproduce exactly):
  `Kathmandu`, `Maharajgunj`, `Chitwan`, `Pokhara`, `Biratnagar`, `palpa`, `Butwal`, `Paksitan`
  (lower-case "palpa" and misspelled "Paksitan" are on the live site.)
  There is no empty/placeholder option — `Kathmandu` is selected by default.
- **Acceptance label:** `By clicking the send button you agree to our Privacy Policy`
  ("Privacy Policy" is the link portion.)
- **Button:** `Send`
- **h4:** `Follow us on`
- **Social links:**
  - Facebook → `https://www.facebook.com/niec.official`
  - Instagram → `http://instagram.com/niec.official/`
  - YouTube → `https://www.youtube.com/@niec.official`
- Social `<span class="elementor-screen-only">` labels: `Facebook`, `Instagram`, `Youtube`

## Assets
- Images: none (the map is a live iframe)
- **Icons — all three already exist in `src/components/icons.tsx`: `FacebookIcon`,
  `InstagramIcon`, `YoutubeIcon`.** Reuse them; do not re-extract.
- The select caret can reuse the existing `CaretDownIcon`, but note its viewBox was reframed to
  its path bounds in commit `688c01e` for the navbar. If it does not visually match, inline the
  `0 0 571.4 571.4` glyph above locally instead of changing the shared icon.

## Responsive Behavior
- **Desktop (≥768px):** two 50% columns side by side with a 30px column gap. Form left, map +
  social right.
- **Mobile (≤767px):** both columns go full-width and stack (form first, then map/social),
  separated by the **20px** row gap. Fields are already full-width so they need no change.
  The map keeps its fixed 300px height.
- **Breakpoint:** 767/768px. No tablet-specific rules exist.
