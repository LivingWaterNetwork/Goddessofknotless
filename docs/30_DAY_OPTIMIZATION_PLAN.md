# 30-Day Optimization Plan

Starts the day the booking link goes live with real photography in place. Before that, the funnel
is not measurable and any number is noise.

**No ranking or revenue outcome is promised in this document.** It sets out what to measure and
how to decide — not what will happen.

---

## The one thing worth knowing first

Esther's business is referral-built. **The most valuable question in the first 30 days is one no
analytics tool can answer: "how did you hear about me?"** She already asks it in the chair. The
only change needed is writing the answers down.

A tally on her phone — *referral / Instagram / Google / walk-past* — for 30 days will be more
decisive than everything below. If Google produces almost nothing, the priority is the Business
Profile, not the website. If Instagram dominates, the priority is the link in her bio and the
mobile booking flow.

---

## Week 1 — verify, do not optimise

Nothing is worth changing until the measurement is trustworthy.

| Check | Why |
|---|---|
| Events fire from a real phone on a real network | Development-mode logging proves nothing |
| Every `book_click` corresponds to a session in the booking platform | A gap here is the most expensive bug possible: visitors trying to book and failing |
| Field Core Web Vitals in Speed Insights | The lab figures in `QA_REPORT.md` are estimates. p75 field LCP is the number Google actually uses |
| The booking flow works end to end, from a phone, as a new client | Including the deposit step |
| Confirmation and reminder emails read like her brand | They are now part of the client experience |

**Do not change the site this week.** Fix measurement problems only.

---

## Week 2 — find the drop-off

Work the funnel in order and stop at the first place it leaks:

```
page view → /services view → book_click → booking platform session → confirmed appointment
```

| Symptom | Likely cause | Response |
|---|---|---|
| Few page views at all | No discovery. Not a website problem | Google Business Profile, Instagram bio link |
| Views but few `/services` views | The homepage is not driving to pricing | Raise the services CTA |
| `/services` views but few `book_click` | Price, duration, or hesitation | See Week 3 — do not guess yet |
| `book_click` but few platform sessions | **A broken handoff.** Highest priority of anything here | Fix immediately |
| Platform sessions but few confirmations | Friction inside the booking flow, often the deposit step | Simplify the platform's flow, not the site |

Also read `faq_open` where `bookingCritical` is true. A frequently-opened question means that
answer is not visible early enough — the cheapest possible fix.

---

## Week 3 — test the central bet

The site makes one significant strategic wager: **publishing every price and every duration in
full, before anyone books.** Most competitors do not. Week 3 is for evidence.

**Questions to answer:**

1. Do visitors who reach `/services` book at a higher or lower rate than those who do not?
2. Which sizes get viewed but not booked? Three different diagnoses:
   - *A price objection* — the range is higher than expected
   - *A time objection* — nobody can commit to ten hours, whatever it costs
   - *A proof gap* — the photograph for that size is weak or missing
   The distinction matters, because the fix differs completely.
3. Is the size guide earning its space? Compare `size_guide_start` → `size_guide_complete` →
   `service_booking_click`. If people start and abandon it, the questions are wrong. If they
   complete it and do not book, the recommendation is wrong.
4. Which sizes actually book most? The site currently flags Large and Medium-Large as
   "most booked" on Esther's word. If reality differs, the homepage should follow reality.

**If the transparency bet is losing**, the response is not to hide prices — it is to frame them.
Lead with what is included, put the shortest and cheapest sizes first, and make the time
commitment clearer earlier.

---

## Week 4 — change at most two things

Pick two. Write down what you changed and why. Resist rebuilding on a month of thin data.

Likely candidates, in order of expected value:

1. **Promote the most-opened booking-critical FAQ answer** onto the homepage or into the booking
   flow. Cheapest change with the most direct effect.
2. **Reorder the homepage's three featured sizes** to match what actually books.
3. **Fix the weakest service photograph.** If a size is viewed and abandoned, the image is a
   likely cause.
4. **Adjust the size guide mapping** if it recommends sizes people consistently abandon.
5. **Add the Instagram link**, if Instagram turns out to be the main channel.

---

## Statistical honesty

Volume will be low. Esther is one person who can physically serve a limited number of clients per
week, some of whom occupy an entire day.

- **A month of data on a solo business is a small sample.** Four bookings to six is two bookings,
  not a 50% improvement.
- **Do not A/B test.** There will not be the traffic to reach significance on anything, and a
  split test on this volume will produce a confident-looking answer that is noise.
- **Prefer large, obvious changes over small optimisations.** At this volume you can detect
  "nobody can find the prices"; you cannot detect a button-colour effect.
- **Attribution will be incomplete** — Instagram in-app browsers and iOS privacy protections
  obscure sources. Treat everything as directional.

---

## Beyond 30 days

Sequenced by expected value, not by novelty:

1. **Real testimonials.** Ask permission from clients who leave Google reviews. This unlocks the
   built-but-hidden testimonials section and closes the biggest remaining proof gap.
2. **More photography, per size.** The gallery is the brand's proof. One image per size is the
   minimum, not the goal.
3. **Google reviews, steadily.** The main gap against marketplace listings, and the only
   legitimate route is slow.
4. **The education waitlist** (`features.educationWaitlist`) when classes become real. Esther
   described one-to-one, group, children's, and parent-and-daughter teaching — that is a business
   line, and a waitlist would size the demand before she builds it.
5. **Per-service booking deep links**, if the platform supports them, so each size page books
   itself directly.
6. **Revisit the "Medium-Fine" naming** once clients have been using the menu and the language
   has settled.

**Not recommended:** a blog, until there is a real publishing plan; neighbourhood landing pages,
ever; and paid ads before the Google Business Profile and reviews are established — paid traffic
into a listing with no reviews converts badly and costs more than it returns.
