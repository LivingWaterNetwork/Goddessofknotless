import { business, siteUrl } from "@/content/business";
import { services, priceFloorUsd, priceCeilingUsd } from "@/content/services";
import { defaultSeo } from "@/content/seo";

/**
 * JSON-LD built ONLY from verified facts.
 *
 * Deliberately absent:
 *  - `address` — no street address is confirmed, and a partial or invented
 *    address violates Google's structured-data and GBP representation rules.
 *  - `aggregateRating` / `review` — there are no third-party ratings, and
 *    self-serving review markup breaks Google's policy and the FTC's
 *    Consumer Reviews and Testimonials Rule.
 *  - `openingHours` — never stated.
 *  - `telephone` / `email` — not confirmed for publication.
 */
export function localBusinessJsonLd(): Record<string, unknown> {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    url: siteUrl,
    description: defaultSeo.defaultDescription,
    founder: { "@type": "Person", name: business.founder },
    foundingDate: String(business.foundedYear),
    priceRange: `$${priceFloorUsd}–$${priceCeilingUsd}`,
    currenciesAccepted: "USD",
    /** Area served is safe to state; a precise address is not. */
    areaServed: {
      "@type": "City",
      name: `${business.city.value}, ${business.state.value}`,
    },
    knowsAbout: ["Knotless braids", "Protective styling", "Boho braids"],
  };

  if (business.streetAddress.value) {
    node.address = {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress.value,
      addressLocality: business.city.value,
      addressRegion: "IL",
      postalCode: business.postalCode.value,
      addressCountry: "US",
    };
  }
  if (business.phone.value) node.telephone = business.phone.value;

  const sameAs = [business.instagramUrl.value, business.googleBusinessProfileUrl.value].filter(
    (v): v is string => Boolean(v),
  );
  if (sameAs.length > 0) node.sameAs = sameAs;

  return node;
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: business.name,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#business` },
  };
}

/**
 * Service nodes. Prices are real ranges, so they are expressed as
 * PriceSpecification with min/max rather than a single invented figure.
 */
export function serviceJsonLd(slug: string): Record<string, unknown> | null {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: `${service.name} Knotless Braids`,
    serviceType: "Knotless braiding",
    description: service.summary,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: { "@type": "City", name: `${business.city.value}, ${business.state.value}` },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: service.price.fromUsd,
        maxPrice: service.price.toUsd,
      },
    },
  };
}

export function breadcrumbJsonLd(
  trail: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqJsonLd(
  entries: readonly { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
}
