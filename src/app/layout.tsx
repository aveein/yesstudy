import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Satoshi is self-hosted by the source site (Fontshare .woff files, no Google Fonts).
 * Weights below are exactly the @font-face set declared in the Elementor kit.
 */
const satoshi = localFont({
  src: [
    { path: "../../public/fonts/satoshi-light.woff", weight: "300", style: "normal" },
    { path: "../../public/fonts/satoshi-lightitalic.woff", weight: "300", style: "italic" },
    { path: "../../public/fonts/satoshi-regular.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/satoshi-italic.woff", weight: "400", style: "italic" },
    { path: "../../public/fonts/satoshi-medium.woff", weight: "500", style: "normal" },
    { path: "../../public/fonts/satoshi-mediumitalic.woff", weight: "500", style: "italic" },
    { path: "../../public/fonts/satoshi-bold.woff", weight: "700", style: "normal" },
    { path: "../../public/fonts/satoshi-bolditalic.woff", weight: "700", style: "italic" },
    { path: "../../public/fonts/satoshi-black.woff", weight: "900", style: "normal" },
    { path: "../../public/fonts/satoshi-blackitalic.woff", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best Consultancy in Nepal 2026 - Yes Study Kathmandu",
  description:
    "Yes Study is one of the Best Consultancy in Nepal for USA, UK, Australia, Canada, New Zealand, Ireland, and Germany. We provide the best IELTS, PTE, TOEFL, SAT, GRE, and GMAT classes in Kathmandu, Nepal.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/favicon.png",
  },
  openGraph: {
    title: "Best Consultancy in Nepal 2026 - Yes Study Kathmandu",
    description:
      "Yes Study is one of the Best Consultancy in Nepal for USA, UK, Australia, Canada, New Zealand, Ireland, and Germany.",
    images: ["/seo/og-image.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
