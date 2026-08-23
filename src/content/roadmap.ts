import type { VerificationStatus } from "./types";

/**
 * Where the business is going — built now, so the structure exists before the
 * content does.
 *
 * Every offering here is something Esther has said she intends. None of it is
 * something she sells today. That distinction is the whole design of this file:
 *
 *   • nothing carries a price, a date, or a "launching soon" promise;
 *   • nothing is bookable, and no page offers a way to pay;
 *   • every one is `needs-confirmation` until Esther signs it off, because the
 *     intent reached us second-hand;
 *   • every route is `noindex` and out of the sitemap while it is planned. A
 *     thin "coming soon" page competing in search with the pages that actually
 *     sell something is a net loss.
 *
 * When one becomes real: fill in the detail, flip its flag in `features.ts`,
 * set `available: true`, add a `routeSeo` entry, and it joins the nav, the
 * sitemap and the index automatically.
 */
export interface PlannedOffering {
  id: string;
  path: string;
  navLabel: string;
  overline: string;
  /** Page h1. */
  title: string;
  lede: string;
  /** The honest one-liner: what is true about this today. */
  standing: string;
  /** What it is intended to become. Intent, never commitment. */
  intent: string[];
  /** What has to be true before it can launch. Shown to the client, not publicly. */
  prerequisites: string[];
  /** False while it is a plan rather than a service. */
  available: boolean;
  status: VerificationStatus;
  sourceNote: string;
}

const INTENT_SRC =
  "Direction relayed by the reviewer, 2026-08-23. Not stated on either recorded call — Esther must confirm before any of this becomes public.";

export const plannedOfferings: PlannedOffering[] = [
  {
    id: "classes",
    path: "/classes",
    navLabel: "Classes",
    overline: "Education",
    title: "Teaching the technique, not just performing it.",
    lede:
      "Esther is planning to teach knotless braiding — the parting discipline, the tension control, and the consistency that makes a style hold and repeat.",
    standing:
      "Classes are not running yet. There is no schedule, no price, and no waiting list to join. This page exists so the plan has somewhere to live.",
    intent: [
      "Small-group instruction, taught on the same nine braid-count sizes the studio already works in",
      "Parting and sectioning as the core of the curriculum — it is what separates a style that holds from one that does not",
      "Low-tension technique, taught as a habit rather than a talking point",
      "A path for stylists who want to add knotless work to an existing practice",
    ],
    prerequisites: [
      "Curriculum, session length, and group size",
      "Price, and whether a deposit applies",
      "Where classes are held — the studio, or a separate teaching space",
      "Whether a certificate or credential is issued, and on what basis",
    ],
    available: false,
    status: "needs-confirmation",
    sourceNote: INTENT_SRC,
  },
  {
    id: "shop",
    path: "/shop",
    navLabel: "Shop",
    overline: "Products",
    title: "The things worth putting on your scalp between appointments.",
    lede:
      "A small, deliberately short line of care products — chosen or made for braided hair, and for the weeks between one appointment and the next.",
    standing:
      "Nothing is for sale yet. No products have been selected, no prices set, and there is no checkout on this site.",
    intent: [
      "Scalp and edge care for hair that is in braids for weeks at a time",
      "A short line rather than a wide one — the studio offers one service well, and the shop should follow the same logic",
      "Sold on the same terms as the service: the price published before you decide",
      "Available to buy in the studio as well as online",
    ],
    prerequisites: [
      "Which products, and whether they are third-party or the studio's own",
      "Supplier, stock, and fulfilment — who ships, and from where",
      "A payment processor, and the privacy policy changes that come with it",
      "Ingredient and claim review: what a product may and may not say it does",
    ],
    available: false,
    status: "needs-confirmation",
    sourceNote: INTENT_SRC,
  },
  {
    id: "events",
    path: "/events",
    navLabel: "Events",
    overline: "Events",
    title: "Days the studio opens its doors a little wider.",
    lede:
      "Pop-ups, guest days, and gatherings — occasions where the studio does something other than a normal appointment.",
    standing:
      "No events are scheduled. Nothing on this page can be booked or reserved yet.",
    intent: [
      "Studio days set aside for a specific size or finish",
      "Guest appearances with other stylists, where it fits the standard",
      "Client gatherings for the referral network the studio was built on",
      "Education days, once classes are running",
    ],
    prerequisites: [
      "The first real event — a date, a place, and a capacity",
      "How people reserve a place, and whether a deposit applies",
      "Whether events are photographed, and what clients consent to",
    ],
    available: false,
    status: "needs-confirmation",
    sourceNote: INTENT_SRC,
  },
];

export function plannedOffering(id: string): PlannedOffering | undefined {
  return plannedOfferings.find((o) => o.id === id);
}

/** Anything still a plan. Drives the content gate and the "what's next" block. */
export const unavailableOfferings = plannedOfferings.filter((o) => !o.available);
