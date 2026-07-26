import Image from "next/image";
import Link from "next/link";

import { CONTACT_EMAILS, OFFICES } from "@/data/offices";

const accreditationLogos = [
  "pte.png",
  "oip.jpg",
  "icef.png",
  "usatc.png",
  "iso-logo.png",
  "enz.jpg",
  "nepal.png",
  "toefl.png",
  "pier.png",
  "british.jpg",
];

const linkClassName =
  "text-[14px] font-normal text-niec-ink transition-colors duration-300 hover:text-brand-primary";

const phoneAltPath =
  "M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z";

const envelopePath =
  "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z";

const facebookPath =
  "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z";

const instagramPath =
  "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z";

const youtubePath =
  "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z";

export function Footer() {
  return (
    <footer className="bg-[#FAFAFA]">
      <div className="niec-container flex flex-col gap-[30px] pt-[70px] pb-[20px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[40px] md:flex-row md:gap-[50px]">
            <div className="md:flex-1 flex flex-col gap-[20px]">
              <h4 className="text-start text-[11px] font-bold text-niec-ink">
                Sitemap
              </h4>
              <ul className="flex flex-col gap-[12px]">
                <li>
                  <Link href="/about/" className={linkClassName}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className={linkClassName}>
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us/" className={linkClassName}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:flex-1 flex flex-col gap-[20px]">
              <h4 className="text-start text-[11px] font-bold text-niec-ink">
                Useful Links
              </h4>
              <ul className="flex flex-col gap-[12px]">
                <li>
                  <Link
                    href="/"
                    className={linkClassName}
                  >
                    Study Abroad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={linkClassName}
                  >
                    Test Preparation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:flex-1 flex flex-col gap-[20px]">
              <h4 className="text-start text-[11px] font-bold text-niec-ink">
                Contact Info
              </h4>
              <ul className="flex flex-col gap-[12px]">
                {OFFICES.map((office) =>
                  office.phones.map((phone) => (
                    <li key={phone.href}>
                      <Link
                        href={`tel:${phone.href}`}
                        className={`${linkClassName} flex items-center gap-[8px]`}
                      >
                        <svg
                          className="h-[14px] w-[14px] shrink-0 fill-current"
                          viewBox="0 0 512 512"
                        >
                          <path d={phoneAltPath} />
                        </svg>
                        <span>
                          <span className="text-niec-ink/60">
                            {office.shortName}:{" "}
                          </span>
                          {phone.display}
                        </span>
                      </Link>
                    </li>
                  )),
                )}
                {CONTACT_EMAILS.map((email) => (
                  <li key={email}>
                    <Link
                      href={`mailto:${email}`}
                      className={`${linkClassName} flex items-center gap-[8px]`}
                    >
                      <svg
                        className="h-[14px] w-[14px] shrink-0 fill-current"
                        viewBox="0 0 512 512"
                      >
                        <path d={envelopePath} />
                      </svg>
                      {email}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:flex-1 flex flex-col gap-[20px]">
              <h4 className="text-start text-[11px] font-bold text-niec-ink">
                Follow Us
              </h4>
              <div className="flex gap-[10px]">
                <a
                  href="https://www.facebook.com/niec.official"
                  target="_blank"
                  rel="nofollow"
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-niec-ink text-white transition-colors duration-300 hover:bg-brand-primary"
                >
                  <svg
                    className="h-[18px] w-[18px] fill-current"
                    viewBox="0 0 512 512"
                  >
                    <path d={facebookPath} />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/niec.official"
                  target="_blank"
                  rel="nofollow"
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-niec-ink text-white transition-colors duration-300 hover:bg-brand-primary"
                >
                  <svg
                    className="h-[18px] w-[18px] fill-current"
                    viewBox="0 0 448 512"
                  >
                    <path d={instagramPath} />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/@niec.edu.official"
                  target="_blank"
                  rel="nofollow"
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-niec-ink text-white transition-colors duration-300 hover:bg-brand-primary"
                >
                  <svg
                    className="h-[18px] w-[18px] fill-current"
                    viewBox="0 0 576 512"
                  >
                    <path d={youtubePath} />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-3 items-center gap-[20px] md:grid-cols-5 lg:grid-cols-10">
            {accreditationLogos.map((logo) => (
              <div key={logo} className="flex items-center justify-center">
                <Image
                  src={`/images/${logo}`}
                  alt="Yes Study accreditation"
                  width={140}
                  height={55}
                  className="h-auto max-h-[55px] w-auto object-contain"
                />
              </div>
            ))}
          </div> */}

          <hr className="border-0 border-t border-t-[#DFDFDF]" />

          <div className="flex flex-col items-center gap-[5px] md:flex-row md:justify-between md:gap-0">
            <p className="text-[11px] font-normal text-niec-ink">
              Copyright 2026, All rights reserved, Yes Study
            </p>
            {/* <p className="text-[11px] font-normal text-niec-ink">
              Designed &amp; developed by Webifi
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
