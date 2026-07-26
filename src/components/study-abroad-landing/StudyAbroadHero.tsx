import Image from "next/image";
import type { StudyAbroadLandingHero } from "@/types/study-abroad-landing";

/**
 * Hero + in-page anchor nav of `/study-abroad/` (Elementor containers `2ee91af` + `e0a5daf`).
 * Both sit on the same `#F1F7FF` wash, so they are one component.
 *
 * The nav is **not** sticky — there is no `menu_list` rule and no scroll JS in the source.
 * `Our Classes` points at `#class`, which has no target anywhere on the page; that dead
 * anchor is upstream behaviour and is reproduced verbatim.
 *
 * Spec: docs/research/components/study-abroad-hero.spec.md
 */
export function StudyAbroadHero({ hero }: { hero: StudyAbroadLandingHero }) {
  return (
    <section className="bg-niec-sky">
      {/* 2ee91af — row, wrap, space-between, align-center, gap 0, .e-con default 10px padding */}
      <div className="niec-container">
        <div className="flex flex-wrap items-center justify-between py-[10px]">
          {/* d55e4bf — 55% ≥768px, column, 30px widget gap */}
          <div className="flex w-full flex-col gap-[30px] p-[10px] md:w-[55%]">
            <h1 className="text-[40px] leading-none font-bold text-niec-ink md:text-[80px]">
              {hero.title}
            </h1>
            {/* f3e82fe — widget container is inset 10% on the right */}
            <div className="pr-[10%]">
              <p className="mb-[14.4px] text-[18px] leading-[1.5] text-niec-ink md:text-[22px]">
                {hero.intro}
              </p>
            </div>
          </div>

          {/* 4bf2696 — 43% ≥768px; image renders at its intrinsic 472×543 */}
          <div className="w-full p-[10px] md:w-[43%]">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              width={472}
              height={543}
              priority
              className="h-auto max-w-full"
            />
          </div>
        </div>
      </div>

      {/* e0a5daf — anchor nav, padding 30px 0 */}
      <div className="niec-container">
        <div className="flex flex-wrap py-[30px]">
          {hero.nav.map((item) => (
            <div
              key={item.href}
              className="w-1/2 pb-[10px] md:w-1/4 md:pb-0"
            >
              <a
                href={item.href}
                // `inline-block`, not `block`: Elementor's `.elementor-button` is
                // inline-block, so the column keeps a ~3px baseline descender below it
                // (live column measures 36px against a 33px button).
                className="inline-block w-full border-t-[3px] border-[#11111110] pt-[10px] text-center text-[20px] leading-none font-medium text-niec-ink transition-all duration-300 hover:border-brand-primary hover:text-brand-primary focus:border-brand-primary focus:text-brand-primary"
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
