# Asset Inventory

Status of every brand and content asset, as of 23 August 2026.

> ## ⚠ Every photograph on this site is a stock placeholder
>
> None of it is Esther's work. It was added, with the reviewer's authorisation, so the client
> review could judge a designed page rather than a grid of empty rectangles. Each image carries a
> visible **STOCK PLACEHOLDER** marker in the review build, each is registered in
> `src/content/placeholder-images.ts`, and the production gate refuses to pass while that file has
> any entries. **Removing them is the launch step — see "Removing the placeholders" below.**

---

## Approved and in use

| Asset | Source | Location | Notes |
|---|---|---|---|
| Primary logo, gold on emerald | Brand packet, slide 9 | `public/brand/logo-primary-on-emerald.png` | 1536×648 raster. Used in the site footer at a size its resolution supports. |
| Primary logo, on ivory | Brand packet, slide 10 | `public/brand/logo-primary-on-ivory.png` | 411×288 raster. **Too low-resolution for confident web use** — held in reserve; the header uses the typographic wordmark instead. |
| "GK" seal | Brand packet, slide 10 | `public/brand/logo-seal-on-emerald.png` | 379×288 raster. Reserved for future use. |
| Botanical frond motif | Redrawn from the packet's emerald and onyx background textures | Inline SVG in `Hero.tsx` and `ImageFrame.tsx`, plus `public/brand/frond.svg` | Redrawn as vector deliberately. The packet's version is a 1.2MB 3840×2160 flat-colour JPEG; as SVG it costs about 400 bytes, scales cleanly, and recolours with the theme. |
| Colour palette | Brand packet, slide 7 | `src/styles/globals.css` | All six brand colours, exact hex values. |
| Typography: Cormorant Garamond, Montserrat, DM Sans | Brand packet, slide 8 | `src/app/layout.tsx` via `next/font` | Self-hosted; no runtime request to Google. Only the four faces actually used are shipped. |
| Social share image | Generated | `src/app/opengraph-image.tsx` | 1200×630, generated at build time from the palette so it can never drift from the brand. |
| Favicon | Generated | `src/app/icon.tsx` | Gold "gk" monogram on emerald, echoing the packet's seal. |

---

## Missing — blocks production launch

| Asset | Why it is needed | Owner |
|---|---|---|
| **Vector master logo** (`Goddess_of_Knotless_Primary_Logo_Vector.svg`) | Referenced in the brief but **not supplied**. Only raster versions exist, extracted from the PowerPoint. A vector master is needed for crisp rendering at any size and for print. | Esther / her designer |
| **All photography** — 18 images | See `PHOTO_SHOOT_BRIEF.md` and the placeholder table below, which lists what each frame currently holds and what must replace it. | Esther |
| **Photography permissions** | Written release per client before any image publishes. | Esther |

---

## Deliberately not used

| Asset | Decision |
|---|---|
| Brand packet emerald texture (`3840×2160`, 1.1MB JPEG) | Recreated as inline SVG. Shipping a multi-megabyte flat-colour JPEG as a background would have cost the performance budget for no visual gain. |
| Brand packet onyx texture (1.2MB JPEG) | Same. |
| The packet's own website mockup copy | See "Deviation from the deck" below. |
| Cropped logo composites from packet slides 10 and 15 | Those PNGs contain bleed from adjacent slide artwork and are not clean isolated marks. Discarded rather than published. |
| AI-generated braid photography | Rejected outright, at any stage. |
| Stock braid photography **as finished content** | Still rejected. It is in the build only as a labelled placeholder for the client review, never as a claim about Esther's work, and the launch gate enforces that. |

---

## Deviation from the brand packet — recorded for review

The packet's website-direction mockups (slides 16 and 17) show placeholder headline copy:

> "YOUR CROWN DESERVES AN EXPERIENCE."
> "Luxury protective styling where artistry, comfort and confidence meet."
> "Crafted For Your Crown"

**This copy was not used.** The reasons:

1. The master build brief explicitly prohibits "overused crown/goddess metaphors" and requires
   the word "luxury" to be translated into something tangible.
2. Slide 17's *written* direction — the packet's own instruction rather than its mockup filler —
   says: *"Mobile-first, editorial, and calm. Lead with trust: natural-looking results, gentle
   care, reliability, discretion, and verified transformation proof."* The copy on the site
   follows that instruction.
3. The mockups read as illustrative layout filler rather than approved final copy.

**What was kept from those mockups:** the whole visual system. Ivory header with a hairline gold
rule, the gold-and-onyx typographic wordmark, emerald hero, ivory service cards, gold accent
detailing, and the editorial serif-over-sans hierarchy. The layout follows the deck closely; only
the placeholder words differ.

**Also not used:** the mockups' four service categories — "Knotless Braids", "Boho Braids",
"Protective Styles", "Custom Braiding". Esther stated plainly that she offers **knotless braids
only**, sized by braid count, classic or boho. Publishing "Protective Styles" and "Custom
Braiding" as separate services would advertise things she does not sell. The real taxonomy — nine
braid-count sizes with a boho option — is both more accurate and more useful.

**If Esther prefers the deck's original copy, it is a text change in
`src/components/sections/Hero.tsx` and `src/content/services.ts`.** Flagging it rather than
deciding silently.

---

## Stock placeholders currently in the build

Source: [Pexels](https://www.pexels.com). Licence for every file below: **Pexels Licence — free to
use, attribution not required, no model release**. Because there is no model release, none of these
may be used in paid advertising, and none of them may ever be presented as the studio's own work.

All were downloaded through `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`,
cropped to the frame's aspect ratio and re-encoded at quality 72 (long edge ≤ 2000px, 1.8 MB for
the whole set before `next/image` optimisation).

### Editorial frames

| File | Source | What it shows | Must be replaced by |
|---|---|---|---|
| `public/images/hero-braids.jpg` | [pexels.com/photo/35272483](https://www.pexels.com/photo/35272483/) | Long knotless braids, three-quarter from behind, clean parts at the crown, natural light | Shoot brief shot 01 |
| `public/images/process-parting.jpg` | [pexels.com/photo/33664383](https://www.pexels.com/photo/33664383/) | Overhead view of evenly sectioned parts | Shoot brief shots 05–07 |
| `public/images/founder-portrait.jpg` | [pexels.com/photo/37600597](https://www.pexels.com/photo/37600597/) | Woman with long braids, warm neutral backdrop | Shoot brief shot 09 |
| `public/images/founder-portrait-about.jpg` | [pexels.com/photo/36457861](https://www.pexels.com/photo/36457861/) | Woman with long braids, deep green studio backdrop | Shoot brief shot 09 |
| `public/images/studio-room.jpg` | [pexels.com/photo/27165067](https://www.pexels.com/photo/27165067/) | Calm, uncluttered styling room | Shoot brief shots 11–12 |
| `public/images/editorial-calm.jpg` | [pexels.com/photo/7624555](https://www.pexels.com/photo/7624555/) | Client at rest, braids gathered up, parts visible | Shoot brief shot 08 |

### Gallery frames

| File | Source | What it shows |
|---|---|---|
| `public/images/gallery/result-jumbo.jpg` | [pexels.com/photo/5301531](https://www.pexels.com/photo/5301531/) | Hand lifting a ponytail of braids, plain pale wall |
| `public/images/gallery/result-large.jpg` | [pexels.com/photo/2474255](https://www.pexels.com/photo/2474255/) | Long braids down the back, three-quarter from behind |
| `public/images/gallery/result-medium-large.jpg` | [pexels.com/photo/13767165](https://www.pexels.com/photo/13767165/) | Mid-sized braids among dark foliage |
| `public/images/gallery/result-28-braid-count.jpg` | [pexels.com/photo/31065905](https://www.pexels.com/photo/31065905/) | Braids in a low style from behind, centre part visible |
| `public/images/gallery/result-medium.jpg` | [pexels.com/photo/5878810](https://www.pexels.com/photo/5878810/) | Back view of a braided crown, sectioned parts |
| `public/images/gallery/result-medium-fine.jpg` | [pexels.com/photo/34191088](https://www.pexels.com/photo/34191088/) | Fine, softly textured braids, close |
| `public/images/gallery/result-small.jpg` | [pexels.com/photo/5301538](https://www.pexels.com/photo/5301538/) | Hand holding a length of fine braids |
| `public/images/gallery/result-extra-small.jpg` | [pexels.com/photo/7190007](https://www.pexels.com/photo/7190007/) | Fine braids half-up, parting visible |
| `public/images/gallery/result-microbraids.jpg` | [pexels.com/photo/11268995](https://www.pexels.com/photo/11268995/) | Very fine braids with wooden beads |
| `public/images/gallery/process-parting.jpg` | [pexels.com/photo/29909981](https://www.pexels.com/photo/29909981/) | Freshly parted and braided scalp from behind |
| `public/images/gallery/process-hands.jpg` | [pexels.com/photo/11482128](https://www.pexels.com/photo/11482128/) | Hands working a single braid |
| `public/images/gallery/studio-calm.jpg` | [pexels.com/photo/7823407](https://www.pexels.com/photo/7823407/) | Quiet, bright styling room |

**A gallery frame's position does not claim its braid size.** The images are ordered coarse to
fine as a layout device only; the alt text describes what is in the picture and nothing more.

### How they are marked

- Every frame renders a red **STOCK PLACEHOLDER** tag plus, at full size, "Not Esther's work — for
  layout review only". The tag is real text, so a screen reader announces it too.
- Every `alt` begins "Stock placeholder photograph, not Esther's work — …".
- `/gallery`, `/services` and the homepage proof strip each carry a written notice above the grid.
- `CONTENT_MODE=production pnpm content:check` **exits 1** while any of them remain.

### Removing the placeholders

1. Drop the real photographs into `public/images/` and `public/images/gallery/`.
2. In `src/content/gallery.ts`, replace the `slot()` records with real ones: real `src`, real
   `alt`, `caption` where size and length were recorded, `status: "verified"`.
3. Point `Hero`, `WhatToExpect`, `FounderStory`, `EditorialBand`, `/about` and `/experience` at the
   real files.
4. **Empty `src/content/placeholder-images.ts`** and delete the stock files. That is what clears the
   photography blocker.
5. `CONTENT_MODE=production pnpm content:check` — the Photography blockers should be gone.

---

## Derived brand assets

| Asset | Derived from | Location | Notes |
|---|---|---|---|
| Script logo, transparent | `logo-primary-on-emerald.png` | `public/brand/logo-script-gold.png` (1128×516) | The packet supplies the script mark only as flat gold on a solid `#064e3b` plate, which is why it had been stuck in the footer — dropped anywhere else it showed as a green rectangle. The plate was keyed out by luminance against the exact brand emerald and the result un-premultiplied, so the mark keeps its own gold. It now sits over photography in the hero and over the gradient in the footer. |
| "GK" seal, transparent | `logo-seal-on-emerald.png` | `public/brand/seal-gold.png` (319×278) | Same treatment. Used on an emerald disc (`.seal-plate`) on light surfaces, and bare on dark ones. |

Both are a stopgap. **A vector master would be better than either** and is still outstanding.

---

## Permissions log

Complete one row per photographed client before publishing any image.

| Filenames | Client | Date taken | Permission | Date | Scope | Face visible | Notes |
|---|---|---|---|---|---|---|---|
| | | | ☐ written | | | ☐ | |
