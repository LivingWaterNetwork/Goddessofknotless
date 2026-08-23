import { fact } from "./types";

/**
 * Single source of truth for public business facts.
 *
 * Anything not confirmed by Esther is marked and, where publishing it would
 * state something we cannot stand behind, is left null so the UI omits the
 * element entirely rather than guessing.
 */
export const business = {
  /** Public brand name. The alternate "Lounge" descriptor is NOT approved for public use. */
  name: "Goddess of Knotless",
  founder: "Esther Parkman",
  foundedYear: 2020,

  tagline: "Braids · Beauty · Confidence",

  /** Neighbourhood is confirmed. The street address is not — see below. */
  neighborhood: fact("West Loop", "verified", "Esther: 'Right now, I'm in the west loop of Chicago.'"),
  city: fact("Chicago", "verified", "Esther, 2026-08-20 call"),
  state: fact("Illinois", "verified", "Derived from Chicago"),

  /**
   * Deliberately null. Esther operates from a studio suite; no street address
   * was confirmed and Google's representation guidelines forbid publishing an
   * unverified or partial address. The site shows the neighbourhood only.
   */
  streetAddress: fact<string | null>(null, "needs-confirmation", "Not stated on either call. Esther must confirm whether the suite address is published publicly or kept to confirmed appointments only."),
  postalCode: fact<string | null>(null, "needs-confirmation", "Not stated on either call."),

  /** Esther takes bookings on a dedicated business line. Number not published. */
  phone: fact<string | null>(null, "needs-confirmation", "Esther references a business 'hair line' but the number was not stated in a publishable context."),
  email: fact<string | null>(null, "needs-confirmation", "Not stated on either call."),

  /** Operating hours were never stated. Nothing is published until they are. */
  hours: fact<string[] | null>(null, "needs-confirmation", "Never stated. Esther described a variable schedule ('every day is different')."),

  instagramUrl: fact<string | null>(null, "needs-confirmation", "Esther posts on a business Instagram account; the handle was not stated on either call."),
  googleBusinessProfileUrl: fact<string | null>(null, "needs-confirmation", "Not yet established — flagged as a to-do on the 2026-08-20 call."),

  /**
   * Provider-agnostic booking target. Every CTA on the site reads this one
   * value, so swapping platforms is a single environment-variable change.
   * Today Esther takes bookings by text and DM; see docs/BOOKING_PLATFORM_SCORECARD.md.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? null,

  /** Set once the chosen platform supports a returning-client deep link. */
  rebookUrl: process.env.NEXT_PUBLIC_REBOOK_URL ?? null,
} as const;

/** True once a real booking destination is configured. */
export const hasBookingUrl = Boolean(business.bookingUrl);

/**
 * Origin statement. Truthful and publishable: self-taught in 2020, grown by
 * referral. Deliberately avoids any superlative or unverifiable claim.
 */
export const originStatement =
  "Self-taught in 2020. Built by referrals. Trusted for natural results, gentle care, and consistency.";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://goddessofknotless.com";
