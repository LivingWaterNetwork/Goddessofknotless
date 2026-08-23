/**
 * Typed feature flags. Everything optional is off until Esther approves it,
 * so an unapproved route cannot ship by accident.
 */
export const features = {
  /** High-discretion private inquiry route. */
  privateInquiry: false,
  /** Future education / class waitlist. */
  educationWaitlist: false,

  /* ---------------------------------------------------------------------
     Roadmap surfaces. Each of these is BUILT and reachable, so the plan has
     somewhere to live and the structure exists before the content does — but
     each is `available: false` in its content file, which is what keeps it
     out of the sitemap, out of the index, and free of anything bookable.
     Turning one into a real offering is a content change, not a build.
     --------------------------------------------------------------------- */

  /** Teaching. See src/content/roadmap.ts. */
  classes: true,
  /** Product line. See src/content/roadmap.ts. */
  shop: true,
  /** Pop-ups and guest days. See src/content/roadmap.ts. */
  events: true,
  /** Studio locations. Real today (one), plural by design. */
  locations: true,
  /** The people who braid. One real, the rest reserved seats. */
  team: true,
  /** Editorial journal. Off — an empty blog is worse than no blog. */
  journal: false,
  /** Testimonials section. Off until real, permissioned quotes exist. */
  testimonials: false,
  /** Vercel Web Analytics + Speed Insights. */
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  /** Renders internal "preview" labels on unverified content. */
  previewLabels: process.env.NEXT_PUBLIC_CONTENT_MODE !== "production",
} as const;

export type FeatureName = keyof typeof features;

export const contentMode: "preview" | "production" =
  process.env.NEXT_PUBLIC_CONTENT_MODE === "production" ? "production" : "preview";
