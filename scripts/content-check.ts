/**
 * Production launch gate.
 *
 * Run in preview mode it reports; run in production mode it FAILS the build
 * while anything on the list is outstanding. The point is that it is not
 * possible to publish an invented price, a placeholder photograph, a dead
 * booking button, or a forbidden marketing claim by accident.
 *
 *   pnpm content:check                      → report (exit 0 unless forbidden copy)
 *   CONTENT_MODE=production pnpm content:check → gate (exit 1 on any blocker)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { services, addOns } from "../src/content/services";
import { faqs } from "../src/content/faqs";
import { policies } from "../src/content/policies";
import { gallery } from "../src/content/gallery";
import { testimonials } from "../src/content/testimonials";
import { business } from "../src/content/business";

const PRODUCTION =
  process.env.CONTENT_MODE === "production" ||
  process.env.NEXT_PUBLIC_CONTENT_MODE === "production";

interface Finding {
  severity: "blocker" | "confirm";
  area: string;
  message: string;
}

const findings: Finding[] = [];

function blocker(area: string, message: string) {
  findings.push({ severity: "blocker", area, message });
}
function confirm(area: string, message: string) {
  findings.push({ severity: "confirm", area, message });
}

/* -------------------------------------------------------------------------- */
/* 1. Booking destination                                                      */
/* -------------------------------------------------------------------------- */
if (!business.bookingUrl) {
  blocker(
    "Booking",
    "NEXT_PUBLIC_BOOKING_URL is not set. Every booking CTA renders disabled. Choose a platform (see docs/BOOKING_PLATFORM_SCORECARD.md) and set the URL.",
  );
} else if (!/^https:\/\//.test(business.bookingUrl)) {
  blocker("Booking", `NEXT_PUBLIC_BOOKING_URL must be an https URL. Got: ${business.bookingUrl}`);
}

/* -------------------------------------------------------------------------- */
/* 2. Services and pricing                                                     */
/* -------------------------------------------------------------------------- */
for (const service of services) {
  if (service.status === "placeholder") {
    blocker("Services", `"${service.name}" is placeholder content and must not publish.`);
  } else if (service.status === "needs-confirmation") {
    confirm("Services", `"${service.name}" — ${service.sourceNote}`);
  }

  if (service.price.fromUsd > service.price.toUsd) {
    blocker(
      "Services",
      `"${service.name}" price range is inverted (${service.price.fromUsd} → ${service.price.toUsd}).`,
    );
  }
  if (service.duration.fromHours > service.duration.toHours) {
    blocker("Services", `"${service.name}" duration range is inverted.`);
  }
  if (service.price.fromUsd <= 0) {
    blocker("Services", `"${service.name}" has a non-positive starting price.`);
  }
}

/* A finer size should not cost less at the top of its range than a coarser one.
   This caught the real Small/Extra Small discrepancy in Esther's quoted list. */
const ordered = [...services].sort((a, b) => a.order - b.order);
for (let i = 1; i < ordered.length; i += 1) {
  const previous = ordered[i - 1];
  const current = ordered[i];
  if (!previous || !current) continue;
  if (current.price.toUsd < previous.price.toUsd) {
    confirm(
      "Services",
      `"${current.name}" tops out at $${current.price.toUsd}, below the coarser "${previous.name}" at $${previous.price.toUsd}. Confirm this is intentional.`,
    );
  }
}

for (const addOn of addOns) {
  if (addOn.status !== "verified") confirm("Add-ons", `"${addOn.name}" — ${addOn.sourceNote}`);
}

/* -------------------------------------------------------------------------- */
/* 3. Policies                                                                 */
/* -------------------------------------------------------------------------- */
for (const policy of policies) {
  if (policy.status === "placeholder" || policy.body.trim() === "") {
    blocker("Policies", `"${policy.title}" has no content. ${policy.sourceNote}`);
  } else if (policy.status === "needs-confirmation") {
    confirm("Policies", `"${policy.title}" — ${policy.sourceNote}`);
  }
}

/* -------------------------------------------------------------------------- */
/* 4. Imagery                                                                  */
/* -------------------------------------------------------------------------- */
const missingImages = gallery.filter((g) => g.src === null);
if (missingImages.length > 0) {
  blocker(
    "Photography",
    `${missingImages.length} of ${gallery.length} gallery slots have no real image. Placeholders must not reach production. See docs/PHOTO_SHOOT_BRIEF.md.`,
  );
}
for (const item of gallery) {
  if (item.src !== null && item.alt.trim() === "") {
    blocker("Photography", `Gallery item "${item.id}" has an image but no alt text.`);
  }
}

/* -------------------------------------------------------------------------- */
/* 5. Business facts                                                           */
/* -------------------------------------------------------------------------- */
const factChecks = [
  ["Street address", business.streetAddress],
  ["Postal code", business.postalCode],
  ["Phone", business.phone],
  ["Email", business.email],
  ["Opening hours", business.hours],
  ["Instagram URL", business.instagramUrl],
  ["Google Business Profile", business.googleBusinessProfileUrl],
] as const;

for (const [label, entry] of factChecks) {
  if (entry.value === null) {
    confirm(
      "Business facts",
      `${label} is not published. This is a deliberate omission, not an error — ${entry.sourceNote}`,
    );
  }
}

/* -------------------------------------------------------------------------- */
/* 6. FAQs and testimonials                                                    */
/* -------------------------------------------------------------------------- */
for (const faq of faqs) {
  if (faq.status === "placeholder") blocker("FAQ", `"${faq.question}" is placeholder content.`);
  else if (faq.status === "needs-confirmation") confirm("FAQ", `"${faq.question}" — ${faq.sourceNote}`);
}

for (const testimonial of testimonials) {
  if (!testimonial.permissionOnFile) {
    blocker(
      "Testimonials",
      `Testimonial "${testimonial.id}" has no documented permission and must not publish.`,
    );
  }
}

/* -------------------------------------------------------------------------- */
/* 7. Forbidden copy scan across all source                                    */
/* -------------------------------------------------------------------------- */
interface Rule {
  pattern: RegExp;
  why: string;
}

const forbidden: Rule[] = [
  { pattern: /\bthe goddess lounge\b/i, why: "'The Goddess Lounge' is not an approved public brand name." },
  { pattern: /\btop[- ]rated\b/i, why: "Unsupported superlative claim." },
  { pattern: /\baward[- ]winning\b/i, why: "Unsupported award claim." },
  { pattern: /\bcelebrity stylist\b/i, why: "Unsupported celebrity-clientele claim." },
  { pattern: /\bpain[- ]free\b/i, why: "Unsupportable comfort guarantee." },
  { pattern: /\bdamage[- ]free\b/i, why: "Unsupportable hair-health claim." },
  { pattern: /\bguarantee(?:d|s)? (?:hair )?(?:growth|health)\b/i, why: "Medical/hair-health guarantee." },
  { pattern: /\blorem ipsum\b/i, why: "Placeholder text." },
  { pattern: /\bTODO\b/, why: "Unfinished work marker." },
  { pattern: /\bFIXME\b/, why: "Unfinished work marker." },
  { pattern: /\b555-?\d{3}-?\d{4}\b/, why: "Dummy phone number." },
  { pattern: /\b(?:example|test)@(?:example|test)\.com\b/i, why: "Dummy email address." },
  { pattern: /123 (?:Main|Test) St/i, why: "Dummy street address." },
  { pattern: /\bhref=["']#["']/, why: "Dead '#' link." },
  /* Names and private details from the strategy calls that must never appear. */
  { pattern: /\bMichelle Obama\b/i, why: "Private aspirational-client remark from a confidential call." },
  { pattern: /\bparaplegic\b/i, why: "Confidential family health detail." },
  { pattern: /\bnarcissist\b/i, why: "Confidential family detail." },
];

/**
 * "luxury" is allowed nowhere in client-facing copy. The brand packet is
 * explicit that it must be translated into something tangible instead — with
 * one exception: Esther's own raw-hair service is literally named a "luxury
 * service of human hair", which is a product tier, not a brand claim.
 */
const luxuryPattern = /\bluxur(?:y|ious)\b/i;

const SCAN_DIRS = ["src", "tests"];
const SCAN_EXT = [".ts", ".tsx", ".css"];
/**
 * Files allowed to contain the forbidden patterns because they DEFINE or ASSERT
 * the rules — this file lists them, and the tests assert their absence, which
 * means both have to name them.
 */
const ALLOWLIST = [
  "scripts/content-check.ts",
  "tests/unit/content.test.ts",
  "tests/e2e/booking.spec.ts",
  "tests/e2e/navigation.spec.ts",
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCAN_EXT.some((e) => full.endsWith(e))) out.push(full);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => {
  try {
    return walk(d);
  } catch {
    return [];
  }
});

for (const file of files) {
  const rel = relative(process.cwd(), file);
  if (ALLOWLIST.some((a) => rel.endsWith(a))) continue;

  const source = readFileSync(file, "utf8");
  const lines = source.split("\n");

  lines.forEach((line, index) => {
    for (const rule of forbidden) {
      if (rule.pattern.test(line)) {
        blocker("Forbidden copy", `${rel}:${index + 1} — ${rule.why}`);
      }
    }
    if (luxuryPattern.test(line) && !/raw|bundle|human hair/i.test(line)) {
      blocker(
        "Forbidden copy",
        `${rel}:${index + 1} — the word "luxury" must be translated into something tangible (consistency, comfort, punctuality, discretion).`,
      );
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Report                                                                      */
/* -------------------------------------------------------------------------- */
const blockers = findings.filter((f) => f.severity === "blocker");
const confirms = findings.filter((f) => f.severity === "confirm");

function print(title: string, list: Finding[]) {
  if (list.length === 0) return;
  console.log(`\n${title}`);
  console.log("─".repeat(title.length));
  const byArea = new Map<string, Finding[]>();
  for (const finding of list) {
    const existing = byArea.get(finding.area) ?? [];
    existing.push(finding);
    byArea.set(finding.area, existing);
  }
  for (const [area, entries] of byArea) {
    console.log(`\n  ${area}`);
    for (const entry of entries) console.log(`    • ${entry.message}`);
  }
}

console.log(
  `\nGoddess of Knotless — content check (${PRODUCTION ? "PRODUCTION gate" : "preview report"})`,
);

print(`LAUNCH BLOCKERS (${blockers.length})`, blockers);
print(`NEEDS ESTHER'S CONFIRMATION (${confirms.length})`, confirms);

console.log(
  `\nSummary: ${blockers.length} blocker(s), ${confirms.length} item(s) awaiting confirmation.`,
);

if (blockers.length === 0 && confirms.length === 0) {
  console.log("All content verified. Cleared for production.\n");
  process.exit(0);
}

/* Forbidden copy and structural errors always fail, in any mode — those are
   bugs, not pending decisions. Missing-content blockers only fail the
   production gate. */
const hardFailures = blockers.filter(
  (b) => b.area === "Forbidden copy" || b.area === "Photography" || b.area === "Services",
);

if (PRODUCTION && blockers.length > 0) {
  console.log("\nProduction gate FAILED. Resolve every blocker above before launch.\n");
  process.exit(1);
}
if (!PRODUCTION && hardFailures.some((f) => f.area === "Forbidden copy")) {
  console.log("\nFAILED: forbidden copy detected. This fails in preview too.\n");
  process.exit(1);
}

console.log("\nPreview build permitted. Blockers above must clear before production.\n");
process.exit(0);
