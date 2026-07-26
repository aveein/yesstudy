import Image from "next/image";
import type { CeoMessageBlockData, TextRun } from "@/types/ceos-message";

/**
 * Tailwind needs literal class strings, so the data-driven percentages and gaps are mapped
 * to a fixed set here. These are the only values the source uses (`--width` at >=768px and
 * `--column-gap`); a new value in the JSON would need a new entry.
 */
const WIDTH_CLASS: Record<number, string> = {
  40: "md:w-[40%]",
  60: "md:w-[60%]",
  70: "md:w-[70%]",
};
const GAP_CLASS: Record<number, string> = {
  40: "md:gap-x-[40px]",
  50: "md:gap-x-[50px]",
};
const PADDING_Y_CLASS: Record<number, string> = {
  10: "py-[10px]",
  40: "py-[40px]",
  60: "py-[60px]",
};

function Paragraphs({ paragraphs }: { paragraphs: TextRun[][] }) {
  return (
    <>
      {paragraphs.map((runs, i) => (
        <p key={i} className="mb-[14.4px] text-[16px] leading-[1.5] text-niec-ink">
          {runs.map((run, j) =>
            run.bold ? (
              <strong key={j} className="font-bold">
                {run.text}
              </strong>
            ) : (
              <span key={j}>{run.text}</span>
            ),
          )}
        </p>
      ))}
    </>
  );
}

/**
 * One prose block of `/about/ceos-message/` (Elementor page `5973`).
 *
 * Three layouts: `image-left`, `image-right`, and `quote` (a 6px left rule, no image).
 *
 * The column percentages are declared, not computed: block 1's `40% + 70%` deliberately
 * overflows and flex-shrink resolves it to 418.906px / 731.094px at a 1200px container.
 * Declaring the percentages inside a `md:flex-nowrap` row reproduces that exactly — do not
 * substitute the measured pixel values.
 *
 * Spec: docs/research/components/ceo-message-blocks.spec.md
 */
export function CeoMessageBlock({ block }: { block: CeoMessageBlockData }) {
  const paddingY = PADDING_Y_CLASS[block.paddingY] ?? "py-[10px]";
  const bg = block.background === "sky" ? "bg-niec-sky" : "";

  if (block.layout === "quote") {
    return (
      <section className={`px-[40px] ${bg}`}>
        <div className={`mx-auto w-full ${paddingY} md:max-w-[800px]`}>
          {/* `border-color` is not declared upstream, so it resolves to currentColor (#111). */}
          <div className="border-l-[6px] border-niec-ink p-[40px]">
            <Paragraphs paragraphs={block.paragraphs} />
          </div>
        </div>
      </section>
    );
  }

  const [firstWidth, secondWidth] = block.columns ?? [50, 50];
  const imageIsFirst = block.layout === "image-left";
  const imageWidth = imageIsFirst ? firstWidth : secondWidth;
  const textWidth = imageIsFirst ? secondWidth : firstWidth;

  const imageColumn = block.image ? (
    <div className={`w-full p-[10px] ${WIDTH_CLASS[imageWidth] ?? ""}`}>
      <Image
        src={block.image.src}
        alt={block.image.alt}
        width={block.image.width ?? 370}
        height={block.image.height ?? 532}
        className="h-auto w-full"
      />
    </div>
  ) : null;

  const textColumn = (
    <div
      className={`flex w-full flex-col gap-[30px] p-[10px] ${WIDTH_CLASS[textWidth] ?? ""}`}
    >
      <div>
        <Paragraphs paragraphs={block.paragraphs} />
      </div>
    </div>
  );

  return (
    <section
      className={bg}
      style={block.marginY ? { marginTop: block.marginY, marginBottom: block.marginY } : undefined}
    >
      <div className="niec-container">
        <div
          className={`flex flex-wrap items-center gap-y-[20px] ${paddingY} ${GAP_CLASS[block.gap ?? 40] ?? ""} md:flex-nowrap`}
        >
          {imageIsFirst ? (
            <>
              {imageColumn}
              {textColumn}
            </>
          ) : (
            <>
              {textColumn}
              {imageColumn}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
