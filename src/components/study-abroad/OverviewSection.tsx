import type { OverviewData } from "@/types/study-abroad";

export function OverviewSection({ overview }: { overview: OverviewData }) {
  return (
    <section id="overview" className="py-[60px] md:py-[80px]">
      <div className="niec-container">
        <h2 className="text-center text-[20px] font-medium leading-none text-niec-ink">
          {overview.eyebrow}
        </h2>
        <h3 className="mx-auto mt-[16px] max-w-[820px] text-center text-[32px] font-bold leading-[1.2] text-niec-ink md:text-[44px]">
          {overview.heading}
        </h3>

        <div className="mt-[24px]">
          {overview.intro.map((p, i) => (
            <p key={i} className="mt-[16px] text-[16px] leading-[1.6] text-niec-ink">
              {p}
            </p>
          ))}
        </div>

        {/* {overview.videoId ? (
          <div className="mt-[40px] overflow-hidden rounded-[20px]">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${overview.videoId}`}
                title="Overview video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null} */}

        <div className="mt-[40px]">
          {overview.closing.map((p, i) => (
            <p key={i} className="mt-[16px] text-[16px] leading-[1.6] text-niec-ink">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
