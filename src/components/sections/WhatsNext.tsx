import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { plannedOfferings } from "@/content/roadmap";
import { expansionIntent } from "@/content/locations";
import { features } from "@/content/features";

/**
 * The roadmap, stated once, in one place.
 *
 * Deliberately on /about rather than on the homepage. The first viewport has
 * one job — book an appointment for a service that exists today — and a
 * "coming soon" list there would dilute it. A visitor deep enough to read the
 * founder's story is the one who wants to know where the studio is going.
 *
 * Every card says what is NOT true yet before it says what is intended.
 */
export function WhatsNext() {
  const shown = plannedOfferings.filter((o) => {
    if (o.id === "classes") return features.classes;
    if (o.id === "shop") return features.shop;
    if (o.id === "events") return features.events;
    return false;
  });

  if (shown.length === 0 && !features.locations) return null;

  return (
    <Section tone="sunken" id="whats-next">
      <div className="container-page">
        <SectionHeading
          overline="What's next"
          title="What the studio is building towards."
          lede="None of this is available yet — no dates, no prices, nothing to reserve. It is here so the plan is written down in the same place as everything else, and held to the same standard."
          className="next-head"
        />

        <ul className="next-grid">
          {shown.map((offering) => (
            <li key={offering.id}>
              <article className="next-card">
                <p className="overline next-card-overline">{offering.overline}</p>
                <h3 className="t-h3 next-card-title">
                  <Link href={offering.path} className="next-card-link">
                    {offering.navLabel}
                  </Link>
                </h3>
                <p className="next-card-status">
                  <span className="next-card-flag">
                    <span aria-hidden="true">◆</span> Not available yet
                  </span>
                </p>
                <p className="t-body-sm t-muted next-card-body">{offering.lede}</p>
                <p className="next-card-more">
                  <Link href={offering.path} className="service-card-more">
                    What it will be
                    <span aria-hidden="true"> →</span>
                  </Link>
                </p>
                <PreviewBadge status={offering.status} note={offering.sourceNote} />
              </article>
            </li>
          ))}

          {features.locations ? (
            <li>
              <article className="next-card">
                <p className="overline next-card-overline">Growth</p>
                <h3 className="t-h3 next-card-title">
                  <Link href="/locations" className="next-card-link">
                    More than one studio
                  </Link>
                </h3>
                <p className="next-card-status">
                  <span className="next-card-flag">
                    <span aria-hidden="true">◆</span> One studio today
                  </span>
                </p>
                <p className="t-body-sm t-muted next-card-body">{expansionIntent.body}</p>
                <p className="next-card-more">
                  <Link href="/locations" className="service-card-more">
                    Where the studio is
                    <span aria-hidden="true"> →</span>
                  </Link>
                </p>
                <PreviewBadge
                  status={expansionIntent.status}
                  note={expansionIntent.sourceNote}
                />
              </article>
            </li>
          ) : null}
        </ul>
      </div>
    </Section>
  );
}
