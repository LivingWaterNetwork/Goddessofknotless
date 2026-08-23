import type { Testimonial } from "./types";

/**
 * Deliberately empty.
 *
 * Esther's business is referral-built and she has described what clients say
 * about her, but no client has given documented permission to publish a
 * quote under their name. Inventing one — or paraphrasing her account of what
 * clients say and presenting it as a client's own words — would be a fake
 * testimonial. The section stays hidden until real, permissioned quotes exist.
 *
 * See docs/CONTENT_CONFIRMATIONS.md for the collection plan.
 */
export const testimonials: Testimonial[] = [];

export const publishableTestimonials = testimonials.filter(
  (t) => t.permissionOnFile && t.status === "verified",
);
