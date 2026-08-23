# Client Handoff

A plain-language guide for Esther. No prior technical knowledge assumed.

---

## What you have

A complete website for Goddess of Knotless, built and tested, ready for you to review. It has ten
pages plus a page for each of your nine sizes.

It is a **first draft for your review**. Everything on it is real information you gave me, except
where it is marked otherwise — see the next section.

**Nothing is live on the internet yet.** Nobody can find it. It is waiting for your approval.

---

## The gold and red badges — read this first

While reviewing, you will see small dashed labels:

- **"Confirm with Esther"** — a fact I published from your own words, but which I want you to
  double-check. There are two important ones: a size I have called **"Medium-Fine"** because you
  gave me two different "Medium" prices and I do not know the real name of the second, and
  **Extra Small**, whose top price came out $5 *below* Small even though it is finer and takes
  two hours longer. That is probably a slip when you read your price sheet aloud.
- **"Needs content"** — something is genuinely missing. Almost all of these are **photographs**.

**These badges disappear automatically when the site goes live.** They exist only so you can see
exactly what I was unsure about. They are not errors and clients will never see them.

The full list is in `CONTENT_CONFIRMATIONS.md`, with a tick-box sheet at the bottom.

---

## The three things standing between this and launch

### 1. A booking system
Right now every "Reserve Your Experience" button is deliberately switched off, because there is
nothing honest to connect it to. You take bookings by text today.

**My recommendation: GlossGenius, $24 a month.** The reason is specific to you: your appointments
run up to fourteen hours, so a no-show costs you an entire working day. GlossGenius includes
deposits, no-show policies, and card-on-file on its **cheapest** plan. Square's free plan looks
cheaper but has no no-show protection at all — you would need their $49 plan to get the same
protection.

I also recommend *against* Booksy and Fresha for you specifically. They take 20–30% of a new
client's first visit. On a $500 appointment that is $100–150 — for a client who found you by
referral, which you generated yourself.

I have not signed you up for anything. Full comparison in `BOOKING_PLATFORM_SCORECARD.md`, with a
checklist to run on a free trial first.

### 2. Photographs
This is the big one. The site has space reserved for fourteen photographs and currently has none.

The gallery is the proof the whole site rests on — your promise is *natural-looking braids with
consistent results*, and no amount of good writing demonstrates that. **A photograph does.**

I did not use stock photos or AI-generated hair. Both were available and both would have been
dishonest, because they would show work that is not yours.

`PHOTO_SHOOT_BRIEF.md` lists exactly what to shoot. Your phone is fine — turn portrait/beauty
mode **off**, because it smooths out the hair texture and clean parts that are the whole point.
Start with just two: **one finished head** for the top of the homepage, and **one of you working**.
Those two alone would transform the site.

### 3. Four policies you have not written down
Cancellation and rescheduling, late arrival, missed appointments, and whether clients can bring
guests or children.

You told me stylists being late is part of why you learned to braid. Holding the opposite standard
means writing the rule down — and no booking system can enforce a policy that has not been
decided.

---

## Updating content yourself

All the words and numbers live in one folder: `src/content/`. Each file is plain text with
comments. You do not need to touch anything else.

| To change | Edit this file |
|---|---|
| Prices, durations, size names, descriptions, add-ons | `src/content/services.ts` |
| Questions and answers | `src/content/faqs.ts` |
| Policies | `src/content/policies.ts` |
| Address, phone, email, hours, Instagram | `src/content/business.ts` |
| Photographs | `src/content/gallery.ts` |
| Testimonials, once you have permission | `src/content/testimonials.ts` |
| Page titles and search descriptions | `src/content/seo.ts` |
| Turning optional sections on or off | `src/content/features.ts` |

**Example — changing the price of Large.** Open `src/content/services.ts`, find `slug: "large"`,
and edit:

```ts
price: { fromUsd: 165, toUsd: 420 },
```

Save, and the price updates everywhere it appears: the card, the table, the size page, the search
description, and the structured data. **You never have to change a price in more than one place**
— that was a deliberate design decision, so your prices can never contradict each other.

---

## Changing the booking platform later

One line, in the Vercel project settings under Environment Variables:

```
NEXT_PUBLIC_BOOKING_URL = https://your-new-booking-link
```

Save and redeploy. Every booking button on the site — the header, the hero, the mobile bar, all
nine size cards, all nine size pages, and the closing invitation — follows that one setting. You
are not locked into whichever platform you pick first.

---

## Putting it online

The website code lives in the GitHub repository `LivingWaterNetwork/Goddessofknotless`, on the
branch `claude/questions-before-start-t890u0`.

**I could not create the Vercel project from where I was working** — there was no Vercel access
available in that environment. Here are the exact steps, which take about ten minutes:

1. Go to [vercel.com/new](https://vercel.com/new) and sign in.
2. **Choose the Living Water Network team, not a personal account.** This matters — check the team
   name at the top before continuing.
3. Import the `LivingWaterNetwork/Goddessofknotless` repository.
4. Name the project `goddess-of-knotless`.
5. Framework preset: **Next.js** (it will detect this automatically).
6. Under Environment Variables, add the values from `.env.example`. At minimum set
   `NEXT_PUBLIC_SITE_URL`.
7. Deploy. You will get a preview URL to check.
8. Add the custom domain only once you have confirmed the domain and DNS plan.

**Do not add this to any existing Living Water Network project.** It is a separate site and needs
its own project.

---

## Seeing how it is doing

Analytics are **switched off** until you approve them. When enabled they show which pages people
visit and which booking buttons they use. They do not track anyone across other websites, do not
build profiles, and do not use advertising cookies. There is no session recording and no
heat-mapping.

Once live, Vercel's dashboard shows visits and page speed. `ANALYTICS_PLAN.md` explains what is
worth paying attention to in the first month — and, honestly, the most valuable measurement is
still you asking clients how they heard about you and writing the answers down.

---

## Things I deliberately did not do

Each of these was a decision, not an oversight:

| Not done | Why |
|---|---|
| **No testimonials** | You described what clients say about you and it is genuinely strong — but writing that up as a client's own quote would be a fake testimonial. The US Federal Trade Commission treats that as deceptive advertising, with real penalties. For a brand built on trustworthiness it is also the worst possible thing to be caught doing. The section is built and hidden, ready for real quotes with permission. |
| **No star ratings or review counts** | You have no third-party ratings yet. Inventing them is the same problem as above. |
| **No "500+ happy clients" style numbers** | No verified figure exists. The site says one true thing instead: self-taught in 2020, built by referrals. |
| **No street address, phone, hours, or email published** | None was confirmed. Publishing a wrong address can get a Google Business Profile suspended, and wrong hours would break your reliability promise on day one. You decide what goes public. |
| **No "luxury", "top-rated", "best", or "pain-free"** | Your brand guide rules these out, and your actual differentiator is that you are *reliable* — so the site should not open by overclaiming. The site says the tangible thing instead: published prices, honest timings, a calm room. |
| **Nothing personal from our calls** | We talked about a great deal that was confidential. None of it is on the website, in the code, or in these documents. The only things used were your services, prices, timings, preparation requirements, how clients book, and your own description of the standards you hold. |
| **"The Goddess Lounge" not used anywhere** | Not approved as a public name. The site's automated checks actually fail the build if that phrase appears. |
| **No Vercel project created, no domain bought, no booking account opened** | All of those are your decisions and your money. |

---

## Getting help

To make changes yourself: everything is in `src/content/`, and `README.md` explains how to run the
site on a computer.

For anything larger — new pages, layout changes, adding the shop when your hair products are
ready — the code is organised so that this is straightforward. `README.md` explains the structure
for whoever picks it up next.

Read these first, in this order:

1. **`CONTENT_CONFIRMATIONS.md`** — everything I need you to confirm, with tick boxes
2. **`PHOTO_SHOOT_BRIEF.md`** — exactly what to photograph
3. **`BOOKING_PLATFORM_SCORECARD.md`** — the booking recommendation and why
4. **`LAUNCH_CHECKLIST.md`** — the full path to going live
