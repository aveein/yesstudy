import Image from "next/image";
import type { Chapter, ChapterBlock } from "@/types/study-abroad";

function renderBlock(block: ChapterBlock, i: number) {
  switch (block.kind) {
    case "prose":
      return (
        <div key={i} className="space-y-[12px]">
          {block.paragraphs.map((p, j) => (
            <p key={j} className="text-[16px] leading-[1.6] text-niec-ink">
              {p}
            </p>
          ))}
        </div>
      );
    case "imagebox":
      return (
        <div
          key={i}
          className="flex flex-col gap-[20px] sm:flex-row sm:items-start"
        >
          {block.image && (
            <Image
              src={block.image}
              alt={block.title}
              width={300}
              height={220}
              className="w-full sm:w-[40%] shrink-0 h-auto rounded-[8px] object-cover"
            />
          )}
          <div>
            <h3 className="text-[24px] font-bold leading-[1.3] text-niec-ink">
              {block.title}
            </h3>
            <p className="mt-[10px] text-[16px] leading-[1.6] text-niec-ink">
              {block.text}
            </p>
          </div>
        </div>
      );
    case "image":
      return (
        block.image && (
          <Image
            key={i}
            src={block.image}
            alt={block.alt}
            width={800}
            height={400}
            className="w-full h-auto rounded-[12px] object-cover"
          />
        )
      );
    case "heading":
      return (
        <h4
          key={i}
          className="text-[20px] font-bold leading-[1.3] text-niec-ink"
        >
          {block.text}
        </h4>
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export function ChapterSection({ chapter }: { chapter: Chapter }) {
  return (
    <section className="bg-brand-tint py-[60px] md:py-[80px]">
      <div className="niec-container flex flex-col gap-[50px]">
        <div className="flex items-center gap-[24px]">
          <div className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full bg-brand-primary text-[40px] font-bold leading-none text-niec-white">
            {chapter.number}
          </div>
          <h2 className="text-[32px] md:text-[45px] font-bold leading-[1.1] text-niec-ink">
            {chapter.title}
          </h2>
        </div>

        {chapter.groups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-[30px] md:flex-row">
            <div className="md:w-[30%] shrink-0">
              <div className="md:sticky md:top-[90px] self-start">
                <h3 className="text-[28px] md:text-[32px] font-bold leading-[1.2em] text-niec-ink">
                  {group.label}
                </h3>
                <div className="mt-[8px] h-[2px] w-full bg-brand-primary" />
              </div>
            </div>
            <div className="md:w-[70%] flex flex-col gap-[24px]">
              {group.blocks.map((block, i) => renderBlock(block, i))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
