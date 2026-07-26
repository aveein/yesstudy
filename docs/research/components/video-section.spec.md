# VideoSection Specification

## Overview
- **Target file:** `src/components/VideoSection.tsx`
- **Elementor id:** `c33e0d1` (section 13). Video widget `3c87858`.
- **Interaction model:** static — single YouTube embed `Q8EzK0erSyE`, 16:9.

Assumes `docs/research/GLOBAL_DEFAULTS.md`.

## DOM Structure
```
section c33e0d1   white, margin 80px 0 100px 0 (mobile 40px 0 0 0), padding 0 20px, BOXED 1200px, flex column
  inner
    b1f5f14   header row, flex row, gap default. Two children split 50/50 (no --width, not shrink-0):
      e18c592   heading column (flex column)
        4eef883  "Our Video"  <h2> 20px/500, leading-none, text-align start, niec-ink
        7bf8cda  headline     <h3> 32px/bold (mobile 28px), line-height 1.3em, pb-[4px], niec-ink
      e41805a   button cell — flex COLUMN, justify-center, items-flex-end (right)
        b093a65  "View More Videos" pill (hidden ≤767px) → https://www.youtube.com/user/niecktm  target=_blank
    c71c232   video wrapper, border-radius 20px (mobile padding 0 20px), boxed
      3c87858  video widget, aspect-ratio 16:9, YouTube Q8EzK0erSyE, controls
    fca3f5d   mobile-only "View More Videos" (hidden >767px), centred → https://www.youtube.com/@niecktm  target=_blank
```

## Content
- Eyebrow: `Our Video` (h2)
- Headline: `Discover expert tips, student experiences, and study abroad guides` (h3)
- Desktop button: `View More Videos` → `https://www.youtube.com/user/niecktm` (target _blank, rel nofollow)
- Mobile button: `View More Videos` → `https://www.youtube.com/@niecktm` (**different URL** — keep both)

## Video embed
- YouTube id `Q8EzK0erSyE`, aspect ratio 16:9, controls on, lazy. Use a responsive 16:9 iframe:
  `https://www.youtube.com/embed/Q8EzK0erSyE`. Wrap in a `rounded-[20px] overflow-hidden` 16:9 box
  spanning the full 1200px content width.

## Buttons (both copies)
transparent bg, 16px/500, color/border #FC6E1F, radius 100px, padding 12px 24px, line-height 1;
hover/focus bg #FC6E1F, color #FFFFFF, transition-colors duration-300.

## Responsive
- Section margin 80px 0 100px 0 → mobile ≤767: 40px 0 0 0.
- Headline 32px → 28px mobile.
- Video wrapper gains px-[20px] at ≤767.
- Desktop button hidden ≤767; mobile centred button shown >767 hidden.
