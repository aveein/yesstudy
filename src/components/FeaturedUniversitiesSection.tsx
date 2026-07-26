import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import type { University } from "@/types";

/**
 * University names, countries, links and logo paths verbatim from the "Featured
 * Universities" section of niec.edu.np (Elementor section `8479231`, card loop
 * template `2787`). The `download*` filenames are the upstream WordPress uploads —
 * unhelpful but correct, and note the sixth is a `.jpg` while the rest are `.png`.
 */
const UNIVERSITIES: University[] = [
  {
    name: "University of The Sunshine Coast Brisbane",
    country: "Australia",
    href: "/university/university-of-the-sunshine-coast-brisbane/",
    logo: "/images/university-of-the-sunshine-coast-brisbane.png",
  },
  {
    name: "Griffith College",
    country: "Ireland",
    href: "/university/griffith-college/",
    logo: "/images/download.png",
  },
  {
    name: "James Cook University, Brisbane",
    country: "Australia",
    href: "/university/james-cook-university-brisbane/",
    logo: "/images/download-1.png",
  },
  {
    name: "University of Wollongong",
    country: "Australia",
    href: "/university/university-of-wollongong/",
    logo: "/images/download-2.png",
  },
  {
    name: "Central Queensland University",
    country: "Australia",
    href: "/university/central-queensland-university/",
    logo: "/images/download-3.png",
  },
  {
    name: "Southeast Missouri State University",
    country: "USA",
    href: "/university/southeast-missouri-state-university/",
    logo: "/images/download-1.jpg",
  },
];

const VIEW_MORE_HREF = "/universities/";

/**
 * Outlined orange pill, shared by the desktop (right-aligned) and mobile (centred)
 * copies. `leading-none` reproduces Elementor's global `.elementor-button
 * { line-height: 1 }`, which is what makes the 16px pill 40px tall.
 */
const VIEW_MORE_CLASS =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white";

/**
 * One card from the loop template: left-aligned logo, name, country and pill.
 * `items-start` is what stops the 100%-wide image widget from stretching, so each
 * logo renders 70px tall at its natural width against the content's left edge.
 */
function UniversityCard({ university }: { university: University }) {
  return (
    <article className="flex h-full flex-col items-start justify-start gap-[30px] rounded-[20px] bg-niec-white p-[30px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0px_10px_20px_0px_rgba(86,86,86,0.1)]">
      <Image
        src={university.logo}
        alt={university.name}
        width={195}
        height={195}
        className="h-[70px] w-auto object-contain"
      />
      {/* Elementor's global `.elementor-heading-title { line-height: 1 }` — this is
          why the two-line names sit exactly 24px apart. */}
      <h4 className="text-start text-[24px] leading-none font-bold text-niec-ink">
        {university.name}
      </h4>
      <p className="text-[16px] leading-[1.5] font-normal text-niec-ink">
        {university.country}
      </p>
      {/* Label is stored uppercase upstream with no `text-transform`. */}
      <Link
        href={university.href}
        className="inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[15px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white"
      >
        READ MORE
      </Link>
    </article>
  );
}

export function FeaturedUniversitiesSection() {
  return (
    <section className="bg-brand-tint py-[100px]">
      <div className="niec-container flex flex-col gap-[30px]">
        {/* Header: 60% heading column + the remaining 450px reserved for the pill.
            Unlike the sibling sections this one has no 20px eyebrow line. */}
        <div className="flex flex-row gap-[30px]">
          <div className="w-full shrink-0 grow-0 md:w-[60%]">
            <h3 className="pb-[4px] text-start text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[32px]">
              Featured Universities
            </h3>
          </div>
          {/* Elementor defaults this cell to flex-direction:column, so justify-center
              centres vertically and items-end pins the pill to the 1200px right edge. */}
          <div className="hidden flex-1 flex-col items-end justify-center md:flex">
            <Link href={VIEW_MORE_HREF} className={VIEW_MORE_CLASS}>
              View More
            </Link>
          </div>
        </div>

        <Carousel
          slides={UNIVERSITIES.map((university) => (
            <UniversityCard key={university.href} university={university} />
          ))}
          perView={{ desktop: 3, tablet: 2, mobile: 1 }}
          gap={30}
          autoplayDelay={5000}
          speed={500}
          bullets
          bulletSize={7}
          bulletColor="#2563EB"
          inactiveBulletOpacity={0.2}
          paginationPosition="below"
          paginationOffset={20}
        />

        {/* Mobile-only duplicate of the header CTA. */}
        <div className="flex justify-center md:hidden">
          <Link href={VIEW_MORE_HREF} className={VIEW_MORE_CLASS}>
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
