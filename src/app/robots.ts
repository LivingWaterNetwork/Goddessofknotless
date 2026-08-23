import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/business";
import { indexingAllowed } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  /* Review and preview deployments block everything. See lib/indexing.ts. */
  if (!indexingAllowed) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
