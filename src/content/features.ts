/**
 * Typed feature flags. Everything optional is off until Esther approves it,
 * so an unapproved route cannot ship by accident.
 */
export const features = {
  /** High-discretion private inquiry route. */
  privateInquiry: false,
  /** Future education / class waitlist. */
  educationWaitlist: false,
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
