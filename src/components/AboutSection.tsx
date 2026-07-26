"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/types";

const STATS: Stat[] = [
  { value: 26, suffix: "", label: "Years of Excellence" },
  { value: 50, suffix: "K+", label: "Students Served" },
  { value: 300, suffix: "+", label: "Affiliated Universities" },
];

const COUNT_UP_DURATION_MS = 1000;

/** Inline heading links: plain-text colour, orange on hover. */
const HEADING_LINK_CLASS = "text-niec-ink hover:text-brand-primary";

function StatCounter({ stat, active }: { stat: Stat; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setCount(stat.value);
      return;
    }

    let frameId: number;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / COUNT_UP_DURATION_MS, 1);
      setCount(Math.round(progress * stat.value));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [active, stat.value]);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="m-0 text-center text-[100px] leading-[100px] font-normal text-brand-primary">
        {count}
        {stat.suffix}
      </p>
      <p className="m-0 text-center text-[20px] leading-[50px] font-medium text-niec-ink">
        {stat.label}
      </p>
    </div>
  );
}

export function AboutSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    // Scroll-driven trigger: animate once, then stop watching.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-transparent px-[20px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[30px] py-[60px] md:py-[100px]">
        <div className="flex flex-col gap-[10px]">
          <p className="m-0 text-center text-[20px] leading-[20px] font-medium text-niec-ink">
            About
          </p>

          <div className="mb-[30px] px-0 md:px-[17%]">
            <p className="m-0 text-center text-[32px] leading-[41.6px] font-bold text-niec-ink">
              Yes Study is one of the Best Consultancy in Nepal for{" "}
              <a href="/study-abroad/study-in-usa/" className={HEADING_LINK_CLASS}>
                USA
              </a>
              ,{" "}
              <a href="/study-abroad/study-in-uk/" className={HEADING_LINK_CLASS}>
                UK
              </a>
              ,{" "}
              <a
                href="/study-abroad/study-in-australia/"
                className={HEADING_LINK_CLASS}
              >
                Australia
              </a>
              ,{" "}
              <a href="/study-abroad/study-in-canada/" className={HEADING_LINK_CLASS}>
                Canada
              </a>
              ,{" "}
              <a
                href="/study-abroad/study-in-new-zealand/"
                className={HEADING_LINK_CLASS}
              >
                New Zealand
              </a>
              ,{" "}
              <a href="/study-abroad/study-in-ireland/" className={HEADING_LINK_CLASS}>
                Ireland
              </a>
              , and{" "}
              <a href="/study-abroad/study-in-germany/" className={HEADING_LINK_CLASS}>
                Germany
              </a>
              . We provide the best{" "}
              <a href="/course/ielts/" className={HEADING_LINK_CLASS}>
                IELTS
              </a>
              ,{" "}
              <a href="/course/pte-a/" className={HEADING_LINK_CLASS}>
                PTE
              </a>
              ,{" "}
              <a href="/course/toefl/" className={HEADING_LINK_CLASS}>
                TOEFL
              </a>
              ,{" "}
              <a href="/course/sat-1/" className={HEADING_LINK_CLASS}>
                SAT
              </a>
              ,{" "}
              <a href="/course/gre/" className={HEADING_LINK_CLASS}>
                GRE
              </a>
              , and{" "}
              <a href="/course/gmat/" className={HEADING_LINK_CLASS}>
                GMAT
              </a>{" "}
              classes in Kathmandu, Nepal.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} active={active} />
            ))}
          </div>

          <a
            href="/about/"
            className="self-center rounded-[100px] border border-brand-primary bg-transparent px-[40px] pt-[18px] pb-[16px] text-[16px] font-medium text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
