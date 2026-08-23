import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { gallery, publishableGallery } from "@/content/gallery";

/**
 * Homepage proof strip.
 *
 * Real work only. With no photography supplied yet, this renders labelled
 * placeholder frames stating exactly what belongs in each one — never a stock
 * or generated image standing in for Esther's hands.
 */
export function ProofTeaser() {
  const hasReal = publishableGallery.length > 0;
  const shown = (hasReal ? publishableGallery : gallery).slice(0, 3);

  return (
    <Section tone="ivory" id="proof">
      <div className="container-page">
        <div className="proof-head">
          <SectionHeading
            overline="The Work"
            title="Clean parts. Natural density. The same result next time."
            lede={
              hasReal
                ? "Real client work from the West Loop studio, filterable by size."
                : "This gallery holds Esther's own client work only. It stays empty until real, permissioned photography is in hand — a stand-in image here would misrepresent the one thing the whole brand rests on."
            }
          />
          <ButtonLink href="/gallery" variant="secondary" className="proof-head-cta">
            View the gallery
          </ButtonLink>
        </div>

        <ul className="proof-grid">
          {shown.map((item, index) => (
            <li key={item.id}>
              <ImageFrame
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                status={item.status}
                note={item.sourceNote}
                tone={index === 1 ? "olive" : "emerald"}
                label="Client result — awaiting real photography"
                sizes="(min-width: 48rem) 33vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
