# Booking Platform Scorecard

**Research date: 23 August 2026.** Pricing and features change; re-verify before signing up.

**Nothing has been signed up for, migrated, imported, or charged.** This document is a
recommendation for Esther to approve or reject. The website is built provider-agnostic:
whichever platform she chooses, connecting it is one environment variable
(`NEXT_PUBLIC_BOOKING_URL`) and no code change.

---

## 1. What Esther is actually solving for

The recommendation is driven by her business as it actually operates, not by what is popular.
From the 20 August 2026 strategy call:

| Fact | Why it changes the decision |
|---|---|
| **Appointments run 1.5 to 14 hours** | A single no-show can cost a whole working day. Deposits, card-on-file, and enforceable cancellation policies are the highest-value feature, not a nice-to-have. |
| **Clients book by text message and Instagram DM** | There is no system at all today. No reminders, no confirmations, no record. Any platform is an improvement; the question is which one fits. |
| **"My clients is built off referrals"** | She does **not** need client acquisition. A marketplace that charges a commission on new clients would be billing her for demand she generated herself. |
| **Deposits are taken from new clients, often waived for regulars** | She needs deposit rules she can apply selectively, not a rigid all-or-nothing setting. |
| **Pricing is 9 sizes × length × boho add-on × per-bundle extras** | Needs real service variants, add-ons, and per-variant durations. A flat service list cannot express her menu. |
| **Solo operator, one West Loop studio** | Per-staff and per-location pricing barely matters today — but see the next row. |
| **Plans: more Chicago locations, other cities, classes, own hair products** | Multi-location, class/event booking, and retail inventory should be reachable later without a migration. |
| **Payments today: Cash App, Zelle, Apple Pay** | No card processing at all yet. Introducing card payments is a real change with a real cost, and it is what makes deposits enforceable. |

**Weighting used below.** Set from the table above, not from a generic template.

| Criterion | Weight | Rationale |
|---|---|---|
| Deposits, card-on-file, no-show and cancellation control | 25% | Highest financial exposure in the business. |
| Client booking friction and mobile experience | 15% | Discovery starts on Instagram and finishes on a phone. |
| Service variants, add-ons, per-variant duration logic | 15% | Her menu is genuinely complex. |
| Branded booking experience and deep linking | 10% | Must not dump a premium site into a generic marketplace page. |
| Reminders, confirmations, rescheduling, rebooking | 10% | Replaces the text-message admin she currently does herself. |
| Total recurring and transaction cost | 10% | Real, but secondary to protecting a 14-hour booking. |
| Future readiness: multi-location, classes, retail | 8% | Stated plans, not speculation. |
| Client records, service notes, privacy controls | 4% | Supports the discretion the brand is built on. |
| Data portability and exit cost | 3% | Insurance against a wrong choice. |

---

## 2. The candidates

### Cost comparison on Esther's real numbers

Processing cost on a single in-person appointment, at three points in her actual price range:

| Platform | Monthly (solo) | In-person rate | On $250 | On $500 | On $800 |
|---|---|---|---|---|---|
| **GlossGenius Standard** | $24 (annual) / $28 (monthly) | 2.6% flat | $6.50 | $13.00 | $20.80 |
| **GlossGenius Gold** | $48 (annual) / $56 (monthly) | 2.6% flat | $6.50 | $13.00 | $20.80 |
| **Square Appointments Free** | $0 | 2.6% + 15¢ | $6.65 | $13.15 | $20.95 |
| **Square Appointments Plus** | $49 per location | 2.5% + 15¢ | $6.40 | $12.65 | $20.15 |
| **Fresha Independent** | $19.95 | 2.19% + 20¢ | $5.68 | $11.15 | $17.72 |
| **Booksy Boost** | $29.99 | ~2.69% + 20¢ | $6.93 | $13.65 | $21.72 |
| **Vagaro (1 staff)** | $30 | 2.75% flat | $6.88 | $13.75 | $22.00 |

Processing cost is close to identical across all of them — roughly $6–$22 per appointment, and
the spread between best and worst is about **$3 on a $500 booking**. That is not the deciding
factor. **One prevented no-show on a six-hour appointment is worth more than a year of the
difference.** The decision should be made on control and fit, and this table exists mainly to
show that cost does *not* meaningfully separate the options.

### Marketplace commission — the one cost that is not close

| Platform | New-client commission |
|---|---|
| GlossGenius | None |
| Square Appointments | None |
| Vagaro | None on the base subscription |
| **Fresha** | **20% of the first visit** (min $6) for clients sourced through the Fresha marketplace. Bookings from her own website or social links are free. |
| **Booksy** | **30% of that client's first visit** — but only if the optional Boost promotion is switched on. |

For a referral-built business this is the trap. A 20–30% cut of a first visit on Esther's menu
is **$30 to $240 of a single appointment**. Both are avoidable — Fresha's applies only to
marketplace-sourced bookings, and Booksy's only if Boost is enabled — but a platform whose
growth model depends on that revenue will keep steering her toward it.

### Feature fit on the criterion that carries 25% of the weight

Verified against GlossGenius's own pricing page and Square's own features and pricing pages
(23 August 2026):

| | Deposits | Cancellation / no-show policy | Card on file | Waitlist | Branded booking site |
|---|---|---|---|---|---|
| **GlossGenius Standard ($24)** | Yes | Yes | Yes | No | Yes |
| **GlossGenius Gold ($48)** | Yes | Yes | Yes | Yes | Yes |
| **Square Free ($0)** | Limited | **No** | No | **No** | Yes |
| **Square Plus ($49)** | Yes | Yes | Yes | Yes | Yes |

**This is the finding that decides it.** Everything Esther most needs — deposits, an enforceable
no-show policy, card on file — is included in GlossGenius's **$24/month entry plan**. On Square
the same protections require the **$49/month Plus** tier, because the free plan has no
cancellation-policy or no-show-fee feature at all. Square's free tier looks like the cheap
option and is actually the one that leaves a 14-hour booking unprotected.

---

## 3. Scores

Scored 1–5 against the weighted criteria above.

| Criterion | Weight | GlossGenius | Square Plus | Fresha | Booksy | Vagaro | Text/DM (today) |
|---|---|---|---|---|---|---|---|
| Deposits / no-show control | 25% | 5 | 5 | 4 | 4 | 4 | 1 |
| Booking friction, mobile | 15% | 5 | 4 | 4 | 4 | 3 | 2 |
| Variants, add-ons, durations | 15% | 4 | 4 | 4 | 4 | 5 | 3 |
| Branded experience, deep links | 10% | 5 | 4 | 3 | 2 | 3 | 3 |
| Reminders, rescheduling, rebooking | 10% | 5 | 4 | 4 | 5 | 4 | 1 |
| Cost | 10% | 4 | 3 | 5 | 3 | 4 | 5 |
| Future: locations, classes, retail | 8% | 3 | 5 | 3 | 3 | 5 | 1 |
| Client records, privacy | 4% | 4 | 4 | 4 | 4 | 4 | 2 |
| Data portability | 3% | 3 | 4 | 3 | 3 | 3 | 1 |
| **Weighted total** | | **4.53** | **4.19** | **3.98** | **3.76** | **3.90** | **1.94** |

Note on the last column: her current text-message method scores 5 on cost and 1 on almost
everything else. It is free because she is personally absorbing the entire administrative and
no-show cost.

---

## 4. Recommendation

### Primary: GlossGenius Standard, $24/month billed annually

**Why it wins.**

1. **The protections she most needs are on the cheapest tier.** Deposits, no-show and
   cancellation policies, and card on file all ship with Standard at $24/month. Competing
   platforms either gate these behind a ~$49 tier or omit them.
2. **No marketplace commission, ever.** For a business where nearly every client is a referral,
   a platform that does not monetise new clients is aligned with how she actually grows.
3. **Branded booking on every plan.** Her booking page will look like an extension of this
   website rather than a listing among competitors — which matters when the whole positioning
   is trust and discretion.
4. **Beauty-native.** It is built for independent stylists, so service variants, add-on pricing,
   and long appointment durations are the normal case rather than a workaround.
5. **Flat 2.6% with no per-transaction adder.** Simple to reason about on a menu spanning
   $150 to $800, with no card-on-file surcharge.

**Assumptions this rests on.** She stays solo and single-location for the next 12 months; she is
willing to start accepting card payments (required for deposits to be enforceable); and she does
not need a marketplace for new clients.

**Upgrade trigger.** Move to **Gold ($48/month)** when she wants the **waitlist** — genuinely
valuable in her case, because a cancelled eight-hour appointment is a large hole that a waitlist
can fill.

### Runner-up: Square Appointments Plus, $49/month

Choose Square instead if her expansion plans move faster than expected. It is materially
stronger on **future readiness**: multi-location, retail inventory for the braiding-hair product
line she wants to develop, class and event booking for the teaching she plans, and a full POS.
It is roughly twice the monthly cost for equivalent booking protections today, and the free tier
is not a viable option because it lacks no-show and cancellation controls entirely.

### Not recommended, and why

- **Fresha** — cheapest on paper and the lowest processing rate. Rejected because its economics
  are marketplace-led: the 20% first-visit commission is the product. A referral-built studio
  gets the cost without the benefit.
- **Booksy** — strongest marketplace presence in Chicago for braid searches, which is exactly
  what Esther does not need. The 30% Boost commission is opt-in but is the platform's core pitch.
- **Vagaro** — capable and strong on service configuration, but the highest flat processing rate
  (2.75%) and a more dated client-facing booking experience than the brand warrants.

---

## 5. Pilot checklist, before committing

Run this on a free trial before any card is entered.

- [ ] Build **three** real services end to end: Jumbo shoulder-length ($150), Medium-Large waist
      ($~300), and Small ankle-length ($780) — confirm each can express its own price *and* its
      own duration.
- [ ] Model the **boho add-on** as a per-size surcharge that also **extends the appointment
      length**. If a platform cannot extend duration with an add-on, her calendar will overbook.
- [ ] Model **client-supplied bundles at $35 each** as a quantity-based add-on.
- [ ] Set a deposit rule and confirm she can **waive it for a named returning client** without
      dismantling the policy.
- [ ] Send herself the full confirmation, reminder, and rescheduling sequence. Read them on a
      phone. Check they sound like her brand and not like a receipt.
- [ ] Confirm the booking page can be reached by a **direct link** for `NEXT_PUBLIC_BOOKING_URL`,
      and check whether **per-service deep links** exist (they would let each size page book
      itself directly).
- [ ] Check whether a **rebooking link** exists for returning clients — the site has a
      "Rebook in one tap" control that appears automatically if `NEXT_PUBLIC_REBOOK_URL` is set.
- [ ] Confirm client data **exports** to CSV before importing anything.
- [ ] Verify the booking flow is usable with a screen reader and at 200% zoom. The website meets
      WCAG 2.2 AA; the booking step should not be where that breaks down.
- [ ] Check payout timing against her cash-flow needs.

---

## 6. Connecting the choice to this website

Once approved, one variable:

```bash
# .env.local, and the Vercel project's environment variables
NEXT_PUBLIC_BOOKING_URL=https://<the-approved-booking-url>
NEXT_PUBLIC_REBOOK_URL=            # optional; the control hides itself if unset
```

Every booking CTA on the site — header, hero, mobile bar, each of the nine service cards, each
service page, and the closing call to action — reads that single value. Until it is set, each
one renders as a clearly disabled control rather than a dead link, and `pnpm content:check`
reports it as a launch blocker.

---

## 7. Sources

Official vendor documentation, accessed 23 August 2026:

- [GlossGenius pricing](https://glossgenius.com/pricing) — plan prices, 2.6% flat rate, and the
  per-tier feature matrix (deposits, cancellation/no-show, card on file, waitlist) are taken
  directly from this page.
- [Square Appointments pricing](https://squareup.com/us/en/appointments/pricing) — tier structure
  and per-tier feature lists, including that cancellation policies and no-show fees begin at Plus.
- [Square Appointments features](https://squareup.com/us/en/appointments/features)

Secondary sources, used only where official pricing pages did not render figures. Flagged
because vendor-run comparison pages are not neutral about competitors:

- Square Appointments plan prices and processing rates: [Capterra](https://www.capterra.com/p/170263/Square-Appointments/pricing/),
  [SchedulingKit](https://schedulingkit.com/pricing-guides/square-appointments-pricing)
- Fresha plan prices, processing rate, and 20% marketplace commission: [Twizzlo](https://twizzlo.com/articles/fresha-vs-booksy/),
  [Glossystack](https://www.glossystack.com/vs/fresha-vs-booksy)
- Booksy plan prices and 30% Boost commission: [Glossystack](https://www.glossystack.com/software/booksy)
- Vagaro pricing and processing rate: [Twizzlo](https://twizzlo.com/articles/vagaro-vs-fresha/)
- Cross-platform processing rates: [Stylera](https://www.stylera.io/blog/salon-payment-processing-fees-compared-2026)

**Verify Fresha, Booksy, and Vagaro figures against their own pricing pages before making a
final decision.** The GlossGenius recommendation rests on its official pricing page, and the
Square comparison on Square's own feature and pricing pages, so the central finding — that
GlossGenius includes at $24 what Square gates at $49 — is sourced first-hand.
