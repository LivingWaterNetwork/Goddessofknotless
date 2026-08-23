import Link from "next/link";

/**
 * Typographic wordmark, matching the digital treatment shown in the brand
 * packet's own website direction (slides 16–17): "GODDESS" in gold, "OF
 * KNOTLESS" in onyx, set in the primary sans.
 *
 * The script logo is a raster asset in the packet, so it is reserved for the
 * larger moments (footer, seal) where its resolution holds up. A vector master
 * is still outstanding — see docs/ASSET_INVENTORY.md.
 */
export function Wordmark({
  as = "link",
  tone = "light",
  className = "",
}: {
  as?: "link" | "text";
  tone?: "light" | "dark";
  className?: string;
}) {
  const inner = (
    <span className={`wordmark wordmark-${tone} ${className}`}>
      <span className="wordmark-accent">Goddess</span>{" "}
      <span className="wordmark-base">of Knotless</span>
    </span>
  );

  if (as === "text") return inner;

  return (
    <Link href="/" className="wordmark-link" aria-label="Goddess of Knotless — home">
      {inner}
    </Link>
  );
}
