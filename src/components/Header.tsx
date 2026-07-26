"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDownIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about/",
    children: [
      { label: "CEO’s Message", href: "/about/ceos-message/" },
      { label: "Services", href: "/about" },
    ],
  },
  {
    label: "Study Abroad",
    href: "/study-abroad/",
    children: [
      { label: "STUDY IN USA", href: "/study-abroad/study-in-usa/" },
      {
        label: "STUDY IN AUSTRALIA",
        href: "/study-abroad/study-in-australia/",
      },
    ],
  },
  {
    label: "Test Preparation",
    href: "#",
    children: [
      { label: "IELTS", href: "#" },
      { label: "TOEFL", href: "#" },
      { label: "PTE-A", href: "#" },
      { label: "GMAT", href: "#" },
      { label: "GRE", href: "#" },
      { label: "Digital SAT", href: "#" },
    ],
  },
  // { label: "Events", href: "/events/" },
  // { label: "Universities", href: "/universities/" },
  // { label: "Blogs", href: "/blogs/" },
  // { label: "Testimonials", href: "/testimonials/" },
  // { label: "Elearning", href: "https://elearning.niec.edu.np/login/index.php" },
];

const CTA: NavItem = { label: "Contact Us", href: "/contact-us/" };
const LOGO_SRC = "/images/yes-study-logo.png";
const LOGO_ALT = "Yes Study Education | Visa logo";

const NAV_LINK_CLASS =
  "px-[20px] py-[13px] text-[16px] font-normal leading-[20px] text-niec-ink hover:text-brand-primary focus:text-brand-primary";

const SUBMENU_LINK_CLASS =
  "whitespace-nowrap px-[20px] py-[13px] text-[15px] font-medium text-niec-ink hover:text-brand-primary";

function isExternalHref(href: string) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
}

function isActiveLink(href: string, pathname: string | null) {
  if (!pathname) return false;
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(href);
}

function DesktopNavLink({ item, pathname }: { item: NavItem; pathname: string | null }) {
  const children = item.children ?? [];
  const isActive = isActiveLink(item.href, pathname);
  const linkClassName = cn(NAV_LINK_CLASS, isActive && "text-brand-primary");

  if (children.length === 0) {
    return isExternalHref(item.href) ? (
      <a
        href={item.href}
        className={linkClassName}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </a>
    ) : (
      <Link
        href={item.href}
        className={linkClassName}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      {isExternalHref(item.href) ? (
        <a href={item.href} className={linkClassName}>
          {item.label}
          <CaretDownIcon className="ml-1 inline h-[11px] w-[11px]" />
        </a>
      ) : (
        <Link href={item.href} className={linkClassName}>
          {item.label}
          <CaretDownIcon className="ml-1 inline h-[11px] w-[11px]" />
        </Link>
      )}
      {/* Pure-CSS hover dropdown; group-focus-within keeps it keyboard-reachable. */}
      <div className="absolute top-full left-0 z-10 hidden flex-col bg-white group-hover:flex group-focus-within:flex">
        {children.map((child: NavItem) => {
          const isChildActive = isActiveLink(child.href, pathname);
          const childClassName = cn(SUBMENU_LINK_CLASS, isChildActive && "text-brand-primary");

          return isExternalHref(child.href) ? (
            <a key={child.href} href={child.href} className={childClassName}>
              {child.label}
            </a>
          ) : (
            <Link key={child.href} href={child.href} className={childClassName}>
              {child.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MobileNavLink({
  item,
  pathname,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  pathname: string | null;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const children = item.children ?? [];
  const isActive = isActiveLink(item.href, pathname);

  if (children.length === 0) {
    return isExternalHref(item.href) ? (
      <a
        href={item.href}
        className={cn(
          "block px-[20px] py-[13px] text-[15px] font-medium text-niec-ink hover:text-brand-primary",
          isActive && "text-brand-primary"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </a>
    ) : (
      <Link
        href={item.href}
        className={cn(
          "block px-[20px] py-[13px] text-[15px] font-medium text-niec-ink hover:text-brand-primary",
          isActive && "text-brand-primary"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between px-[20px] py-[13px] text-left text-[15px] font-medium text-niec-ink hover:text-brand-primary"
      >
        <span>{item.label}</span>
        <CaretDownIcon
          className={cn(
            "h-[11px] w-[11px] shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="flex flex-col bg-niec-offwhite">
          {children.map((child: NavItem) => {
            const isChildActive = isActiveLink(child.href, pathname);
            const childClassName = cn(
              "block px-[32px] py-[13px] text-[14px] font-medium text-niec-ink hover:text-brand-primary md:text-[15px]",
              isChildActive && "text-brand-primary"
            );
            const childKey = `${child.href}-${child.label}`;

            return isExternalHref(child.href) ? (
              <a key={childKey} href={child.href} className={childClassName}>
                {child.label}
              </a>
            ) : (
              <Link key={childKey} href={child.href} className={childClassName}>
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (href: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  const pathname = usePathname();

  return (
    <header className="w-full bg-transparent">
      {/* Desktop: static (non-sticky), full-bleed bar with a translucent pill nav. */}
      <div className="relative z-[100] hidden w-full items-center px-[40px] pt-[10px] pb-[20px] lg:flex">
        <div className="flex w-full flex-row items-center gap-[30px] rounded-[40px] bg-white/64 px-[15px] py-[5px] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.06)] backdrop-blur-[10px]">
          <Image
            src={LOGO_SRC}
            alt={LOGO_ALT}
            width={800}
            height={400}
            priority
            className="h-auto w-[165px]"
          />
          <nav className="flex grow flex-row items-center justify-end gap-[10px]">
            {NAV.map((item) => (
              <DesktopNavLink key={item.href} item={item} pathname={pathname} />
            ))}
            <Link
              href={CTA.href}
              className="whitespace-nowrap rounded-[100px] bg-brand-primary px-[24px] py-[12px] text-[16px] font-medium text-white hover:bg-brand-secondary"
            >
              {CTA.label}
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile: solid bar + tap-to-expand panel. */}
      <div className="relative z-[100] flex items-center bg-white px-[20px] py-[15px] lg:hidden">
        <Image
          src={LOGO_SRC}
          alt={LOGO_ALT}
          width={800}
          height={400}
          priority
          className="h-auto w-[165px]"
        />
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="ml-auto flex items-center justify-center text-brand-primary"
        >
          {mobileOpen ? (
            <CloseIcon className="h-[30px] w-[30px]" />
          ) : (
            <MenuIcon className="h-[30px] w-[30px]" />
          )}
        </button>
      </div>
      {mobileOpen && (
        <div className="w-full bg-niec-offwhite lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <MobileNavLink
                key={item.href}
                item={item}
                pathname={pathname}
                isOpen={openSubmenus.includes(item.href)}
                onToggle={() => toggleSubmenu(item.href)}
              />
            ))}
            <a
              href={CTA.href}
              className="m-[20px] rounded-[100px] bg-brand-primary px-[24px] py-[12px] text-center text-[16px] font-medium text-white"
            >
              {CTA.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
