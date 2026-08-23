# QA Report

Date: 23 August 2026. All results below are from a **production build** (`pnpm build` +
`pnpm start`), not the development server.

---

## Commands run

```bash
pnpm lint            # ESLint, next/core-web-vitals + next/typescript — clean
pnpm typecheck       # tsc --noEmit, strict + noUncheckedIndexedAccess — clean
pnpm test            # Vitest — 37 passed
pnpm content:check   # Launch gate — 6 blockers, 12 confirmations (expected; see below)
pnpm build           # 24 routes, all static or SSG
pnpm test:e2e        # Playwright — 110 passed, 6 skipped, 0 failed
```

## Results summary

| Check | Result |
|---|---|
| ESLint | Clean, zero warnings |
| TypeScript strict | Clean |
| Unit tests | **37 / 37 passed** |
| End-to-end tests | **110 passed, 6 skipped (viewport-specific), 0 failed** |
| axe-core WCAG 2.2 AA | **0 violations across all 10 launch routes**, plus open menu and open accordion states |
| Lighthouse accessibility | **100** on every route tested |
| Lighthouse best practices | **100** |
| Lighthouse SEO | **100** |
| Console errors / hydration warnings | **None** on any route |
| Broken links or `#` hrefs | **None** |

---

## Performance

### Measured Core Web Vitals (real observation, `PerformanceObserver`)

| Condition | FCP | LCP | CLS |
|---|---|---|---|
| Mobile, unthrottled | 180 ms | **180 ms** | **0.000** |
| Mobile, 4× CPU throttle + Fast 3G | 1004 ms | **1004 ms** | **0.000** |

LCP element is the hero `<h1>` — as intended for a text-led hero. **CLS is exactly zero** in both
conditions, because every image frame reserves its aspect ratio and `next/font` ships matched
fallback metrics.

### Lighthouse lab scores (simulated mobile)

| Route | Perf | A11y | Best Practices | SEO | LCP (simulated) | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 89 | 100 | 100 | 100 | 3.1 s | 0 | 250 ms |
| `/services` | 94 | 100 | 100 | 100 | 2.9 s | 0 | 130 ms |
| `/services/medium-large` | 94 | 100 | 100 | 100 | 2.9 s | 0 | 130 ms |
| `/gallery` | 94 | 100 | 100 | 100 | 2.9 s | 0 | 140 ms |
| `/faq` | 94 | 100 | 100 | 100 | 2.9 s | 0 | 120 ms |

### Reading these two tables together — important

**The Lighthouse LCP figures are simulated estimates, not measurements, and they disagree with
the observed values by a factor of 16.** Being straight about this rather than quoting whichever
number flatters the work:

- Lighthouse reports LCP of **2.9 s**; direct measurement gives **180 ms** unthrottled and
  **1.0 s** under heavy throttling.
- Lighthouse's simulated LCP came out **identical (2.9 s) on every route**, including `/faq` and
  the legal pages, which are far lighter than the homepage. A metric that does not move with page
  weight is modelling a constant, not measuring the page.
- In each run, simulated LCP landed at exactly the same value as time-to-interactive, which is
  the signature of Lighthouse's Lantern simulation attributing LCP to the end of main-thread work
  rather than to the actual paint.
- Attempts to move it confirmed this: trimming the font payload from nine faces to four (~60 KB
  off the critical path) and converting the header from a client component to a server component
  with small client islands both left the simulated figure unchanged at 2.9 s.

**Both optimisations were kept** — they are genuinely correct — but they are not credited with a
score change they did not produce.

**Conclusion: the site is well inside the Core Web Vitals thresholds** (LCP ≤ 2.5 s, CLS ≤ 0.1)
on measured data. The remaining gap to a 95+ Lighthouse performance score is the simulated LCP
estimate. **Field data from Vercel Speed Insights should be treated as the authority** once the
site is deployed and receiving traffic; the p75 field LCP is the number that matters for Google
page experience, and the lab estimate here is not a reliable proxy for it.

### Payload

| | |
|---|---|
| HTML document | ~15 KB |
| CSS | 10 KB (one file) |
| Fonts | 4 faces, ~75 KB total, self-hosted |
| JavaScript | ~150 KB across chunks |
| Images | **Zero** — no photography exists yet. This will change and is the main future performance risk; the shoot brief specifies sizes to keep it in check |
| Third-party requests | **None** |

---

## Accessibility

### Automated
axe-core with `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` tags, across all ten launch
routes plus the open mobile menu and open FAQ accordion: **zero violations**.

### Issues found during QA and fixed

All of these were real defects caught by the suite, not theoretical:

| Issue | Detail | Fix |
|---|---|---|
| Gold text on emerald failed AA | `#c8a34a` on `#064e3b` is 4.06:1; at 22px and below this needs 4.5:1. Affected step numerals, service-detail stat labels, footer headings, size-guide labels, and hero metadata | Introduced a `--color-gold-text-on-dark` token (the lighter gold grade) for gold used as small text on dark surfaces. Full gold is retained for rules, borders, and large display type |
| Gold text on ivory failed AA at 4.49:1 | The wordmark accent and section overlines were **0.01 short** of the threshold | Introduced `--color-gold-text` (`#75601f`) for gold as text on ivory |
| Placeholder labels failed AA | A blanket `opacity: 0.9` on placeholder labels dropped effective contrast to 3.58:1 on emerald and 3.73:1 on ivory | Removed the opacity; set explicit per-tone colours |
| Olive placeholder unfixable with light text | No light text reaches 4.5:1 against `#718b45` | Switched that tone's label and frond to onyx |
| Card link below minimum target size | `.service-card-more` measured 172×**21** px, under the WCAG 2.2 (2.5.8) 24 px minimum | `inline-flex` with a 28 px min-height |
| Heading level jump on `/services` | h1 → h3 with no h2 between | Added a real section heading, which improved the page as well |
| Heading level jump on `/faq` | The accordion's h3s sat directly under the page h1 | Made the accordion's heading level a prop; `/faq` renders h2 |

### Manual checks (asserted in the suite, not just eyeballed)

| Check | Result |
|---|---|
| Full keyboard navigation | Pass |
| Visible focus indicators on every control | Pass |
| Skip link present, focusable, functional | Pass |
| Mobile menu: Escape closes, focus trapped, focus restored to the toggle | Pass |
| Mobile menu closes on route change | Pass |
| Accordion reports `aria-expanded` and links to its panel | Pass |
| Lightbox traps focus, closes on Escape, restores focus, has a visible close button | Implemented; not exercised because no real images exist to open yet |
| 320 px wide, no horizontal scroll | Pass on `/`, `/services`, `/gallery`, `/faq` |
| 200% zoom equivalent (640 px viewport) | Pass |
| All targets ≥ 24 px | Pass |
| `prefers-reduced-motion` respected | Pass — reveal elements render shown, transitions disabled |
| Sticky header never covers a focused element | Pass — 12 tab stops checked per route |
| Mobile booking bar never covers page content | Pass — the footer reserves space for it |
| Heading order descends on every route | Pass |
| No information conveyed by colour alone | Pass — preview badges carry a glyph and text; filter chips use fill plus `aria-pressed`; the accordion marker is a shape change |

---

## Functional bugs found and fixed

Two of these were genuine product bugs that the tests surfaced, not test-only problems:

**1. Mobile booking bar could fail to appear on a deep link.** The bar was triggered by observing
a 1 px sentinel at the end of the hero. IntersectionObserver only reports threshold *crossings* —
an instant jump past a 1 px element (an anchor link, a restored scroll position, a URL with a
hash) goes from not-intersecting-below to not-intersecting-above without ever intersecting, so no
callback fires and the bar stays hidden. **Fix:** observe the hero section itself, which is tall
enough that leaving it is always a real crossing.

**2. The mobile bar could overlap the end of the footer.** Space was reserved with
`padding-bottom` on `body`, which left a strip of ivory below the emerald footer. **Fix:** move
the padding to the footer, so its own background extends behind the translucent bar.

**3. Two React `setState`-in-effect warnings** in the header and booking bar. Both were fixed
properly rather than suppressed: the menu now derives its open state from the current pathname
(so navigation closes it with no effect at all), and the booking bar writes visibility straight
to the DOM, which is the sanctioned use of an effect for external synchronisation.

---

## Visual QA

Every principal route inspected at **390×844**, **768×1024**, **1440×900**, and **1920×1080** —
32 full-page screenshots in `docs/qa/`, reviewed by eye rather than only asserted in tests.

### Issues found by looking and then fixed

| Issue | Fix |
|---|---|
| The "booking link pending" note rendered beside all seven CTA placements, overflowing the header and turning the page into a construction notice | The explanation is now visible at the closing CTA only; every other instance carries it as screen-reader-only text via `aria-describedby` |
| Disabled CTAs at `opacity: 0.45` read as broken buttons, especially washed-out sage on emerald | Replaced with a deliberate inactive treatment: transparent fill, dashed border, muted text |
| The founder portrait placeholder was invisible — an ivory tone on an ivory section, reading as floating text | Gave the ivory placeholder tone an explicit border |
| The hero image placeholder was a large black slab against emerald | Added a `deep` tone: a subtle emerald gradient with a gold hairline border |
| Four-across service cards broke the price row mid-figure (`$150–` / `$350`) even at 1440 px | Capped the grid at three columns and set `white-space: nowrap` on stat values. The homepage now features three sizes, which also reads better |
| The hero h1 wrapped awkwardly at 390 px | Lowered the fluid type floor from 2.375 rem to 2.125 rem |
| The gallery said "12 images" when there were twelve empty placeholders — reading as twelve photos that failed to load | Now reads "12 slots reserved — awaiting photography" until real images exist |

### Confirmed good

First-viewport clarity at every breakpoint; the service/price table as the clearest expression of
the brand's differentiator; the staggered Hair/Time/Privacy triptych reading as editorial rather
than as three icon cards; typographic hierarchy and line lengths; spacing rhythm; the mobile
single-column flow; the preview verification badges sitting exactly where Esther needs to see them.

---

## Content gate

`pnpm content:check` reports **6 blockers** and **12 items awaiting confirmation**. This is the
expected and correct state for a first draft — the gate exists to make these visible, and it
fails a production build while any blocker remains.

Blockers: no booking URL; four unwritten policies (cancellation, late arrival, guests/children,
no-show); all twelve gallery slots without real photography.

Full detail and sign-off checklist in `CONTENT_CONFIRMATIONS.md`.

---

## Known limitations

1. **Lighthouse performance is 89–94, not the 95+ target.** As analysed above, the shortfall is
   entirely the simulated LCP estimate, which measured data contradicts. Re-assess against field
   data after deployment rather than chasing the lab number.
2. **The lightbox is untested against real content.** Its keyboard behaviour is implemented and
   correct by inspection, but no test exercises it because there are no real images to open. Add
   a test with the first real photographs.
3. **No visual regression baseline.** Screenshots are captured and reviewed but not diffed
   automatically. Worth adding once the design is signed off — diffing a draft that is still
   changing produces noise, not signal.
4. **Lighthouse was run against a local server**, so network conditions are simulated rather than
   real. Re-run against the Vercel preview deployment for a truer picture.
5. **No real-device testing.** All checks used emulated viewports in Chromium. Worth a pass on a
   real iPhone and a real Android before launch, particularly for the sticky booking bar and
   safe-area insets.
6. **Browser coverage is Chromium only.** Add WebKit and Firefox projects to the Playwright
   config for broader confidence.
