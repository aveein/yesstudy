# MissionVisionSection Specification

Two visually identical, mirrored blocks on `/about/`: **Our Mission** (image left, cream
background) and **Our Vision** (text left, white background). Build **one parameterized
component** and render it twice.

## Overview
- **Target file:** `src/components/about/MissionVisionSection.tsx`
- **Source:** `docs/research/_capture-about/index.html` → `efbdf90` (Mission) and `e7d9a73` (Vision)
- **Interaction model:** static — no hover, scroll, click, or time-driven behaviour.
- **Props:** `title`, `body`, `image { src, alt, width, height }`, `imageSide: "left" | "right"`, `background: "cream" | "white"`

## DOM Structure
```
section (efbdf90 | e7d9a73)     ← row, align-items:center
  .e-con-inner
    div  50%   ← image column   (first for Mission, second for Vision)
    div  50%   ← text column
      h2       ← "Our Mission" / "Our Vision"
      p        ← body copy
```

## Computed Styles (exact, from `22-post-5691.css`)

### Section — identical for both `efbdf90` and `e7d9a73`
- display: flex; flex-direction: **row**
- **align-items: center** (vertically centres the image against the text)
- gap: **20px row / 50px column**
- padding: **`60px 0`**
- margin: 0
- Content column: `min(100%, 1200px)`, centred
- **background-color:**
  - Mission `efbdf90` → `#FFF5F0` (`--e-global-color-cf9680f`, token `niec-cream`)
  - Vision  `e7d9a73` → `#FFFFFF` (`--e-global-color-803f4dc`, token `niec-white`)

### Columns (`eb2b702`/`44a1ca3` for Mission, `0de7575`/`9e25a21` for Vision)
- display: flex; flex-direction: column
- width: **50%** each at ≥768px; full-width below
- gap: 30px (Elementor default)

### `h2` title (`8d6c0ad` / `9e6e915`)
- font-size: **32px** (kit `h2` default), font-weight: **bold**, color: `#111111`, family Satoshi
- **line-height: 1.3em** — explicitly set, overriding `.elementor-heading-title`'s `1`
- text-align: start; margin: 0; padding: 0

### Body paragraph (`43091ed` / `5cab5f9`)
- font-size: **16px**; color: `#111111`; line-height: **1.5**
- `margin-block-end: 0.9rem` (**14.4px**) — reset default, add back over Tailwind preflight

### Image (`b46fd36` / `3a30e68`)
- **border-radius: 21px** (all four corners)
- width: 100% of its column; height auto (intrinsic aspect preserved)
- Mission image natural size **458 × 384**
- Vision image natural size **499 × 419**
- Both are hexagon-collage PNGs with transparent backgrounds — the rounded corners are
  effectively invisible against the section background, but keep the radius to match source.

## States & Behaviors
N/A — verified static on the live page. There are no links, buttons, or hover targets in
either block, and nothing animates on scroll.

## Assets
- Mission image: `public/images/about-our-mission.webp` (458×384, 22,444 bytes)
- Vision image: `public/images/about-our-vision.webp` (499×419, 25,412 bytes)
- Icons used: none

## Text Content (verbatim)

### Mission (`efbdf90`)
- **h2:** `Our Mission`
- **alt:** `Best Consultancy in Nepal for USA, UK, Australia, Canada, Ireland, New Zealand and Germany`
- **p:**
  > Our mission is to provide students with comprehensive support to achieve their academic and professional goals through high-quality test preparation and study abroad. programs.

  (The stray period after "study abroad." is present on the live site — reproduce it verbatim.)

### Vision (`e7d9a73`)
- **h2:** `Our Vision`
- **alt:** `` (empty on the live site — use `alt=""` and treat as decorative)
- **p:**
  > Our vision is to bring about the best possible outcome for each individual who chooses to obtain our services as well as contribute to society at large by establishing the best standards possible in all our endeavors.

## Responsive Behavior
- **Desktop (≥768px):** 2 × 50% columns, 50px column gap, image and text vertically centred.
  Mission = image left / text right. Vision = text left / image right.
- **Mobile (≤767px):**
  - Section padding becomes **`40px 0`**
  - Columns stack full-width with the 20px row gap
  - **Both images get a fixed `height: 300px`** (`.elementor-element-b46fd36 img` and
    `-3a30e68 img`). Pair with `object-fit: contain` so the collage is not distorted.
  - Because the containers stack in DOM order, Mission renders image-then-text and Vision
    renders text-then-image. Do **not** add a mobile order swap — that matches the source.
- **Breakpoint:** 767/768px. No tablet-specific rules exist.
