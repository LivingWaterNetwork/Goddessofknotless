import { test, expect } from "@playwright/test";

test.describe("metadata", () => {
  const routes = ["/", "/services", "/experience", "/gallery", "/about", "/faq"];

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

    for (const path of ["/services", "/experience", "/gallery", "/about", "/faq", "/policies"]) {
      expect(xml).toContain(path);
    }
    for (const slug of ["jumbo", "large", "medium-large", "microbraids"]) {
      expect(xml).toContain(`/services/${slug}`);
    }
  });

  test("robots.txt points at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("sitemap.xml");
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
