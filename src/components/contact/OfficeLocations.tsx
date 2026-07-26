import {
  EnvelopeOutlineIcon,
  MapMarkerIcon,
  PhoneIcon,
} from "@/components/icons";
import { OFFICES } from "@/data/offices";

/**
 * Full contact details for every Yes Study office, driven by `@/data/offices`.
 * Reuses the icon-tile treatment of the contact bar so the two read as one block.
 */

const tileClassName =
  "flex-none rounded-[5px] bg-brand-tint p-[10px] leading-none text-brand-primary";

const iconClassName = "block h-[18px] w-[18px]";

const rowClassName = "flex flex-row items-start gap-[12px] text-start";

const textClassName = "text-[16px] leading-[1.5] font-medium text-niec-ink";

const linkClassName = `${textClassName} transition-colors duration-300 hover:text-brand-primary`;

export function OfficeLocations() {
  return (
    <section className="mt-[60px]">
      <div className="niec-container flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-center text-[20px] font-normal text-brand-primary lg:text-start">
            Our Offices
          </h2>
          <p className="text-center text-[32px] leading-[1.2em] font-bold text-niec-ink lg:text-start">
            Come say hello at any of our offices
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((office) => (
            <div
              key={office.name}
              className="flex flex-col gap-[15px] rounded-[20px] border border-[#DFDFDF] p-[25px]"
            >
              <div className="flex flex-col gap-[4px]">
                <h3 className="text-[20px] leading-[1.3] font-bold text-niec-ink">
                  {office.name}
                </h3>
                {office.legalName && (
                  <p className="text-[14px] font-normal text-niec-ink/60">
                    {office.legalName}
                  </p>
                )}
              </div>

              <div className={rowClassName}>
                <span className={tileClassName}>
                  <MapMarkerIcon className={iconClassName} />
                </span>
                <p className={textClassName}>{office.address}</p>
              </div>

              <div className={rowClassName}>
                <span className={tileClassName}>
                  <PhoneIcon className={iconClassName} />
                </span>
                <p className={textClassName}>
                  {office.phones.map((phone, index) => (
                    <span key={phone.href}>
                      {index > 0 && <br />}
                      <a href={`tel:${phone.href}`} className={linkClassName}>
                        {phone.display}
                      </a>
                    </span>
                  ))}
                </p>
              </div>

              <div className={rowClassName}>
                <span className={tileClassName}>
                  <EnvelopeOutlineIcon className={iconClassName} />
                </span>
                <p className={`${textClassName} break-all`}>
                  <a href={`mailto:${office.email}`} className={linkClassName}>
                    {office.email}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
