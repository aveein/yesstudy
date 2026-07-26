import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AboutSection } from "@/components/AboutSection";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { LatestEventsSection } from "@/components/LatestEventsSection";
import { StudyAbroadSection } from "@/components/StudyAbroadSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { OurClassesSection } from "@/components/OurClassesSection";
import { FeaturedUniversitiesSection } from "@/components/FeaturedUniversitiesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CareerPathSection } from "@/components/CareerPathSection";
import { BlogSection } from "@/components/BlogSection";
import { VideoSection } from "@/components/VideoSection";
import { ContactSection } from "@/components/ContactSection";
import { OurOfficesSection } from "@/components/OurOfficesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <AboutSection />
        <WhatWeDoSection />
        {/* <LatestEventsSection /> */}
        <StudyAbroadSection />
        <WhyChooseUsSection />
        <OurClassesSection />
        <FeaturedUniversitiesSection />
        <TestimonialsSection />
        <CareerPathSection />
        {/* <BlogSection /> */}
        {/* <VideoSection /> */}
        <ContactSection />
        <OurOfficesSection />
      </main>
      <Footer />
    </>
  );
}
