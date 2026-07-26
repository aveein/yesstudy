import type { CourseCard } from "@/types";

/**
 * Card copy verbatim from the "Our Classes" section of niec.edu.np.
 * The TOEFL slug (`/course/tofel/`) is misspelled upstream — kept as-is.
 *
 * Gradients are the source cards' own `linear-gradient(180deg, …)` values, EXCEPT
 * the first: that one was the source's brand orange, so it now carries the
 * re-themed brand accent gradient (primary #2563EB -> accent #8B5CF6). The other
 * five are decorative per-course colours and are deliberately left alone.
 */
const COURSES: CourseCard[] = [
  {
    title: "Toefl",
    body: "Our TOEFL Preparation classes stand out as the premier choice for achieving exceptional TOEFL scores",
    href: "/course/tofel/",
    gradient: "linear-gradient(180deg, #2563EB 0%, #8B5CF6 100%)",
  },
  {
    title: "ielts",
    body: "We offer the Best IELTS Preparation classes for achieving high IELTS scores",
    href: "/course/ielts/",
    gradient: "linear-gradient(180deg, #672767 0%, #CB87B7 100%)",
  },
  {
    title: "PTE-A",
    body: "Our PTE-A Preparation classes are tailored to ensure remarkable PTE-A scores",
    href: "/course/pte-a/",
    gradient: "linear-gradient(180deg, #566FA7 0%, #A6C0F8 100%)",
  },
  {
    title: "SAT",
    body: "Our SAT Preparation classes are designed to maximize your SAT scores",
    href: "/course/sat-1/",
    gradient: "linear-gradient(180deg, #216383 0%, #71BFBC 100%)",
  },
  {
    title: "GMAT",
    body: "Our GMAT Preparation classes are crafted to elevate your GMAT scores",
    href: "/course/gmat/",
    gradient: "linear-gradient(180deg, #B6325F 0%, #FF887C 100%)",
  },
  {
    title: "GRE",
    body: "Our GRE Preparation classes are meticulously designed to boost your GRE scores",
    href: "/course/gre/",
    gradient: "linear-gradient(180deg, #008CC1 0%, #50CFFF 100%)",
  },
];

export function OurClassesSection() {
  return (
    <section className="bg-niec-sky py-[100px]">
      <div className="niec-container flex flex-col gap-[30px]">
        <div className="flex flex-row gap-[30px]">
          <div className="flex w-full shrink-0 grow-0 flex-col gap-[10px] md:w-[60%]">
            <h2 className="text-start text-[20px] leading-[1] font-medium text-niec-ink">
              Our Classes
            </h2>
            <div className="pb-[4px]">
              <h3 className="text-start text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[32px]">
                Your gateway to global education with top-notch Test Preparation
              </h3>
            </div>
          </div>
          {/*
            The source cell declares `display:flex` without a direction, so
            Elementor's column default applies: `justify-center` centres the pill
            vertically and `items-end` pins it to the right edge. The pill is
            dropped below 768px with no mobile replacement.
          */}
          <div className="hidden flex-col items-end justify-center md:flex">
            <a
              href="/test-preparation/"
              className="inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-center text-[16px] leading-[1] font-medium text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-niec-white focus:bg-brand-primary focus:text-niec-white"
            >
              View More
            </a>
          </div>
        </div>

        {/*
          Two `1fr` rows equalise both rows to the tallest card; the grid keeps
          three columns at tablet and only collapses to one below 768px.
        */}
        <div className="grid grid-cols-1 grid-rows-[repeat(2,1fr)] gap-[30px] px-[20px] md:grid-cols-3 md:px-0">
          {COURSES.map((course) => (
            <article
              key={course.title}
              style={{ backgroundImage: course.gradient }}
              className="flex h-full flex-col items-center justify-center rounded-[20px] bg-transparent p-[40px] transition-shadow duration-300 hover:shadow-[0px_16px_30px_0px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-center text-[40px] leading-[1] font-bold text-niec-white uppercase">
                {course.title}
              </h3>
              <div className="my-[20px]">
                <p className="mb-[0.9rem] text-center text-[16px] leading-[1.2em] font-normal text-niec-white">
                  {course.body}
                </p>
              </div>
              <a
                href={course.href}
                className="inline-block rounded-[25px] border border-[#FFFFFF73] bg-transparent px-[40px] py-[16px] text-center text-[16px] leading-[1] font-medium text-niec-white uppercase transition-all duration-300 hover:border-niec-white hover:bg-niec-white hover:text-brand-primary focus:border-niec-white focus:bg-niec-white focus:text-brand-primary"
              >
                Read More
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
