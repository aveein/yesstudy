import type { StudyAbroadLandingWhatYouGet } from "@/types/study-abroad-landing";

/**
 * "What you get" split section of `/study-abroad/` (Elementor container `ef9e95d`,
 * `id="get"` — the target of the hero nav's third pill).
 *
 * 40% heading column + 60% body column with a **zero** gap between them; the columns'
 * only breathing room is Elementor's default 10px container padding.
 *
 * Spec: docs/research/components/study-abroad-what-you-get.spec.md
 */
export function WhatYouGetSection({
  whatYouGet,
}: {
  whatYouGet: StudyAbroadLandingWhatYouGet;
}) {
  return (
    <section id="get" className="mt-[60px] mb-[40px]">
      <div className="niec-container">
        <div className="flex flex-wrap items-center py-[10px] md:flex-nowrap">
          {/* fc47c24 — heading column */}
          <div className="flex w-full flex-col gap-[30px] p-[10px] md:w-[40%]">
            <h2 className="text-[20px] leading-none font-medium text-niec-ink">
              {whatYouGet.eyebrow}
            </h2>
            <h3 className="pb-[4px] text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[32px]">
              {whatYouGet.heading}
            </h3>
          </div>

          {/* 50d29c8 — body column */}
          <div className="w-full p-[10px] md:w-[60%]">
            <p className="mb-[14.4px] text-[16px] leading-[1.5] text-niec-ink">
              {whatYouGet.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
