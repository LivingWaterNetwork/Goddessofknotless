import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
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

test.describe("automated accessibility", () => {
  for (const route of ROUTES) {
    test(`${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      /* Fail loudly with the rule ids so a regression is diagnosable. */
      expect(
        results.violations.map((v) => `${v.id} (${v.nodes.length} node(s)): ${v.help}`),
      ).toEqual([]);
    });
  }

  test("open mobile menu has no violations", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    await page.locator("button.menu-toggle").click();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  test("open FAQ accordion has no violations", async ({ page }) => {
    await page.goto("/faq");
    await page.getByRole("button", { name: /how should my hair be prepared/i }).click();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

test.describe("manual accessibility guarantees", () => {
  test("remains usable at 320px wide with no horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    for (const route of ["/", "/services", "/gallery", "/faq"]) {
      await page.goto(route);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(overflows, `${route} scrolls horizontally at 320px`).toBe(false);
    }
  });

  test("remains usable at 200% zoom", async ({ page }) => {
    /* 200% zoom on a 1280px viewport is equivalent to a 640px CSS viewport. */
    await page.setViewportSize({ width: 640, height: 512 });
    await page.goto("/services");
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflows).toBe(false);
  });

  test("every interactive control meets the 24px minimum target size", async ({ page }) => {
    await page.goto("/");
    const tooSmall = await page.evaluate(() => {
      const selectors = "a[href], button:not([disabled]), input, [tabindex]:not([tabindex='-1'])";
      const offenders: string[] = [];
      for (const el of Array.from(document.querySelectorAll(selectors))) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue; // hidden
        if (rect.height < 24 || rect.width < 24) {
          offenders.push(`${el.tagName}.${el.className} ${Math.round(rect.width)}x${Math.round(rect.height)}`);
        }
      }
      return offenders;
    });
    expect(tooSmall).toEqual([]);
  });

  test("respects reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    /* Reveal elements must already be shown, not waiting on an animation. */
    const hidden = await page.locator('.reveal:not([data-shown="true"])').count();
    expect(hidden).toBe(0);
  });

  test("headings descend in order on every route", async ({ page }) => {
    for (const route of ["/", "/services", "/experience", "/about", "/faq"]) {
      await page.goto(route);
      const levels = await page.locator("h1, h2, h3, h4").evaluateAll((els) =>
        els.map((el) => Number(el.tagName.slice(1))),
      );
      expect(levels[0], `${route} does not start at h1`).toBe(1);
      for (let i = 1; i < levels.length; i += 1) {
        expect(
          levels[i]! - levels[i - 1]!,
          `${route} jumps from h${levels[i - 1]} to h${levels[i]}`,
        ).toBeLessThanOrEqual(1);
      }
    }
  });

  test("sticky header never covers a focused element", async ({ page }) => {
    await page.goto("/faq");
    const headerHeight = await page
      .locator(".site-header")
      .evaluate((el) => el.getBoundingClientRect().height);

    /* Tab through the first several controls and confirm each stays clear. */
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press("Tab");
      const box = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        /* Controls inside the header are not obscured BY the header. */
        if (el.closest(".site-header")) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top, height: r.height };
      });
      if (!box || box.height === 0) continue;
      if (box.top < 0) continue; // scrolled out of view above
      expect(box.top + box.height).toBeGreaterThan(headerHeight - 1);
    }
  });
});
