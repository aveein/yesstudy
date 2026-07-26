import Image from "next/image";
import type { EventItem } from "@/types";

/** The featured card renders image, venue and organiser, so those are required. */
type FeaturedEvent = EventItem &
  Required<Pick<EventItem, "image" | "venue" | "organiser">>;

/** Event copy verbatim from the "Latest Events" section of niec.edu.np. */
const FEATURED_EVENT: FeaturedEvent = {
  title: "Europe Discovery Day July 17, 2026",
  href: "/events/europe-discovery-day-july-17-2026/",
  day: "17",
  month: "July",
  image: "/images/europe-discover-niec.jpg",
  venue:
    "VENUE: Yes Study 4th & 5th Floor Share Market Complex, Putalisadak, Kathmandu",
  organiser: "ORGANISER: Yes Study",
};

/** Copy verbatim from niec.edu.np. The second entry genuinely has no day number. */
const MINI_EVENTS: EventItem[] = [
  {
    title: "UK Admission Day July 15, 2026",
    href: "/events/uk-admission-day-july-15-2026/",
    day: "15",
    month: "July",
  },
  {
    title: "Your Study Abroad Journey Starts LIVE!",
    href: "/events/your-study-abroad-journey-starts-live/",
    day: "",
    month: "Sun",
  },
  {
    title: "Yes Study Global Study & Scholarship Day!",
    href: "/events/niec-global-study-scholarship-day/",
    day: "12",
    month: "June",
  },
];

const EVENTS_ARCHIVE_HREF = "/events/";

/** Outlined orange pill shared by the desktop and mobile "View More" links. */
const OUTLINE_PILL =
  "inline-block rounded-[100px] border border-brand-primary bg-transparent px-[24px] py-[12px] text-[16px] leading-none font-medium text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-niec-white focus-visible:bg-brand-primary focus-visible:text-niec-white";

/** Venue + organiser share the source's `custom_field` hover behaviour. */
const CUSTOM_FIELD =
  "text-[15px] leading-[1.3em] font-normal text-niec-ink transition duration-300 group-hover:text-niec-white group-hover:opacity-70";

export function LatestEventsSection() {
  return (
    <section className="my-[40px] bg-transparent py-[100px] md:my-0">
      <div className="niec-container flex flex-col gap-[30px]">
        {/* Header row: 55% heading column + right-aligned, vertically centred CTA. */}
        <div className="flex flex-row gap-[30px]">
          <div className="flex w-full shrink-0 grow-0 flex-col gap-[10px] md:w-[55%]">
            <h3 className="text-start text-[20px] leading-none font-medium text-niec-ink">
              Latest Events
            </h3>
            <div className="pb-[4px]">
              <h3 className="text-start text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[32px]">
                Check out our latest educational events we run across Nepal
              </h3>
            </div>
          </div>
          {/* Elementor default flex-direction is column, so justify-center centres
              vertically and items-end pins the pill to the container's right edge. */}
          <div className="hidden flex-col items-end justify-center md:flex md:flex-1">
            <a href={EVENTS_ARCHIVE_HREF} className={OUTLINE_PILL}>
              View More
            </a>
          </div>
        </div>

        {/* Content row: featured card + stacked mini cards. */}
        <div className="flex flex-col gap-[30px] md:flex-row">
          {/* The source column is `flex-direction: row` with gap 0, so its single
              card is sized to fit-content — it shrink-wraps to the venue line
              (~577px) rather than filling the 55.974% column. Verified against
              the reference screenshot, where the card ends well left of the gap. */}
          <div className="flex w-full shrink-0 grow-0 flex-row gap-0 md:w-1/2 lg:w-[55.974%]">
            <article className="group relative flex flex-col overflow-hidden rounded-[15px] bg-niec-offwhite transition-[background-color,box-shadow] duration-300 hover:bg-brand-primary hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]">
              <Image
                src={FEATURED_EVENT.image}
                alt="Europe Discover - Yes Study 2026"
                width={1024}
                height={536}
                className="h-[280px] w-full object-cover object-center"
              />
              {/* Date badge stays white with orange text even while the card is hovered. */}
              <div className="absolute top-[15px] left-[15px] flex min-h-[40px] w-[75px] flex-col items-center justify-center rounded-[10px] bg-niec-white p-[10px]">
                <p className="text-center text-[15px] leading-[1.2em] font-medium tracking-[1.5px] text-brand-primary uppercase">
                  {FEATURED_EVENT.month} {FEATURED_EVENT.day}
                </p>
              </div>
              <div className="flex flex-col gap-[10px] p-[30px]">
                <div className="pb-[4px]">
                  <h3 className="text-start text-[28px] leading-[1.2em] font-bold text-niec-ink transition-colors duration-300 group-hover:text-niec-white md:text-[22px]">
                    {FEATURED_EVENT.title}
                  </h3>
                </div>
                <p className={CUSTOM_FIELD}>{FEATURED_EVENT.venue}</p>
                <p className={CUSTOM_FIELD}>{FEATURED_EVENT.organiser}</p>
                <div className="mt-[20px]">
                  <a
                    href={FEATURED_EVENT.href}
                    className="inline-block rounded-[100px] border border-niec-white bg-niec-white px-[40px] py-[20px] text-[16px] leading-none font-medium text-brand-primary transition-colors duration-300 hover:border-niec-white hover:bg-transparent hover:text-niec-white focus-visible:border-niec-white focus-visible:bg-transparent focus-visible:text-niec-white"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="flex w-full flex-col gap-[30px] md:min-w-0 md:flex-1">
            {MINI_EVENTS.map((event) => (
              <article
                key={event.href}
                className="flex flex-row items-center gap-[18px] rounded-[20px] bg-brand-tint p-[20px]"
              >
                <div className="flex w-[30%] shrink-0 grow-0 flex-col gap-[30px] rounded-[20px] bg-niec-white px-[10px] py-[30px] shadow-[0px_1px_5px_0px_rgba(252,110,31,0.145)] md:w-[100.212px]">
                  {/* `leading-[0]` is the source's own value: the glyph overflows a
                      zero-height line box, which is why day and month sit so tightly. */}
                  {event.day ? (
                    <p className="mt-[10px] text-center text-[36px] leading-[0] font-medium text-brand-primary">
                      {event.day}
                    </p>
                  ) : null}
                  <p className="text-center text-[18px] leading-[1.2em] font-medium tracking-[1.5px] text-brand-primary uppercase">
                    {event.month}
                  </p>
                </div>
                <div className="flex w-[60%] flex-col md:w-[66.6666%]">
                  <h4 className="text-[24px] leading-[1.3em] font-medium text-niec-ink">
                    <a
                      href={event.href}
                      className="transition-colors duration-300 hover:text-brand-primary"
                    >
                      {event.title}
                    </a>
                  </h4>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile-only duplicate of the header CTA. */}
        <div className="flex justify-center md:hidden">
          <a href={EVENTS_ARCHIVE_HREF} className={OUTLINE_PILL}>
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
