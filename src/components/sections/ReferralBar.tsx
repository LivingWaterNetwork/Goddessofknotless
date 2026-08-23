import { Seal } from "@/components/ui/BrandMark";
import { originStatement } from "@/content/business";

/**
 * A single factual line, not a trust bar.
 *
 * There are no invented counters here — no "500+ clients", no star rating, no
 * years-in-business badge — because none of those numbers have been verified
 * and a fabricated one would undermine the exact quality being claimed. What
 * carries the weight instead is the seal, at a size that lets it read.
 */
export function ReferralBar() {
  return (
    <aside className="referral-bar" aria-label="How the studio grew">
      <div className="container-page referral-bar-inner">
        <span className="referral-bar-mark" aria-hidden="true" />
        <div className="referral-bar-body">
          <span className="seal-plate referral-bar-seal" aria-hidden="true">
            <Seal sizes="4rem" />
          </span>
          <p className="referral-bar-text">{originStatement}</p>
        </div>
        <span className="referral-bar-mark" aria-hidden="true" />
      </div>
    </aside>
  );
}
