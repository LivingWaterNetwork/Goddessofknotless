import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { gallery, publishableGallery } from "@/content/gallery";

/**
 * Homepage proof strip.
 *
 * Real work only, eventually. Until Esther's own photography exists these are
 * STOCK PLACEHOLDERS, each marked as such on the image itself and introduced
 * by a notice that says so in plain words — the layout can be judged without
 * anyone mistaking another stylist's work for hers.
 */
export function ProofTeaser() {
  const hasReal = publishableGallery.length > 0;
  const shown = (hasReal ? publishableGallery : gallery).slice(0, 3);

  return (
    <Section tone="ivory" id="proof" className="proof-section">
      <div className="container-page">
        <div className="proof-head">
          <SectionHeading
            overline="The Work"
            title="Clean parts. Natural density. The same result next time."
            lede="Braiding is parting work. What separates one appointment from the next is whether the sections sit where they sat last time — which is what these frames are for."
          />
          <ButtonLink href="/gallery" variant="secondary" className="proof-head-cta">
            View the gallery
          </ButtonLink>
        </div>

        {hasReal ? null : <PlaceholderNotice />}

        <ul className="proof-grid">
          {shown.map((item) => (
            <li key={item.id}>
              <ImageFrame
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                status={item.status}
                note={item.sourceNote}
                markerSize="compact"
                sizes="(min-width: 48rem) 33vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
