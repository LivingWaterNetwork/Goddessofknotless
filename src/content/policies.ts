import type { Policy } from "./types";

const CALL = "Esther, strategy call 2026-08-20";

/**
 * Only policies Esther has actually stated appear here. The launch gate lists
 * every `needs-confirmation` item, and the /policies page labels them plainly
 * in preview so nobody mistakes a placeholder for a real rule.
 */
export const policies: Policy[] = [
  {
    id: "preparation",
    title: "Arrive washed and blow-dried",
    body: "Your appointment time is braiding time. Please arrive with your hair freshly washed and blow-dried. Hair that has been blow-dried well braids faster, parts more cleanly, and keeps your appointment inside its quoted window.",
    status: "verified",
    sourceNote: `${CALL}: stated twice.`,
  },
  {
    id: "deposit",
    title: "A deposit reserves your appointment",
    body: "Appointments are held with a deposit, which comes off your balance on the day. The amount is confirmed when you book.",
    status: "needs-confirmation",
    sourceNote: `${CALL}: deposits confirmed, amount not stated. Confirm the amount and whether it is flat or a percentage before launch.`,
  },
  {
    id: "pricing-confirmation",
    title: "Your price is confirmed before you book",
    body: "Because price moves with both size and length, your exact total is confirmed when your appointment is booked — not estimated on arrival. Add-ons such as a boho finish or additional hair are quoted at the same time.",
    status: "verified",
    sourceNote: `${CALL}: pricing is a function of size and length; ranges quoted per size.`,
  },
  {
    id: "cancellation",
    title: "Cancellations and rescheduling",
    body: "",
    status: "placeholder",
    sourceNote: "NOT STATED on either call. Esther must supply her cancellation window, rescheduling rule, and whether the deposit is transferable. Blocks production launch.",
  },
  {
    id: "late-arrival",
    title: "Late arrivals",
    body: "",
    status: "placeholder",
    sourceNote: "NOT STATED. Esther must supply her grace period and what happens past it. Material because appointments run 1.5–14 hours and a late start cascades. Blocks production launch.",
  },
  {
    id: "guests-children",
    title: "Guests and children",
    body: "",
    status: "placeholder",
    sourceNote: "NOT STATED. Relevant to a calm, private studio and to long appointments. Esther must confirm. Blocks production launch.",
  },
  {
    id: "no-show",
    title: "Missed appointments",
    body: "",
    status: "placeholder",
    sourceNote: "NOT STATED. A no-show on a 6–14 hour booking is a significant loss; a stated policy is also a prerequisite for enforcing one through a booking platform. Blocks production launch.",
  },
];

/** Policies with real, publishable copy. */
export const publishablePolicies = policies.filter(
  (p) => p.status !== "placeholder" && p.body.length > 0,
);

/** Policies still awaiting Esther's input. */
export const pendingPolicies = policies.filter(
  (p) => p.status === "placeholder" || p.body.length === 0,
);
