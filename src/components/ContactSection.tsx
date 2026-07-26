import Image from "next/image";
import Link from "next/link";

const fieldClassName =
  "w-full rounded-[4px] border-0 bg-white px-[14px] py-[8px] text-[15px] font-semibold leading-[1.4] text-niec-ink placeholder:font-semibold placeholder:text-niec-ink/70 min-h-[40px] outline-none focus:ring-2 focus:ring-brand-primary/30";

export function ContactSection() {
  return (
    <section
      className="mt-[100px] pb-[100px]"
      style={{
        backgroundImage: "url(/images/contact-form-background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="niec-container flex flex-col items-center gap-[20px]">
        <div className="mt-[-99px] w-full flex justify-center">
          <Image
            src="/images/contact-form-image.webp"
            alt="Best Consultancy in Nepal"
            width={1170}
            height={245}
            className="w-[800px] max-w-full h-auto"
          />
        </div>

        <h2 className="pt-[50px] text-center text-[20px] leading-none font-normal text-niec-ink">
          Contact Us
        </h2>

        <p className="max-w-[85.856%] pb-[4px] text-center text-[32px] leading-[1.2em] font-bold text-niec-ink">
          Ready to get started or have any questions? Get in touch.
        </p>

        <form method="dialog" className="w-full max-w-[645px]" noValidate>
          <div className="mb-[15px]">
            <label htmlFor="contact-name" className="sr-only">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Name"
              className={fieldClassName}
            />
          </div>

          <div className="mb-[15px]">
            <label htmlFor="contact-number" className="sr-only">
              Contact
            </label>
            <input
              id="contact-number"
              type="tel"
              placeholder="Contact number"
              className={fieldClassName}
            />
          </div>

          <div className="mb-[15px]">
            <label htmlFor="contact-email" className="sr-only">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="Email"
              className={fieldClassName}
            />
          </div>

          <div className="mb-[15px]">
            <label htmlFor="contact-country" className="sr-only">
              Country you are interested in
            </label>
            <input
              id="contact-country"
              type="text"
              placeholder="Country you are interested in"
              className={fieldClassName}
            />
          </div>

          <div className="mb-[15px]">
            <label htmlFor="contact-course" className="sr-only">
              Course you are interested in
            </label>
            <input
              id="contact-course"
              type="text"
              placeholder="Course you are interested in"
              className={fieldClassName}
            />
          </div>

          <div className="mb-[15px]">
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Leave a tiny description about your interest"
              className={`${fieldClassName} resize-y`}
            />
          </div>

          <div className="mb-[15px] flex items-start gap-[8px]">
            <input
              type="checkbox"
              defaultChecked
              className="mt-[3px]"
              id="contact-acceptance"
            />
            <label
              htmlFor="contact-acceptance"
              className="text-[15px] font-semibold text-niec-ink"
            >
              By clicking the send button you agree to our{" "}
              <Link
                href="/privacy-policy"
                className="text-brand-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-[4px] border border-brand-primary bg-brand-primary px-[24px] py-[12px] text-[15px] leading-none font-medium text-niec-white transition-all duration-300 hover:bg-transparent hover:text-brand-primary"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
