import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | Yes Study Education | Visa",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section
          className="flex flex-col items-center bg-center bg-cover bg-no-repeat px-[20px] py-[80px] md:py-[120px]"
          style={{ backgroundImage: "url(/images/header-bg.png)" }}
        >
          <div className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-[24px] text-center">
            <p className="brand-gradient-text m-0 p-0 text-[100px] leading-none font-bold md:text-[140px]">
              404
            </p>
            <h1 className="m-0 p-0 text-[28px] leading-tight font-bold text-niec-ink md:text-[32px]">
              Page Not Found
            </h1>
            <p className="m-0 p-0 text-[16px] leading-relaxed text-niec-grey">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
              been moved. Let&apos;s get you back on track.
            </p>
            <Link
              href="/"
              className="mt-[10px] whitespace-nowrap rounded-[100px] bg-brand-primary px-[32px] py-[14px] text-[16px] font-medium text-white transition-colors duration-300 hover:bg-brand-secondary"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
