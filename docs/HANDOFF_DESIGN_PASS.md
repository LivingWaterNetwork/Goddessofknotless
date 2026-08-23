# Handoff: visual design pass

**You are picking up a finished, tested, deployed website that the client-side reviewer has
rejected on visual grounds.** The engineering is sound. The art direction is not. Your job is to
fix the art direction without breaking the engineering or the honesty guarantees.

Read this whole file before touching anything.

---

## 1. Where things stand

| | |
|---|---|
| Repo | `LivingWaterNetwork/Goddessofknotless` |
| Branch | `claude/questions-before-start-t890u0` (also the repo default) |
| Live review URL | https://goddessofknotless.vercel.app |
| Deploy | Vercel project `goddessofknotless`, Living Water Network team, **git-linked** — pushing to the branch auto-deploys to production |
| Stack | Next.js 16.3.2 App Router, React 19.2.8, TypeScript strict, Tailwind CSS v4, pnpm |
| Tests | 37 unit (Vitest), 112 e2e (Playwright, mobile + desktop, incl. axe) — **all passing** |
| Accessibility | Zero axe WCAG 2.2 AA violations across 10 routes; Lighthouse a11y/BP/SEO all 100 |
| Measured vitals | LCP 180 ms, CLS 0.000 |

Routes: `/`, `/services`, `/services/[slug]` × 9, `/experience`, `/gallery`, `/about`, `/faq`,
`/policies`, `/privacy`, `/terms`, plus 404 and error boundaries.

Start by reading `README.md`, then `docs/CLIENT_HANDOFF.md`, then
`docs/CONTENT_CONFIRMATIONS.md`. Look at `docs/qa/*.jpg` for current-state screenshots at four
breakpoints.

---

## 2. The verdict you are responding to

The reviewer's words: *"looks VERY plain, very boring and in no way that of a $10,000 website —
I can't send this to the client."*

They are right. Take it at face value.

---

## 3. Honest diagnosis — why it looks plain

Written by the agent who built it. This is not a list of things that went wrong by accident; it is
a list of decisions that were individually defensible and collectively produced a flat page.

### 3a. The dominant cause: seventeen empty image frames

No photography was ever supplied. The site has **17 image slots** — a hero, a founder portrait, a
process frame, a studio frame, and 12 gallery slots — and every one renders as a flat coloured
rectangle with a small caption saying what belongs there.

A braiding studio's website with zero pictures of hair cannot look expensive. Everything else
below is secondary to this. **Fixing the imagery is 70% of the job.**

### 3b. Restraint without imagery reads as unfinished, not as confident

The brief demanded restraint — no template look, no trendy animation, no clutter. That was
followed, arguably too literally. Restraint is a *luxury* signal only when there is something
substantial being restrained. On a page of empty frames it just looks sparse.

### 3c. Monotonous section rhythm

Almost every section on every page is the same shape:

```
overline (small caps, gold) → serif heading → body paragraph → grid or list
```

…on a background that alternates ivory / white / emerald. There is:

- no full-bleed moment
- no overlapping or offset element
- no dramatic scale jump
- no asymmetry beyond a 2-column split
- no section that breaks the pattern to create a beat

Scroll the homepage and every screen feels like the previous one.

### 3d. The brand packet's richness did not make it in

Compare `docs/qa/` screenshots against the brand packet (not in the repo — ask the reviewer for
`The_Goddess_of_Knotless_Brand_Packet_VISION_ALIGNED.pptx`). The packet has gold foil gradients,
a beautiful script logo, dimensional treatments, textured panels, and a gold seal.

The site has flat colour and type. Specifically:

- **The script logo appears only in the footer.** It is the single most premium asset available
  and it is buried at the bottom. `public/brand/logo-primary-on-emerald.png` (1536×648) and
  `logo-primary-on-ivory.png` and `logo-seal-on-emerald.png` are all sitting there unused above
  the fold.
- **Gold is only ever a 1px hairline.** Never a gradient, never a foil, never a fill, never a
  large graphic element.
- **The frond motif** (inline SVG, in `Hero.tsx` and `ImageFrame.tsx`) is set at 16% opacity and
  is barely perceptible. It could carry real visual weight.

### 3e. No typographic drama

Cormorant Garamond is a genuinely beautiful display serif and it is used at modest sizes
throughout. `--text-h1` tops out at 4.25rem and only the hero reaches it. There is no oversized
display moment, no drop cap, no pull-quote at scale, no number set large enough to be a graphic.

### 3f. The cards are the least interesting possible treatment

`.service-card` is a white rectangle with a 1px border and a 3px radius. Nine of them in a grid.
They are clear and they convert — but nothing about them is memorable.

### 3g. The price table is under-designed relative to its importance

`/services` publishes all nine sizes with real prices and real durations. **This is the site's
single strongest differentiator** — almost no competitor publishes this. It is currently a
competent HTML table. It should be the most beautiful thing on the site.

### 3h. The hero is generic

Flat emerald field, text left, dark rectangle right. It could be any brand. Nothing in it says
*braiding*, *Chicago*, or *this specific stylist*.

---

## 4. Constraints you must not break

These were expensive to get right. Breaking any of them is worse than leaving the site plain.
**Run `pnpm qa` before and after your work; it enforces most of this automatically.**

### Content honesty — non-negotiable

1. **Do not change any price, duration, braid count, or add-on figure.** Every number came from
   Esther's own words on a recorded strategy call. They are the most valuable content on the site.
2. **The two flagged discrepancies must stay flagged** — the size published as "Medium-Fine"
   (Esther gave two different "Medium" tiers) and "Extra Small" (its ceiling is $5 *below* Small
   despite being finer). See `docs/CONTENT_CONFIRMATIONS.md` §B. Their `needs-confirmation` status
   drives visible review badges that the client must see.
3. **No testimonials, star ratings, review counts, or client-number figures.** None are verified.
   Fabricating a testimonial breaches the FTC Consumer Reviews and Testimonials Rule. The
   testimonials section is deliberately built-and-hidden.
4. **No `aggregateRating` or `review` structured data.** Breaks Google's structured-data policy.
5. **No street address, phone, email, or opening hours.** None confirmed. Publishing an
   unverified address risks a Google Business Profile suspension.
6. **Forbidden copy** — the build fails on: "top-rated", "best", "award-winning", "celebrity
   stylist", "pain-free", "damage-free", guaranteed hair growth/health, "luxury" as a brand
   adjective, "The Goddess Lounge", lorem ipsum, TODO/FIXME, dummy contact details, and specific
   private details from the calls. See the `forbidden` array in `scripts/content-check.ts`.
7. **Nothing from the strategy calls beyond services, prices, timings, preparation, booking
   method, and the referral-built origin.** Both calls were largely confidential.

### Accessibility — currently perfect, keep it that way

8. **Zero axe violations is the baseline.** `pnpm test:e2e` fails if you regress it.
9. **Use the gold text tokens.** `--color-gold` (`#c8a34a`) is only **4.06:1 on emerald** and
   **4.49:1 on ivory** — it fails AA as small text on *both* brand backgrounds. Use
   `--color-gold-text-on-dark` and `--color-gold-text` for gold *text*. Full gold is fine for
   rules, borders, and large display type (≥18pt/24px bold or ≥24px regular — verify).
10. **All interactive targets ≥ 24px** (WCAG 2.2 §2.5.8). A test enforces this.
11. **Heading order must descend without jumps** on every route. A test walks all of them.
12. **`prefers-reduced-motion` must be respected.** No scroll hijacking, no autoplay, no custom
    cursors, no long loaders, no animation that delays reading or booking.
13. **No information by colour alone.**

### Performance

14. **CLS must stay 0.000.** Every image needs explicit width/height or a reserved aspect ratio.
    `ImageFrame` already does this — use it rather than raw `<img>`/`<Image>`.
15. **Only the true LCP image gets `priority`.** Everything else lazy-loads.
16. Watch the payload. Currently ~150KB JS, 75KB fonts, zero images. Adding 17 photographs is the
    main new performance risk — see §5 for sizing.

### Deployment safety

17. **Do not set `NEXT_PUBLIC_ALLOW_INDEXING`.** The review deployment must stay `noindex`. A
    crawlable draft would index placeholder photos and unconfirmed prices, then compete with the
    real site at launch.
18. **Placeholder images must remain unmistakably labelled**, and the production content gate must
    keep blocking them. `CONTENT_MODE=production pnpm content:check` must still exit 1 while any
    placeholder image is in place.

### Code conventions

19. **No raw hex in JSX.** Semantic tokens in `src/styles/globals.css` only.
20. **No hard-coded booking URLs.** Everything reads `business.bookingUrl`.
21. **Server components by default**; client components only where interaction requires them.

---

## 5. Task A — placeholder photography

**The reviewer has explicitly authorised stock placeholder imagery** to make the site feel
complete for the client review, and will send Esther a memo stating that her own photography is
required. Proceed on that basis.

### The one risk to manage

Stock braid photography depicts **other stylists' work on other people's heads**. The entire
brand rests on Esther's own consistency. So:

- Every placeholder image must carry a **visible, unmissable** marker in the review build. The
  existing `PreviewBadge` component does this; do not weaken it. Consider making it *more*
  prominent for photographs than it is for text.
- Keep `status: "placeholder"` on every one, so the production gate keeps blocking launch.
- Add a short visible line on `/gallery` stating the images are placeholders pending Esther's own
  work. Blunt is better than subtle here.
- Log every image's source URL and licence in `docs/ASSET_INVENTORY.md` so they can be removed
  cleanly.

### Sources that are reachable from this environment

Verified working: direct image URLs on `images.unsplash.com` and `images.pexels.com` return 200.
The Unsplash **API** returns 401 (no key). Unsplash search pages give page *slugs*, not image
URLs, so Pexels is the practical source — its URLs are constructible as
`https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`.

Append `?auto=compress&cs=tinysrgb&w=1400` to keep file sizes sane.

**Candidates already found on Pexels** (verify each one actually looks right before using it —
these came from alt text, not from viewing them):

| Photo ID | Alt text | Possible use |
|---|---|---|
| 5301531 | Back view, unrecognizable person holding ponytail of dark African braids | **Strong hero candidate** — shows braids, no identifiable face |
| 8511174 | Two women with braided hairstyles from back, diverse textures | Gallery |
| 11268995 | Elegant afro braids with wooden beads | Gallery |
| 31473242 | Rear view braided hairstyle with orange beads | Gallery |
| 34191088 | Detailed view of textured braids | Gallery / detail |
| 33664383 | Top view of intricate braided hairstyle | Gallery — good for showing parts |
| 16563139 | Close-up intricate braided bun from above | Gallery |
| 28383173 | Close-up of braiding being created outdoors | **Process** |
| 11482128 | Adult braiding a child's hair indoors | **Process** — hands working |
| 7078204 | Woman with braids, gentle touch outdoors | Process / care |
| 10283310 | Braided hairstyle close-up with jewellery | Gallery |
| 8487328 | Woman with braids in yellow dress, outdoor | Gallery / lifestyle |
| 16778662 | Person with braided hair from behind, indoors | Gallery |
| 5157580 | Woman with long braided hairstyle indoors | Gallery |

Also search Pexels for: `hair salon interior`, `salon chair`, `braiding hands`, `hairstylist
working`, `black woman portrait studio`. You will need images for the **founder portrait** and the
**studio** frame, which are not braid shots.

### Art-direction filter — reject images that fail these

From the brand packet's photography direction (*Natural. Refined. Restorative.*):

- **Reject** heavy filters, obvious retouching, artificial skin/hair smoothing, staged
  "luxury" clichés, gaudy colours, party/nightclub lighting, and anything that looks like a
  generic stock salon.
- **Prefer** natural light, visible clean parts, realistic density, healthy visible scalp at the
  parting, texture and movement, calm expressions, uncluttered backgrounds.
- **Prefer back and three-quarter views** — they show the parting work, which is the actual craft,
  and they sidestep the "whose client is this?" problem.
- Avoid images where a face is the subject, except for the founder-portrait slot.

### Where the slots are

| Slot | File | Current |
|---|---|---|
| Hero | `src/components/sections/Hero.tsx` | `ImageFrame src={null}` tone `deep`, 1000×1300 |
| Process | `src/components/sections/WhatToExpect.tsx` | 1000×1250, tone `deep` |
| Founder | `src/components/sections/FounderStory.tsx` | 1000×1200, tone `ivory` |
| Founder (about) | `src/app/about/page.tsx` | 1000×1250, tone `emerald` |
| Studio | `src/app/experience/page.tsx` | 1000×1250, tone `ivory` |
| Per-size reference | `src/app/services/[slug]/page.tsx` | 1000×1300, tone `emerald` |
| Gallery × 12 | `src/content/gallery.ts` | `placeholder()` records |
| Homepage proof × 3 | `src/components/sections/ProofTeaser.tsx` | pulls from `gallery.ts` |

Download into `public/images/`, keep the long edge ≤ 1600px, and let `next/image` generate
AVIF/WebP. Do not commit multi-megabyte originals.

`docs/PHOTO_SHOOT_BRIEF.md` specifies what the *real* photographs must eventually be — use it as
the guide for what each placeholder should approximate.

---

## 6. Task B — elevate the design

Photography alone will not reach "$10,000". Below are concrete directions, not a mandate — use
judgement, and feel free to do something better. **Do not** solve this with trendy animation,
glassmorphism, or a template look; the brief explicitly rules those out, and the audience is
privacy-conscious professional women, not a trend-led market.

### Highest leverage, roughly in order

1. **Give the hero a real photograph and a real composition.** Consider a full-bleed or
   two-thirds-bleed image with the emerald and the type overlaid, rather than the current
   text-left/box-right split. The first viewport must still communicate service, location,
   differentiator, and booking path *without* relying on the image loading.

2. **Bring the script logo above the fold.** It is the best asset in the package. Use
   `logo-primary-on-emerald.png` or the `gk` seal at meaningful scale somewhere early — as a
   watermark behind the hero, a mark in the header on scroll, or an ornament between sections.

3. **Make gold a material, not a hairline.** Gradients that read as foil, gold rules at varying
   weights, a gold-filled seal, gold as a large graphic shape. Respect the contrast rule in
   constraint §9 — foil gradients are decoration, so they are exempt from text contrast, but any
   *text* on them is not.

4. **Introduce typographic drama.** One oversized display moment per page. A drop cap on the
   About narrative. The founder pull-quote at 2× its current size. Set the price ranges
   themselves large — they are the differentiator, so make the numbers the graphic.

5. **Redesign the price table as an editorial artefact.** This is the most under-designed
   high-value element on the site. Think of a menu in a good restaurant, or a specification page
   in a well-made catalogue — generous leading, real hierarchy between size / count / price /
   time, gold rules, the most-booked rows given visible weight.

6. **Break the section rhythm.** Add at least two moments per page that interrupt the
   overline→heading→body→grid pattern: a full-bleed image with overlaid type, an overlapping
   offset card, a horizontal scroll-free asymmetric split, a quiet full-width quote on emerald.

7. **Raise the frond motif's presence.** It is at 16% opacity. Let it carry real weight — large,
   cropped, layered behind sections, as a divider.

8. **Give the cards more craft.** Layered edges, a gold top rule on the most-booked ones, image
   headers now that photographs exist, a more considered internal hierarchy.

9. **Add depth to the emerald sections.** Currently flat fills with one radial gradient in the
   hero. Layered gradients, subtle texture, vignetting, and imagery bleeding into them.

### Keep these — they are working

- The **Hair / Time / Privacy triptych** with staggered baselines is the strongest section on the
  site and carries the brand's actual positioning. Enrich it; do not replace it.
- The **published-prices strategy**. It is the whole competitive thesis.
- The **ivory / emerald / onyx** structure and the serif-over-sans hierarchy — this follows the
  brand packet's own website direction closely and is correct.
- The **honest disabled booking buttons**. Do not make them look active.

---

## 7. How to work

```bash
pnpm install
pnpm dev                  # localhost:3000

pnpm qa                   # lint + typecheck + unit + content gate + build — run before and after
pnpm test:e2e             # Playwright incl. axe. Needs a built app; it builds one itself
PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium pnpm test:e2e   # in this environment
```

Visual QA is not optional and was where every real design problem got caught. Screenshot every
principal route at **390×844, 768×1024, 1440×900, 1920×1080**, put them in `docs/qa/`, and
**look at them** rather than trusting that it compiles. Chromium is preinstalled at
`/opt/pw-browsers/chromium`; Playwright cannot reach external hosts from this environment, so
screenshot a local production build (`pnpm build && pnpm start`).

Update `docs/QA_REPORT.md` and `docs/ASSET_INVENTORY.md` with what you changed and what you added.

### Deploying

The Vercel project is git-linked, so:

```bash
git add -A
git commit -m "..."
git push origin claude/questions-before-start-t890u0
```

…auto-deploys to https://goddessofknotless.vercel.app in about 90 seconds. Verify the live site
afterwards, and confirm `curl -s https://goddessofknotless.vercel.app/robots.txt` still returns
`Disallow: /`.

**Note for launch, not for you:** the Vercel team is on the **Hobby** plan, which is licensed for
non-commercial use only. A paying client's revenue-generating site needs Pro. Flagged in
`docs/LAUNCH_CHECKLIST.md`.

---

## 8. Definition of done

- [ ] Every one of the 17 image slots has a real photograph, art-directed against §5
- [ ] Every placeholder is visibly and unmistakably marked as a placeholder
- [ ] `CONTENT_MODE=production pnpm content:check` still exits 1 (placeholders still block launch)
- [ ] `pnpm qa` passes
- [ ] `pnpm test:e2e` passes with **zero axe violations**
- [ ] CLS still 0.000; LCP still comfortably under 2.5s
- [ ] Screenshots at all four breakpoints captured, reviewed, and committed
- [ ] `docs/ASSET_INVENTORY.md` lists every image with its source URL and licence
- [ ] Pushed and verified live, still `noindex`
- [ ] **It no longer looks plain.** That is a judgement call, and it is the actual acceptance
      criterion. Look at it on a phone and ask whether a privacy-conscious professional woman
      would trust this studio with her hair, her time, and her privacy.
