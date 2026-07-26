"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/study-abroad";

export function FaqAccordion({
  heading,
  items,
}: {
  heading: string;
  items: FaqItem[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-[60px] md:py-[80px]">
      <div className="niec-container">
        <h2 className="text-center text-[32px] md:text-[40px] font-bold leading-[1.2] text-niec-ink">
          {heading}
        </h2>

        <div className="mt-[40px] mx-auto max-w-[900px] flex flex-col gap-[16px]">
          {items.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[12px] border border-[#eee] bg-niec-white"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-[16px] px-[24px] py-[20px] text-left text-[18px] font-medium text-niec-ink"
              >
                <span>{item.question}</span>
                <span
                  className={`shrink-0 text-brand-primary transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {open === i && (
                <div className="px-[24px] pb-[20px] text-[16px] leading-[1.6] text-niec-ink">
                  {item.answer.map((p, j) => (
                    <p key={j} className={j > 0 ? "mt-[12px]" : ""}>
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
