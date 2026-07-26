import {
  EnvelopeOutlineIcon,
  MapMarkerIcon,
  PhoneIcon,
} from "@/components/icons";
import { PRIMARY_OFFICE } from "@/data/offices";

const tileClassName =
  "flex-none rounded-[5px] bg-brand-tint p-[15px] leading-none text-brand-primary";

const iconClassName = "block h-[25px] w-[25px]";

const boxClassName = "flex flex-row items-center gap-[15px] text-start";

const textClassName = "text-[18px] leading-[1.5] font-medium text-niec-ink";

// p-[10px] is Elementor's default inner-container padding — absent from the per-section CSS
// but present on all three columns of the live page (measured 400px box → 380px content).
const columnClassName = "flex w-full flex-col p-[10px] md:w-[33.3333%]";

export function ContactInfoBar() {
  return (
    <>
      <section className="mt-[30px]">
        <div className="niec-container flex flex-row flex-wrap gap-0">
          <div className={columnClassName}>
            <div className={boxClassName}>
              <span className={tileClassName}>
                <MapMarkerIcon className={iconClassName} />
              </span>
              <p className={textClassName}>{PRIMARY_OFFICE.address}</p>
            </div>
          </div>

          <div className={columnClassName}>
            <div className={boxClassName}>
              <span className={tileClassName}>
                <PhoneIcon className={iconClassName} />
              </span>
              <p className={textClassName}>
                {PRIMARY_OFFICE.phones.map((phone, index) => (
                  <span key={phone.href}>
                    {index > 0 && <br />}
                    <a
                      href={`tel:${phone.href}`}
                      className="hover:text-brand-primary"
                    >
                      {phone.display}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className={columnClassName}>
            <div className={boxClassName}>
              <span className={tileClassName}>
                <EnvelopeOutlineIcon className={iconClassName} />
              </span>
              <p className={textClassName}>
                <a
                  href={`mailto:${PRIMARY_OFFICE.email}`}
                  className="hover:text-brand-primary"
                >
                  {PRIMARY_OFFICE.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="niec-container flex flex-row flex-wrap gap-0">
          <div className="flex w-full flex-col">
            <div className="py-[10px]">
              <hr className="w-full border-0 border-t-2 border-brand-tint" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
