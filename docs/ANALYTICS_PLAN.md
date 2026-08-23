# Analytics Plan

**Analytics are switched off by default** (`NEXT_PUBLIC_ENABLE_ANALYTICS=false`) and require
Esther's approval before enabling. Nothing is measured until she says so.

When enabled, measurement uses **Vercel Web Analytics and Speed Insights** — cookieless, no
cross-site tracking, no personal profiles. No advertising pixels, no session-recording tools, and
no heat-mapping are installed, by design.

---

## Event dictionary

All events flow through one typed wrapper (`src/lib/analytics.ts`). Adding an event means adding
it to the TypeScript union, which means it cannot drift from this table without a type error.

| Event | Fires when | Properties |
|---|---|---|
| `book_click` | Any booking CTA is used | `route`, `placement` |
| `rebook_click` | The returning-client rebook link is used | `route`, `placement` |
| `service_view` | A size's detail page is viewed | `slug` |
| `service_booking_click` | Booking is started from a specific size | `slug`, `route` |
| `size_guide_start` | First answer given in Find Your Size | — |
| `size_guide_complete` | Both answers given, a size recommended | `recommendedSlug` |
| `gallery_filter` | A gallery size filter is used | `filter` |
| `gallery_open` | A gallery image is enlarged | `itemId` |
| `faq_open` | An FAQ question is expanded | `id`, `bookingCritical` |

`placement` is one of: `header`, `hero`, `mobile-bar`, `service-card`, `service-detail`,
`closing-cta`, `footer`.

**Not tracked, deliberately:** scroll depth, mouse movement, time-on-page beyond the default page
view, and anything a visitor types. No form content ever reaches analytics — there are no forms
on the launch site.

`phone_click`, `email_click`, and `directions_click` are defined in the plan but **not
implemented**, because no phone, email, or address is published yet. Add them alongside those
details.

---

## What each event is for

Not vanity metrics — each answers a question that changes a decision.

| Question | Read from | What the answer changes |
|---|---|---|
| Is the site producing bookings at all? | `book_click` total | Whether anything below matters yet |
| Which CTA placement actually works? | `book_click` by `placement` | Whether the mobile bar earns its space; whether the hero CTA is being skipped |
| Which sizes drive bookings? | `service_booking_click` by `slug` | Which size deserves the best photograph, and whether "most booked" reflects reality |
| Does the price table reduce friction or cause hesitation? | `/services` views vs `book_click` from that route | Whether publishing full prices helps or hurts. **This is the single most interesting question on the site** — most competitors hide prices |
| Is the size guide worth keeping? | `size_guide_start` → `size_guide_complete` → `service_booking_click` | Whether to invest in it or remove it |
| Which questions are still blocking bookings? | `faq_open` where `bookingCritical` is true | Which answers to promote onto the homepage or into the booking flow |
| Do people want to see the work before booking? | `gallery_open`, `gallery_filter` | How much photography is worth commissioning next |

---

## Baseline

There is **no baseline**. There is no current website, no Google Business Profile, and no
analytics history. The first 30 days establish the baseline; they do not prove improvement
against anything.

Any figure quoted before then is a starting number, not a result.

---

## 30-day plan

Assumes the booking link is live and real photography has landed. Without those, the funnel is
not measurable.

### Week 1 — confirm the plumbing
- Verify events fire from a real phone on a real network, not just in development.
- Check Speed Insights for **field** Core Web Vitals. The lab figures in `QA_REPORT.md` are
  estimates; this is the real thing.
- Confirm every booking click reaches the booking platform and the platform records a
  corresponding session. A gap between the two is the most expensive possible bug.

### Week 2 — find the drop-off
- Compare page views to `book_click`, per route.
- Compare `book_click` to appointments actually booked in the platform. If many clicks produce
  few bookings, the problem is in the booking flow, not the website.
- Look at `faq_open` on booking-critical questions. Frequent opens mean the answer is not visible
  early enough.

### Week 3 — the price-transparency question
- Do visitors who reach `/services` book more or less than those who do not?
- Which sizes get viewed but not booked? That may be a pricing question, a photography gap, or
  simply an appointment length people cannot commit to.
- Does the size guide correlate with bookings, or is it decoration?

### Week 4 — decide, and write it down
Pick **at most two** changes and record why. Resist rebuilding on a month of thin data.

Likely candidates, in order of expected value:
1. Move the most-opened booking-critical FAQ answer higher up the homepage.
2. Reorder the featured sizes on the homepage to match what actually books.
3. Adjust the size guide's recommendation mapping if it consistently points at sizes people
   then abandon.

---

## Honest limits

- **Attribution will be incomplete.** Instagram in-app browsers, iOS privacy protections, and
  referral word-of-mouth all obscure the source. Treat totals as directional.
- **Volume will be low at first**, so percentages will be noisy. A change from 4 bookings to 6 is
  not a 50% improvement; it is two bookings.
- **The most important channel is invisible to analytics.** Esther's business is referral-built.
  The single most valuable question — *"how did you hear about me?"* — is one she already asks in
  the chair, and no analytics tool will answer it better.
- **No ranking or revenue outcome is promised.** This plan measures what the site does; it does
  not guarantee what the market does.
