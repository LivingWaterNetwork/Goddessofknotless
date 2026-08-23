import { business, siteUrl } from "./business";

export const defaultSeo = {
  siteName: business.name,
  siteUrl,
  /** Written for people, not for a keyword tool. */
  defaultTitle: "Goddess of Knotless — Knotless Braids in Chicago's West Loop",
  titleTemplate: "%s · Goddess of Knotless",
  defaultDescription:
    "Knotless braids in Chicago's West Loop by Esther Parkman. Natural-looking results, gentle care, and clear pricing by size and length. Referral-built since 2020.",
  locale: "en_US",
} as const;

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  /** Included in sitemap.xml. */
  indexed: boolean;
  priority: number;
}

export const routeSeo: RouteSeo[] = [
  {
    path: "/",
    title: defaultSeo.defaultTitle,
    description: defaultSeo.defaultDescription,
    indexed: true,
    priority: 1,
  },
  {
    path: "/services",
    title: "Services & Pricing",
    description:
      "Every knotless braid size Esther offers, from Jumbo through Microbraids, with real price ranges by length and honest appointment times. Find the size that fits your look and your schedule.",
    indexed: true,
    priority: 0.9,
  },
  {
    path: "/experience",
    title: "The Experience",
    description:
      "What to expect at the West Loop studio: how to prepare, how your appointment runs, and the calm, discreet environment Esther keeps for her clients.",
    indexed: true,
    priority: 0.8,
  },
  {
    path: "/gallery",
    title: "Gallery",
    description:
      "Finished knotless braid work by Esther Parkman, filterable by size, from the Goddess of Knotless studio in Chicago's West Loop.",
    indexed: true,
    priority: 0.7,
  },
  {
    path: "/about",
    title: "About Esther",
    description:
      "Esther Parkman taught herself to braid in 2020 and built Goddess of Knotless on referrals. The standards behind the work, in her own terms.",
    indexed: true,
    priority: 0.7,
  },
  {
    path: "/faq",
    title: "Questions & Answers",
    description:
      "How pricing works, how to prepare, how long appointments take, boho finishes, bringing your own hair, and deposits — answered so you don't have to text first.",
    indexed: true,
    priority: 0.6,
  },
  {
    path: "/policies",
    title: "Booking Policies",
    description:
      "How to prepare for your appointment, how deposits work, and how your exact price is confirmed before you book at Goddess of Knotless in Chicago's West Loop.",
    indexed: true,
    priority: 0.4,
  },
  /* ---------------------------------------------------------------------
     Roadmap and structure routes.

     `/locations` and `/team` describe things that exist today (one studio, one
     braider) and are indexed. The three roadmap routes are `indexed: false`:
     a thin "not available yet" page ranking against the pages that actually
     sell something is a net loss, and Google treats a page with no offering
     behind it as exactly what it is. They flip to indexed when the offering
     becomes real.
     --------------------------------------------------------------------- */
  {
    path: "/locations",
    title: "Locations",
    description:
      "Goddess of Knotless operates from a private, by-appointment studio in Chicago's West Loop. Where the work happens today, and how the studio is built to repeat.",
    indexed: true,
    priority: 0.6,
  },
  {
    path: "/team",
    title: "The Studio Team",
    description:
      "Every appointment at Goddess of Knotless is currently braided by Esther Parkman herself. The standard any future braider has to meet before joining her.",
    indexed: true,
    priority: 0.5,
  },
  {
    path: "/classes",
    title: "Classes",
    description:
      "Knotless braiding instruction is planned but not yet running at Goddess of Knotless. What it is intended to cover, and what has still to be decided.",
    indexed: false,
    priority: 0.1,
  },
  {
    path: "/shop",
    title: "Shop",
    description:
      "A short line of care products for braided hair is planned but not yet for sale at Goddess of Knotless. What it is intended to be.",
    indexed: false,
    priority: 0.1,
  },
  {
    path: "/events",
    title: "Events",
    description:
      "Studio days, guest appearances and gatherings are planned but not yet scheduled at Goddess of Knotless. What they are intended to be.",
    indexed: false,
    priority: 0.1,
  },
  {
    path: "/privacy",
    title: "Privacy",
    description:
      "This website collects no personal information and runs no advertising trackers. What happens to the details you share when you book an appointment, and who holds them.",
    indexed: true,
    priority: 0.2,
  },
  {
    path: "/terms",
    title: "Terms of Use",
    description:
      "Terms of use for the Goddess of Knotless website, including how published price and appointment-time ranges relate to the figures confirmed at booking.",
    indexed: true,
    priority: 0.2,
  },
];

export function seoFor(path: string): RouteSeo | undefined {
  return routeSeo.find((r) => r.path === path);
}
