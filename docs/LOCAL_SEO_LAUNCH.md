# Local SEO Launch Checklist

Chicago knotless-braid searches are dominated by Booksy and Fresha marketplace listings. Those
listings compete on price and availability. This site competes on trust, clarity, and direct
booking — and it can win the searches where someone is choosing a *person* rather than a slot.

**No SEO rankings or revenue outcomes are promised anywhere in this document.** Below are the
actions that are worth taking and the reasons.

---

## Step 1 — Google Business Profile (do this first)

There is no Google Business Profile yet. **This is the highest-value marketing action available
after connecting the booking link.** For local beauty searches the Business Profile, not the
website, is what usually appears first.

### The address decision comes first

Esther must decide, before creating the profile:

- **Is the West Loop studio a place clients come to?** Yes — so it qualifies as a storefront and
  can be verified at that address.
- **Should the street address be public?** This is a genuine business decision, not an SEO one. A
  discretion-led brand may reasonably prefer to give the suite address only on confirmed booking.

Google allows a verified address to be hidden from public display in some categories while still
being used for local ranking. **Ask Google Support what applies to this listing rather than
guessing** — and never enter an address she does not actually operate from. A virtual office,
mailbox, or a friend's address is a suspension risk and a permanent one.

### Setting it up

- [ ] Create the profile at google.com/business as **Goddess of Knotless** — exactly as written,
      no keywords appended. "Goddess of Knotless Braids Chicago" is a guideline violation.
- [ ] Primary category: **Hair Salon**. Secondary: **Hair Extension Technician** or
      **Beauty Salon** if applicable. Do not stack unrelated categories.
- [ ] Complete verification. Expect video verification; have the studio accessible.
- [ ] Set service area: Chicago and nearby suburbs she actually serves.
- [ ] Hours — **only once decided.** No hours is better than wrong hours.
- [ ] Add the website URL and the booking link. Google Business Profile supports a booking URL
      directly, which is often the shortest path from search to a booked appointment.
- [ ] Add services matching the site exactly: the nine sizes with their real price ranges. This
      is where consistency with the website matters most.
- [ ] Upload photography — the same set from `PHOTO_SHOOT_BRIEF.md`. Profiles with real work
      photos convert better than those without.
- [ ] Write the business description in her own voice. Reuse the site's positioning, not keywords.

---

## Step 2 — Search Console and Bing

- [ ] Verify the domain in Google Search Console (DNS TXT is the most durable method).
- [ ] Submit `https://<domain>/sitemap.xml`. The sitemap is generated automatically and already
      includes all ten launch routes plus all nine service pages.
- [ ] Check Coverage after a week; confirm all nineteen URLs are indexed.
- [ ] Validate the structured data with Google's Rich Results Test. Expected: `HairSalon`,
      `WebSite`, `Service` on each size page, `BreadcrumbList` on service pages, and `FAQPage`
      on `/faq`. **`HairSalon` and `Service` do not produce a visual rich result** — they are
      valid and worth emitting because they describe the business to Google accurately, and that
      is the point of them here.
- [ ] Confirm no `aggregateRating` or `review` markup is present. There is none by design; a
      regression here would breach Google's structured-data policy and the FTC testimonial rule.
- [ ] Submit to Bing Webmaster Tools (import from Search Console is fastest).

---

## Step 3 — Citation consistency

The name, and the address treatment once decided, must match **exactly** everywhere. Inconsistent
listings dilute local ranking signals.

- [ ] Google Business Profile
- [ ] Instagram bio and link
- [ ] Apple Business Connect (worth doing — Apple Maps is the default on iPhone)
- [ ] Yelp, if she wants a presence there
- [ ] Any existing Booksy, Fresha, or StyleSeat listing — either update it to match or take it
      down. A stale listing with old prices actively competes with the real site.

**Public-facing name is "Goddess of Knotless".** Not "The Goddess Lounge", which is not approved
for public use. The content gate fails the build if that phrase appears anywhere in the source.

---

## Step 4 — What the site already does

No action needed; listed so it is not duplicated by hand.

| | |
|---|---|
| Unique title and meta description per route | Yes — enforced by a unit test |
| Canonical URLs | Yes, on every route |
| `sitemap.xml` and `robots.txt` | Generated from the content layer |
| Open Graph and Twitter metadata | Yes, with a generated branded share image |
| `HairSalon` / `WebSite` JSON-LD | Yes, verified facts only. No address, phone, hours, or rating — because none is confirmed |
| `Service` JSON-LD per size | Yes, with real min/max price specifications |
| `BreadcrumbList` | Yes, on service detail pages |
| `FAQPage` | Yes — **only the verified answers**. The unconfirmed deposit answer is deliberately excluded |
| Semantic heading structure | Yes — enforced by an end-to-end test that walks every route |
| Image alt text | Enforced by the content gate; no image can publish without it |
| Core Web Vitals | Measured: LCP 168ms, CLS 0.000. See `QA_REPORT.md` |

---

## Step 5 — The content that will actually earn traffic

The site targets these themes through genuine, useful copy rather than repetition:

| Theme | Where it is served |
|---|---|
| knotless braids Chicago / West Loop | Homepage, all nine service pages |
| natural-looking knotless braids | The core brand promise, throughout |
| knotless braid prices Chicago | `/services` — a full published price table. **This is the strongest differentiator.** Most competitors hide prices behind a booking flow or a DM. |
| how long do knotless braids take | Real duration ranges on every size, plus the FAQ |
| boho knotless braids Chicago | Priced per size on `/services` |
| gentle / low-tension braiding | `/experience` — carefully worded, no medical or hair-health claims |
| private, discreet braiding | `/experience` and the homepage trust section |

**No neighbourhood doorway pages have been created**, and none should be. Nine thin
"knotless braids in [neighbourhood]" pages would be a spam signal and would cheapen the brand.

---

## Step 6 — Reviews, done properly

Reviews are the biggest gap against the marketplace listings, and the only legitimate route is
slow and real.

- [ ] Once the Business Profile is live, get its short review link.
- [ ] Ask at the end of the appointment, while the client is looking at finished hair.
- [ ] If the booking platform can send a review request automatically after an appointment, use
      it. GlossGenius and Square both support this.
- [ ] Never offer anything in exchange for a review, never write one, never edit one. The FTC's
      Consumer Reviews and Testimonials Rule carries real penalties, and for a trust-led brand
      the reputational cost of being caught would be far worse than the fine.
- [ ] As real reviews accumulate, ask permission to quote a few on the site. That is what unlocks
      the currently hidden testimonials section.
