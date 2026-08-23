import type { VerificationStatus } from "./types";
import { business } from "./business";

/**
 * Locations.
 *
 * Today there is exactly one, and its street address is still unconfirmed —
 * see `business.streetAddress`. The structure is plural anyway, because Esther
 * intends to open more, and retrofitting a second studio into a codebase that
 * assumes one is the expensive version of this change.
 *
 * The rule this file exists to enforce: **a location is never invented.** No
 * placeholder city, no "opening in Atlanta soon", no map pin that does not
 * correspond to a lease. A future studio appears here as an unnamed, undated
 * intention or it does not appear at all. An unverified address is also the
 * fastest route to a Google Business Profile suspension.
 */
export interface StudioLocation {
  id: string;
  /** Public name — the neighbourhood, until an address is confirmed. */
  name: string;
  city: string;
  state: string;
  /** Null until Esther confirms the suite address may be published. */
  streetAddress: string | null;
  /** What a client can actually do here today. */
  summary: string;
  /** "open" — taking appointments. "planned" — an intention, nothing more. */
  stage: "open" | "planned";
  /** Services offered here, by service slug. Empty means "all of them". */
  serviceSlugs: string[];
  status: VerificationStatus;
  sourceNote: string;
}

export const locations: StudioLocation[] = [
  {
    id: "west-loop",
    name: `${business.neighborhood.value} Studio`,
    city: business.city.value,
    state: business.state.value,
    streetAddress: business.streetAddress.value,
    summary:
      "The original studio, and where every appointment happens today. A private suite, by appointment only — the address goes to you once your booking is confirmed.",
    stage: "open",
    serviceSlugs: [],
    status: "verified",
    sourceNote: "Esther: 'Right now, I'm in the west loop of Chicago.' 2026-08-20 call.",
  },
];

export const openLocations = locations.filter((l) => l.stage === "open");
export const plannedLocations = locations.filter((l) => l.stage === "planned");

/**
 * The expansion intent, stated without inventing a city or a date.
 *
 * Deliberately not a list of locations. "Second studio — coming soon" with no
 * city attached is honest; the same sentence with a city attached is a claim,
 * and a claim is what gets a business profile suspended.
 */
export const expansionIntent = {
  headline: "One studio today. The model is built to repeat.",
  body:
    "Every price, every appointment length, and every standard on this site is written down rather than held in one person's head. That is what makes a second chair — and eventually a second studio — possible without the work changing.",
  standing:
    "No second location is open, leased, or dated. When one is, it will appear here with a real address and real hours, and not before.",
  status: "needs-confirmation" as VerificationStatus,
  sourceNote:
    "Expansion intent relayed by the reviewer, 2026-08-23. Not stated on either recorded call — Esther must confirm.",
};
