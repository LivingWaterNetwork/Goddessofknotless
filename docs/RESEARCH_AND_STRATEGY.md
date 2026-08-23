# Research and Strategy

Research date: 23 August 2026. Sources are dated because pricing and search results move.

---

## The audience

From Esther's own account, her clients are women for whom hair is not a casual purchase. Her
stated aspirational clientele is professionals with demanding schedules and visibility — doctors,
attorneys, executives, public figures — and women who simply value discretion.

**No celebrity or notable client is named, implied, or hinted at anywhere on the site.** Esther
named aspirational figures on the call; publishing or gesturing at them would be a false
association. The site speaks to the *needs* of that audience without claiming to have served it.

The strategic insight, stated in the brand packet and confirmed by the calls:

> She is not only asking who can braid her hair. She is asking who she can trust with her hair,
> her time, and her privacy.

That sentence became the site's structural spine, not a tagline. The homepage's central section
is a three-part editorial triptych — **Your Hair, Your Time, Your Privacy** — and each of the
five experience standards maps onto one of them.

---

## The competitive gap

### What dominates Chicago knotless-braid search
Marketplace listings — Booksy and Fresha — occupy most of the results. Their strengths and
weaknesses are the same thing: they expose prices, durations, photos, and live availability, which
is genuinely useful, and in doing so they reduce every provider to a comparable row in a list. A
stylist on a marketplace competes on price and next-available-slot.

### What premium independent salon sites do
Better at selling an experience, and they own the client relationship. But in this segment they
are largely interchangeable — dark palettes, stock-feeling imagery, generalist "luxury" language —
and almost none of them own a specific, defensible position. Many also hide prices behind a
booking flow or an enquiry form, which pushes the client back to the marketplace to compare.

### The gap, and the strategy
**Combine the marketplace's useful clarity with an independent brand's emotional proof and direct
relationship — and take the trust-and-discretion position, which is unoccupied.**

Concretely, that produced three decisions that define the site:

**1. Publish every price and every duration, in full, before anyone books.**
This is the biggest single differentiator and it runs against the segment's instinct. All nine
sizes carry a real range ($150 to $800) and a real appointment window (1.5 to 14 hours), in a
scannable table. The reasoning: Esther's clients are time-poor professionals. A client who cannot
find out what a six-hour appointment costs without sending a DM will go and find one who publishes
it — probably on Booksy. Publishing the numbers is also the most concrete possible demonstration
of the reliability the brand claims.

**2. Answer the pre-booking questions on the page, not by text message.**
Esther currently answers every logistics question personally, by text. The FAQ, the size guide,
and the per-size preparation notes exist to take that work off her — the "arrive washed and
blow-dried" requirement alone appears in four places, because it is the single fact that keeps a
quoted three-hour appointment to three hours.

**3. Own discretion explicitly.**
No competitor reviewed says anything about privacy. Esther independently described a
non-gossiping room where clients fall asleep in the chair. For an audience of visible
professionals that is a genuine differentiator, and it costs nothing to state because it is
already true.

**Sites reviewed for conventions and gaps only.** No competitor's words, layout, photography, or
content were copied.

---

## Booking and retention

Contemporary beauty-industry practice makes 24/7 self-booking, deposits, no-show controls,
reminders, rescheduling, waitlists, and rebooking prompts operationally significant — and
Esther currently has **none** of them. She takes bookings by text and DM, holds the calendar
herself, sends no reminders, and absorbs the cost of any no-show personally.

That gap is the largest operational finding in the whole engagement, and it is why the booking
platform decision was researched properly rather than defaulted. See
`BOOKING_PLATFORM_SCORECARD.md`. The headline: **her appointments run up to fourteen hours, so
deposit and no-show control is worth more than every other feature combined**, and the platform
that includes those protections cheapest is not the one with the free tier.

The site is built provider-agnostic — one environment variable — so this decision could be made
properly rather than under build pressure.

**Both first-time and returning clients are served explicitly.** First-timers get the educational
path: size guidance, preparation, what to expect, published prices. Returning clients get speed —
a persistent booking action and a "Rebook in one tap" link that appears automatically if the
chosen platform provides a rebooking URL. Both paths are tracked separately.

---

## Proof, and the FTC constraint

Esther's account of what clients say about her is genuinely compelling. **None of it could be
used.**

Publishing her paraphrase of client sentiment as a client quote would be a fabricated
testimonial. The FTC's Consumer Reviews and Testimonials Rule treats that as a deceptive
practice, and for a brand whose entire proposition is trustworthiness, being caught doing it
would be far more damaging than the absence of testimonials.

So: the testimonials section is built, tested, and **hidden**. No `aggregateRating` or `review`
structured data is emitted. No star ratings, no review counts, no client-number badges, no
years-in-business counters.

What is published instead is one factual line: *"Self-taught in 2020. Built by referrals. Trusted
for natural results, gentle care, and consistency."* Every word of it is verifiable, and the
referral claim is arguably stronger proof than a five-star average — a referral is a client
putting her own name on the line.

`LOCAL_SEO_LAUNCH.md` sets out the legitimate route to real reviews.

---

## Claims discipline

The following are **absent by design**, and the build fails if any appears: top-rated, best,
award-winning, celebrity stylist, pain-free, damage-free, guaranteed hair growth or health, and
"luxury" as a brand adjective.

The reasoning is not only compliance. Esther's differentiator is that she is *reliable* — so the
site must not open by overclaiming. Where the brand packet used "luxury", the site substitutes the
tangible thing: consistent work, comfort, punctuality, discretion, published prices.

"Gentle care" and "low-tension" are used, carefully, as descriptions of technique. They are never
framed as a hair-health or medical outcome.

---

## Local search

Approach: accurate, consistent information and one focused West Loop / Chicago signal.

**No neighbourhood doorway pages were created.** Nine thin "knotless braids in [neighbourhood]"
pages would be a spam signal and would cheapen a premium brand.

**No address, phone, hours, or Google Business Profile link is published**, because none is
confirmed. `HairSalon` structured data is emitted with verified facts only — no `address`, no
`telephone`, no `openingHours`, no rating. Publishing an unverified address risks a Google
Business Profile suspension, and a virtual or borrowed address risks a permanent one.

The Google Business Profile does not exist yet and is, after the booking link, the highest-value
marketing action available.

---

## Performance and accessibility as brand attributes

Targets: WCAG 2.2 AA, and Core Web Vitals at LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.

Treated as part of the product rather than a checklist, for a specific reason: the brand promises
that Esther respects your time. A site that makes a busy professional wait, or that a screen
reader cannot navigate, contradicts the proposition on contact.

Achieved: zero axe violations across all ten routes, Lighthouse accessibility 100, measured LCP
180 ms and CLS 0.000. Full detail and an honest account of where Lighthouse's simulated figures
disagree with measurement is in `QA_REPORT.md`.

---

## Assumptions

Stated because they are load-bearing and each one could be wrong:

1. **Publishing full prices helps more than it hurts.** The core strategic bet. It could deter
   price-sensitive visitors. The 30-day plan measures it directly.
2. **Esther keeps offering knotless braids only.** The nine-size taxonomy follows her statement
   that this is all she does. Adding a service category means editing one typed file.
3. **She will accept card payments.** Required for deposits to be enforceable. Today she uses
   Cash App, Zelle, and Apple Pay, none of which can hold a deposit against a no-show.
4. **The West Loop studio is where clients come.** Determines which Google Business Profile rules
   apply.
5. **She wants direct bookings, not marketplace volume.** Follows from a referral-built book. If
   she does want acquisition volume, the platform recommendation changes.
6. **Real photography will arrive.** The design reserves space for it. Without it the site is a
   well-built shell making a claim it cannot show.

---

## Sources

**Primary.** Strategy calls with Esther Parkman, 19 and 20 August 2026 (all service, pricing,
duration, add-on, preparation, and booking-method facts). The Goddess of Knotless vision-aligned
brand packet, August 2026 (positioning, palette, typography, photography direction, logo, and the
website direction on slides 16–17).

**Standards and guidance**, accessed 23 August 2026:
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Web Vitals](https://web.dev/articles/vitals)
- [Google Business Profile representation guidelines](https://support.google.com/business/answer/3038177)
- [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google structured data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [FTC Consumer Reviews and Testimonials Rule](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers)
- [Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist)

**Booking platform sources** are listed with their reliability caveats in
`BOOKING_PLATFORM_SCORECARD.md` §7.

**Market examples reviewed for conventions and gaps only** — Booksy and Fresha Chicago braiding
results, and several premium West Loop salon sites. Nothing was copied from any of them.
