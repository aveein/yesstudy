import type { DestinationCard } from "@/types";

/**
 * Destination copy, links and asset paths verbatim from the "Study Abroad"
 * section of niec.edu.np (Elementor section `4744718`, card loop template `2566`).
 * The Ireland image is misspelled `irealand.jpg` upstream — kept as-is so the path resolves.
 */
const DESTINATIONS: DestinationCard[] = [
  {
    country: "USA",
    href: "/study-abroad/study-in-usa/",
    image: "/images/usa.jpg",
  },
  {
    country: "Australia",
    href: "/study-abroad/study-in-australia/",
    image: "/images/australia.jpg",
  },
];

const VIEW_MORE_HREF = "/study-abroad/";

/**
 * Outlined orange pill, shared by the desktop (right-aligned) and mobile (centred) copies.
 * `leading-none` reproduces Elementor's global `.elementor-button { line-height: 1 }`,
 * which is what makes the pill 42px tall (16 text + 2×12 padding + 2 border).
 */
const VIEW_MORE_CLASS =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors hover:bg-brand-primary hover:text-niec-white focus:bg-brand-primary focus:text-niec-white";

export function StudyAbroadSection() {
  return (
    <section className="bg-niec-sky pt-[40px] pb-0 md:py-[100px]">
      <div className="niec-container flex flex-col gap-[30px]">
        {/* Header: 60% heading column + the remaining 450px reserved for the pill. */}
        <div className="flex flex-row gap-[30px] pt-[20px] md:pt-0">
          <div className="flex w-full shrink-0 grow-0 flex-col gap-[10px] md:w-[60%]">
            <h2 className="text-start text-[20px] leading-none font-medium text-niec-ink">
              Study Abroad
            </h2>
            <h3 className="pb-[4px] text-start text-[32px] leading-[1.3em] font-bold text-niec-ink">
              Expert guidance for study abroad success asdasd
            </h3>
          </div>
          {/* Elementor defaults this cell to flex-direction:column, so justify-center
              centres vertically and items-end pins the pill to the 1200px right edge. */}
          <div className="hidden flex-1 flex-col items-end justify-center md:flex">
            <a href={VIEW_MORE_HREF} className={VIEW_MORE_CLASS}>
              View More
            </a>
          </div>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-[30px] pb-[20px] md:grid-cols-2 md:pb-0 lg:grid-cols-3">
          {DESTINATIONS.map((card) => (
            <article
              key={card.country}
              style={{ backgroundImage: `url(${card.image})` }}
              className="relative flex h-full flex-col gap-[30px] rounded-[15px] bg-cover bg-center bg-no-repeat p-[40px] transition-shadow duration-300 hover:shadow-[0px_16px_30px_0px_rgba(0,0,0,0.1450980392156863)] md:rounded-[20px]"
            >
              {/* Elementor's global `.elementor-heading-title { line-height: 1 }`. */}
              <h3 className="text-[40px] leading-none font-bold text-niec-white">
                {card.country}
              </h3>
              {/* Fixed spacer — the source card takes its height from this, not from content. */}
              <div aria-hidden className="h-[200px] md:h-[280px]" />
              <a
                href={card.href}
                className="absolute bottom-[40px] left-[40px] inline-block rounded-[25px] border border-niec-white bg-transparent px-[40px] py-[16px] text-[16px] leading-none font-medium whitespace-nowrap uppercase text-niec-white transition-colors hover:border-niec-white hover:bg-niec-white hover:text-brand-primary focus:border-niec-white focus:bg-niec-white focus:text-brand-primary"
              >
                Read More
              </a>
            </article>
          ))}
        </div>

        <div className="flex justify-center md:hidden">
          <a href={VIEW_MORE_HREF} className={VIEW_MORE_CLASS}>
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
