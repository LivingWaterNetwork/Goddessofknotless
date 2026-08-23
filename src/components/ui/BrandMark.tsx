import Image from "next/image";

/**
 * The script logo and the gk seal, cut out of their emerald plates.
 *
 * The packet supplies both as flat rasters on a solid brand-emerald ground,
 * which is why they were previously stuck in the footer: dropped anywhere else
 * they showed as a green rectangle. `scripts/` note in docs/ASSET_INVENTORY.md
 * records how the alpha versions were derived. With transparency they can do
 * what they should always have done — sit over photography, over emerald, and
 * above the fold.
 *
 * Both are decorative in every placement below: the studio name is always
 * present as real text nearby, so `alt` is empty by design.
 */

const SCRIPT = { src: "/brand/logo-script-gold.png", width: 1128, height: 516 };
const SEAL = { src: "/brand/seal-gold.png", width: 319, height: 278 };

export function ScriptMark({
  className = "",
  sizes = "(min-width: 64rem) 26rem, 60vw",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SCRIPT.src}
      alt=""
      width={SCRIPT.width}
      height={SCRIPT.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={`script-mark ${className}`}
    />
  );
}

export function Seal({
  className = "",
  /* The seal is never displayed larger than ~7rem, and inside `.seal-plate` it
     is 68% of that. Declaring a generous `sizes` made every viewport download
     the 640w candidate for a 60px mark. */
  sizes = "(min-width: 64rem) 7rem, 5rem",
}: {
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={SEAL.src}
      alt=""
      width={SEAL.width}
      height={SEAL.height}
      sizes={sizes}
      loading="lazy"
      className={`seal-mark ${className}`}
    />
  );
}
