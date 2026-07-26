import Link from "next/link";
import { Carousel } from "@/components/ui/carousel";

interface CareerCard {
  title: string;
  body: string;
  href: string;
  photo: string;
}

const cards: CareerCard[] = [
  {
    title: "Cybersecurity",
    body: "Cybersecurity protects digital systems, prevents cyber threats, ensures data privacy, and safeguards organizations in a connected world.",
    href: "/careers/cybersecurity/",
    photo: "/images/cyber-security.png",
  },
  {
    title: "Agriculture & Food Science",
    body: "Agriculture and food science advance sustainable farming, enhance nutrition, improve food security, and drive innovation in production.",
    href: "/careers/agriculture-food-science/",
    photo: "/images/agriulture-and-food-science.png",
  },
  {
    title: "Early Childhood Education",
    body: "Early childhood education nurtures young minds, fostering learning, social skills, creativity, and emotional development for lifelong success.",
    href: "/careers/early-childhood-education/",
    photo: "/images/early-childhood.png",
  },
  {
    title: "Public Health Education",
    body: "Public health education promotes awareness, healthy behaviors, and disease prevention, improving individual and community well-being worldwide.",
    href: "/careers/public-health-education/",
    photo: "/images/public-health.png",
  },
  {
    title: "Finance and Accounting",
    body: "By 2026, finance evolves from bookkeeping to strategic leadership, leveraging AI, analytics, and global insights to guide decisions worldwide.",
    href: "/careers/finance-and-accounting/",
    photo: "/images/fiananceaccoun.jpg",
  },
  {
    title: "Nursing",
    body: "Nursing delivers compassionate care, promotes health, supports patients, and advances medical knowledge through clinical expertise and advocacy.",
    href: "/careers/nursing/",
    photo: "/images/nursing.png",
  },
];

const pillClassName =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white";

function CareerSlide({ card }: { card: CareerCard }) {
  return (
    <div
      className="flex h-full flex-row gap-[30px] mt-[20px] rounded-[20px] p-[5px] bg-niec-white transition-shadow duration-300 hover:shadow-[0px_16px_30px_0px_rgba(0,0,0,0.25)]"
      style={{
        backgroundImage: `url(${card.photo})`,
        backgroundSize: "contain",
        backgroundPosition: "100% 0",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full shrink-0 grow-0 flex-col pt-[80px] pr-0 pb-[30px] pl-[15px] md:w-[55%] md:pt-[120px] md:pb-[40px] md:pl-[20px]">
        <h3
          className="mb-[16px] text-[30px] leading-none font-bold text-niec-ink md:text-[40px]"
          style={{ textShadow: "2px 2px 6px rgba(255,255,255,0.76)" }}
        >
          {card.title}
        </h3>
        <p
          className="mb-[14.4px] text-[16px] leading-[1.5] text-niec-ink"
          style={{ textShadow: "2px 2px 6px rgba(255,255,255,0.57)" }}
        >
          {card.body}
        </p>
        <div>
          <Link
            href={card.href}
            className="inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[15px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white"
          >
            READ MORE
          </Link>
        </div>
      </div>
      <div className="w-[40%] md:w-[50%]" />
    </div>
  );
}

export function CareerPathSection() {
  const slides = cards.map((card) => <CareerSlide key={card.title} card={card} />);

  return (
    <>
      <section className="bg-brand-tint pt-[100px]">
        <div className="niec-container flex flex-col gap-[30px]">
          <div className="flex flex-row gap-[30px]">
            <div className="flex w-[60%] shrink-0 grow-0 flex-col">
              <h3 className="pb-[4px] text-[32px] leading-[1.3em] font-bold text-niec-ink">
                Choose your career path
              </h3>
            </div>
            <div className="hidden flex-col items-end justify-center md:flex md:flex-1">
              <Link href="#" className={pillClassName}>
                View More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-tint px-[40px] pt-[40px] pb-[60px]">
        <Carousel
          slides={slides}
          perView={{ desktop: 3, tablet: 2, mobile: 1 }}
          gap={30}
          autoplayDelay={5000}
          speed={500}
          bullets
          bulletSize={7}
          bulletColor="#2563EB"
          inactiveBulletOpacity={0.2}
          paginationPosition="below"
          paginationOffset={20}
        />
        <div className="flex justify-center md:hidden">
          <Link href="#" className={pillClassName}>
            View More
          </Link>
        </div>
      </section>
    </>
  );
}
