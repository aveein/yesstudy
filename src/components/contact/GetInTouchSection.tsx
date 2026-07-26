import Link from "next/link";

import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons";
import { OFFICES, PRIMARY_OFFICE } from "@/data/offices";

// Shared box geometry. Font size is deliberately NOT set here: the text inputs render at
// 18px/1.4 on the live site but the native <select> renders at 16px/24px, and two competing
// `text-[…]` utilities in one class string resolve by CSS order, not string order.
const fieldClassName =
  "w-full min-h-[59px] rounded-[10px] border border-[#69727d] bg-white px-[20px] py-[7px] text-[#1f2124] placeholder:text-inherit placeholder:opacity-60 outline-none focus:outline-0 focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]";

const textFieldClassName = `${fieldClassName} text-[18px] leading-[1.4]`;

const selectClassName = `${fieldClassName} appearance-none pr-[46px] text-[16px] leading-[24px]`;

const locations = OFFICES.map((office) => office.shortName);

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  PRIMARY_OFFICE.mapQuery,
)}&t=m&z=16&output=embed&iwloc=near`;

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/YESSTUDYNEPAL/",
    background: "bg-[#3b5998]",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "http://instagram.com/",
    background: "bg-[#262626]",
    Icon: InstagramIcon,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com",
    background: "bg-[#cd201f]",
    Icon: YoutubeIcon,
  },
];

export function GetInTouchSection() {
  return (
    <section>
      <div className="niec-container flex flex-row flex-wrap gap-x-[30px] gap-y-[20px]">
        <div className="flex w-full flex-col gap-[30px] p-[10px] md:w-[calc(50%-15px)]">
          <h2 className="m-0 p-0 text-[32px] leading-none font-bold text-niec-ink">
            Get In Touch
          </h2>

          <form method="dialog" noValidate className="flex flex-col gap-[20px]">
            <div>
              <label htmlFor="get-in-touch-name" className="sr-only">
                Name
              </label>
              <input
                id="get-in-touch-name"
                type="text"
                placeholder="Name"
                className={textFieldClassName}
              />
            </div>

            <div>
              <label htmlFor="get-in-touch-email" className="sr-only">
                Email
              </label>
              <input
                id="get-in-touch-email"
                type="email"
                required
                placeholder="Email"
                className={textFieldClassName}
              />
            </div>

            <div>
              <label htmlFor="get-in-touch-contact" className="sr-only">
                Contact Number
              </label>
              <input
                id="get-in-touch-contact"
                type="tel"
                placeholder="Contact Number"
                className={textFieldClassName}
              />
            </div>

            <div className="relative">
              <label htmlFor="get-in-touch-location" className="sr-only">
                Location
              </label>
              <select
                id="get-in-touch-location"
                defaultValue={PRIMARY_OFFICE.shortName}
                // The native <select> renders at 16px/24px on the live site, not the
                // 18px/1.4 the text inputs get — verified with getComputedStyle.
                className={selectClassName}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 571.4 571.4"
                fill="currentColor"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-[20px] size-[14px] -translate-y-1/2 text-[#1f2124]"
              >
                <path d="M571 393Q571 407 561 418L311 668Q300 679 286 679T261 668L11 418Q0 407 0 393T11 368 36 357H536Q550 357 561 368T571 393Z" />
              </svg>
            </div>

            <div className="flex items-start gap-[8px]">
              <input
                id="get-in-touch-acceptance"
                type="checkbox"
                defaultChecked
                required
                className="mt-[4px]"
              />
              <label
                htmlFor="get-in-touch-acceptance"
                className="text-[16px] text-niec-ink"
              >
                By clicking the send button you agree to our{" "}
                <Link href="/privacy-policy" className="text-brand-primary">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                // 15px, not the kit's nominal 16px — the live button measures 15px/15px (41px tall).
                className="inline-block w-auto rounded-[100px] border border-brand-primary bg-brand-primary px-[50px] py-[12px] text-[15px] leading-none text-niec-white transition-all duration-300 hover:bg-transparent hover:text-brand-primary"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        <div className="flex w-full flex-col gap-[30px] p-[10px] md:w-[calc(50%-15px)]">
          <div className="overflow-hidden leading-none">
            <iframe
              src={mapSrc}
              title={PRIMARY_OFFICE.name}
              aria-label={PRIMARY_OFFICE.name}
              loading="lazy"
              className="h-[300px] w-full border-0"
            />
          </div>

          <h4 className="m-0 text-[24px] leading-none font-bold text-niec-ink">
            Follow us on
          </h4>

          <div className="flex flex-row flex-wrap items-center gap-x-[8px] gap-y-0">
            {socials.map(({ label, href, background, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="nofollow noreferrer"
                className={`flex size-[30px] items-center justify-center rounded-[30px] ${background}`}
              >
                <span className="sr-only">{label}</span>
                <Icon className="size-[15px] text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
