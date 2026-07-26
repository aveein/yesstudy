import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { OurOfficesSection } from "@/components/OurOfficesSection";
import { PageBanner } from "@/components/PageBanner";
import { CeoMessageBlock } from "@/components/about/CeoMessageBlock";
import type { CeosMessagePage } from "@/types/ceos-message";
import raw from "@/data/ceos-message.json";

const page = raw as CeosMessagePage;

export const metadata: Metadata = {
  title: "CEO’s Message - Nepal International Educational Consultancy",
};

/**
 * `/about/ceos-message/` — Elementor page `5973`.
 *
 * The banner here is **page-local**, not the shared single-page template `2866` that
 * `/about/` and `/contact-us/` use (this page never loads `post-2866.css`). It reuses the
 * same `PageBanner` shell but passes a `subtitle`, which also drops the title to 32px.
 *
 * `ContactSection`, `OurOfficesSection` and `Footer` come from the site-wide footer
 * template `3223`, as on every other interior page.
 */
export default function CeosMessagePage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          title={page.banner.title}
          subtitle={page.banner.subtitle}
          breadcrumb={page.banner.title}
        />
        {page.blocks.map((block) => (
          <CeoMessageBlock key={block.id} block={block} />
        ))}
        <ContactSection />
        <OurOfficesSection />
      </main>
      <Footer />
    </>
  );
}
