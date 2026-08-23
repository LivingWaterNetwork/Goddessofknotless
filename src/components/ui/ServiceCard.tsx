import Link from "next/link";
import type { Service } from "@/content/types";
import { ImageFrame } from "./ImageFrame";
import { PreviewBadge } from "./PreviewBadge";
import { galleryImageForService } from "@/content/gallery";
import { durationRange, priceRange, usd } from "@/lib/format";

/**
 * Service card. Answers, in one glance, the questions that otherwise arrive as
 * a text message: what size is this, how long will I be there, what will it
 * cost, and what does boho add.
 *
 * The price is the card's largest element after its name. It is the thing
 * almost no competitor publishes, so it is set as a figure rather than tucked
 * into a metadata row.
 */
export function ServiceCard({
  service,
  withImage = true,
  sizes = "(min-width: 64rem) 30vw, (min-width: 34rem) 46vw, 100vw",
}: {
  service: Service;
  withImage?: boolean;
  sizes?: string;
}) {
  const reference = withImage ? galleryImageForService(service.slug) : undefined;

  return (
    <article className={`service-card${service.mostBooked ? " service-card-flagged" : ""}`}>
      {reference ? (
        <div className="service-card-media">
          <ImageFrame
            src={reference.src}
            alt={reference.alt}
            width={reference.width}
            height={reference.height}
            status={reference.status}
            note={reference.sourceNote}
            markerSize="compact"
            sizes={sizes}
            className="service-card-image"
          />
          {service.mostBooked ? (
            <p className="service-card-flag">
              <span aria-hidden="true">★</span> Most booked
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="service-card-body">
        <header className="service-card-head">
          <div>
            <h3 className="t-h3 service-card-name">
              <Link href={`/services/${service.slug}`} className="service-card-link">
                {service.name}
              </Link>
            </h3>
            {service.braidCount ? (
              <p className="t-label service-card-count">{service.braidCount}</p>
            ) : null}
          </div>
          {!reference && service.mostBooked ? (
            <p className="service-card-flag service-card-flag-inline">
              <span aria-hidden="true">★</span> Most booked
            </p>
          ) : null}
        </header>

        <p className="service-card-price t-nums">
          {priceRange(service.price.fromUsd, service.price.toUsd)}
        </p>
        <p className="service-card-note t-body-sm t-muted">
          Shoulder through ankle length. {durationRange(service.duration.fromHours, service.duration.toHours)} in the chair.
        </p>

        <p className="t-body-sm t-muted service-card-summary">{service.summary}</p>

        <dl className="service-card-stats t-nums">
          <div>
            <dt className="t-label">Time</dt>
            <dd>{durationRange(service.duration.fromHours, service.duration.toHours)}</dd>
          </div>
          <div>
            <dt className="t-label">Boho finish</dt>
            <dd>
              {service.bohoSurchargeUsd !== null ? `+${usd(service.bohoSurchargeUsd)}` : "By request"}
            </dd>
          </div>
        </dl>

        <footer className="service-card-foot">
          <Link href={`/services/${service.slug}`} className="service-card-more">
            What this size suits
            <span aria-hidden="true"> →</span>
          </Link>
          <PreviewBadge status={service.status} note={service.sourceNote} />
        </footer>
      </div>
    </article>
  );
}
