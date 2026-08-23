import type { MetadataRoute } from "next";
import { routeSeo } from "@/content/seo";
import { services } from "@/content/services";
import { siteUrl } from "@/content/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = routeSeo
    .filter((route) => route.indexed)
    .map((route) => ({
      url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
