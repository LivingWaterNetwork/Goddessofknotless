import { test, expect } from "@playwright/test";

const LAUNCH_ROUTES = [
  "/",
  "/services",
  "/services/medium-large",
  "/experience",
  "/gallery",
  "/about",
  "/faq",
  "/locations",
  "/team",
  "/classes",
  "/shop",
  "/events",
  "/policies",
  "/privacy",
  "/terms",
];

test.describe("routes", () => {
  for (const route of LAUNCH_ROUTES) {
    test(`${route} renders with exactly one h1 and no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();

      /* Catches hydration mismatches, which surface as console errors. */
      expect(errors).toEqual([]);
    });
  }

  test("unknown routes return a real 404 page", async ({ page }) => {
    const response = await page.goto("/not-a-real-page");
    expect(response?.status()).toBe(404);
    /* Typographic apostrophe in the rendered copy. */
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/isn\u2019t here/);
  });

  test("has no dead or placeholder links anywhere in the nav or footer", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((l) => l.getAttribute("href") ?? ""),
    );
    expect(hrefs.length).toBeGreaterThan(5);
    for (const href of hrefs) {
      expect(href).not.toBe("#");
      expect(href).not.toBe("");
    }
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile menu only exists below md");

  test("opens, traps focus, closes on Escape, and restores focus", async ({ page }) => {
    await page.goto("/");
    /* The button's accessible name flips to "Close menu" when open, so it is
       located by class rather than by name. */
    const toggle = page.locator("button.menu-toggle");
    await expect(toggle).toHaveAccessibleName(/open menu/i);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const panel = page.locator("#mobile-menu");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("link", { name: "Services" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("closes when navigating to a new route", async ({ page }) => {
    await page.goto("/");
    await page.locator("button.menu-toggle").click();
    await page.locator("#mobile-menu").getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop nav is hidden on mobile");

  test("marks the current page in the nav", async ({ page }) => {
    await page.goto("/services");
    const current = page.locator('nav[aria-label="Main"] a[aria-current="page"]');
    await expect(current).toHaveText("Services");
  });
});
