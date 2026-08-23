import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SizeGuide } from "@/components/sections/SizeGuide";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { addOns, servicesByOrder, priceFloorUsd } from "@/content/services";
import { metadataForRoute } from "@/lib/page-metadata";
import { durationRange, priceRange, usd } from "@/lib/format";

export const metadata: Metadata = metadataForRoute("/services");

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        overline="Services & Pricing"
        title="Nine sizes. Real prices. Honest timings."
        lede={`Esther braids knotless styles only, sized by braid count from Jumbo through Microbraids. Every price below is the real range for that size, from ${usd(priceFloorUsd)} at shoulder length up to ankle length at the top of each band.`}
      />

      <Section tone="ivory">
        <div className="container-page">
          <SectionHeading
            overline="The Nine Sizes"
            title="Largest to finest, with every figure published."
            lede="Sizes run from Jumbo at ten braids down to Microbraids. The two marked as most booked are where the majority of first appointments land."
            className="services-index-head"
          />
          <ul className="card-grid">
            {servicesByOrder.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" id="find-your-size">
        <div className="container-page">
          <SizeGuide />
        </div>
      </Section>

      <Section tone="sunken" id="comparison">
        <div className="container-page">
          <SectionHeading
            overline="Side by Side"
            title="The whole menu, in one table."
            lede="Sorted from largest to finest. Price and time both climb as the braids get smaller."
          />

          <div className="table-scroll" tabIndex={0} role="region" aria-label="All sizes, prices and times">
            <table className="price-table t-nums">
              <caption className="sr-only">
                All knotless braid sizes with braid count, price range by length, appointment
                duration, and boho surcharge
              </caption>
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  <th scope="col">Braid count</th>
                  <th scope="col">Price range</th>
                  <th scope="col">Appointment</th>
                  <th scope="col">Boho finish</th>
                </tr>
              </thead>
              <tbody>
                {servicesByOrder.map((service) => (
                  <tr key={service.slug}>
                    <th scope="row">
                      <a href={`/services/${service.slug}`}>{service.name}</a>
                      {service.status !== "verified" ? (
                        <PreviewBadge
                          status={service.status}
                          note={service.sourceNote}
                          className="price-table-badge"
                        />
                      ) : null}
                    </th>
                    <td>{service.braidCount ?? "—"}</td>
                    <td>{priceRange(service.price.fromUsd, service.price.toUsd)}</td>
                    <td>
                      {durationRange(service.duration.fromHours, service.duration.toHours)}
                    </td>
                    <td>
                      {service.bohoSurchargeUsd !== null
                        ? `+${usd(service.bohoSurchargeUsd)}`
                        : "By request"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="t-h3 addons-title">Add-ons</h3>
          <dl className="addons">
            {addOns.map((addOn) => (
              <div key={addOn.id} className="addon">
                <dt>
                  {addOn.name}
                  <span className="addon-price t-nums">
                    {addOn.priceUsd !== undefined
                      ? `${usd(addOn.priceUsd)}${addOn.unit ? ` ${addOn.unit}` : ""}`
                      : "Priced by size"}
                  </span>
                </dt>
                <dd className="t-body-sm t-muted">{addOn.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
