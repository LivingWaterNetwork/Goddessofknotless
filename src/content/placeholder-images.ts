/**
 * STOCK PLACEHOLDER PHOTOGRAPHY — REVIEW BUILD ONLY.
 *
 * None of these pictures are Esther's work. They exist so the client review
 * can judge the layout, the rhythm, and the art direction with real
 * photography in the frames instead of empty rectangles. Every one of them
 * depicts another stylist's work on another person's head, which is exactly
 * the thing this brand cannot claim, so:
 *
 *   1. every record below stays `status: "placeholder"`;
 *   2. every frame renders a visible STOCK PLACEHOLDER marker in preview;
 *   3. `scripts/content-check.ts` blocks the production gate while this
 *      registry is non-empty. Emptying it is what clears the launch blocker.
 *
 * Replacement procedure is in docs/ASSET_INVENTORY.md. Sources and licence
 * are recorded there too, so the whole set can be removed cleanly.
 */

export interface StockPlaceholder {
  /** Path under /public. */
  src: string;
  /** Honest description of what the stock photograph actually shows. */
  alt: string;
  width: number;
  height: number;
  /** Page of origin, for the audit trail in docs/ASSET_INVENTORY.md. */
  sourceUrl: string;
  /** Which real photograph replaces it. See docs/PHOTO_SHOOT_BRIEF.md. */
  replacedBy: string;
}

/** Pexels licence: free to use, no attribution required, no model release. */
export const STOCK_LICENCE = "Pexels Licence — free use, attribution not required, no model release";

function stock(
  src: string,
  photoId: number,
  width: number,
  height: number,
  alt: string,
  replacedBy: string,
): StockPlaceholder {
  return {
    src,
    alt,
    width,
    height,
    sourceUrl: `https://www.pexels.com/photo/${photoId}/`,
    replacedBy,
  };
}

/* -------------------------------------------------------------------------- */
/* Editorial frames                                                            */
/* -------------------------------------------------------------------------- */

export const heroImage = stock(
  "/images/hero-braids.jpg",
  35272483,
  1400,
  1750,
  "Long knotless braids seen from behind and to the side, with clean parts visible at the crown, photographed in natural light.",
  "Shot 01 — finished knotless braids, natural density, clean parts",
);

export const processImage = stock(
  "/images/process-parting.jpg",
  33664383,
  1200,
  1500,
  "Overhead view of a braided head showing evenly spaced, cleanly sectioned parts.",
  "Shots 05–07 — hands parting, low-tension technique",
);

export const founderImage = stock(
  "/images/founder-portrait.jpg",
  37600597,
  1200,
  1440,
  "A woman with long braids, photographed calmly against a warm neutral backdrop.",
  "Shot 09 — Esther Parkman, West Loop studio",
);

export const founderImageAbout = stock(
  "/images/founder-portrait-about.jpg",
  36457861,
  1200,
  1500,
  "A woman with long braids, photographed against a deep green studio backdrop.",
  "Shot 09 — Esther Parkman, West Loop studio",
);

export const studioImage = stock(
  "/images/studio-room.jpg",
  27165067,
  1600,
  1000,
  "A calm, uncluttered styling room with warm wood, soft lighting and greenery.",
  "Shots 11–12 — the chair, the light, the room",
);

export const editorialImage = stock(
  "/images/editorial-calm.jpg",
  7624555,
  2000,
  1100,
  "A woman resting with her eyes closed, braids gathered up, showing the clean parts at her hairline.",
  "Shot 08 — a client at rest mid-appointment",
);

/* -------------------------------------------------------------------------- */
/* Gallery frames, keyed by the gallery item id                                */
/* -------------------------------------------------------------------------- */

export const galleryPlaceholders: Record<string, StockPlaceholder> = {
  "result-jumbo": stock(
    "/images/gallery/result-jumbo.jpg",
    5301531,
    1000,
    1250,
    "A hand lifting a long ponytail of braids against a plain pale wall.",
    "Finished-result frame, Jumbo",
  ),
  "result-large": stock(
    "/images/gallery/result-large.jpg",
    2474255,
    1000,
    1250,
    "Long braids falling down the back, photographed three-quarters from behind against a pale backdrop.",
    "Finished-result frame, Large",
  ),
  "result-medium-large": stock(
    "/images/gallery/result-medium-large.jpg",
    13767165,
    1000,
    1250,
    "Mid-sized braids photographed among dark green foliage.",
    "Finished-result frame, Medium-Large",
  ),
  "result-28-braid-count": stock(
    "/images/gallery/result-28-braid-count.jpg",
    31065905,
    1000,
    1250,
    "Braids gathered into a low style, seen from behind, with the centre part visible.",
    "Finished-result frame, 28 Braid Count",
  ),
  "result-medium": stock(
    "/images/gallery/result-medium.jpg",
    5878810,
    1000,
    1250,
    "Back view of a braided crown, hands resting on the head, showing the sectioned parts.",
    "Finished-result frame, Medium",
  ),
  "result-medium-fine": stock(
    "/images/gallery/result-medium-fine.jpg",
    34191088,
    1000,
    1250,
    "Close view of fine, softly textured braids showing their density and movement.",
    "Finished-result frame, Medium-Fine",
  ),
  "result-small": stock(
    "/images/gallery/result-small.jpg",
    5301538,
    1000,
    1250,
    "A hand holding a length of fine braids against a plain pale wall.",
    "Finished-result frame, Small",
  ),
  "result-extra-small": stock(
    "/images/gallery/result-extra-small.jpg",
    7190007,
    1000,
    1250,
    "Side view of fine braids gathered half-up, with the parting clearly visible.",
    "Finished-result frame, Extra Small",
  ),
  "result-microbraids": stock(
    "/images/gallery/result-microbraids.jpg",
    11268995,
    1000,
    1250,
    "Very fine braids finished with wooden beads, photographed close up.",
    "Finished-result frame, Microbraids",
  ),
  "process-parting": stock(
    "/images/gallery/process-parting.jpg",
    29909981,
    1000,
    1250,
    "Back view of a freshly parted and braided scalp, photographed outdoors in daylight.",
    "Process frame — the parting work",
  ),
  "process-hands": stock(
    "/images/gallery/process-hands.jpg",
    11482128,
    1400,
    875,
    "Hands working a single braid, photographed close up in soft light.",
    "Process frame — hands at work",
  ),
  "studio-calm": stock(
    "/images/gallery/studio-calm.jpg",
    7823407,
    1000,
    1250,
    "A quiet, bright styling room with mirrors and soft lighting.",
    "Studio frame — the room",
  ),
};

/**
 * Every stock placeholder currently in the build. The production gate reads
 * this: while it has entries, the site cannot launch.
 */
export const stockPlaceholders: StockPlaceholder[] = [
  heroImage,
  processImage,
  founderImage,
  founderImageAbout,
  studioImage,
  editorialImage,
  ...Object.values(galleryPlaceholders),
];

/** Shown to the client, in plain words, wherever a set of them appears. */
export const PLACEHOLDER_NOTICE =
  "Every photograph on this site is a stock placeholder, not Esther's work. They are here so the layout can be reviewed with real images in the frames. All of them are removed before launch and replaced with Esther's own client photography.";
