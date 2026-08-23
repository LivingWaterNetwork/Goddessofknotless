/**
 * Content layer types.
 *
 * Every public fact carries a `status`. The production launch gate
 * (`scripts/content-check.ts`) refuses to pass while anything rendered
 * publicly is still `placeholder`, and lists everything still
 * `needs-confirmation` so Esther can approve or correct it.
 *
 * `sourceNote` is INTERNAL ONLY. It is never rendered to the page — it exists
 * so the handoff docs can say where each number came from.
 */
export type VerificationStatus = "verified" | "needs-confirmation" | "placeholder";

export interface Verified<T> {
  value: T;
  status: VerificationStatus;
  /** Internal provenance. Never rendered publicly. */
  sourceNote: string;
}

export function fact<T>(
  value: T,
  status: VerificationStatus,
  sourceNote: string,
): Verified<T> {
  return { value, status, sourceNote };
}

export interface PriceRange {
  /** Lowest price in USD, at the shortest confirmed length. */
  fromUsd: number;
  /** Highest price in USD, at the longest confirmed length. */
  toUsd: number;
}

export interface DurationRange {
  fromHours: number;
  toHours: number;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  /** Flat surcharge in USD, when it does not vary by size. */
  priceUsd?: number;
  /** Per-size surcharge in USD, keyed by service slug. */
  priceBySlug?: Record<string, number>;
  unit?: string;
  status: VerificationStatus;
  sourceNote: string;
}

export interface Service {
  slug: string;
  /** Public-facing name. */
  name: string;
  /** Braid-count descriptor, e.g. "10–13 braids". Esther sizes by braid count. */
  braidCount: string | null;
  /** One-line positioning: who it suits. */
  tagline: string;
  /** Short card description. */
  summary: string;
  /** Longer, outcome-focused copy for the detail page. */
  detail: string;
  /** Who this size tends to suit. Guidance, never diagnosis. */
  suitedFor: string[];
  price: PriceRange;
  duration: DurationRange;
  /** Surcharge in USD to add boho / human-hair pieces at this size. */
  bohoSurchargeUsd: number | null;
  /** Ordering weight for display; lower shows first. */
  order: number;
  /** Marks the tiers Esther books most often. */
  mostBooked: boolean;
  status: VerificationStatus;
  sourceNote: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  /** Surfaced on the homepage FAQ teaser. */
  featured: boolean;
  /** Booking-critical questions get their own analytics event. */
  bookingCritical: boolean;
  status: VerificationStatus;
  sourceNote: string;
}

export interface Policy {
  id: string;
  title: string;
  body: string;
  status: VerificationStatus;
  sourceNote: string;
}

export interface GalleryItem {
  id: string;
  /** Path under /public, or null while awaiting real photography. */
  src: string | null;
  alt: string;
  /** Service slugs this image demonstrates, for filtering. */
  serviceSlugs: string[];
  caption: string | null;
  width: number;
  height: number;
  status: VerificationStatus;
  sourceNote: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  /** Documented permission to publish. Gate blocks display without it. */
  permissionOnFile: boolean;
  status: VerificationStatus;
  sourceNote: string;
}
