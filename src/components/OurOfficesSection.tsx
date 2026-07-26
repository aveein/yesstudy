import Link from "next/link";

/**
 * "Our Offices" — Elementor section `4bb762f` (F1), card loop template `4834`.
 *
 * The upstream site drives this with a Swiper configured `delay: 0, speed: 10000`,
 * which produces a *continuous* linear drift rather than a stepped carousel. We
 * reproduce that with a pure-CSS keyframes marquee (`niec-offices-marquee`): the
 * track holds the six slides rendered twice and translates from 0 to -50% (minus
 * half the 50px gap so the seam is invisible), pausing on hover via a `:hover`
 * group — so no `"use client"` directive is needed.
 */
interface Office {
  title: string;
  href: string;
  image: string;
}

/** Source order, verbatim titles (note the EN DASH U+2013 in the head office). */
const OFFICES: Office[] = [
  {
    title: "Head Office – Putalisadak, Kathmandu",
    href: "/centre/head-office/",
    image: "/images/kathmandu-1.jpg",
  },
  {
    title: "Pakistan",
    href: "#",
    image: "/images/oren-yomtov-da46ckq88ji-unsplash-medium1.jpg",
  },
  {
    title: "Palpa",
    href: "/centre/niec-palpa/",
    image: "/images/800x911-revised-palp.jpg",
  },
  {
    title: "Pokhara",
    href: "/centre/niec-pokhara/",
    image: "/images/niec-pkr-revised-pokhar.jpg",
  },
  {
    title: "Chitwan",
    href: "/centre/niec-chitwan/",
    image: "/images/800x911-revised-chitwa.jpg",
  },
  {
    title: "Butwal",
    href: "/centre/niec-butwal/",
    image: "/images/butwal-revise.jpg",
  },
];

const VISIT_US_HREF = "https://www.google.com/search?q=yes+study";

/**
 * A single office card: a full-height link with a CSS background image, a bottom
 * gradient scrim, and the title/subtitle stacked at the bottom. Fixed width so
 * roughly three cards show per desktop view, two on tablet, one on mobile.
 */
function OfficeCard({ office }: { office: Office }) {
  return (
    <Link
      href={office.href}
      className="relative flex h-[400px] w-[80vw] max-w-[360px] shrink-0 flex-col justify-end overflow-hidden rounded-[20px] p-[35px] md:h-[500px] md:w-[calc((100vw-140px)/2)] lg:w-[calc((100vw-180px)/3)]"
      style={{
        backgroundImage: `url(${office.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,173,239,0) 0%, rgba(0,0,0,0.29) 89%)",
        }}
      />
      <div className="relative z-[1] flex flex-col gap-[10px]">
        <p className="text-[36px] leading-[50px] font-medium text-niec-white">
          {office.title}
        </p>
        <span className="text-[16px] font-medium text-niec-white">
          Yes Study Centre
        </span>
      </div>
    </Link>
  );
}

export function OurOfficesSection() {
  return (
    <section className="mt-[100px] flex flex-col gap-[50px] bg-niec-white">
      <style>{`@keyframes niec-offices-marquee { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 25px)); } }`}</style>

      {/* Header — boxed within the 1200px container. */}
      <div className="niec-container">
        <div className="flex flex-col gap-[10px] md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-center text-[20px] font-normal text-brand-primary lg:text-start">
              Our Offices
            </h2>
            {/* Trailing space kept verbatim from upstream. */}
            <p className="text-center text-[32px] leading-[1.2em] font-bold text-niec-ink md:text-[45px] lg:text-start">
              We are located at your favourite city{" "}
            </p>
          </div>
          <div className="flex justify-center md:block">
            <Link
              href={VISIT_US_HREF}
              target="_blank"
              rel="nofollow"
              className="inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee — full-bleed continuous drift, paused on hover. */}
      {/* <div className="group relative w-full overflow-hidden">
        <div
          className="flex w-max gap-[50px] group-hover:[animation-play-state:paused]"
          style={{ animation: "niec-offices-marquee 60s linear infinite" }}
        >
          {[...OFFICES, ...OFFICES].map((office, i) => (
            <OfficeCard key={i} office={office} />
          ))}
        </div>
      </div> */}
    </section>
  );
}
