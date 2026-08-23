import Image from "next/image";
import { StockMarker } from "@/components/ui/StockMarker";
import { Seal } from "@/components/ui/BrandMark";
import { editorialImage } from "@/content/placeholder-images";

/**
 * The page's one full-bleed moment.
 *
 * Every other section on the site is overline → heading → body → grid inside a
 * 78rem container. This one breaks out of it entirely: edge-to-edge
 * photograph, an emerald wash, and a single line of type at display scale.
 * It exists to give the scroll a beat, and to carry the one thing clients say
 * about the appointment that no feature list can — that they sleep through it.
 */
export function EditorialBand() {
  return (
    <section className="band on-dark" aria-labelledby="band-heading">
      <div className="band-photo">
        <Image
          src={editorialImage.src}
          alt=""
          fill
          sizes="100vw"
          className="band-photo-img"
        />
        <span className="band-wash" aria-hidden="true" />
        <StockMarker className="band-marker" />
      </div>

      <div className="container-page band-inner">
        <span className="seal-plate band-seal" aria-hidden="true">
          <Seal sizes="5rem" />
        </span>
        <p className="overline band-overline">In the chair</p>
        <h2 id="band-heading" className="t-display band-heading">
          Six hours in a room where
          <br />
          <em>nothing said in it goes anywhere else.</em>
        </h2>
        <p className="band-note t-body-lg">
          No gossip, no audience, no performance. Plenty of clients fall asleep partway through —
          which is the most honest review of a long appointment there is.
        </p>
      </div>
    </section>
  );
}
