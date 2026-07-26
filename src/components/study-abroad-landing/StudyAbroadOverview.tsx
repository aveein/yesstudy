import Image from "next/image";
import type { StudyAbroadLandingOverview } from "@/types/study-abroad-landing";

/**
 * "Overview" split section of `/study-abroad/` (Elementor container `37a26b4`).
 * Two 50% columns that shrink around a 50px column gap (the source container is
 * `flex-wrap: nowrap` on desktop, so the children absorb the gap rather than wrapping).
 *
 * Spec: docs/research/components/study-abroad-overview.spec.md
 */
export function StudyAbroadOverview({
  overview,
}: {
  overview: StudyAbroadLandingOverview;
}) {
  return (
    <section id="overview" className="my-[100px]">
      <div className="niec-container">
        <div className="flex flex-wrap items-center gap-x-[50px] gap-y-[20px] py-[10px] md:flex-nowrap">
          {/* fafeeb9 — image column */}
          <div className="w-full p-[10px] md:w-[50%]">
            <Image
              src={overview.image}
              alt=""
              width={520}
              height={600}
              // Renders at its intrinsic 520px width (capped at 100%) and is centred in the
              // column by the widget's `text-align: center` — it does NOT fill the column.
              className="mx-auto h-[300px] w-[520px] max-w-full rounded-[21px] object-cover object-center md:h-[650px]"
            />
          </div>

          {/* 4c9b830 — text column, 30px widget gap */}
          <div className="flex w-full flex-col gap-[30px] p-[10px] md:w-[50%]">
            <span className="text-[18px] leading-none font-medium text-niec-ink">
              {overview.eyebrow}
            </span>
            <h2 className="text-[32px] leading-[1.3em] font-bold text-niec-ink">
              {overview.heading}
            </h2>
            <p className="mb-[14.4px] text-[16px] leading-[1.5] text-niec-ink">
              {overview.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
