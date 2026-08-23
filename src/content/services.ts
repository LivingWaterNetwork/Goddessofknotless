import type { Service, ServiceAddOn } from "./types";

/**
 * Esther braids knotless styles only, and sizes her work by BRAID COUNT
 * rather than by named style. Every price is a range that scales with length,
 * from shoulder length at the low end to ankle length at the high end.
 *
 * All figures below come directly from Esther in the 2026-08-20 strategy call.
 * Two items she stated need a second pass before launch and are marked
 * `needs-confirmation` — see docs/CONTENT_CONFIRMATIONS.md.
 */
const SRC = "Esther, strategy call 2026-08-20 (service + pricing walkthrough)";

export const services: Service[] = [
  {
    slug: "jumbo",
    name: "Jumbo",
    braidCount: "10–13 braids",
    tagline: "The quickest way to a clean, protected style.",
    summary:
      "The largest size Esther offers. Fewer, bolder parts, the shortest time in the chair, and a clean foundation that still reads natural.",
    detail:
      "Jumbo is the fastest route to a finished protective style. With ten to thirteen braids, the parting work is bold and graphic, and you are out of the chair in under two hours. It suits a first protective style, a travel week, or a stretch when you want your hair put away without giving up a full day.",
    suitedFor: [
      "A first knotless appointment",
      "The shortest possible time in the chair",
      "A bold, graphic parting pattern",
    ],
    price: { fromUsd: 150, toUsd: 350 },
    duration: { fromHours: 1.5, toHours: 2 },
    bohoSurchargeUsd: 65,
    order: 1,
    mostBooked: false,
    status: "verified",
    sourceNote: SRC,
  },
  {
    slug: "large",
    name: "Large",
    braidCount: "19–20 braids",
    tagline: "Esther's most-requested balance of speed and finish.",
    summary:
      "Nineteen to twenty braids. Enough definition to look considered, quick enough to fit a working afternoon — and one of the two sizes Esther books most.",
    detail:
      "Large is where most clients land when they want the style to look deliberate without committing to a long appointment. Twenty braids gives the parts room to sit cleanly and the finished style enough movement to feel natural. Two to three hours, start to finish.",
    suitedFor: [
      "A considered look on a working schedule",
      "Returning clients on a regular rotation",
      "Anyone weighing time against definition",
    ],
    price: { fromUsd: 165, toUsd: 420 },
    duration: { fromHours: 2, toHours: 3 },
    bohoSurchargeUsd: 85,
    order: 2,
    mostBooked: true,
    status: "verified",
    sourceNote: SRC,
  },
  {
    slug: "medium-large",
    name: "Medium-Large",
    braidCount: "23 braids",
    tagline: "The most-booked size in the studio.",
    summary:
      "A half step finer than Large. The size Esther books more than any other, and the one most first-time clients are picturing.",
    detail:
      "Medium-Large sits between the speed of Large and the detail of Medium. Twenty-three braids reads as fuller and finer without adding hours to the appointment. If you are not sure where to start, this is the size Esther books most often.",
    suitedFor: [
      "First-time clients who want the popular size",
      "Fuller coverage without a long appointment",
      "A natural finish that photographs well",
    ],
    price: { fromUsd: 180, toUsd: 450 },
    duration: { fromHours: 2, toHours: 3 },
    bohoSurchargeUsd: 85,
    order: 3,
    mostBooked: true,
    status: "verified",
    sourceNote: `${SRC}. Esther said "22 braids" earlier in the call and "23 braids" when reading her price list; 23 is used here pending confirmation.`,
  },
  {
    slug: "28-braid-count",
    name: "28 Braid Count",
    braidCount: "28 braids",
    tagline: "A finer part pattern, still inside an afternoon.",
    summary:
      "Twenty-eight braids — the step between Medium-Large and Medium, for a finer part pattern without a full-day appointment.",
    detail:
      "This size exists because clients kept asking for something finer than Medium-Large without moving to a five-hour appointment. Twenty-eight braids gives noticeably more definition through the parts and a softer overall density. Three to four hours.",
    suitedFor: [
      "More definition than Medium-Large",
      "A softer, denser finish",
      "Clients stepping down in size gradually",
    ],
    price: { fromUsd: 200, toUsd: 485 },
    duration: { fromHours: 3, toHours: 4 },
    bohoSurchargeUsd: 100,
    order: 4,
    mostBooked: false,
    status: "verified",
    sourceNote: SRC,
  },
  {
    slug: "medium",
    name: "Medium",
    braidCount: null,
    tagline: "Fine, even definition across the whole head.",
    summary:
      "Even, refined definition throughout. A longer appointment, and a finish that holds its shape through a full rotation.",
    detail:
      "Medium is the point where the parting work becomes the feature. The braids are fine enough to move naturally and sit close to the scalp, and the finished style holds its line for the length of a normal rotation. Plan on four to five hours.",
    suitedFor: [
      "Fine, even definition throughout",
      "A longer-wearing finish",
      "Clients who prefer a lighter individual braid",
    ],
    price: { fromUsd: 300, toUsd: 550 },
    duration: { fromHours: 4, toHours: 5 },
    bohoSurchargeUsd: 120,
    order: 5,
    mostBooked: false,
    status: "verified",
    sourceNote: SRC,
  },
  {
    slug: "medium-fine",
    name: "Medium-Fine",
    braidCount: null,
    tagline: "A finer Medium, for a softer fall.",
    summary:
      "A finer grade of Medium, for clients who want more braids and a softer fall without moving all the way to Small.",
    detail:
      "A finer grade of Medium: more braids, a softer fall, and a finish that reads closer to natural density. Five to six hours in the chair.",
    suitedFor: [
      "More braids than standard Medium",
      "A softer, more natural fall",
      "Clients between Medium and Small",
    ],
    price: { fromUsd: 340, toUsd: 675 },
    duration: { fromHours: 5, toHours: 6 },
    bohoSurchargeUsd: 150,
    order: 6,
    mostBooked: false,
    status: "needs-confirmation",
    sourceNote:
      `${SRC}. Esther listed two distinct "Medium" tiers back to back ($300–$550 / 4–5 hrs, then $340–$675 / 5–6 hrs) with different boho surcharges ($120 / $150). The second tier is published here as "Medium-Fine" as a working name only — Esther must confirm the public name for this size before launch.`,
  },
  {
    slug: "small",
    name: "Small",
    braidCount: null,
    tagline: "Detailed work, and the longest wear.",
    summary:
      "Fine, detailed braiding across the whole head. A full-day appointment that rewards you with the longest-wearing result.",
    detail:
      "Small is a full-day commitment and the size clients choose when they want the style to last. The braids are fine, the parts are close, and the finished look sits closest to your own density. Six to eight hours, depending on length.",
    suitedFor: [
      "The longest-wearing result",
      "A finish closest to natural density",
      "Clients who plan a full-day appointment",
    ],
    price: { fromUsd: 400, toUsd: 780 },
    duration: { fromHours: 6, toHours: 8 },
    bohoSurchargeUsd: 200,
    order: 7,
    mostBooked: false,
    status: "verified",
    sourceNote: SRC,
  },
  {
    slug: "extra-small",
    name: "Extra Small",
    braidCount: null,
    tagline: "Exceptionally fine, for a near-natural finish.",
    summary:
      "Exceptionally fine braiding. A long appointment and the most delicate part pattern Esther offers short of micro.",
    detail:
      "Extra Small is precise, patient work. The part pattern is delicate and the finished style falls almost like unbraided hair. Eight to ten hours, and worth booking well ahead.",
    suitedFor: [
      "A near-natural finished density",
      "Delicate, precise part patterns",
      "Clients booking well in advance",
    ],
    price: { fromUsd: 450, toUsd: 775 },
    duration: { fromHours: 8, toHours: 10 },
    bohoSurchargeUsd: 250,
    order: 8,
    mostBooked: false,
    status: "needs-confirmation",
    sourceNote:
      `${SRC}. Esther quoted $450–$775, a top of range $5 BELOW Small ($400–$780) despite being the finer and longer size. Likely a misread of her price sheet — confirm before launch.`,
  },
  {
    slug: "microbraids",
    name: "Microbraids",
    braidCount: null,
    tagline: "The finest work in the studio.",
    summary:
      "The finest braiding Esther does. A multi-day-scale appointment booked by arrangement.",
    detail:
      "Microbraids are the finest work in the studio and the longest appointment on the books — ten to fourteen hours. This size is arranged directly with Esther so the day can be planned properly on both sides.",
    suitedFor: [
      "The finest possible part pattern",
      "Clients who have booked with Esther before",
      "Appointments planned well in advance",
    ],
    price: { fromUsd: 600, toUsd: 800 },
    duration: { fromHours: 10, toHours: 14 },
    bohoSurchargeUsd: null,
    order: 9,
    mostBooked: false,
    status: "verified",
    sourceNote: `${SRC}. Boho / human-hair surcharge was not quoted for this size — omitted rather than estimated.`,
  },
];

/**
 * Add-ons. The boho surcharge is per-size and lives on each service record;
 * everything here is either flat or priced per bundle.
 */
export const addOns: ServiceAddOn[] = [
  {
    id: "boho",
    name: "Boho finish (human hair added)",
    description:
      "Loose human-hair pieces woven through the braids for a softer, textured finish. Priced by size, because finer sizes take longer to blend.",
    priceBySlug: {
      jumbo: 65,
      large: 85,
      "medium-large": 85,
      "28-braid-count": 100,
      medium: 120,
      "medium-fine": 150,
      small: 200,
      "extra-small": 250,
    },
    status: "verified",
    sourceNote: SRC,
  },
  {
    id: "extra-hair",
    name: "Additional hair",
    description:
      "Added when a style calls for more hair than the standard amount for your size and length.",
    priceUsd: 65,
    status: "verified",
    sourceNote: SRC,
  },
  {
    id: "client-hair-install",
    name: "Install of hair you bring",
    description: "Bring your own bundles and Esther installs them.",
    priceUsd: 35,
    unit: "per bundle",
    status: "verified",
    sourceNote: SRC,
  },
  {
    id: "raw-hair",
    name: "Raw human hair",
    description:
      "Raw Indian or raw Burmese hair, supplied by the studio, plus installation.",
    priceUsd: 145,
    unit: "per bundle, plus $35 to install each bundle",
    status: "verified",
    sourceNote: SRC,
  },
];

export const servicesByOrder = [...services].sort((a, b) => a.order - b.order);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const mostBookedServices = servicesByOrder.filter((s) => s.mostBooked);

/** Studio-wide price floor and ceiling, derived rather than hand-written. */
export const priceFloorUsd = Math.min(...services.map((s) => s.price.fromUsd));
export const priceCeilingUsd = Math.max(...services.map((s) => s.price.toUsd));

export function bohoSurchargeFor(slug: string): number | null {
  const boho = addOns.find((a) => a.id === "boho");
  return boho?.priceBySlug?.[slug] ?? null;
}
