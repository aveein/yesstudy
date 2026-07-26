import Image from "next/image";
import Link from "next/link";
import type { StudyAbroadLandingServices } from "@/types/study-abroad-landing";

/**
 * Service cards + "Get in touch" CTA (Elementor container `8bd726b`).
 *
 * This is a single 2 × 4 CSS grid: the seven service cards occupy cells 1–7 and the CTA
 * panel (`39dd4f8`, `id="started"`) is the **eighth cell**, not a sibling section.
 * Rows use plain `1fr` (not `minmax(0,1fr)`), so they equalise to the tallest card.
 *
 * Unlike the destination cards, this CTA's overlay is real: `--overlay-opacity: 0.2`.
 *
 * Spec: docs/research/components/study-abroad-services.spec.md
 */
export function StudyAbroadServices({
  services,
}: {
  services: StudyAbroadLandingServices;
}) {
  const { cards, cta } = services;

  return (
    <section className="niec-container">
      <div className="grid grid-cols-1 grid-rows-[repeat(2,1fr)] gap-[30px] py-[10px] md:grid-cols-2 md:grid-rows-[repeat(4,1fr)]">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col items-start justify-start gap-[30px] rounded-[20px] bg-brand-tint px-[40px] pt-[40px] pb-[80px]"
          >
            <Image
              src={card.image}
              alt=""
              width={100}
              height={100}
              className="rounded-[20px]"
            />
            <h2 className="text-[32px] leading-none font-bold text-niec-ink">
              {card.title}
            </h2>
            <div>
              {card.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-[14.4px] text-[16px] leading-[1.5] text-niec-ink"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* 39dd4f8 — CTA panel, the 8th grid cell */}
        <div
          id="started"
          style={{ backgroundImage: `url(${cta.image})` }}
          className="relative overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat px-[40px] pt-[40px] pb-[100px]"
        >
          {/* --overlay-opacity: 0.2 over --e-global-color-text */}
          <div className="absolute inset-0 bg-niec-ink opacity-20" aria-hidden="true" />

          <div className="relative flex flex-col gap-[30px]">
            <h2 className="text-[20px] leading-none font-medium text-niec-white">
              {cta.eyebrow}
            </h2>
            <h2 className="text-[32px] leading-none font-bold text-niec-white">
              {cta.heading}
            </h2>
            <p className="mb-[14.4px] text-[16px] leading-[1.5] text-niec-white">
              {cta.body}
            </p>
          </div>

          {/* `elementor-hidden-mobile` — absent below 768px */}
          <Link
            href={cta.buttonHref}
            className="absolute bottom-[40px] left-[40px] hidden rounded-[100px] border border-niec-white bg-niec-white px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:border-brand-primary hover:bg-brand-primary hover:text-niec-white focus:border-brand-primary focus:bg-brand-primary focus:text-niec-white md:inline-block"
          >
            {cta.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
