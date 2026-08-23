# Asset Inventory

Status of every brand and content asset, as of 23 August 2026.

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
| **All photography** — 14 images | See `PHOTO_SHOOT_BRIEF.md`. Twelve gallery slots plus hero, founder, process, and studio frames. | Esther |
| **Photography permissions** | Written release per client before any image publishes. | Esther |

---

## Deliberately not used

| Asset | Decision |
|---|---|
| Brand packet emerald texture (`3840×2160`, 1.1MB JPEG) | Recreated as inline SVG. Shipping a multi-megabyte flat-colour JPEG as a background would have cost the performance budget for no visual gain. |
| Brand packet onyx texture (1.2MB JPEG) | Same. |
| The packet's own website mockup copy | See "Deviation from the deck" below. |
| Cropped logo composites from packet slides 10 and 15 | Those PNGs contain bleed from adjacent slide artwork and are not clean isolated marks. Discarded rather than published. |
| Stock or AI-generated braid photography | Explicitly rejected. Presenting either as Esther's work would misrepresent the core claim. |

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

## Permissions log

Complete one row per photographed client before publishing any image.

| Filenames | Client | Date taken | Permission | Date | Scope | Face visible | Notes |
|---|---|---|---|---|---|---|---|
| | | | ☐ written | | | ☐ | |
