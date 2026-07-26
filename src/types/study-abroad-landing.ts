/**
 * Content shapes for the `/study-abroad/` landing page (Elementor page `3050`).
 * Populated by `scripts/extract-study-abroad.mjs` into
 * `src/data/study-abroad-landing.json` — do not hand-edit that file.
 */

export interface StudyAbroadNavItem {
  label: string;
  /** In-page anchor, e.g. `#overview`. */
  href: string;
}

export interface StudyAbroadLandingHero {
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  nav: StudyAbroadNavItem[];
}

export interface StudyAbroadLandingOverview {
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
}

export interface StudyAbroadDestinationCard {
  country: string;
  href: string;
  image: string;
  /** Button label — `Read More` on every card. */
  cta: string;
}

export interface StudyAbroadLandingDestinations {
  eyebrow: string;
  heading: string;
  cards: StudyAbroadDestinationCard[];
}

export interface StudyAbroadLandingWhatYouGet {
  eyebrow: string;
  heading: string;
  body: string;
}

export interface StudyAbroadServiceCard {
  title: string;
  image: string;
  paragraphs: string[];
}

export interface StudyAbroadLandingCta {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  image: string;
}

export interface StudyAbroadLandingServices {
  cards: StudyAbroadServiceCard[];
  cta: StudyAbroadLandingCta;
}

export interface StudyAbroadLandingPage {
  hero: StudyAbroadLandingHero;
  overview: StudyAbroadLandingOverview;
  destinations: StudyAbroadLandingDestinations;
  whatYouGet: StudyAbroadLandingWhatYouGet;
  services: StudyAbroadLandingServices;
}
