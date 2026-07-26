/** Content shapes for the study-abroad country guide pages (e.g. Study in USA). */

export interface NavLink {
  label: string;
  href: string;
}

export interface StudyHeroData {
  title: string;
  subtitle: string;
  image: string;
  nav: NavLink[];
}

export interface OverviewData {
  eyebrow: string;
  heading: string;
  intro: string[];
  closing: string[];
  videoId: string | null;
}

export interface VisaCard {
  image: string;
  alt: string;
}

export interface ShapeData {
  heading: string;
  sub: string;
  body: string[];
  visa: VisaCard[];
}

export type ChapterBlock =
  | { kind: "prose"; paragraphs: string[] }
  | { kind: "imagebox"; image: string | null; title: string; text: string }
  | { kind: "image"; image: string | null; alt: string }
  | { kind: "heading"; level: string; text: string };

export interface ChapterGroup {
  label: string;
  blocks: ChapterBlock[];
}

export interface Chapter {
  number: string;
  title: string;
  groups: ChapterGroup[];
}

export interface UniversityCardData {
  name: string;
  image: string | null;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string[];
}

export interface CtaCardData {
  name: string;
  image: string | null;
  href: string;
}

export interface StudyAbroadPage {
  slug: string;
  country: string;
  hero: StudyHeroData;
  overview: OverviewData;
  shape: ShapeData | null;
  chapters: Chapter[];
  universities: { heading: string; cards: UniversityCardData[] };
  faq: { heading: string; items: FaqItem[] };
  cta: { heading: string; cards: CtaCardData[] };
}
