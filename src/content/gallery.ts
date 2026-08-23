import type { GalleryItem } from "./types";
import { services } from "./services";
import { galleryPlaceholders } from "./placeholder-images";

/**
 * The gallery slot plan mirrors the shoot brief: every size Esther offers gets
 * a finished-result frame, plus two process frames and a studio frame.
 *
 * No real photography has been supplied. For the client review these slots
 * hold STOCK PLACEHOLDERS — other stylists' work on other people's heads —
 * so the page can be judged as a designed object rather than as a grid of
 * empty rectangles. Every one keeps `status: "placeholder"`, every frame
 * renders a visible marker, and the production gate refuses to pass while
 * `src/content/placeholder-images.ts` still has entries.
 *
 * Shot requirements for the real photographs are in docs/PHOTO_SHOOT_BRIEF.md.
 */
function slot(id: string, serviceSlugs: string[]): GalleryItem {
  const stock = galleryPlaceholders[id];
  if (!stock) throw new Error(`No placeholder registered for gallery slot "${id}"`);

  return {
    id,
    src: stock.src,
    alt: `Stock placeholder photograph, not Esther's work — ${stock.alt}`,
    caption: null,
    serviceSlugs,
    width: stock.width,
    height: stock.height,
    status: "placeholder",
    sourceNote: `STOCK PLACEHOLDER (${stock.sourceUrl}). Replace with: ${stock.replacedBy}. See docs/PHOTO_SHOOT_BRIEF.md.`,
  };
}

export const gallery: GalleryItem[] = [
  ...services.map((s) => slot(`result-${s.slug}`, [s.slug])),
  slot("process-parting", []),
  slot("process-hands", []),
  slot("studio-calm", []),
];

/** Only images that actually exist and are cleared for publication. */
export const publishableGallery = gallery.filter(
  (g) => g.src !== null && g.status === "verified",
);

/** Frames that are wider than they are tall get twice the grid width. */
export const isWideGalleryItem = (item: GalleryItem) => item.width > item.height;

/** Look up the reference frame for one braid size. */
export function galleryImageForService(slug: string): GalleryItem | undefined {
  return gallery.find((g) => g.id === `result-${slug}`);
}

/** Filter chips are derived from the service taxonomy, never hand-maintained. */
export const galleryFilters = services
  .filter((s) => gallery.some((g) => g.serviceSlugs.includes(s.slug)))
  .map((s) => ({ slug: s.slug, label: s.name }));
