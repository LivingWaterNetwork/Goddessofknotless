# Launch Checklist

Work top to bottom. The site is a complete, tested preview today; everything below is what stands
between that and a public launch.

`pnpm content:check` enforces the content sections automatically. Run
`CONTENT_MODE=production pnpm content:check` — if it exits 0, the content gate is satisfied.

---

## 1. Business decisions (Esther, and only Esther)

- [ ] **Choose a booking platform.** Recommendation: GlossGenius Standard, $24/month. See
      `BOOKING_PLATFORM_SCORECARD.md`. Run the pilot checklist there on a free trial first.
- [ ] **Decide the address treatment** — is the West Loop suite address public, or given only on
      confirmed booking? Both are legitimate; the second may suit a discretion-led brand.
- [ ] **Decide whether to publish a phone number** or keep booking online-only.
- [ ] **Decide operating hours**, or confirm "By appointment" stands.
- [ ] **Write the four missing policies**: cancellation and rescheduling, late arrival, missed
      appointments, guests and children. See `CONTENT_CONFIRMATIONS.md` A3–A6.
- [ ] **Set the deposit amount** and whether it is flat or a percentage.
- [ ] **Approve or correct the hero and section copy.** Note the deviation from the brand
      packet's mockup copy recorded in `ASSET_INVENTORY.md`.
- [ ] **Approve analytics** before they are switched on.

## 2. Content verification

- [ ] **Re-read all nine prices against her actual price sheet.** Highest-value single review on
      this list — the site publishes real money.
- [ ] Confirm the real public name for the size published as **"Medium-Fine"** (B1).
- [ ] Confirm the **Extra Small** ceiling — currently $5 below Small despite being finer (B2).
- [ ] Confirm **Medium-Large** is 23 braids, not 22 (B3).
- [ ] Confirm the **Microbraids boho** surcharge, or leave it as "By request" (B5).
- [ ] Confirm all nine **duration ranges**.
- [ ] Confirm the add-ons: boho per size, additional hair $65, client-supplied bundles $35 each,
      raw hair $145/bundle + $35 install.
- [ ] Read every page once, out loud, and confirm it sounds like her.

## 3. Assets

- [ ] **Supply the vector master logo.** Only rasters exist, extracted from the PowerPoint.
- [ ] **Deliver all 14 photographs** per `PHOTO_SHOOT_BRIEF.md`. Hero and founder portrait first.
- [ ] **Obtain written permission** from every photographed client. Log it in
      `ASSET_INVENTORY.md`.
- [ ] Add images and set each gallery record's `status` to `"verified"`.

## 4. Legal

- [ ] Supply the **registered legal entity name** for `/terms` (an LLC exists; it was not named).
- [ ] Supply a **contact address** for `/privacy` and `/terms`.
- [ ] Have someone qualified read `/privacy` and `/terms`. They are written carefully and
      honestly, but they are not legal advice.
- [ ] If testimonials are ever published, keep written permission on file. See the FTC rule.

## 5. Domain and hosting

- [ ] Register or confirm the domain. `NEXT_PUBLIC_SITE_URL` currently defaults to
      `https://goddessofknotless.com` — **set it to the real domain**, as it drives canonical
      URLs, the sitemap, and structured data.
- [ ] Create a **new, separate Vercel project** — do not attach this to any existing Living Water
      Network project. See `CLIENT_HANDOFF.md` for the exact steps.
- [ ] Set all environment variables in the Vercel project (see `.env.example`).
- [ ] Verify the **preview** deployment before promoting anything.
- [ ] Attach the custom domain only after the DNS plan is confirmed.
- [ ] Confirm HTTPS and that the security headers in `next.config.ts` are being served.

## 6. Switch to production mode

- [ ] Set `NEXT_PUBLIC_BOOKING_URL` to the real booking URL.
- [ ] Set `NEXT_PUBLIC_REBOOK_URL` if the platform supports rebooking links.
- [ ] Set `NEXT_PUBLIC_CONTENT_MODE=production`. This hides all internal verification badges.
- [ ] **Set `NEXT_PUBLIC_ALLOW_INDEXING=true`.** Until this is set, `robots.txt` disallows
      everything and every page carries `noindex` — correct for a review link, fatal for a launched
      site. `CONTENT_MODE=production pnpm content:check` fails if it is missing, so this cannot be
      forgotten.
- [ ] Run `CONTENT_MODE=production pnpm content:check` — **it must exit 0.**
- [ ] Run `pnpm qa` and confirm everything passes.
- [ ] Click every booking button on the deployed site and confirm each reaches the booking
      platform.

## 7. Search and discovery

- [ ] **Create the Google Business Profile** and complete verification. Highest-value marketing
      action after the booking link. Full steps in `LOCAL_SEO_LAUNCH.md`.
- [ ] Verify the domain in Google Search Console; submit the sitemap.
- [ ] Validate structured data with the Rich Results Test.
- [ ] Submit to Bing Webmaster Tools.
- [ ] Add the Instagram handle to `src/content/business.ts` and link it.
- [ ] Update or remove any existing marketplace listing with stale prices.

## 8. Final pre-launch pass

- [ ] Open the site on a **real iPhone and a real Android**. All QA so far used emulated
      viewports. Pay attention to the sticky booking bar and safe-area insets.
- [ ] Tab through the homepage and the services page on a real keyboard.
- [ ] Test with a screen reader (VoiceOver on iOS is the closest match to the audience).
- [ ] Re-run Lighthouse against the **Vercel preview URL**, not localhost.
- [ ] Check the Open Graph image by pasting the URL into a message to yourself.
- [ ] Confirm the 404 page works on the deployed site.
- [ ] Read the whole site once on a phone, as a client would.

## 9. Day one after launch

- [ ] Confirm Speed Insights is receiving **field** Core Web Vitals — that data, not the lab
      figures in `QA_REPORT.md`, is the authority.
- [ ] Confirm booking events are firing and that clicks match sessions in the booking platform.
      A gap between the two is the most expensive possible bug.
- [ ] Start asking for Google reviews at the end of appointments.
- [ ] Begin the 30-day measurement plan in `ANALYTICS_PLAN.md`.

---

## Rollback

Vercel keeps every deployment. To revert, open the project's Deployments tab, find the last good
one, and choose **Promote to Production**. No rebuild is needed and it takes seconds.

If the booking platform itself fails, clear `NEXT_PUBLIC_BOOKING_URL` and redeploy: every CTA
reverts to a clearly disabled control rather than sending clients to a broken booking flow.

---

## What is deliberately not launching

Built and tested, switched off behind typed feature flags. Each is one line in
`src/content/features.ts` when Esther wants it.

| Off | Why |
|---|---|
| Testimonials | No real permissioned quotes exist yet |
| `/private` high-discretion enquiry | Needs Esther's approval and a form recipient |
| `/education` class waitlist | Classes are a stated future plan, not a current service |
| `/journal` | No publishing plan. An empty blog is worse than none |
| Commerce routes | The branded hair line does not exist yet. Architecture is ready; there are no public routes |
| Analytics | Awaiting approval |
