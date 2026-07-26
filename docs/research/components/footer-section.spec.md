# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Elementor id:** `31616ae` (section F2).
- **Interaction model:** static — 4 link columns + accreditation logo grid + divider + copyright bar.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure
```
footer 31616ae   bg #FAFAFA, flex column, gap 30px, padding 70px 20px 20px, BOXED 1200px
  4c3ce72   inner wrapper, flex column, gap 20px
    248baab  4-column row, flex row gap 50px (mobile: stack, wrap)
      550af67  Sitemap column       (gap 20px)
      ce6e1a8  Useful Links column
      4cac022  Contact Info column
      4204911  Follow Us column
    b513df9  logo grid, grid repeat(11,1fr) desktop / repeat(3,1fr) ≤767, gap 20px, align-items center, min-height 70px
    002cff5  divider 1px solid #DFDFDF, full width
    d045c1a  copyright row, flex row, justify-content space-between (mobile: stack, center, gap 5px)
```

## Column heading style (all four titles)
`<p>` heading: **font-size 11px, font-weight 700, color #111111, text-align start.**
(Yes — 11px; smaller than the links. Verbatim from capture.)

## Icon-list link style
14px/400, color #111111, hover → #FC6E1F, transition color .3s. Items stacked, gap ~ per column gap.

## Column 1 — "Sitemap"
- About Us → `/about/`
- Blogs → `/blog/`
- Contact → `/contact-us/`

## Column 2 — "Useful Links"
- Study Abroad → `https://niec.edu.np/study-abroad/`
- Test Preparation → `https://niec.edu.np/test-preparation/`
- Testimonials → `https://niec.edu.np/testimonial/`
- Gallery → `https://niec.edu.np/gallery/`

## Column 3 — "Contact Info" (icon-list WITH leading icons)
- 📞 `+977-9801030907` → `tel:+9779801030907` (phone-alt icon)
- 📞 `+977-01-5356600` → `tel:+01-5356600` (phone-alt icon; note href differs from label — keep both)
- ✉ `admin@yesstudyusa.com` → `mailto:admin@yesstudyusa.com` (envelope icon)
Icons inline before text, ~14px, color #111111.

## Column 4 — "Follow Us" (social icons, ~rounded, ink color, hover orange)
- Facebook → `https://www.facebook.com/niec.official`
- Instagram → `https://www.instagram.com/niec.official`
- YouTube → `https://www.youtube.com/@niec.edu.official`
All target _blank rel nofollow.

## Logo grid (b513df9) — 10 accreditation logos, centred, ~90px cells, object-contain, max-h ~55px
(The 11th grid item is a third-party ICEF IAS `<script>` badge — **EXCLUDE it**.)
Order: pte.png, oip.jpg, icef.png, usatc.png (upstream `USATC-e1715590872524.png`), iso-logo.png,
enz.jpg, nepal.png, toefl.png, pier.png, british.jpg (upstream `british-1024x288.jpg`).
All in `public/images/`. Alt text (generic upstream): `Best Consultancy in Nepal ...` — a short alt like the brand name is fine.

## Copyright row
- Left: `Copyright 2026, All rights reserved, Yes Study`  — 11px/400, niec-ink
- Right: `Designed & developed by Webifi`  — 11px/400, niec-ink
Desktop space-between; mobile stacked centred.

## SVG icon paths (fontawesome, viewBox as noted)
- phone-alt (viewBox 0 0 512 512): `M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z`
- envelope (0 0 512 512): `M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z`
- facebook (0 0 512 512): `M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z`
- instagram (0 0 448 512): `M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z`
- youtube (0 0 576 512): `M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z`

## Responsive
- 4 columns → stack on mobile (≤767). Logo grid 11 → 3 columns. Copyright stacks centred.
