import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { PlannedNotice } from "@/components/ui/PlannedNotice";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { features } from "@/content/features";
import { business } from "@/content/business";
import { studioImage } from "@/content/placeholder-images";
import { expansionIntent, locations, openLocations } from "@/content/locations";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/locations");

export default function LocationsPage() {
  if (!features.locations) notFound();

  return (
    <>
      <PageHeader
        overline="Locations"
        title="One studio, in Chicago's West Loop."
        lede="Where the work happens today, and how the studio is built so that a second one would not change it."
        figures={[
          { label: "Open today", value: String(openLocations.length) },
          { label: "Neighbourhood", value: business.neighborhood.value },
          { label: "Access", value: "By appointment" },
        ]}
      />

      <Section tone="ivory">
        <div className="container-page locations-inner">
          <ul className="location-list">
            {locations.map((location) => (
              <li key={location.id} className="location">
                <div className="location-body">
                  <p className="overline location-stage">
                    {location.stage === "open" ? "Open" : "Planned"}
                  </p>
                  <h2 className="t-h2 location-name">{location.name}</h2>
                  <p className="location-place t-body-lg">
                    {location.city}, {location.state}
                  </p>

                  {location.streetAddress ? (
                    <p className="location-address t-body">{location.streetAddress}</p>
                  ) : (
                    <p className="location-address t-body-sm t-muted">
                      The suite address is not published. It is sent to you when your appointment is
                      confirmed &mdash; which is deliberate, and the same discretion that applies to
                      everything else said in the room.
                      <PreviewBadge
                        status={business.streetAddress.status}
                        note={business.streetAddress.sourceNote}
                        className="location-badge"
                      />
                    </p>
                  )}

                  <p className="t-body t-muted measure location-summary">{location.summary}</p>
                </div>

                <div className="location-media">
                  <ImageFrame
                    src={studioImage.src}
                    alt={`Stock placeholder photograph, not Esther's work — ${studioImage.alt}`}
                    width={studioImage.width}
                    height={studioImage.height}
                    status="placeholder"
                    frame="gold"
                    sizes="(min-width: 64rem) 42vw, 100vw"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="emerald" className="expansion-section">
        <div className="container-page expansion-inner">
          <SectionHeading
            overline="Growth"
            title={expansionIntent.headline}
            lede={expansionIntent.body}
            align="center"
          />
          <div className="rule-foil rule-foil-center expansion-rule" />
          <PlannedNotice className="expansion-notice">
            {expansionIntent.standing}
            <PreviewBadge
              status={expansionIntent.status}
              note={expansionIntent.sourceNote}
              className="expansion-badge"
            />
          </PlannedNotice>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
