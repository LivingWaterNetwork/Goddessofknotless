import { describe, expect, it } from "vitest";

import {
  services,
  servicesByOrder,
  addOns,
  getService,
  mostBookedServices,
  priceFloorUsd,
  priceCeilingUsd,
  bohoSurchargeFor,
} from "@/content/services";
import { faqs } from "@/content/faqs";
import { policies, publishablePolicies, pendingPolicies } from "@/content/policies";
import { gallery, galleryFilters, publishableGallery } from "@/content/gallery";
import { stockPlaceholders } from "@/content/placeholder-images";
import { testimonials, publishableTestimonials } from "@/content/testimonials";
import { routeSeo, seoFor } from "@/content/seo";
import { features } from "@/content/features";
import { business } from "@/content/business";
import { durationRange, priceRange, usd } from "@/lib/format";

describe("service content integrity", () => {
  it("has a unique slug per service", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a unique display order per service", () => {
    const orders = services.map((s) => s.order);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("never inverts a price range", () => {
    for (const service of services) {
      expect(service.price.fromUsd).toBeLessThanOrEqual(service.price.toUsd);
      expect(service.price.fromUsd).toBeGreaterThan(0);
    }
  });

  it("never inverts a duration range", () => {
    for (const service of services) {
      expect(service.duration.fromHours).toBeLessThanOrEqual(service.duration.toHours);
      expect(service.duration.fromHours).toBeGreaterThan(0);
    }
  });

  it("increases appointment time as braids get finer", () => {
    /* Ordered coarse to fine, so each tier's floor must be >= the previous one's.
       This is the invariant that would catch a mistyped duration. */
    for (let i = 1; i < servicesByOrder.length; i += 1) {
      const previous = servicesByOrder[i - 1]!;
      const current = servicesByOrder[i]!;
      expect(current.duration.fromHours).toBeGreaterThanOrEqual(previous.duration.fromHours);
    }
  });

  it("increases starting price as braids get finer", () => {
    for (let i = 1; i < servicesByOrder.length; i += 1) {
      const previous = servicesByOrder[i - 1]!;
      const current = servicesByOrder[i]!;
      expect(current.price.fromUsd).toBeGreaterThanOrEqual(previous.price.fromUsd);
    }
  });

  it("carries an internal source note on every service", () => {
    for (const service of services) {
      expect(service.sourceNote.length).toBeGreaterThan(10);
    }
  });

  it("flags the two figures Esther must re-confirm", () => {
    /* Guards the specific ambiguities found in the 2026-08-20 call: the
       duplicated "Medium" tier and the Extra Small ceiling below Small's. */
    const unconfirmed = services.filter((s) => s.status === "needs-confirmation");
    expect(unconfirmed.map((s) => s.slug).sort()).toEqual(["extra-small", "medium-fine"]);
  });

  it("resolves services by slug and rejects unknown ones", () => {
    expect(getService("medium-large")?.name).toBe("Medium-Large");
    expect(getService("does-not-exist")).toBeUndefined();
  });

  it("marks exactly the two sizes Esther books most", () => {
    expect(mostBookedServices.map((s) => s.slug)).toEqual(["large", "medium-large"]);
  });

  it("derives the studio price floor and ceiling from the data", () => {
    expect(priceFloorUsd).toBe(150);
    expect(priceCeilingUsd).toBe(800);
  });
});

describe("add-ons", () => {
  it("prices boho for every size except microbraids", () => {
    for (const service of services) {
      const surcharge = bohoSurchargeFor(service.slug);
      if (service.slug === "microbraids") {
        /* Never quoted by Esther — omitted rather than estimated. */
        expect(surcharge).toBeNull();
        expect(service.bohoSurchargeUsd).toBeNull();
      } else {
        expect(surcharge).toBe(service.bohoSurchargeUsd);
        expect(surcharge).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the boho surcharge rising with finer sizes", () => {
    const withBoho = servicesByOrder.filter((s) => s.bohoSurchargeUsd !== null);
    for (let i = 1; i < withBoho.length; i += 1) {
      expect(withBoho[i]!.bohoSurchargeUsd!).toBeGreaterThanOrEqual(
        withBoho[i - 1]!.bohoSurchargeUsd!,
      );
    }
  });

  it("has a unique id per add-on", () => {
    const ids = addOns.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("prices every add-on either flat or per size", () => {
    for (const addOn of addOns) {
      const priced = addOn.priceUsd !== undefined || addOn.priceBySlug !== undefined;
      expect(priced).toBe(true);
    }
  });

  it("keys per-size add-on prices to real service slugs", () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const addOn of addOns) {
      for (const key of Object.keys(addOn.priceBySlug ?? {})) {
        expect(slugs.has(key)).toBe(true);
      }
    }
  });
});

describe("feature flags", () => {
  it("keeps every unapproved route switched off", () => {
    expect(features.privateInquiry).toBe(false);
    expect(features.educationWaitlist).toBe(false);
    expect(features.journal).toBe(false);
    expect(features.testimonials).toBe(false);
  });

  it("defaults analytics to off until approved", () => {
    expect(features.analytics).toBe(false);
  });
});

describe("production content gate invariants", () => {
  it("publishes no testimonial without documented permission", () => {
    expect(publishableTestimonials).toHaveLength(0);
    for (const testimonial of testimonials) {
      expect(testimonial.permissionOnFile).toBe(true);
    }
  });

  it("publishes no gallery image until real photography exists", () => {
    expect(publishableGallery).toHaveLength(0);
    for (const item of gallery) {
      if (item.src === null) expect(item.status).toBe("placeholder");
    }
  });

  /* The review build fills every frame with stock photography. None of it is
     Esther's, so none of it may ever pass for verified content. */
  it("keeps every stand-in photograph marked as a placeholder", () => {
    for (const item of gallery) {
      expect(item.status).toBe("placeholder");
      expect(item.alt).toMatch(/stock placeholder/i);
      expect(item.sourceNote).toMatch(/STOCK PLACEHOLDER/);
    }
  });

  it("registers every stock placeholder so the launch gate can block on it", () => {
    expect(stockPlaceholders.length).toBeGreaterThan(0);
    const registered = new Set(stockPlaceholders.map((p) => p.src));
    for (const item of gallery) {
      expect(registered.has(item.src ?? "")).toBe(true);
    }
    for (const placeholder of stockPlaceholders) {
      expect(placeholder.sourceUrl).toMatch(/^https:\/\//);
      expect(placeholder.alt.trim()).not.toBe("");
    }
  });

  it("gives every gallery frame a stable aspect ratio", () => {
    for (const item of gallery) {
      expect(item.width).toBeGreaterThan(0);
      expect(item.height).toBeGreaterThan(0);
    }
  });

  it("derives gallery filters from the real service taxonomy", () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const filter of galleryFilters) {
      expect(slugs.has(filter.slug)).toBe(true);
    }
  });

  it("separates publishable policies from the ones still missing", () => {
    expect(publishablePolicies.length).toBeGreaterThan(0);
    expect(pendingPolicies.length).toBeGreaterThan(0);
    expect(publishablePolicies.length + pendingPolicies.length).toBe(policies.length);
  });

  it("gives every publishable policy real body copy", () => {
    for (const policy of publishablePolicies) {
      expect(policy.body.trim().length).toBeGreaterThan(20);
    }
  });

  it("omits every unconfirmed business fact rather than guessing", () => {
    /* These deliberately publish nothing. A regression that filled one in with
       a plausible-looking value is exactly what this test exists to catch. */
    expect(business.streetAddress.value).toBeNull();
    expect(business.phone.value).toBeNull();
    expect(business.email.value).toBeNull();
    expect(business.hours.value).toBeNull();
  });

  it("has no booking URL configured by default", () => {
    expect(business.bookingUrl).toBeNull();
  });
});

describe("FAQ content", () => {
  it("has a unique id per question", () => {
    const ids = faqs.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every question a substantive answer", () => {
    for (const faq of faqs) {
      expect(faq.answer.trim().length).toBeGreaterThan(40);
      expect(faq.question.endsWith("?")).toBe(true);
    }
  });

  it("features a handful of questions on the homepage, not all of them", () => {
    const featured = faqs.filter((f) => f.featured);
    expect(featured.length).toBeGreaterThan(2);
    expect(featured.length).toBeLessThan(faqs.length);
  });

  it("marks the booking-critical questions", () => {
    const critical = faqs.filter((f) => f.bookingCritical).map((f) => f.id);
    expect(critical).toContain("prep");
    expect(critical).toContain("deposit");
    expect(critical).toContain("how-priced");
  });
});

describe("SEO metadata", () => {
  it("gives every route a unique path", () => {
    const paths = routeSeo.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("gives every route a unique title", () => {
    const titles = routeSeo.map((r) => r.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives every route a unique description of a sensible length", () => {
    const descriptions = routeSeo.map((r) => r.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const description of descriptions) {
      expect(description.length).toBeGreaterThan(60);
      expect(description.length).toBeLessThan(320);
    }
  });

  it("resolves metadata for every launch route", () => {
    for (const path of ["/", "/services", "/experience", "/gallery", "/about", "/faq"]) {
      expect(seoFor(path)).toBeDefined();
    }
  });
});

describe("formatting helpers", () => {
  it("formats whole-dollar amounts", () => {
    expect(usd(150)).toBe("$150");
    expect(usd(1200)).toBe("$1,200");
  });

  it("formats price ranges and collapses equal bounds", () => {
    expect(priceRange(150, 350)).toBe("$150–$350");
    expect(priceRange(200, 200)).toBe("$200");
  });

  it("renders half hours as a fraction rather than a decimal", () => {
    expect(durationRange(1.5, 2)).toBe("1½–2 hours");
    expect(durationRange(6, 8)).toBe("6–8 hours");
    expect(durationRange(3, 3)).toBe("3 hours");
  });
});
