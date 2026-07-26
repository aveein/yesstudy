import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { OurOfficesSection } from "@/components/OurOfficesSection";
import { StudyHero } from "@/components/study-abroad/StudyHero";
import { OverviewSection } from "@/components/study-abroad/OverviewSection";
import { ShapeYourFuture } from "@/components/study-abroad/ShapeYourFuture";
import { ChapterSection } from "@/components/study-abroad/ChapterSection";
import { UniversityListCarousel } from "@/components/study-abroad/UniversityListCarousel";
import { FaqAccordion } from "@/components/study-abroad/FaqAccordion";
import { CtaCarousel } from "@/components/study-abroad/CtaCarousel";
import type { StudyAbroadPage } from "@/types/study-abroad";
import raw from "@/data/study-in-usa.json";

const page = raw as unknown as StudyAbroadPage;

export const metadata: Metadata = {
  title: "Best Consultancy in Nepal for USA 2026: A Complete Guide",
};

export default function StudyInUsaPage() {
  return (
    <>
      <Header />
      <main>
        <StudyHero hero={page.hero} />
        <OverviewSection overview={page.overview} />
        {page.shape && <ShapeYourFuture shape={page.shape} />}
        {page.chapters.map((chapter) => (
          <ChapterSection key={chapter.number} chapter={chapter} />
        ))}
        <UniversityListCarousel
          heading={page.universities.heading}
          cards={page.universities.cards}
        />
        <FaqAccordion heading={page.faq.heading} items={page.faq.items} />
        <CtaCarousel heading={page.cta.heading} cards={page.cta.cards} />
        <ContactSection />
        <OurOfficesSection />
      </main>
      <Footer />
    </>
  );
}
