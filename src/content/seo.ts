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
