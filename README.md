# Goddess of Knotless

Trust-led website and booking front end for **Goddess of Knotless**, a referral-built knotless
braiding studio in Chicago's West Loop, founded by Esther Parkman in 2020.

Built with Next.js App Router, React 19, TypeScript in strict mode, and Tailwind CSS v4.

**Status: first draft for client review.** Complete and tested; not launched. Six content
blockers stand between this and production — run `pnpm content:check` to see them, or read
[`docs/CONTENT_CONFIRMATIONS.md`](docs/CONTENT_CONFIRMATIONS.md).

---

## Quick start

```bash
pnpm install
cp .env.example .env.local     # optional; the site runs without any variables set
pnpm dev                       # http://localhost:3000
```

No environment variables are required to run locally. Without `NEXT_PUBLIC_BOOKING_URL` the
booking buttons render as clearly disabled controls rather than dead links — which is the correct
behaviour, not a bug.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build (24 static/SSG routes) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint, `next/core-web-vitals` + `next/typescript` |
| `pnpm typecheck` | `tsc --noEmit`, strict + `noUncheckedIndexedAccess` |
| `pnpm test` | Vitest unit tests (37) |
| `pnpm test:e2e` | Playwright, mobile + desktop, including axe accessibility (110) |
| `pnpm content:check` | Launch gate: lists every unverified fact and forbidden-copy match |
| `pnpm qa` | The full pre-launch sequence: lint, types, tests, content check, build |

`pnpm test:e2e` builds and starts the app itself. Chromium is expected at
`/opt/pw-browsers/chromium` in this environment; override with `PLAYWRIGHT_CHROMIUM_PATH`.

---

## Architecture

```
src/
  app/                    # App Router. Server components by default
    services/[slug]/      # One page per braid size, statically generated
    opengraph-image.tsx   # Branded social image, generated at build time
    icon.tsx              # Favicon, generated
    sitemap.ts robots.ts  # Generated from the content layer
  components/
    layout/               # Header (server) + MobileMenu / NavLink (client islands), Footer, MobileBookBar
    sections/             # Page sections: Hero, HairTimePrivacy, SignatureSizes, …
    ui/                   # Button, Section, ServiceCard, Accordion, Gallery, ImageFrame, …
  content/                # THE SINGLE SOURCE OF TRUTH — see below
  lib/                    # format, analytics, structured-data, page-metadata
  styles/globals.css      # Design tokens and component styles
scripts/content-check.ts  # The production launch gate
tests/unit  tests/e2e
docs/                     # Client handoff documentation
docs/qa/                  # 32 QA screenshots, 4 breakpoints
```

### The content layer is the important part

Every public fact lives in `src/content/` as typed data, never as a string in a component. A price
appears in one place and propagates to the card, the comparison table, the service page, the meta
description, and the JSON-LD. **Prices cannot contradict each other**, because there is only one
of each.

Every fact also carries a **verification status** — `verified`, `needs-confirmation`, or
`placeholder` — and an internal `sourceNote` recording where it came from. The source notes are
never rendered publicly; they exist so the handoff docs can cite provenance.

### The launch gate

`scripts/content-check.ts` is what stops an unverified fact reaching the public.

```bash
pnpm content:check                          # report
CONTENT_MODE=production pnpm content:check  # gate — exits 1 on any blocker
```

It fails on: a missing or non-HTTPS booking URL; any placeholder content; an inverted price or
duration range; a gallery image without alt text; a testimonial without documented permission; and
any forbidden copy — unsupported superlatives, medical or comfort guarantees, the unapproved
"Lounge" descriptor, dummy contact details, `TODO`/`FIXME`, or private details from the strategy
calls.

It also asserts an invariant the data must satisfy: **price and duration must rise as braids get
finer.** That check caught a real discrepancy in the price list Esther read aloud.

---

## Environment variables

See `.env.example`. All are optional for local development.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_BOOKING_URL` | **The booking destination.** Every CTA on the site reads this one value, so changing platforms needs no code change |
| `NEXT_PUBLIC_REBOOK_URL` | Optional returning-client deep link; the control hides itself if unset |
| `NEXT_PUBLIC_CONTENT_MODE` | `preview` (default) shows internal verification badges. `production` hides them and makes the content check a hard gate |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Off by default; requires the client's approval |

No secrets are needed by the site. Nothing sensitive is committed.

---

## Editing content

| To change | Edit |
|---|---|
| Prices, durations, sizes, descriptions, add-ons | `src/content/services.ts` |
| FAQ | `src/content/faqs.ts` |
| Policies | `src/content/policies.ts` |
| Address, phone, hours, social links | `src/content/business.ts` |
| Photography | `src/content/gallery.ts` |
| Testimonials | `src/content/testimonials.ts` |
| Titles and meta descriptions | `src/content/seo.ts` |
| Optional routes and sections | `src/content/features.ts` |

Adding a size means adding one record to `services.ts`. Its detail page, its sitemap entry, its
gallery filter, its structured data, and its slot in the size guide all follow automatically.

### Adding photography

1. Put files in `public/images/gallery/`.
2. In `src/content/gallery.ts`, replace each `placeholder(...)` with a real record: set `src`,
   write the `alt`, add a `caption` if size and length were recorded, set `status: "verified"`.
3. `pnpm content:check` — the photography blocker clears when every slot has a real image.

No layout work is needed. Every frame already reserves its aspect ratio, so real images drop in
with **zero layout shift** (the site measures CLS 0.000 and stays there).

---

## Design system

Brand tokens in `src/styles/globals.css`, from the vision-aligned brand packet:

| | |
|---|---|
| Emerald `#064E3B` | Confident structure |
| Olive `#718B45` | Used sparingly |
| Gold `#C8A34A` | Restrained accent — **never body copy** |
| Ivory `#F8F5ED` | Primary breathing space |
| Onyx `#191919` | Body text and dark sections |

Two tokens exist specifically for accessibility: `--color-gold-text` and
`--color-gold-text-on-dark`. Full gold is only 4.06:1 on emerald and 4.49:1 on ivory, so it fails
AA as small text on both. Use these tokens for gold *text*; keep full gold for rules, borders,
and large display type.

Typography: **Cormorant Garamond** (editorial serif), **Montserrat** (primary sans), **DM Sans**
(body), self-hosted via `next/font`. Only the four faces actually used are shipped.

Components reference semantic class names, not raw values. No hex codes belong in JSX.

---

## Testing and quality

| | |
|---|---|
| Unit | 37 tests: service integrity, price/duration monotonicity, feature flags, content-gate invariants, formatting, SEO uniqueness |
| End-to-end | 110 tests across mobile and desktop: routes, navigation, mobile menu focus management, booking CTA presence, size guide, gallery filtering, FAQ accordion, metadata, sitemap, structured data |
| Accessibility | axe-core WCAG 2.2 AA on all ten routes plus open menu and accordion states — **zero violations**. Plus asserted manual checks: 320 px, 200% zoom, target sizes, reduced motion, heading order, sticky-header clearance |
| Measured vitals | LCP 180 ms, CLS 0.000 |

Full results, including an honest account of where Lighthouse's *simulated* LCP disagrees with
measurement by 16×, in [`docs/QA_REPORT.md`](docs/QA_REPORT.md).

---

## Documentation

| Document | For |
|---|---|
| [`CLIENT_HANDOFF.md`](docs/CLIENT_HANDOFF.md) | **Start here.** Plain-language guide for Esther |
| [`CONTENT_CONFIRMATIONS.md`](docs/CONTENT_CONFIRMATIONS.md) | Every unverified fact, with a sign-off sheet |
| [`PHOTO_SHOOT_BRIEF.md`](docs/PHOTO_SHOOT_BRIEF.md) | Exact shot list and technical requirements |
| [`BOOKING_PLATFORM_SCORECARD.md`](docs/BOOKING_PLATFORM_SCORECARD.md) | Weighted vendor comparison and recommendation |
| [`RESEARCH_AND_STRATEGY.md`](docs/RESEARCH_AND_STRATEGY.md) | Competitive gap, audience, strategic decisions, assumptions |
| [`LOCAL_SEO_LAUNCH.md`](docs/LOCAL_SEO_LAUNCH.md) | Google Business Profile and search launch |
| [`ANALYTICS_PLAN.md`](docs/ANALYTICS_PLAN.md) | Event dictionary and 30-day measurement plan |
| [`QA_REPORT.md`](docs/QA_REPORT.md) | Test results, accessibility findings, issues fixed |
| [`LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md) | The full path to going live, plus rollback |
| [`30_DAY_OPTIMIZATION_PLAN.md`](docs/30_DAY_OPTIMIZATION_PLAN.md) | What to measure after launch |
| [`ASSET_INVENTORY.md`](docs/ASSET_INVENTORY.md) | Assets approved, missing, and rejected |

---

## Deployment

Deploys as a standard Next.js project on Vercel. **It needs its own new Vercel project** — do not
attach it to any existing Living Water Network project. Step-by-step instructions are in
[`CLIENT_HANDOFF.md`](docs/CLIENT_HANDOFF.md).

Set `NEXT_PUBLIC_CONTENT_MODE=production` for the production environment only, and confirm
`CONTENT_MODE=production pnpm content:check` exits 0 before promoting.

---

## Conventions worth knowing

- **Server components by default.** Client components only where interaction requires them — the
  header is a server component with two small client islands.
- **No raw hex in JSX.** Semantic tokens only.
- **No hard-coded booking URLs.** Everything reads `business.bookingUrl`.
- **No invented facts.** If something is not verified it is omitted or marked, never guessed.
  Prefer an empty section to a plausible fabrication.
- **Motion is restrained** and respects `prefers-reduced-motion`. No scroll hijacking, no
  autoplay, no custom cursors, no loaders.
- **Aspect ratios are always reserved** so images cause no layout shift.
