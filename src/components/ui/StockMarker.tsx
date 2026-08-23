import { features } from "@/content/features";

/**
 * The marker that sits on every stock photograph in the review build.
 *
 * Deliberately loud. A quiet one would let a picture of another stylist's work
 * be mistaken for Esther's, which is the single risk this whole approach
 * carries. It is real text, not a decorative overlay, so a screen reader
 * announces it as well. It never renders in production mode — and the launch
 * gate refuses production while any stock placeholder remains, so it cannot
 * disappear with the problem unsolved.
 */
export function StockMarker({
  size = "default",
  className = "",
}: {
  size?: "default" | "compact";
  className?: string;
}) {
  if (!features.previewLabels) return null;

  return (
    <span className={`stock-marker stock-marker-${size} ${className}`}>
      <span className="stock-marker-tag">
        <span aria-hidden="true" className="stock-marker-dot">
          ◆
        </span>
        Stock placeholder
      </span>
      {size === "default" ? (
        <span className="stock-marker-note">
          Not Esther&rsquo;s work &mdash; for layout review only
        </span>
      ) : (
        <span className="sr-only"> &mdash; not Esther&rsquo;s work, for layout review only</span>
      )}
    </span>
  );
}
