import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";
import type { Testimonial } from "@/types";

/**
 * Testimonial copy verbatim from the "Testimonial" section of niec.edu.np
 * (Elementor section `df39bfa`, loop template `1866`). Typos ("staffs", "maam",
 * "i got", "my best decision") and the curly apostrophe in "ma’am" are upstream —
 * kept as-is. The last two entries genuinely have no scholarship line.
 *
 * Each quote carries inline links around "Yes Study" / "US study" upstream; they
 * inherit #111111 and only change on hover, so plain text renders identically.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Thank you for helping me through the process. I had a great time here in Yes Study. Thank you.",
    name: "Arbin Bhandari",
    university: "Gannon University",
    scholarship: "Scholarship: $30421",
    avatar: "/images/arbin.webp",
  },
  {
    quote:
      "It was a really great experience joining Yes Study for my abroad study counseling. I am immensely grateful to Pramila ma’am and Sohail sir for helping me to get through all the processes regarding US study. Thank you for everything Yes Study.",
    name: "Preshna Karki",
    university: "Gannon University",
    scholarship: "Scholarship: $30421",
    avatar: "/images/img-4172.jpg",
  },
  {
    quote:
      "I would like to thank Yes Study, for being my mentor and guide throughout my whole process of my abroad journey. After being denied  for Australia visa, they guided me, especially Pramila maam and Suhail Dai, to make my process as short as around 2 weeks.",
    name: "Lemon Dhakal",
    university: "Juniata College",
    scholarship: "Scholarship: $49000",
    avatar: "/images/img-2944-1.jpg",
  },
  {
    quote:
      "I would like to thank Yes Study for being a part of my abroad journey as a mentor and complete guide. Thank you so much again.",
    name: "Tenzing Gurung",
    university: "Gannon University",
    scholarship: "Scholarship: $5000",
    avatar: "/images/img-2942-1.jpg",
  },
  {
    quote:
      "Thank you Yes Study, it was a very amazing six months with you guys. The staffs and friends I made here during my study were very much supportive. It was one of my best decision that I chose Yes Study.",
    name: "Sajan Banjara",
    university: "University of Utah",
    scholarship: "",
    avatar: "/images/webpc-passthru-7.webp",
  },
  {
    quote:
      "My experience in Yes Study was amazing. All of the staffs are very helpful towards the students. I will always be grateful towards Yes Study family for the experience i got and the guidance that led me towards my dream!",
    name: "Tsering Choden Gurung",
    university: "University of Louisiana Monroe",
    scholarship: "",
    avatar: "/images/webpc-passthru-5.webp",
  },
];

/** The two copies of the CTA point at different (upstream-inconsistent) URLs. */
const VIEW_MORE_DESKTOP_HREF = "/testimonials/";
const VIEW_MORE_MOBILE_HREF = "/testimonial/";

/**
 * Outlined orange pill shared by the desktop (right-aligned) and mobile (centred)
 * copies. `leading-none` reproduces Elementor's global `.elementor-button
 * { line-height: 1 }` — that is what makes the 16px pill exactly 40px tall.
 */
const VIEW_MORE_CLASS =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white";

/** University + scholarship share one type ramp. */
const META_LINE = "text-center text-[13px] leading-[1.3em] font-medium text-niec-ink";

/**
 * One card from loop template 1866. Template 1866 declares no hover state at all,
 * so there is deliberately none here.
 */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex h-full flex-col gap-[20px] rounded-[8px] bg-niec-white p-[30px]">
      <Image
        src={testimonial.avatar}
        alt={testimonial.name}
        width={70}
        height={70}
        className="mx-auto h-[70px] w-[70px] rounded-[100px] object-cover object-center"
      />
      {/* The theme's `p { margin-block-end: .9rem }` survives inside post content,
          so the quote sits 14.4px above the card's own 20px flex gap. */}
      <p className="mb-[0.9rem] text-center text-[16px] leading-[22px] font-normal text-niec-ink">
        {testimonial.quote}
      </p>
      <p className="text-center text-[16px] leading-[1.3em] font-semibold text-niec-ink">
        {testimonial.name}
      </p>
      {/* `-mt-[10px]` is the source's own margin: it pulls the meta block up so the
          visible gap under the name reads as 10px rather than the card's 20px. */}
      <div className="-mt-[10px] flex flex-col justify-center gap-y-0">
        <h5 className={META_LINE}>{testimonial.university}</h5>
        {testimonial.scholarship ? (
          <h5 className={META_LINE}>{testimonial.scholarship}</h5>
        ) : null}
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-niec-sky pt-[60px]">
      <div className="niec-container flex flex-col gap-[30px]">
        {/* Header and carousel each carry 40px of side padding, which is what insets
            this section 40px further than its neighbours. Usable track: 1120px. */}
        <div className="flex flex-row gap-[30px] px-[40px] pb-[20px]">
          {/* Both cells are width:100% with flex-shrink:1, so they settle at 545px each. */}
          <div className="flex w-full min-w-0 flex-col gap-[30px]">
            {/* Unlike the sibling sections' eyebrows this one is weight 600. */}
            <h3 className="text-start text-[20px] leading-none font-semibold text-niec-ink">
              Testimonial
            </h3>
            <div className="pb-[4px]">
              {/* Stays 32px at every width — the source has no mobile override. */}
              <h3 className="text-start text-[32px] leading-[1.3em] font-bold text-niec-ink">
                Thousands of students can&apos;t be wrong
              </h3>
            </div>
          </div>
          {/* Elementor defaults this cell to flex-direction:column, so justify-center
              centres vertically and items-end pins the pill to the row's right edge. */}
          <div className="hidden w-full min-w-0 flex-col items-end justify-center md:flex">
            <Link href={VIEW_MORE_DESKTOP_HREF} className={VIEW_MORE_CLASS}>
              View More
            </Link>
          </div>
        </div>

        <div className="px-[40px] pb-[100px]">
          <Carousel
            slides={TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
            perView={{ desktop: 3, tablet: 2, mobile: 1 }}
            gap={20}
            autoplayDelay={5000}
            speed={1000}
            bullets
            bulletSize={7}
            bulletColor="#06B6D4"
            inactiveBulletOpacity={0.2}
            paginationPosition="below"
            paginationOffset={20}
            arrows
          />
        </div>

        {/* Mobile-only duplicate of the header CTA — note the singular href. */}
        <div className="flex justify-center md:hidden">
          <Link href={VIEW_MORE_MOBILE_HREF} className={VIEW_MORE_CLASS}>
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
