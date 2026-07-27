import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import type { HeroSlide } from "@/types";

/** Verbatim hero slide content from https://niec.edu.np/. */
const SLIDES: HeroSlide[] = [
  {
    title: "Study Abroad",
    description:
      "Discover top destinations for education: USA and Australia for global opportunities.",
    ctaLabel: "Learn More",
    ctaHref: "/study-abroad/",
    image: "/images/study-abroad-website-banner-2025-new.png",
    imageAlt: "Study Abroad",
  },
  {
    title: "Test Preparation",
    description:
      "Prepare for Best IELTS, PTE, TOEFL, SAT, GRE, and GMAT with expert guidance and personalized strategies to achieve your highest scores and academic goals.",
    ctaLabel: "Learn More",
    ctaHref: "/test-preparation/",
    image: "/images/website-banner-2005-test-preparation.png",
    imageAlt: "Test Preparation",
  },
  {
    title: "Expert Guidance and Support",
    description:
      "Get expert guidance and support for studying abroad, career planning, and test preparation at the best consultancy in Nepal for USA, UK, Canada, Ireland, New Zealand, and Germany.",
    ctaLabel: "Learn More",
    ctaHref: "/about/",
    image: "/images/study-abroad-website-banner-2005.png",
    imageAlt: "Expert Guidance and Support",
  },
];

interface HeroSlideCardProps {
  slide: HeroSlide;
  /** Only the first slide should preload — it's the LCP candidate. */
  preload: boolean;
}

/** One slide: a two-column layout (text left, image right; stacked on mobile). */
function HeroSlideCard({ slide, preload }: HeroSlideCardProps) {
  return (
    <div className="w-full bg-niec-sky px-[10px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-0 py-[10px] md:flex-row">
        <div className="flex w-full flex-col p-[10px] text-center md:w-[55%] md:text-left">
          <h2 className="mb-[30px] text-[40px] leading-[80px] font-bold text-niec-ink md:text-[80px]">
            {slide.title}
          </h2>
          <p className="mb-[30px] pr-[10%] text-[22px] leading-[33px] font-normal text-niec-ink">
            {slide.description}
          </p>
          <Link
            href={slide.ctaHref}
            className="inline-block rounded-[100px] border border-brand-primary bg-brand-primary px-[24px] py-[12px] text-[15px] font-normal text-white transition-colors hover:bg-transparent hover:text-brand-primary"
          >
            {slide.ctaLabel}
          </Link>
        </div>
        <div className="w-full text-center md:w-auto md:flex-1">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            width={472}
            height={543}
            preload={preload}
            sizes="(max-width: 767px) 100vw, 472px"
            className="h-auto w-full max-w-[472px] object-fill md:h-[543px] md:w-[472px]"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Hero — a time-driven autoplay carousel (4s delay, 400ms slide) cloned from
 * https://niec.edu.np/. One full two-column slide per view at every breakpoint.
 */
export function HeroCarousel() {
  return (
    <section className="w-full bg-niec-sky">
      <Carousel
        slides={SLIDES.map((slide, i) => (
          <HeroSlideCard key={slide.title} slide={slide} preload={i === 0} />
        ))}
        perView={{ desktop: 1, tablet: 1, mobile: 1 }}
        gap={10}
        autoplayDelay={4000}
        speed={400}
        bullets
        bulletSize={7}
        bulletColor="#06B6D4"
        inactiveBulletOpacity={0.2}
        paginationPosition="overlay"
        paginationOffset={5}
      />
    </section>
  );
}
