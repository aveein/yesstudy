import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { ContactSection } from "@/components/ContactSection";
import { OurOfficesSection } from "@/components/OurOfficesSection";
import { AboutOverview } from "@/components/about/AboutOverview";
import { MissionVisionSection } from "@/components/about/MissionVisionSection";

export const metadata: Metadata = {
  title: "ABOUT US - Nepal International Educational Consultancy",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner title="About Us" breadcrumb="About Us" />
        <AboutOverview />
        <MissionVisionSection
          title="Our Mission"
          body="Our mission is to provide students with comprehensive support to achieve their academic and professional goals through high-quality test preparation and study abroad. programs."
          image={{
            src: "/images/about-our-mission.webp",
            alt: "Best Consultancy in Nepal for USA, UK, Australia, Canada, Ireland, New Zealand and Germany",
            width: 458,
            height: 384,
          }}
          imageSide="left"
          background="tint"
        />
        <MissionVisionSection
          title="Our Vision"
          body="Our vision is to bring about the best possible outcome for each individual who chooses to obtain our services as well as contribute to society at large by establishing the best standards possible in all our endeavors."
          image={{
            src: "/images/about-our-vision.webp",
            alt: "",
            width: 499,
            height: 419,
          }}
          imageSide="right"
          background="white"
        />
        <ContactSection />
        <OurOfficesSection />
      </main>
      <Footer />
    </>
  );
}
