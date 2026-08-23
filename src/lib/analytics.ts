"use client";

import { features } from "@/content/features";

/**
 * Typed event wrapper. The event names here are the whole vocabulary — adding
 * one means adding it to this union and to docs/ANALYTICS_PLAN.md, which keeps
 * the dictionary and the code from drifting.
 *
 * Nothing a client types is ever passed through here.
 */
export type AnalyticsEvent =
  | { name: "book_click"; route: string; placement: BookPlacement }
  | { name: "rebook_click"; route: string; placement: BookPlacement }
  | { name: "service_view"; slug: string }
  | { name: "service_booking_click"; slug: string; route: string }
  | { name: "size_guide_start" }
  | { name: "size_guide_complete"; recommendedSlug: string }
  | { name: "gallery_filter"; filter: string }
  | { name: "gallery_open"; itemId: string }
  | { name: "faq_open"; id: string; bookingCritical: boolean };

export type BookPlacement =
  | "header"
  | "hero"
  | "mobile-bar"
  | "service-card"
  | "service-detail"
  | "closing-cta"
  | "footer";

interface VercelAnalyticsWindow extends Window {
  va?: (event: "event", payload: Record<string, unknown>) => void;
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const { name, ...properties } = event;

  if (!features.analytics) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[analytics] ${name}`, properties);
    }
    return;
  }

  const w = window as VercelAnalyticsWindow;
  w.va?.("event", { name, ...properties });
}
