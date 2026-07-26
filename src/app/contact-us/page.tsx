import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { ContactSection } from "@/components/ContactSection";
import { OurOfficesSection } from "@/components/OurOfficesSection";
import { ContactInfoBar } from "@/components/contact/ContactInfoBar";
import { GetInTouchSection } from "@/components/contact/GetInTouchSection";
import { OfficeLocations } from "@/components/contact/OfficeLocations";

export const metadata: Metadata = {
  title: "CONTACT US - Nepal International Educational Consultancy",
};

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner title="Contact Us" breadcrumb="Contact Us" />
        <ContactInfoBar />
        <GetInTouchSection />
        <OfficeLocations />
        <ContactSection />
        <OurOfficesSection />
      </main>
      <Footer />
    </>
  );
}
