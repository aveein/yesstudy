import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";

interface BlogCard {
  title: string;
  date: string;
  href: string;
  image: string;
}

const cards: BlogCard[] = [
  {
    title: "Ultimate IELTS Preparation Guide in Nepal 2026 – Yes Study",
    date: "July 16, 2026",
    href: "/ultimate-ielts-preparation-guide-in-nepal-2026-niec/",
    image: "/images/ielts-preparation-guide-in-nepal-2026.jpg",
  },
  {
    title: "Dedicated PC-Based IELTS Practice at Yes Study Kathmandu",
    date: "July 14, 2026",
    href: "/dedicated-pc-based-ielts-practice-niec/",
    image: "/images/dedicated-pc-ielts.jpg",
  },
  {
    title: "Unlimited IELTS Speaking Practice at Yes Study",
    date: "July 13, 2026",
    href: "/unlimited-ielts-speaking-practice-niec/",
    image: "/images/unlimited-ielts-speaking-niec.jpg",
  },
  {
    title: "How IELTS Trainers Improve Your IELTS Score | Yes Study",
    date: "July 12, 2026",
    href: "/how-ielts-trainers-improve-your-score/",
    image: "/images/ielts-trainer-2026.jpg",
  },
  {
    title: "How to Score Band 8 in IELTS | Expert Tips by Yes Study",
    date: "July 10, 2026",
    href: "/how-to-score-band-8-in-ielts/",
    image: "/images/ielts-score-8-tips.jpg",
  },
  {
    title: "26+ Years of IELTS Excellence at Yes Study | Kathmandu",
    date: "July 9, 2026",
    href: "/26-years-ielts-excellence-niec-kathmandu/",
    image: "/images/26-years-of-excellence-in-ielts.jpg",
  },
];

function BlogSlide({ card }: { card: BlogCard }) {
  return (
    <article
      className="relative flex h-full flex-col overflow-hidden rounded-[20px] bg-cover bg-center px-[20px] pt-[140px] pb-[40px] transition-shadow duration-300 hover:shadow-[0px_16px_30px_0px_rgba(0,0,0,0.25)] md:pt-[220px]"
      style={{ backgroundImage: `url(${card.image})` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.09) 33%, rgba(17,17,17,0.5) 100%)",
        }}
      />
      <div className="relative z-[1] flex flex-col items-center">
        <h3 className="text-center text-[28px] leading-none font-bold text-white">
          {card.title}
        </h3>
        <span
          className="mt-[12px] text-center text-[16px] leading-[1.5]"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {card.date}
        </span>
        <Link
          href={card.href}
          className="mt-[20px] inline-block rounded-[25px] border border-brand-primary bg-transparent px-[40px] py-[16px] text-[16px] leading-none font-medium uppercase whitespace-nowrap text-brand-primary transition-colors duration-300 hover:border-white hover:bg-white hover:text-brand-primary focus-visible:border-white focus-visible:bg-white focus-visible:text-brand-primary"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}

export function BlogSection() {
  const slides = cards.map((card) => <BlogSlide key={card.href} card={card} />);

  return (
    <section className="mt-[40px] mb-0 md:mt-[80px] md:mb-[100px]">
      <div className="niec-container flex flex-col gap-[30px]">
        <div className="flex flex-row gap-[30px]">
          <div className="flex flex-1 flex-col gap-[10px]">
            <h2 className="text-left text-[20px] leading-none font-medium text-niec-ink">
              Our Blog
            </h2>
            <h3 className="pb-[4px] text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[32px]">
              Insightful articles for studying abroad and test preparation
            </h3>
          </div>
          <div className="hidden flex-1 flex-col items-end justify-center md:flex">
            <Link
              href="/blogs/"
              className="inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white"
            >
              View More Articles
            </Link>
          </div>
        </div>

        <div className="rounded-[20px] max-md:px-[20px]">
          <Carousel
            slides={slides}
            perView={{ desktop: 3, tablet: 2, mobile: 1 }}
            gap={20}
            autoplayDelay={5000}
            speed={500}
            bullets
            bulletSize={7}
            bulletColor="#2563EB"
            inactiveBulletOpacity={0.2}
            paginationPosition="below"
            paginationOffset={20}
          />
        </div>

        <div className="flex justify-center md:hidden">
          <Link
            href="/blogs/"
            className="inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
