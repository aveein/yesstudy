import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import type { CtaCardData } from "@/types/study-abroad";

const VIEW_MORE_HREF = "/study-abroad/";

/**
 * Outlined orange pill, shared by the desktop (right-aligned) and mobile (centred) copies.
 * `leading-none` reproduces Elementor's global `.elementor-button { line-height: 1 }`.
 */
const VIEW_MORE_CLASS =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white";

/**
 * "Expert guidance for study abroad success" destination-card carousel that closes the
 * study-abroad country guide pages. Tall rounded image cards with a bottom scrim and the
 * country name, looping three-up (desktop) / two-up (tablet) / one-up (mobile).
 */
export function CtaCarousel({
  heading,
  cards,
}: {
  heading: string;
  cards: CtaCardData[];
}) {
  const slides = cards.map((card) => (
    <Link
      key={card.href}
      href={card.href}
      className="group relative block h-[380px] overflow-hidden rounded-[20px]"
    >
      {card.image && (
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <span className="absolute inset-x-0 bottom-0 z-[1] p-[24px] text-[24px] font-bold text-niec-white">
        {card.name}
      </span>
    </Link>
  ));

  return (
    <section className="py-[80px]">
      <div className="niec-container flex flex-col gap-[30px]">
        {/* Header: 60% heading column + the remaining width reserved for the pill. */}
        <div className="flex flex-row gap-[30px]">
          <h3 className="text-[28px] leading-[1.3em] font-bold text-niec-ink md:w-[60%] md:text-[32px]">
            {heading}
          </h3>
          <div className="hidden flex-1 flex-col items-end justify-center md:flex">
            <Link href={VIEW_MORE_HREF} className={VIEW_MORE_CLASS}>
              View More
            </Link>
          </div>
        </div>

        <Carousel
          slides={slides}
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

        <div className="flex justify-center md:hidden">
          <Link href={VIEW_MORE_HREF} className={VIEW_MORE_CLASS}>
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
