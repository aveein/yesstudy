/** Content shapes observed on https://niec.edu.np/. */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroSlide {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  title: string;
  body: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  /** Section background: pale blue or peach. */
  tone: "sky" | "cream";
}

export interface EventItem {
  title: string;
  href: string;
  day: string;
  month: string;
  image?: string;
  venue?: string;
  organiser?: string;
}

export interface DestinationCard {
  country: string;
  href: string;
  image: string;
}

export interface Benefit {
  title: string;
  body: string;
  icon: "paper-plane" | "file-alt" | "crown";
}

export interface CourseCard {
  title: string;
  body: string;
  href: string;
  /** Two-stop linear gradient copied from the source card. */
  gradient: string;
}

export interface University {
  name: string;
  country: string;
  logo: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  university: string;
  scholarship: string;
  avatar: string;
}

export interface CareerPath {
  title: string;
  body: string;
  image: string;
  href: string;
}

export interface BlogPost {
  title: string;
  date: string;
  image: string;
  href: string;
}

export interface Office {
  city: string;
  label: string;
  image: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}
