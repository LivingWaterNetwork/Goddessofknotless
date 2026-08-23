import { originStatement } from "@/content/business";

/**
 * A single factual line, not a trust bar.
 *
 * There are no invented counters here — no "500+ clients", no star rating, no
 * years-in-business badge — because none of those numbers have been verified
 * and a fabricated one would undermine the exact quality being claimed.
 */
export function ReferralBar() {
  return (
    <aside className="referral-bar" aria-label="How the studio grew">
      <div className="container-page referral-bar-inner">
        <span className="referral-bar-mark" aria-hidden="true" />
        <p className="referral-bar-text">{originStatement}</p>
        <span className="referral-bar-mark" aria-hidden="true" />
      </div>
    </aside>
  );
}
