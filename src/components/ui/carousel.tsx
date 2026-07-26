"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Reimplementation of the Swiper 8 "loop carousel" the source site runs in six places.
 *
 * Matches the behaviour Elementor configures there: N slides per view (with separate
 * desktop/tablet/mobile counts), a fixed pixel gap, autoplay on a timer, an infinite
 * wrap-around, and clickable pagination bullets — one bullet per real slide.
 *
 * Elementor breakpoints: tablet <=1024px, mobile <=767px.
 */
export interface CarouselProps {
  slides: ReactNode[];
  /** Slides visible at desktop / tablet / mobile. Mirrors Elementor's slides_to_show. */
  perView?: { desktop: number; tablet: number; mobile: number };
  /** Gap between slides in px (Swiper spaceBetween). */
  gap?: number;
  /** Autoplay interval in ms. 0 disables autoplay. */
  autoplayDelay?: number;
  /** Transition duration in ms (Swiper speed). */
  speed?: number;
  /** Render pagination bullets — one per real slide. */
  bullets?: boolean;
  /** Bullet diameter in px. Hero uses 7, the card carousels use 6. */
  bulletSize?: number;
  /** Bullet colour. Hero uses blue at 0.2/1 opacity; card carousels use orange. */
  bulletColor?: string;
  /** Inactive bullet opacity (Swiper's default is 0.2). */
  inactiveBulletOpacity?: number;
  /** `below` puts bullets under the track; `overlay` pins them to the track's bottom edge. */
  paginationPosition?: "below" | "overlay";
  /** Gap from the track for `below`, or `bottom` offset for `overlay`, in px. */
  paginationOffset?: number;
  /**
   * Render prev/next chevron arrows. Elementor pins them to the track's own left and right
   * edges, vertically centred and overlapping the first/last card — not outside the track.
   */
  arrows?: boolean;
  /** Arrow glyph size in px. Elementor's `--arrow-size` default is 25. */
  arrowSize?: number;
  /** Arrow colour. Elementor's `--arrow-normal-color` default is `hsla(0,0%,93%,.9)`. */
  arrowColor?: string;
  className?: string;
  trackClassName?: string;
}

function resolvePerView(width: number, perView: NonNullable<CarouselProps["perView"]>) {
  if (width <= 767) return perView.mobile;
  if (width <= 1024) return perView.tablet;
  return perView.desktop;
}

export function Carousel({
  slides,
  perView = { desktop: 3, tablet: 2, mobile: 1 },
  gap = 30,
  autoplayDelay = 5000,
  speed = 500,
  bullets = true,
  bulletSize = 6,
  bulletColor = "#2563EB",
  inactiveBulletOpacity = 0.2,
  paginationPosition = "below",
  paginationOffset = 24,
  arrows = false,
  arrowSize = 25,
  arrowColor = "hsla(0, 0%, 93%, 0.9)",
  className,
  trackClassName,
}: CarouselProps) {
  const count = slides.length;
  const [visible, setVisible] = useState(perView.desktop);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const resetting = useRef(false);

  useEffect(() => {
    const read = () => setVisible(resolvePerView(window.innerWidth, perView));
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, [perView]);

  // Clone the leading slides so the track can run past the end before wrapping.
  const rendered = count > 0 ? [...slides, ...slides.slice(0, Math.min(visible, count))] : [];

  const advance = useCallback(() => setIndex((i) => i + 1), []);

  useEffect(() => {
    if (!autoplayDelay || paused || count <= visible) return;
    const t = window.setInterval(advance, autoplayDelay);
    return () => window.clearInterval(t);
  }, [autoplayDelay, paused, advance, count, visible]);

  // When the track has scrolled onto the cloned slides, snap back to the real ones.
  useEffect(() => {
    if (index < count) return;
    const t = window.setTimeout(() => {
      resetting.current = true;
      setAnimate(false);
      setIndex(0);
    }, speed);
    return () => window.clearTimeout(t);
  }, [index, count, speed]);

  useEffect(() => {
    if (!resetting.current) return;
    // Re-enable the transition on the frame after the untransitioned jump lands.
    const raf = requestAnimationFrame(() => {
      resetting.current = false;
      setAnimate(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [index]);

  if (count === 0) return null;

  const slideBasis = `calc((100% - ${(visible - 1) * gap}px) / ${visible})`;
  const offset = `calc(${index} * ((100% - ${(visible - 1) * gap}px) / ${visible} + ${gap}px))`;

  const goTo = (i: number) => {
    setAnimate(true);
    setIndex(i);
  };

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className={cn("flex", trackClassName)}
          style={{
            gap: `${gap}px`,
            transform: `translate3d(-${offset}, 0, 0)`,
            transition: animate ? `transform ${speed}ms ease-in-out` : "none",
          }}
        >
          {rendered.map((slide, i) => (
            <div key={i} className="shrink-0" style={{ width: slideBasis }}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {arrows && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo((index - 1 + count) % count)}
            className="absolute top-1/2 left-0 z-[2] -translate-y-1/2 duration-[250ms]"
            style={{ color: arrowColor }}
          >
            <ChevronLeftIcon style={{ width: arrowSize, height: arrowSize }} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo((index + 1) % count)}
            className="absolute top-1/2 right-0 z-[2] -translate-y-1/2 duration-[250ms]"
            style={{ color: arrowColor }}
          >
            <ChevronRightIcon style={{ width: arrowSize, height: arrowSize }} />
          </button>
        </>
      )}

      {bullets && (
        <div
          className={cn(
            "flex items-center justify-center",
            paginationPosition === "overlay" && "absolute inset-x-0",
          )}
          style={
            paginationPosition === "overlay"
              ? { bottom: `${paginationOffset}px` }
              : { marginTop: `${paginationOffset}px` }
          }
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="rounded-full transition-opacity"
              style={{
                width: `${bulletSize}px`,
                height: `${bulletSize}px`,
                margin: "0 6px",
                backgroundColor: bulletColor,
                opacity: index % count === i ? 1 : inactiveBulletOpacity,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
