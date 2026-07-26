import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import type { UniversityCardData } from "@/types/study-abroad";

const VIEW_MORE_HREF = "/universities/";

/**
 * Outlined orange pill, shared by the desktop (right-aligned) and mobile (centred)
 * copies. `leading-none` reproduces Elementor's global `.elementor-button
 * { line-height: 1 }`, which is what makes the 16px pill 40px tall.
 */
const VIEW_MORE_CLASS =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white";

/**
 * One "best university" card: left-aligned logo, name and READ MORE pill.
 * `items-start` keeps the logo at its natural width against the content's
 * left edge rather than stretching the 100%-wide image widget.
 */
function UniversityCard({ card }: { card: UniversityCardData }) {
  return (
    <article className="flex h-full flex-col items-start justify-start gap-[30px] rounded-[20px] bg-niec-white p-[30px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0px_10px_20px_0px_rgba(86,86,86,0.1)]">
      {card.image && (
        <Image
          src={card.image}
          alt={card.name}
          width={195}
          height={195}
          className="h-[70px] w-auto object-contain"
        />
      )}
      <h4 className="text-start text-[24px] leading-none font-bold text-niec-ink">
        {card.name}
      </h4>
      <Link
        href={card.href}
        className="inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[15px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white"
      >
        READ MORE
      </Link>
    </article>
  );
}

export function UniversityListCarousel({
  heading,
  cards,
}: {
  heading: string;
  cards: UniversityCardData[];
}) {
  return (
    <section className="bg-niec-sky py-[80px]">
      <div className="niec-container flex flex-col gap-[30px]">
        {/* Header: 60% heading column + the remaining space reserved for the pill. */}
        <div className="flex flex-row gap-[30px]">
          <div className="w-full shrink-0 grow-0 md:w-[60%]">
            <h3 className="text-start text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[32px]">
              {heading}
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
          slides={cards.map((card) => (
            <UniversityCard key={card.href} card={card} />
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
