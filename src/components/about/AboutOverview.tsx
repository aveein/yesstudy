const OVERVIEW_PARAGRAPH =
  "Once the students have sat for their final exam at various local testing centers in Kathmandu, Yes Study counsels prospective students for their higher education in foreign countries. To select the right college and university for a Nepali student is very difficult, but well-trained counselors provide all the necessary information about colleges and universities and the lengthy processing system for the student visa application in various embassies.";

const proseColumnClassName =
  // p-[10px] is Elementor's default inner-container padding — it is not in the per-section
  // CSS but every half-width column on the live page carries it (text measures 565px, not 585px).
  "flex w-full flex-col p-[10px] text-[16px] leading-[1.5] text-niec-ink md:w-[50%] [&>p]:mb-[14.4px]";

export function AboutOverview() {
  return (
    <>
      <section className="m-0 flex flex-col items-start pt-[40px] pb-0 md:pt-[60px] md:pb-[30px]">
        <div className="niec-container">
          <div className="flex flex-row justify-center px-[40px] pb-[20px]">
            <div className="m-0 flex w-full shrink-0 grow-0 flex-col items-center gap-[30px] p-0 md:w-[70%]">
              <h2 className="m-0 p-0 text-[20px] leading-none font-medium text-niec-ink">
                Overview
              </h2>
              <div className="m-0 px-0 pt-0 pb-[4px]">
                <h3 className="text-center text-[28px] leading-[1.3em] font-bold text-niec-ink md:text-[45px]">
                  WHO WE ARE
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="niec-container flex flex-col gap-x-[30px] gap-y-[15px] md:flex-row">
          <div className={proseColumnClassName}>
            <p>{OVERVIEW_PARAGRAPH}</p>
            <p>
              Yes Study&rsquo;s student counselors undergo an intensive training
              before they are delegated to provide any information on colleges
              or universities in the USA, UK, Australia, New Zealand, Ireland,
              Canada.
            </p>
          </div>

          <div className={proseColumnClassName}>
            <p>{OVERVIEW_PARAGRAPH}</p>
          </div>
        </div>
      </section>
    </>
  );
}
