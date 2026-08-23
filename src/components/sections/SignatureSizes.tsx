import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { servicesByOrder } from "@/content/services";

/**
 * Homepage services teaser.
 *
 * Shows the three sizes that cover most first appointments — the entry size
 * plus the two Esther books most — and sends the rest to /services. The whole
 * point is that a visitor can price their appointment here rather than texting
 * to ask.
 */
export function SignatureSizes() {
  const featured = servicesByOrder.slice(0, 3);

  return (
    <Section tone="ivory" id="sizes">
      <div className="container-page">
        <div className="sizes-head">
          <SectionHeading
            overline="Signature Sizes"
            title="Find the size that fits your look — and your schedule."
            lede="Esther braids knotless styles only, sized by braid count. Every size publishes its real price range and its real appointment length, so you can decide before you book."
          />
          <ButtonLink href="/services" variant="secondary" className="sizes-head-cta">
            All nine sizes
          </ButtonLink>
        </div>

        <ul className="card-grid">
          {featured.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
