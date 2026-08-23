import Link from "next/link";
import type { Service } from "@/content/types";
import { PreviewBadge } from "./PreviewBadge";
import { durationRange, priceRange, usd } from "@/lib/format";

/**
 * Service card. Answers, in one glance, the questions that otherwise arrive as
 * a text message: what size is this, how long will I be there, what will it
 * cost, and what does boho add.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
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
        {service.mostBooked ? (
          <p className="service-card-flag">
            <span aria-hidden="true">★</span> Most booked
          </p>
        ) : null}
      </header>

      <p className="t-body-sm t-muted service-card-summary">{service.summary}</p>

      <dl className="service-card-stats t-nums">
        <div>
          <dt className="t-label">Price</dt>
          <dd>{priceRange(service.price.fromUsd, service.price.toUsd)}</dd>
        </div>
        <div>
          <dt className="t-label">Time</dt>
          <dd>{durationRange(service.duration.fromHours, service.duration.toHours)}</dd>
        </div>
        <div>
          <dt className="t-label">Boho</dt>
          <dd>
            {service.bohoSurchargeUsd !== null ? `+${usd(service.bohoSurchargeUsd)}` : "By request"}
          </dd>
        </div>
      </dl>

      <p className="service-card-note t-body-sm t-muted">
        Price rises with length, shoulder through ankle.
      </p>

      <footer className="service-card-foot">
        <Link href={`/services/${service.slug}`} className="service-card-more">
          What this size suits
          <span aria-hidden="true"> →</span>
        </Link>
        <PreviewBadge status={service.status} note={service.sourceNote} />
      </footer>
    </article>
  );
}
