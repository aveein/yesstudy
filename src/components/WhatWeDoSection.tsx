import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FeatureCard } from "@/types";

/** Card copy verbatim from the "What we do / How we can help" section of niec.edu.np. */
const CARDS: FeatureCard[] = [
  {
    title: "What we do",
    body: "At Yes Study, we specialize in comprehensive test preparation services, guiding students to excel in exams like TOEFL, IELTS, PTE, SAT 1, GRE, and GMAT, with a focus on facilitating their aspirations to study abroad in top destinations worldwide.",
    image: "/images/what-we-do-website-banner.png",
    ctaLabel: "Learn More",
    ctaHref: "/test-preparation/",
    tone: "sky",
  },
  {
    title: "How we can help",
    body: "At Yes Study, we provide personalized guidance and expert instruction to help students achieve their goals. Our tailored test preparation programs, experienced instructors, and extensive resources ensure that each student receives the support they need to excel in their chosen exams and pursue their dreams of studying abroad.",
    image: "/images/how-can-we-help-banner-1-1.png",
    ctaLabel: "Learn More",
    ctaHref: "/about/services/",
    tone: "cream",
  },
];

/** Card background per tone. */
const TONE_BACKGROUND: Record<FeatureCard["tone"], string> = {
  sky: "bg-niec-sky",
  cream: "bg-brand-tint",
};

export function WhatWeDoSection() {
  return (
    <section className="bg-transparent">
      <div className="niec-container flex flex-col gap-[30px] md:flex-row">
        {CARDS.map((card) => (
          <article
            key={card.title}
            className={cn(
              "flex flex-col items-center gap-[30px] rounded-[20px] px-[30px] py-[60px] text-center md:min-w-0 md:flex-1 lg:px-[40px] lg:py-[80px]",
              TONE_BACKGROUND[card.tone]
            )}
          >
            {/* Photo crop + orange/cyan decoration are baked into the source PNG — no overlays. */}
            <Image
              src={card.image}
              alt={card.title}
              width={300}
              height={345}
              className="h-[345px] w-[300px] object-fill"
            />
            <h3 className="text-[28px] leading-[28px] font-bold text-niec-ink">
              {card.title}
            </h3>
            <p className="text-[16px] leading-[24px] font-normal text-niec-ink">
              {card.body}
            </p>
            <a
              href={card.ctaHref}
              className="inline-block rounded-[100px] border border-brand-primary px-[24px] py-[12px] text-[15px] font-normal text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              {card.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
