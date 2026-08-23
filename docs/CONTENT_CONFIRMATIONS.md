# Content Confirmations

Every public fact on the website that is **not yet verified**, what it blocks, and who owns it.

The website enforces this list in code. `pnpm content:check` prints it, and with
`CONTENT_MODE=production` it fails the build while any blocker remains. Nothing on this list can
be forgotten into production by accident.

**Owner for every row: Esther Parkman.** Sources are the strategy calls of 19 and 20 August 2026
and the vision-aligned brand packet.

---

## A. Launch blockers — production cannot ship until these clear

### A1. Booking platform and URL
| | |
|---|---|
| **Status** | Not chosen |
| **What we know** | Clients currently book by text to her business line, Instagram DM, or phone call. There is no booking system, no reminders, and no calendar tool. |
| **What is needed** | A chosen platform and its public booking URL, set as `NEXT_PUBLIC_BOOKING_URL`. |
| **Recommendation** | GlossGenius Standard, $24/month. See `BOOKING_PLATFORM_SCORECARD.md`. |
| **Impact if unresolved** | All eleven booking buttons render disabled. The site cannot convert. This is the single highest-value outstanding item. |

### A2. Photography — all of it
| | |
|---|---|
| **Status** | None supplied |
| **What we know** | No client photographs, no portrait of Esther, no studio images exist in the materials provided. The brand packet contains the logo and brand textures only. |
| **What is needed** | Real, client-approved photography per `PHOTO_SHOOT_BRIEF.md`. Twelve gallery slots plus a hero, a founder portrait, a process frame, and a studio frame. |
| **Impact if unresolved** | Twelve placeholder frames on `/gallery`, plus five elsewhere. **The gallery is the proof the entire brand rests on.** |
| **Explicitly rejected** | Stock photography and AI-generated braid imagery. Presenting either as Esther's work would misrepresent the one thing clients are trusting. |

### A3. Cancellation and rescheduling policy
| | |
|---|---|
| **Status** | Never stated on either call |
| **What is needed** | How much notice is required; whether the deposit transfers to a rescheduled appointment or is forfeited; how many times a client may reschedule. |
| **Impact if unresolved** | `/policies` is incomplete, and no booking platform can enforce a rule that has not been decided. |
| **Why it matters here** | Appointments run 1.5 to 14 hours. A late cancellation on a full-day booking is a full day of lost income. |

### A4. Late-arrival policy
| | |
|---|---|
| **Status** | Never stated |
| **What is needed** | The grace period, and what happens past it — is the appointment shortened, re-sized, or forfeited? |
| **Why it matters here** | Esther named other stylists' lateness as part of why she started braiding. Holding the reverse standard needs the rule written down. A late start on an eight-hour booking cascades into the evening. |

### A5. Missed-appointment (no-show) policy
| | |
|---|---|
| **Status** | Never stated |
| **What is needed** | Whether the deposit is forfeited, and whether any further charge applies. |
| **Impact** | Blocks `/policies`, and is a prerequisite for switching on no-show protection in whichever platform is chosen. |

### A6. Guests and children
| | |
|---|---|
| **Status** | Never stated |
| **What is needed** | Whether clients may bring a guest or a child, and any age guidance. |
| **Why it matters here** | Directly connected to the calm, private studio the brand promises, and to appointments that can run most of a day. |

---

## B. Needs confirmation — published, but must be checked

These are on the live site. Each is Esther's own figure, but each has a reason to be double-checked.

### B1. The duplicated "Medium" tier — *published under a working name*
Reading her price list aloud, Esther gave **two consecutive and distinct "Medium" tiers**:

| | Price | Time | Boho |
|---|---|---|---|
| First "Medium" | $300–$550 | 4–5 hours | +$120 |
| Second "Medium" | $340–$675 | 5–6 hours | +$150 |

The second is published as **"Medium-Fine"** — a name we invented so the two are
distinguishable. **Esther must supply the real public name for this size.** The figures are hers
and are believed correct; only the name is ours.

### B2. Extra Small tops out below Small
| Size | Range | Time |
|---|---|---|
| Small | $400–**$780** | 6–8 hours |
| Extra Small | $450–**$775** | 8–10 hours |

Extra Small is finer and takes two hours longer, yet its ceiling is **$5 lower**. Almost
certainly a misread of her price sheet. Published as stated rather than silently corrected.
A unit test asserts prices rise with fineness and flags this specific pair.

### B3. Medium-Large braid count: 22 or 23?
Esther said "22 braids" describing her most-booked size early in the call, then "**23** braids"
when reading her price list. **23** is published. One-word fix either way.

### B4. Deposit amount
Deposits are confirmed — she takes them, especially from new clients. **The amount was never
stated**, nor whether it is a flat figure or a percentage. The site says a deposit is required
and that the amount is confirmed at booking, which is true but thin.

Note also: she said she often waives the deposit for long-standing clients. That is deliberately
**not** published — a published policy she informally waives is worse than a firm one she can
choose to relax privately.

### B5. Microbraids boho surcharge
Every other size has a quoted boho surcharge. Microbraids does not. The site shows
"By request" rather than extrapolating a number.

---

## C. Deliberately not published

These are omissions, not gaps. Each was a decision.

| Item | Why it is absent |
|---|---|
| **Street address** | Never stated. Google's representation guidelines forbid publishing an unverified or partial address, and a wrong one damages local ranking. The site shows "West Loop, Chicago" only. **Esther must decide** whether the suite address is public or given only on confirmed booking — a discretion-led brand may legitimately prefer the latter. |
| **Phone number** | She has a dedicated business line but the number was not stated in a publishable context. |
| **Email address** | Never stated. |
| **Opening hours** | Never stated, and she described a deliberately variable schedule. Publishing invented hours would break the reliability promise on day one. The site says "By appointment". |
| **Instagram handle** | She posts to a business account but the handle was not given. A social link is worth adding once known — Instagram is where discovery starts. |
| **Google Business Profile** | Does not exist yet. See `LOCAL_SEO_LAUNCH.md`; this is the highest-value marketing action after the booking link. |
| **Testimonials** | Esther described what clients say about her, and it is genuinely strong. **None of it can be published as a client quote** — that would be a fabricated testimonial under the FTC's Consumer Reviews and Testimonials Rule. The section is hidden until real, permissioned quotes exist. |
| **Star ratings / review counts** | No third-party rating exists. No `aggregateRating` markup is emitted; self-serving review schema breaks Google's structured-data policy. |
| **Client numbers, years-in-business badges, "500+ clients"** | No verified figure exists. The site carries one factual line instead: *"Self-taught in 2020. Built by referrals."* |
| **Legal entity name** | She confirmed an LLC exists but did not name it. Needed for `/terms`. |
| **Legal contact address** | Needed on `/privacy` and `/terms` before launch. |

---

## D. Confidential — never to be published

Both calls were largely confidential business-and-life coaching. The following came up and is
**permanently excluded** from the website, its source, and its documentation. The content gate
scans for several of these by pattern and fails the build if they appear.

Family health and circumstances · family relationships and conflict · all revenue, expenses,
rent, insurance, and margin figures · tax and compliance status · personal spending · her
account of a past relationship · spiritual and pastoral conversation · named aspirational
celebrity clients · landlord and neighbouring-business complaints · any client named or
described individually.

The only material drawn from the calls is operational: services, sizes, prices, durations,
add-ons, preparation, booking method, the referral-built origin, and her own description of the
standards she holds.

**Public faith expression** appears nowhere as ministry language. It shows up, as the brand
packet directs, through integrity, care, stewardship, and hospitality.

---

## E. Sign-off

| Item | Confirmed | Date | Note |
|---|---|---|---|
| A1 Booking platform + URL | ☐ | | |
| A2 Photography delivered | ☐ | | |
| A3 Cancellation policy | ☐ | | |
| A4 Late-arrival policy | ☐ | | |
| A5 No-show policy | ☐ | | |
| A6 Guests and children | ☐ | | |
| B1 "Medium-Fine" real name | ☐ | | |
| B2 Extra Small ceiling | ☐ | | |
| B3 Medium-Large braid count | ☐ | | |
| B4 Deposit amount | ☐ | | |
| B5 Microbraids boho | ☐ | | |
| C Address treatment decision | ☐ | | |
| C Phone / email / hours | ☐ | | |
| C Instagram handle | ☐ | | |
| C Legal entity + contact | ☐ | | |
| All nine prices re-read against her price sheet | ☐ | | Highest-value single review |
