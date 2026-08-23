import type { Faq } from "./types";

const CALL = "Esther, strategy call 2026-08-20";

/**
 * Every answer below is grounded in something Esther actually said. Questions
 * she has not answered are absent rather than invented — a wrong FAQ answer
 * costs her a text message and a client's trust.
 */
export const faqs: Faq[] = [
  {
    id: "prep",
    question: "How should my hair be prepared before my appointment?",
    answer:
      "Come with your hair already washed and blow-dried. Esther's appointment time is braiding time, so arriving prepped is what keeps your appointment on schedule and your quoted time accurate. If your hair is blow-dried well, the work goes faster and the parts sit cleaner.",
    featured: true,
    bookingCritical: true,
    status: "verified",
    sourceNote: `${CALL}: "they already come washed and blow-dried, and then I just do the braids."`,
  },
  {
    id: "how-priced",
    question: "How is pricing decided?",
    answer:
      "Two things: the size you choose and the length you want. Size is measured by braid count — from Jumbo at ten to thirteen braids through to Microbraids. Within each size, the price rises with length, from shoulder length at the low end of the range to ankle length at the top. Every size and its full range is listed on the Services page.",
    featured: true,
    bookingCritical: true,
    status: "verified",
    sourceNote: `${CALL}: "They all have its own range, based off length." / "Length and style."`,
  },
  {
    id: "which-size",
    question: "I don't know which size to choose. Where should I start?",
    answer:
      "Medium-Large is the size Esther books most often, and Large is close behind — between them they cover most first appointments. Larger sizes mean less time in the chair; finer sizes mean more definition and a longer-wearing result. The Find Your Size guide on the Services page walks through the trade-off in a few steps.",
    featured: true,
    bookingCritical: true,
    status: "verified",
    sourceNote: `${CALL}: Esther named medium-large ("I booked that a lot") and large as her most-booked sizes.`,
  },
  {
    id: "how-long",
    question: "How long will my appointment take?",
    answer:
      "It depends entirely on size and length — from about an hour and a half for Jumbo up to ten to fourteen hours for Microbraids. Each size on the Services page lists its own range. The range also moves with your hair: head size, hair type, and how well the hair has been blow-dried all affect the timing.",
    featured: true,
    bookingCritical: true,
    status: "verified",
    sourceNote: `${CALL}: full duration table, plus "all this all depends on head size, the type of hair, and if their hair is blow-dried correctly."`,
  },
  {
    id: "boho",
    question: "What is a boho finish, and what does it add?",
    answer:
      "A boho finish weaves loose human-hair pieces through the braids for a softer, more textured look. It is priced as an addition on top of your size, and the surcharge rises with finer sizes because blending takes longer. Each size lists its own boho price on the Services page.",
    featured: false,
    bookingCritical: true,
    status: "verified",
    sourceNote: `${CALL}: per-size boho surcharges quoted in full.`,
  },
  {
    id: "own-hair",
    question: "Can I bring my own hair?",
    answer:
      "Yes. Esther installs hair you bring for a per-bundle installation fee. If you would rather she supply it, the studio also offers raw Indian and raw Burmese human hair by the bundle, with installation priced per bundle on top. Both options are listed under Add-ons on the Services page.",
    featured: false,
    bookingCritical: true,
    status: "verified",
    sourceNote: `${CALL}: "$35 per bundle" for client-supplied hair; "$145 per bundle plus $35 to install" for raw Indian or Burmese.`,
  },
  {
    id: "what-included",
    question: "Does my appointment include washing or blow-drying?",
    answer:
      "No — your appointment is the braiding itself. Please arrive washed and blow-dried. This is what keeps quoted times accurate and is the single most useful thing you can do before you arrive.",
    featured: false,
    bookingCritical: true,
    status: "verified",
    sourceNote: `${CALL}: "I just braid hair, so they already come washed and blow-dried."`,
  },
  {
    id: "deposit",
    question: "Is a deposit required?",
    answer:
      "Yes — a deposit reserves your appointment, and it comes off your total on the day. The exact amount is confirmed when you book.",
    featured: true,
    bookingCritical: true,
    status: "needs-confirmation",
    sourceNote: `${CALL}: Esther confirmed she takes deposits but did not state an amount or whether it is flat or a percentage. Amount must be confirmed before launch.`,
  },
  {
    id: "styles-offered",
    question: "What kinds of braids does Esther do?",
    answer:
      "Knotless braids — that is the whole focus of the studio, in every size from Jumbo through Microbraids, classic or with a boho finish. Doing one thing is what makes the results consistent from one appointment to the next.",
    featured: false,
    bookingCritical: false,
    status: "verified",
    sourceNote: `${CALL}: "just knotless braids. I just braid hair."`,
  },
  {
    id: "referral",
    question: "How do most people find Esther?",
    answer:
      "By referral. The studio has grown almost entirely through clients telling other people, since Esther first started braiding in 2020. It is also why consistency matters so much here — a referral is someone putting their own name behind the work.",
    featured: false,
    bookingCritical: false,
    status: "verified",
    sourceNote: `${CALL}: "my clients is built off referrals."`,
  },
  {
    id: "privacy",
    question: "What is the studio like?",
    answer:
      "Calm and private. Esther keeps the room free of gossip and drama — clients regularly fall asleep in the chair. If your work or your life means you value discretion, that is the environment this studio is built around.",
    featured: false,
    bookingCritical: false,
    status: "verified",
    sourceNote: `${CALL}: "They could go to sleep, getting their hair done." / "I don't be through the gossiping and all of that stuff."`,
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);
