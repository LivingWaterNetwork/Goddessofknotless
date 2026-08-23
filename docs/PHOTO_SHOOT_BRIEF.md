# Photography Brief

**This is the highest-value outstanding item after the booking link.** The brand promise is
"natural-looking braids with consistent results." That claim is only credible with photographs.
Everything else on the site supports the gallery; the gallery is the proof.

Direction from the brand packet, slide 11: **Natural. Refined. Restorative.**

---

## Non-negotiables

1. **Every image must be Esther's own work on a real client.** No stock, no AI-generated hair,
   no reposts. Presenting any of those as her work would break the one thing the brand sells.
2. **Written permission before publication.** A signed release or an unambiguous written
   agreement, logged in `ASSET_INVENTORY.md`. Verbal consent is not enough for a public website.
3. **No heavy retouching.** No skin smoothing, no hair smoothing, no filters, no overexposure.
   Realistic density and visible healthy scalp at the parts are the *point*, not flaws to edit out.
4. **Never crop out the parting.** Clean parts are the single most persuasive detail in the
   entire set.

## Technical requirements

| | |
|---|---|
| **Camera** | A recent phone in its highest-quality mode is fine. Portrait/beauty modes **off** — they smooth hair texture. |
| **Format** | Largest available JPEG or HEIC. Do not export at reduced size; the site generates AVIF/WebP derivatives itself. |
| **Orientation** | See the shot list. Portrait for results, landscape for process and environment. |
| **Minimum resolution** | 2000px on the long edge. Portraits ideally 2400×3000. |
| **Light** | Daylight wherever possible, subject facing the light source. Avoid overhead salon downlights — they flatten braids and grey out the scalp. No on-camera flash. |
| **Background** | Uncluttered. Studio wall, plain surface, or a genuine West Loop environment detail. No visible clutter, product bottles, or other clients. |
| **Delivery** | A single shared folder, filenames exactly as listed below. |

---

## Shot list

### Priority 1 — the hero and the founder. Nothing else matters until these exist.

| # | Filename | Orientation | Direction |
|---|---|---|---|
| 01 | `hero-result.jpg` | Portrait 1000×1300 | **The single most important photograph on the site.** One finished head, from slightly behind and to the side, so the parting pattern reads clearly and the braids show length and movement. Natural light. Calm, unposed. This fills the first thing anyone sees. |
| 09 | `founder-portrait.jpg` | Portrait 1000×1250 | Esther at work, mid-braid, hands visible, looking at the hair rather than the camera. Warm and composed, not corporate. Used on `/about` and the homepage founder block. |

### Priority 2 — one finished result per size

Nine images. Each proves a specific size, and each fills a filter on `/gallery`. These are what
let a client see what she is choosing before she books.

| # | Filename | Size | Orientation |
|---|---|---|---|
| 02 | `result-jumbo.jpg` | Jumbo, 10–13 braids | Portrait 1000×1400 |
| 03 | `result-large.jpg` | Large, 19–20 braids | Landscape 1400×1000 |
| 04 | `result-medium-large.jpg` | Medium-Large, 23 braids — **her most-booked size** | Portrait 1000×1400 |
| 05 | `result-28-braid-count.jpg` | 28 Braid Count | Portrait 1000×1400 |
| 06 | `result-medium.jpg` | Medium | Landscape 1400×1000 |
| 07 | `result-medium-fine.jpg` | The second Medium tier — see `CONTENT_CONFIRMATIONS.md` B1 | Portrait 1000×1400 |
| 08 | `result-small.jpg` | Small | Portrait 1000×1400 |
| 10 | `result-extra-small.jpg` | Extra Small | Landscape 1400×1000 |
| 11 | `result-microbraids.jpg` | Microbraids | Portrait 1000×1400 |

For each: shoot the **back or three-quarter view** showing the part pattern, and note the
**length** (shoulder / waist / ankle) and whether it is **classic or boho**. Those details become
the caption and the alt text, and they are only publishable if recorded at the time.

### Priority 3 — process and place

These carry the "gentle care" and "calm and discretion" standards, which are otherwise only words.

| # | Filename | Orientation | Direction |
|---|---|---|---|
| 12 | `process-parting.jpg` | Portrait 1000×1400 | Close crop: hands sectioning a clean part. Fingers, comb, and scalp in focus. This is the "natural artistry" evidence. |
| 13 | `process-hands.jpg` | Landscape 1400×1000 | Mid-braid, hands working, low tension visible in how the hair is held. |
| 14 | `studio-calm.jpg` | Landscape 1400×1000 | The room, empty or with a client at rest. Should read as somewhere you could fall asleep — because clients do. Show the light and the space, not the equipment. |

### Optional — before and after

Only shoot these as genuine pairs, same client, same session, same lighting and angle. A
mismatched pair is worse than none. Both frames need permission.

| Filename | Direction |
|---|---|
| `ba-01-before.jpg` / `ba-01-after.jpg` | Undone hair, then the finished style. Same distance and angle. |

---

## Alt text, written at shoot time

Every image needs a one-line description. Two rules:

- **Describe the hair, not the person's body.** "Waist-length knotless braids in a clean centre
  part, medium size" — not a description of the client's appearance.
- **Never put information only in the image.** Price, size, and length live in the page text too.

## Permissions log

Record for each client, in `ASSET_INVENTORY.md`:

| Field | |
|---|---|
| Image filenames | |
| Date taken | |
| Permission given | Written / signed release |
| Date of permission | |
| Scope | Website only, or website + social |
| Face visible? | If yes, permission must be explicit about it |
| Withdrawal | Note that permission can be withdrawn and the image must then be removed |

---

## How to add them to the site

1. Drop the files into `public/images/gallery/`.
2. In `src/content/gallery.ts`, replace each `placeholder(...)` entry with a real record: set
   `src`, write the `alt`, add the `caption` if size and length were recorded, and change
   `status` to `"verified"`.
3. For the hero, founder, process, and studio frames, set the `src` on the `ImageFrame` in the
   relevant section component.
4. Run `pnpm content:check`. The photography blocker clears when every slot has a real image.

No layout work is needed. Every frame already reserves its exact aspect ratio, so real
photographs drop in with **zero layout shift** — the site currently measures CLS 0.000 and will
stay there.
