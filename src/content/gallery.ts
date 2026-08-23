import type { GalleryItem } from "./types";
import { services } from "./services";

/**
 * No real photography has been supplied. Rather than fill the gallery with
 * stock or AI-generated braid work — which would misrepresent Esther's hands —
 * the gallery renders branded, clearly-labelled placeholder frames in preview
 * and the launch gate blocks production until real, permissioned images land.
 *
 * Shot requirements are specified in docs/PHOTO_SHOOT_BRIEF.md.
 */
function placeholder(
  id: string,
  serviceSlugs: string[],
  orientation: "portrait" | "landscape",
): GalleryItem {
  const [width, height] = orientation === "portrait" ? [1000, 1400] : [1400, 1000];
  return {
    id,
    src: null,
    alt: "",
    caption: null,
    serviceSlugs,
    width,
    height,
    status: "placeholder",
    sourceNote: "Awaiting real client photography with written permission. See docs/PHOTO_SHOOT_BRIEF.md.",
  };
}

/**
 * The slot plan mirrors the shoot brief: every size Esther offers gets at least
 * one finished-result frame, plus process and studio frames.
 */
export const gallery: GalleryItem[] = [
  ...services.map((s, i) =>
    placeholder(`result-${s.slug}`, [s.slug], i % 3 === 1 ? "landscape" : "portrait"),
  ),
  placeholder("process-parting", [], "portrait"),
  placeholder("process-hands", [], "landscape"),
  placeholder("studio-calm", [], "landscape"),
];

/** Only images that actually exist and are cleared for publication. */
export const publishableGallery = gallery.filter(
  (g) => g.src !== null && g.status === "verified",
);

/** Filter chips are derived from the service taxonomy, never hand-maintained. */
export const galleryFilters = services
  .filter((s) => gallery.some((g) => g.serviceSlugs.includes(s.slug)))
  .map((s) => ({ slug: s.slug, label: s.name }));
