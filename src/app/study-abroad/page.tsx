import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { OurOfficesSection } from "@/components/OurOfficesSection";
import { StudyAbroadHero } from "@/components/study-abroad-landing/StudyAbroadHero";
import { StudyAbroadOverview } from "@/components/study-abroad-landing/StudyAbroadOverview";
import { StudyAbroadDestinations } from "@/components/study-abroad-landing/StudyAbroadDestinations";
import { WhatYouGetSection } from "@/components/study-abroad-landing/WhatYouGetSection";
import { StudyAbroadServices } from "@/components/study-abroad-landing/StudyAbroadServices";
import type { StudyAbroadLandingPage } from "@/types/study-abroad-landing";
import raw from "@/data/study-abroad-landing.json";

const page = raw as StudyAbroadLandingPage;

export const metadata: Metadata = {
  title: "Best Consultancy in Nepal - Nepal International Educational Consultancy",
};

/**
 * `/study-abroad/` — the study-abroad landing page (Elementor page `3050`).
 *
 * This page does **not** use the shared `PageBanner`: unlike `/about/` and `/contact-us/`,
 * its template does not pull in single-page template `2866`, so it opens straight into its
 * own hero. `ContactSection`, `OurOfficesSection` and `Footer` come from the site-wide
 * footer template `3223`, exactly as on every other interior page.
 */
export default function StudyAbroadPage() {
  return (
    <>
      <Header />
      <main>
        <StudyAbroadHero hero={page.hero} />
        <StudyAbroadOverview overview={page.overview} />
        <StudyAbroadDestinations destinations={page.destinations} />
        <WhatYouGetSection whatYouGet={page.whatYouGet} />
        <StudyAbroadServices services={page.services} />
        <ContactSection />
        <OurOfficesSection />
      </main>
      <Footer />
    </>
  );
}
