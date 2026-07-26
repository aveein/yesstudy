# ContactSection Specification

## Overview
- **Target file:** `src/components/ContactSection.tsx`
- **Elementor id:** `4721022` (section F0). Form widget `f4fc8c8`.
- **Interaction model:** form — **visual only, no backend**. `<form>` with no submit handler / action.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure
```
section 4721022   margin 100px 0 0 0, padding 0 20px 100px, BOXED 1200px, flex column gap 20px
                  bg image contact-form-background.webp (dotted map, cover, top center) — the webp is on cream
  inner
    15c87e5  image contact-form-image.webp — widget-container margin-top -99px, img width 800px, centred
    330b739  "Contact Us"  <h2> 20px/400, text-align CENTER, padding-top 50px, niec-ink
    6a1b0b4  full-bleed child, flex column, align-items flex-end
      2f039c9  full-bleed child, flex
        55b4e26  "Ready to get started or have any questions? Get in touch."  <p> heading,
                 32px/700, line-height 1.2em, text-align CENTER, width 85.856% max, align-self center, pb-[4px]
        f4fc8c8  the form — width 645px max, align-self center
```
The image, heading, sub-heading and form all stack centred in a ~645px column.

## Form fields (all full-width, stacked, margin-bottom 15px each)
Field style (from section override + Elementor base):
bg #FFFFFF, border 0, border-radius 4px, color #111111, font Satoshi 600,
min-height 40px, padding 5px 14px, font-size 15px, line-height 1.4, width 100%.

1. text — placeholder `Name`, required
2. tel — placeholder `Contact number`, required
3. email — placeholder `Email`, required
4. text — placeholder `Country you are interested in`, required
5. text — placeholder `Course you are interested in`, required
6. textarea rows=4 — placeholder `Leave a tiny description about your interest`
7. checkbox (checked) + label: `By clicking the send button you agree to our ` + link `Privacy Policy` (→ `/privacy-policy`)
8. **reCAPTCHA — EXCLUDED from clone** (third-party)
9. submit button `Send`

## Submit button
Full width (button_width 100), bg #FC6E1F, color #FFFFFF, border-radius 4px, padding 12px 24px,
font-size 15px, line-height 1, transition all .3s.
hover: bg transparent, color #FC6E1F (kit hover) — implement as hover:bg-transparent hover:text-niec-orange
with border 1px solid #FC6E1F so the outline shows on hover.

## Content
- Image alt: `Best Consultancy in Nepal`
- Heading: `Contact Us`
- Sub-heading: `Ready to get started or have any questions? Get in touch.`
- Checkbox label link text: `Privacy Policy`
- Submit: `Send`

## Assets (present in public/images/)
`contact-form-image.webp` (1170×245, render at 800px wide, centred, top margin pulls it up over the map),
`contact-form-background.webp` (section background, cover, top center).

## Responsive
- Fields already full-width; form column max 645px, centred. Section side padding 20px.
- No special mobile font overrides beyond the global container step.
