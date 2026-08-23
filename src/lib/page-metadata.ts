import type { Metadata } from "next";
import { seoFor } from "@/content/seo";

/**
 * Builds per-route metadata from the single SEO table, so a route can never
 * ship with a duplicated or missing title.
 */
export function metadataForRoute(path: string): Metadata {
  const seo = seoFor(path);
  if (!seo) {
    throw new Error(
      `No SEO entry for route "${path}". Add it to src/content/seo.ts — every indexed route needs a unique title and description.`,
    );
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.path,
    },
    robots: seo.indexed ? { index: true, follow: true } : { index: false, follow: false },
  };
}
