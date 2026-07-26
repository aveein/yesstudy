import Image from "next/image";
import type { StudyHeroData } from "@/types/study-abroad";

export function StudyHero({ hero }: { hero: StudyHeroData }) {
  return (
    <section>
      <div className="bg-niec-sky py-[60px]">
        <div className="niec-container">
          <div className="flex flex-col gap-[40px] md:flex-row md:items-center">
            <div className="md:w-[55%]">
              <h1 className="text-[48px] font-bold leading-[1.1] text-niec-ink md:text-[80px]">
                {hero.title}
              </h1>
              <p className="mt-[24px] text-[18px] leading-[1.6] text-niec-ink md:text-[22px]">
                {hero.subtitle}
              </p>
            </div>
            <div className="md:w-[43%]">
              <Image
                src={hero.image}
                alt={hero.title}
                width={507}
                height={470}
                className="h-auto w-full rounded-[32px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-niec-sky">
        <div className="niec-container">
          <div className="flex border-t border-[#d9e4f5]">
            {hero.nav.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex-1 py-[20px] text-center text-[18px] text-niec-ink transition-colors hover:text-brand-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
