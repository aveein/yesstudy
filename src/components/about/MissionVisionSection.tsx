import Image from "next/image";

/**
 * Mirrored "Our Mission" / "Our Vision" blocks from /about/.
 *
 * Usage (the route renders this twice):
 *
 * <MissionVisionSection
 *   title="Our Mission"
 *   body="Our mission is to provide students with comprehensive support to achieve their academic and professional goals through high-quality test preparation and study abroad. programs."
 *   image={{
 *     src: "/images/about-our-mission.webp",
 *     alt: "Best Consultancy in Nepal for USA, UK, Australia, Canada, Ireland, New Zealand and Germany",
 *     width: 458,
 *     height: 384,
 *   }}
 *   imageSide="left"
 *   background="tint"
 * />
 *
 * <MissionVisionSection
 *   title="Our Vision"
 *   body="Our vision is to bring about the best possible outcome for each individual who chooses to obtain our services as well as contribute to society at large by establishing the best standards possible in all our endeavors."
 *   image={{
 *     src: "/images/about-our-vision.webp",
 *     alt: "",
 *     width: 499,
 *     height: 419,
 *   }}
 *   imageSide="right"
 *   background="white"
 * />
 */

interface MissionVisionImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface MissionVisionSectionProps {
  title: string;
  body: string;
  image: MissionVisionImage;
  imageSide: "left" | "right";
  background: "tint" | "white";
}

// p-[10px] is Elementor's default inner-container padding — absent from the per-section CSS
// but present on every column of the live page (measured 575px box → 555px content).
const columnClassName = "flex w-full flex-col gap-[30px] p-[10px] md:w-1/2";

export function MissionVisionSection({
  title,
  body,
  image,
  imageSide,
  background,
}: MissionVisionSectionProps) {
  const imageColumn = (
    <div className={columnClassName}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-[300px] w-full rounded-[21px] object-contain md:h-auto"
      />
    </div>
  );

  const textColumn = (
    <div className={columnClassName}>
      <h2 className="m-0 p-0 text-start text-[32px] leading-[1.3em] font-bold text-niec-ink">
        {title}
      </h2>
      <p className="mb-[0.9rem] text-[16px] leading-[1.5] text-niec-ink">
        {body}
      </p>
    </div>
  );

  return (
    <section
      className={`m-0 py-[40px] md:py-[60px] ${
        background === "tint" ? "bg-brand-tint" : "bg-niec-white"
      }`}
    >
      <div className="niec-container flex flex-col items-center gap-x-[50px] gap-y-[20px] md:flex-row">
        {imageSide === "left" ? (
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
    </section>
  );
}
