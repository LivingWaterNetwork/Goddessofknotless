import { features } from "@/content/features";
import { PLACEHOLDER_NOTICE, stockPlaceholders } from "@/content/placeholder-images";

/**
 * Says, in plain words and without hedging, that none of the photography on
 * this site is Esther's.
 *
 * Blunt is the right register: the whole brand rests on her own consistency,
 * so a subtle caveat under a grid of somebody else's braids would be worse
 * than no caveat at all. It renders wherever a set of stock frames appears,
 * and disappears — along with the images themselves — once the real
 * photography lands.
 */
export function PlaceholderNotice({ className = "" }: { className?: string }) {
  if (!features.previewLabels) return null;
  if (stockPlaceholders.length === 0) return null;

  return (
    <p className={`placeholder-notice ${className}`}>
      <span className="placeholder-notice-tag">
        <span aria-hidden="true">◆</span> Placeholder photography
      </span>
      <span className="placeholder-notice-body">{PLACEHOLDER_NOTICE}</span>
    </p>
  );
}
