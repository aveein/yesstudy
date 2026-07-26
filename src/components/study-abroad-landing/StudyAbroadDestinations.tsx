import Link from "next/link";
import type { StudyAbroadLandingDestinations } from "@/types/study-abroad-landing";

/**
 * "Expert guidance for study abroad success" destination grid (Elementor container `1e344ab`,
 * card loop template `2566`).
 *
 * Unlike the homepage section that shares template `2566`, this one is a loop **grid**
 * (3/2/1 columns), sits on the peach wash (`brand-tint` in this clone) and has **no**
 * "View More" pill — its reserved container `8562a25` is empty upstream, so nothing is
 * rendered for it here.
 *
 * The card's `::before` overlay has `--overlay-opacity: 0` in the source, i.e. it is
 * invisible — deliberately not rendered.
 *
 * Spec: docs/research/components/study-abroad-destinations.spec.md
 */
export function StudyAbroadDestinations({
  destinations,
}: {
  destinations: StudyAbroadLandingDestinations;
}) {
  return (
    <section className="bg-brand-tint pt-[40px] md:pt-[100px]">
      {/* `1e344ab` is a flex column with no explicit `--gap`, so it inherits the kit's
          30px `--widgets-spacing` between the heading row and the grid wrapper. */}
      <div className="niec-container flex flex-col gap-[30px]">
        {/* dc2b2ab — heading row, 40px gutters (20px on mobile) */}
        <div className="px-[20px] pt-[20px] md:px-[40px] md:pt-0 md:pb-[20px]">
          <div className="flex flex-col gap-[30px] md:w-[60%]">
            <h2 className="text-[20px] leading-none font-medium text-niec-ink">
              {destinations.eyebrow}
            </h2>
            <h3 className="pb-[4px] text-[32px] leading-[1.3em] font-bold text-niec-ink">
              {destinations.heading}
            </h3>
          </div>
        </div>

        {/* 711bd23 / d779cdb — the loop grid */}
        <div className="px-[20px] pb-[20px] md:px-[40px] md:pb-[100px]">
          {/* `auto-rows-[1fr]`, not `auto-rows-fr`: Tailwind's named value emits
              `minmax(0,1fr)`, while Elementor sets a plain `1fr`. */}
          <div className="grid auto-rows-[1fr] grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {destinations.cards.map((card) => (
              <div
                key={card.country}
                style={{ backgroundImage: `url(${card.image})` }}
                className="relative flex h-full flex-col gap-[30px] rounded-[15px] bg-cover bg-center bg-no-repeat p-[40px] transition-shadow duration-300 hover:shadow-[0px_16px_30px_0px_rgba(0,0,0,0.1450980392156863)] md:rounded-[20px]"
              >
                <h3 className="text-[40px] leading-none font-bold text-niec-white">
                  {card.country}
                </h3>
                {/* The card takes its height from this spacer, not from its content. */}
                <div className="h-[200px] md:h-[280px]" aria-hidden="true" />
                <Link
                  href={card.href}
                  className="absolute bottom-[40px] left-[40px] inline-block rounded-[25px] border border-niec-white bg-transparent px-[40px] py-[16px] text-[16px] leading-none font-medium tracking-normal whitespace-nowrap uppercase text-niec-white transition-colors duration-300 hover:border-niec-white hover:bg-niec-white hover:text-brand-primary focus:border-niec-white focus:bg-niec-white focus:text-brand-primary"
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
