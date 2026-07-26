import Link from "next/link";

const PILL =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium whitespace-nowrap text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white";

export function VideoSection() {
  return (
    <section className="mt-[40px] mb-0 md:mt-[80px] md:mb-[100px]">
      <div className="niec-container flex flex-col gap-[30px]">
        <div className="flex flex-row gap-[30px]">
          <div className="flex flex-1 flex-col gap-[10px]">
            <h2 className="text-start text-[20px] leading-none font-medium text-niec-ink">
              Our Video
            </h2>
            <h3 className="pb-[4px] text-start text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[32px]">
              Discover expert tips, student experiences, and study abroad guides
            </h3>
          </div>
          <div className="hidden flex-1 flex-col items-end justify-center md:flex">
            <Link
              href="https://www.youtube.com/user/niecktm"
              target="_blank"
              rel="nofollow"
              className={PILL}
            >
              View More Videos
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[20px] max-md:mx-[20px]">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/Q8EzK0erSyE"
              title="Our Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <Link
            href="https://www.youtube.com/@niecktm"
            target="_blank"
            rel="nofollow"
            className={PILL}
          >
            View More Videos
          </Link>
        </div>
      </div>
    </section>
  );
}
