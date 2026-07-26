import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { CrownIcon, FileTextIcon, PaperPlaneIcon } from "@/components/icons";
import type { Benefit } from "@/types";

/** Benefit copy verbatim from the "Why choose us?" section of niec.edu.np. */
const BENEFITS: Benefit[] = [
  {
    title: "Expert Guidance",
    body: "At Yes Study, our team of experienced instructors and counsellors specializes in providing expert guidance not only for test preparation but also for achieving success in studying abroad. With years of expertise in both areas, we offer personalized support tailored to each student's needs, ensuring they are well-equipped to excel in their exams and pursue their dreams of studying abroad. If you are looking for the best IELTS, PTE, TOEFL, SAT, GRE, and GMAT classes in Kathmandu, Nepal, Yes Study could be the right place for you.",
    icon: "paper-plane",
  },
  {
    title: "Study Support",
    body: "We recognise the significance of effective study support in both test preparation and studying abroad. That's why, at Yes Study, we provide a wide array of study materials and resources to support our students on their journey. From practice tests and study guides for exam preparation to guidance on application procedures and visa requirements for studying abroad, we offer everything our students need to succeed in both endeavors.",
    icon: "file-alt",
  },
  {
    title: "Proven Track Record",
    body: "With over twenty six years of experience, Yes Study has established a proven track record in both test preparation and study abroad placements. Our commitment to student success is evident in the thousands of students who have passed through our doors and gone on to achieve their academic and career aspirations abroad. When you choose Yes Study, you're choosing a trusted partner for success in both test preparation and studying abroad. Thousands of students have found success through Yes Study's test preparation and study abroad services. If you're searching for the best consultancy in Nepal for USA, UK, Canada, Australia, Ireland, New Zealand, or Germany, Yes Study might be your next destination.",
    icon: "crown",
  },
];

/** The source renders each glyph as a bare inline SVG — `.elementor-icon` sizes it to 33px. */
const ICONS: Record<Benefit["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  "paper-plane": PaperPlaneIcon,
  "file-alt": FileTextIcon,
  crown: CrownIcon,
};

export function WhyChooseUsSection() {
  return (
    <section className="bg-transparent py-[100px]">
      <div className="niec-container flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[10px] py-[40px] md:py-0">
          <h2 className="text-center text-[20px] leading-none font-medium text-niec-ink">
            <a href="/about/services/" className="hover:text-brand-primary">
              Why choose us?
            </a>
          </h2>
          {/* Elementor insets this widget by 20% each side and pads 40px below it. */}
          <h3 className="mx-[20%] pb-[40px] text-center text-[32px] leading-[1.3em] font-bold text-niec-ink">
            Nepal’s Number One Educational Consultancy
          </h3>
          <div className="flex flex-col gap-[50px] md:flex-row md:items-center">
            <div className="md:min-w-0 md:flex-1">
              {/* Photo crop plus the blue, yellow and orange circles are baked into the source JPEG — no overlays. */}
              <Image
                src="/images/1193x795-website-banner-i.jpg"
                alt="Best IELTS Classes in Kathmandu - banner"
                width={682}
                height={1024}
                className="h-[300px] w-full rounded-[21px] object-cover object-center md:h-[650px]"
              />
            </div>
            <div className="flex flex-col gap-[50px] md:min-w-0 md:flex-1">
              {BENEFITS.map((benefit) => {
                const Icon = ICONS[benefit.icon];
                return (
                  <div
                    key={benefit.title}
                    className="flex flex-row items-start gap-[28px] text-start"
                  >
                    <span className="flex-none leading-[0]">
                      <Icon className="h-[33px] w-[33px] text-brand-secondary" />
                    </span>
                    <div className="w-full grow">
                      {/* `line-height: 0` is the source's own value — the glyph overflows the zero-height box. */}
                      <h3 className="mt-[8px] mb-[20px] text-[24px] leading-[0] font-bold text-niec-ink">
                        {benefit.title}
                      </h3>
                      <p className="m-0 text-[16px] leading-[1.5] text-niec-ink">
                        {benefit.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
