import Image from "next/image";
import { Carousel } from "@/components/ui/carousel";
import type { ShapeData } from "@/types/study-abroad";

export function ShapeYourFuture({ shape }: { shape: ShapeData }) {
  return (
    <section className="bg-niec-sky py-[80px]">
      <div className="niec-container">
        <div className="flex flex-col gap-[40px] lg:flex-row lg:items-center">
          <div className="lg:w-[50%]">
            {shape.visa.length > 0 && (
              <Carousel
                arrows
                perView={{ desktop: 1, tablet: 1, mobile: 1 }}
                gap={20}
                autoplayDelay={4000}
                speed={500}
                bullets={false}
                slides={shape.visa.map((v) => (
                  <div key={v.image} className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px]">
                    <Image
                      src={v.image}
                      alt={v.alt || "Visa granted"}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              />
            )}
          </div>

          <div className="lg:w-[50%]">
            <h2 className="text-[32px] font-bold leading-[1.2] text-niec-ink md:text-[40px]">
              {shape.heading}
            </h2>
            {shape.sub && (
              <p className="mt-[12px] text-[18px] font-bold text-niec-ink">{shape.sub}</p>
            )}
            {shape.body.map((p, i) => (
              <p key={i} className="mt-[12px] text-[16px] leading-[1.6] text-niec-ink">
                {p}
              </p>
            ))}

            <form method="dialog" className="mt-[24px] flex flex-col gap-[16px]">
              <input
                className="w-full rounded-[8px] border border-[#ddd] bg-niec-white px-[20px] py-[16px] text-[16px] text-niec-ink outline-none focus:border-brand-primary"
                placeholder="Name"
                aria-label="Name"
              />
              <input
                type="email"
                className="w-full rounded-[8px] border border-[#ddd] bg-niec-white px-[20px] py-[16px] text-[16px] text-niec-ink outline-none focus:border-brand-primary"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                type="tel"
                className="w-full rounded-[8px] border border-[#ddd] bg-niec-white px-[20px] py-[16px] text-[16px] text-niec-ink outline-none focus:border-brand-primary"
                placeholder="Contact Number"
                aria-label="Contact Number"
              />
              <button
                type="submit"
                className="mt-[8px] rounded-[8px] bg-brand-primary px-[24px] py-[16px] text-[16px] font-medium text-niec-white transition-colors duration-300 hover:bg-niec-ink"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
