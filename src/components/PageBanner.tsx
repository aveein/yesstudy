import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
  /**
   * Large sub-heading rendered under the title. Used only by `/about/ceos-message/`
   * (Elementor `99acf0e`), whose page-local banner stacks a 32px title over a 50px name —
   * the shared template `2866` banner has no subtitle and keeps its title at 40px.
   */
  subtitle?: string;
}

export function PageBanner({ title, breadcrumb, subtitle }: PageBannerProps) {
  return (
    <section
      className="flex flex-col bg-center bg-cover bg-no-repeat px-[20px] py-[50px] md:px-0 md:py-[80px]"
      style={{ backgroundImage: "url(/images/header-bg.png)" }}
    >
      <div className="mx-auto flex w-full flex-col gap-[30px] md:max-w-[700px]">
        <h1
          className={`m-0 p-0 text-center leading-none font-bold text-niec-ink ${
            subtitle ? "text-[32px]" : "text-[40px]"
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <h2 className="m-0 p-0 text-center text-[50px] leading-none font-bold text-niec-ink">
            {subtitle}
          </h2>
        )}

        <ul className="-mx-[2.5px] flex flex-wrap justify-center text-[16px] font-normal text-niec-ink">
          <li className="mx-[2.5px]">
            <Link
              href="/"
              className="text-niec-ink transition-colors duration-300 hover:text-brand-primary"
            >
              Home
            </Link>
          </li>
          <li className="mx-[2.5px]">
            <span>{`/ ${breadcrumb}`}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
