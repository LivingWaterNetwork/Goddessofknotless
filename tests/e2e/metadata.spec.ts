import { test, expect } from "@playwright/test";

test.describe("metadata", () => {
  const routes = ["/", "/services", "/experience", "/gallery", "/about", "/faq", "/locations", "/team", "/classes", "/shop", "/events"];

  test("every route has a unique, non-empty title and description", async ({ page }) => {
    const seen = new Map<string, string>();

    for (const route of routes) {
      await page.goto(route);
      const title = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");

      expect(title.length).toBeGreaterThan(10);
      expect(description?.length ?? 0).toBeGreaterThan(50);
      expect(seen.has(title)).toBe(false);
      seen.set(title, route);

      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    }
  });

  test("sitemap lists every launch route and every service", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();

    for (const path of [
      "/services",
      "/experience",
      "/gallery",
      "/about",
      "/faq",
      "/policies",
      "/locations",
      "/team",
    ]) {
      expect(xml).toContain(path);
    }
    for (const slug of ["jumbo", "large", "medium-large", "microbraids"]) {
      expect(xml).toContain(`/services/${slug}`);
    }
  });

  /* A "not available yet" page ranking against the pages that actually sell
     something is a net loss, so the roadmap routes stay out of the sitemap and
     out of the index until the offering behind them is real. */
  test("sitemap excludes routes whose offering does not exist yet", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/classes", "/shop", "/events"]) {
      expect(xml).not.toContain(path);
    }
  });

  test("roadmap routes are reachable but never indexable", async ({ page }) => {
    for (const path of ["/classes", "/shop", "/events"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      /* And they say so on the page, not only in a meta tag. */
      await expect(page.locator(".planned-notice").first()).toContainText(/not/i);
    }
  });

  test("robots.txt blocks crawlers on a review deployment", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();

    /* Locally and on any preview/review deployment, NEXT_PUBLIC_SITE_URL is not
       the canonical domain, so everything must be disallowed. A review link that
       Google can crawl would index placeholder content. */
    expect(body).toContain("Disallow: /");
    expect(body).not.toContain("Allow: /");
  });

  test("pages carry noindex on a review deployment", async ({ page }) => {
    await page.goto("/");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("open graph image renders", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("structured data contains only verified facts", async ({ page }) => {
    await page.goto("/");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = blocks.map((b) => JSON.parse(b) as Record<string, unknown>);

    const salon = parsed.find((p) => p["@type"] === "HairSalon");
    expect(salon).toBeDefined();
    expect(salon!.name).toBe("Goddess of Knotless");

    /* These MUST be absent: no address is confirmed, and self-authored review
       markup breaks Google's policy and the FTC testimonial rule. */
    expect(salon!.address).toBeUndefined();
    expect(salon!.telephone).toBeUndefined();
    expect(salon!.aggregateRating).toBeUndefined();
    expect(salon!.review).toBeUndefined();
    expect(salon!.openingHours).toBeUndefined();
  });

  test("service pages emit Service and BreadcrumbList data", async ({ page }) => {
    await page.goto("/services/large");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.map((b) => (JSON.parse(b) as Record<string, unknown>)["@type"]);
    expect(types).toContain("Service");
    expect(types).toContain("BreadcrumbList");
  });

  test("FAQ page marks up only verified answers", async ({ page }) => {
    await page.goto("/faq");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faqBlock = blocks
      .map((b) => JSON.parse(b) as Record<string, unknown>)
      .find((p) => p["@type"] === "FAQPage");

    expect(faqBlock).toBeDefined();
    const entries = faqBlock!.mainEntity as { name: string }[];
    /* The deposit question is unconfirmed, so it must not be marked up. */
    expect(entries.some((e) => /deposit required/i.test(e.name))).toBe(false);
  });
});
