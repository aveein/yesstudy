/**
 * Single source of truth for Yes Study's office contact details.
 *
 * Consumed by the footer (condensed) and the contact page (full cards), so a
 * change to a phone number or address only has to happen here.
 */

export interface OfficePhone {
  /** As printed on the page. */
  display: string;
  /** E.164, for the `tel:` href. */
  href: string;
}

export interface Office {
  /** Short label used in compact contexts (footer, form dropdown). */
  shortName: string;
  /** Full office name as printed on the contact page. */
  name: string;
  /** Registered entity, where it differs from the office name. */
  legalName?: string;
  address: string;
  phones: OfficePhone[];
  email: string;
  website: string;
  /** Query string handed to the Google Maps embed. */
  mapQuery: string;
}

export const OFFICES: Office[] = [
  {
    shortName: "Dallas, USA",
    name: "Yes Study USA Office",
    legalName: "Yes Study World LLC",
    address: "539 W. Commerce St #153, Dallas, TX 75208, USA",
    phones: [{ display: "+1 (256) 277-3638", href: "+12562773638" }],
    email: "admin@yesstudyusa.com",
    website: "https://yesstudyusa.com/",
    mapQuery: "539 W Commerce St #153, Dallas, TX 75208",
  },
  {
    shortName: "Kathmandu, Nepal",
    name: "Yes Study Kathmandu Office",
    address: "D&D Complex, Mid Baneshwor, Kathmandu, Nepal",
    phones: [{ display: "+977 1 4560285", href: "+97714560285" }],
    email: "admin@yesstudyusa.com",
    website: "https://yesstudyusa.com/",
    mapQuery: "D&D Complex, Mid Baneshwor, Kathmandu, Nepal",
  },
  {
    shortName: "Pokhara, Nepal",
    name: "Yes Study Pokhara Office",
    address: "Tika Bhawan, Level 2, Mahendrapool, Pokhara, Kaski, Nepal",
    phones: [
      { display: "061-590061", href: "+97761590061" },
      { display: "+977 9856042411", href: "+9779856042411" },
    ],
    email: "admin@yesstudyusa.com",
    website: "https://yesstudyusa.com/",
    mapQuery: "Tika Bhawan, Mahendrapool, Pokhara, Kaski, Nepal",
  },
  {
    shortName: "Sydney, Australia",
    name: "Yes Study World — Head Office",
    address: "Suite 26, Level 17, 329 Pitt St, Sydney NSW 2000, Australia",
    phones: [{ display: "+61 2854 18535", href: "+61285418535" }],
    email: "admin@yesstudyworld.com.au",
    website: "https://yesstudyworld.com.au/",
    mapQuery: "Suite 26 Level 17, 329 Pitt St, Sydney NSW 2000, Australia",
  },
];

/** The office whose details head the contact page and the map embed. */
export const PRIMARY_OFFICE = OFFICES[0];

/** De-duplicated, in office order — the footer lists both inboxes. */
export const CONTACT_EMAILS = [...new Set(OFFICES.map((o) => o.email))];
