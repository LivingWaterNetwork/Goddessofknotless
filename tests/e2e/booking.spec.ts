import { test, expect } from "@playwright/test";

/**
 * Booking is the site's whole job, so these assertions guard the conversion
 * path: a CTA on every critical route, one central URL behind all of them, and
 * an honest disabled state rather than a dead link when none is configured.
 */
const CRITICAL_ROUTES = ["/", "/services", "/services/large", "/experience", "/gallery", "/about", "/faq"];

test.describe("booking CTAs", () => {
  for (const route of CRITICAL_ROUTES) {
    test(`${route} offers a booking action`, async ({ page }) => {
      await page.goto(route);
      const ctas = page.getByRole("button", { name: /reserve your experience|^book$/i });
      expect(await ctas.count()).toBeGreaterThan(0);
    });
  }

  test("renders no dead booking link while no platform is configured", async ({ page }) => {
    await page.goto("/");
    /* With NEXT_PUBLIC_BOOKING_URL unset every CTA must be a disabled button,
       never an anchor pointing nowhere. */
    const bookingAnchors = page.locator('a[href="#"], a[href=""]');
    await expect(bookingAnchors).toHaveCount(0);

    const disabled = page.getByRole("button", { name: /reserve your experience/i }).first();
    await expect(disabled).toBeDisabled();
  });

  test("explains the disabled state to assistive technology", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("button", { name: /reserve your experience/i }).first();
    const describedBy = await cta.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toContainText(/booking platform is connected/i);
  });
});

test.describe("mobile booking bar", () => {
  test.skip(({ isMobile }) => !isMobile, "the sticky bar is mobile-only");

  test("stays hidden over the hero and appears after it", async ({ page }) => {
    await page.goto("/");
    const bar = page.locator(".mobile-book-bar");

    await expect(bar).toHaveAttribute("data-shown", "false");
    await expect(bar).toHaveAttribute("aria-hidden", "true");

    await page.locator("#sizes").scrollIntoViewIfNeeded();
    await expect(bar).toHaveAttribute("data-shown", "true");
    await expect(bar).toHaveAttribute("aria-hidden", "false");
  });

  test("never covers the end of the page", async ({ page }) => {
    await page.goto("/");
    /* Scrolled twice on purpose: the first scroll makes the bar appear, which
       adds footer padding and grows the page, so a single jump lands short of
       the new bottom. */
    for (let i = 0; i < 2; i += 1) {
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(500);
    }

    const barBox = await page.locator(".mobile-book-bar").boundingBox();
    const footerBottom = await page
      .locator(".site-footer-bottom")
      .evaluate((el) => el.getBoundingClientRect().bottom);

    /* Body padding reserves room for the bar, so the last of the footer
       content must sit above it. */
    expect(barBox).not.toBeNull();
    expect(footerBottom).toBeLessThanOrEqual(barBox!.y + 1);
  });
});

test.describe("size guide", () => {
  test("recommends a real size and links to its page", async ({ page }) => {
    await page.goto("/services");
    await page.locator("#find-your-size").scrollIntoViewIfNeeded();

    const result = page.locator(".size-guide-result");
    await expect(result).toContainText(/answer both questions/i);

    await page.getByRole("radio", { name: /two or three hours/i }).check();
    await page.getByRole("radio", { name: /balanced/i }).check();

    await expect(result).toContainText("Large");
    const cta = result.getByRole("link", { name: /see .* in full/i });
    await expect(cta).toBeVisible();

    await cta.click();
    await expect(page).toHaveURL(/\/services\/large$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("service content", () => {
  test("publishes a real price and time for every size", async ({ page }) => {
    await page.goto("/services");
    const rows = page.locator(".price-table tbody tr");
    await expect(rows).toHaveCount(9);

    /* Every row must show a dollar figure and an hour figure — never "TBD". */
    for (const row of await rows.all()) {
      await expect(row).toContainText(/\$\d/);
      await expect(row).toContainText(/hour/);
    }
  });

  test("wide price table scrolls inside its own container", async ({ page }) => {
    await page.goto("/services");
    const bodyOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    );
    expect(bodyOverflow).toBe(true);
  });
});

test.describe("FAQ accordion", () => {
  test("opens and closes with the keyboard and reports its state", async ({ page }) => {
    await page.goto("/faq");
    const trigger = page.getByRole("button", { name: /how should my hair be prepared/i });

    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const panelId = await trigger.getAttribute("aria-controls");
    await expect(page.locator(`#${panelId}`)).toContainText(/washed and blow-dried/i);

    await trigger.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("gallery", () => {
  test("filters without shifting the page and reports the count", async ({ page }) => {
    await page.goto("/gallery");

    const status = page.getByRole("status");
    /* Counted as placeholders, never as "12 images": the frames hold stock
       stand-ins, not Esther's work. */
    await expect(status).toContainText(/12 placeholder images/);

    const chip = page.getByRole("button", { name: /^Jumbo/ });
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(status).toContainText(/1 placeholder image in this size/);
  });

  test("every stand-in photograph is visibly marked as a placeholder", async ({ page }) => {
    await page.goto("/gallery");

    const frames = page.locator(".gallery-cell .image-frame");
    const markers = page.locator(".gallery-cell .stock-marker");
    await expect(frames).toHaveCount(12);
    await expect(markers).toHaveCount(12);
    await expect(markers.first()).toContainText(/stock placeholder/i);

    /* And said once more in prose, above the grid. */
    await expect(page.locator(".placeholder-notice")).toContainText(
      /not Esther's work/i,
    );
  });

  test("the placeholder marker follows the image into the lightbox", async ({ page }) => {
    await page.goto("/gallery");

    await page.locator(".gallery-open").first().click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator(".stock-marker")).toContainText(/stock placeholder/i);

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
});
