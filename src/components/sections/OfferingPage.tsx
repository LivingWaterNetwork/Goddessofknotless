import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { PlannedNotice, PlannedInterest } from "@/components/ui/PlannedNotice";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Seal } from "@/components/ui/BrandMark";
import { plannedOffering } from "@/content/roadmap";
import { features } from "@/content/features";

/**
 * One layout for all three roadmap pages.
 *
 * They share a shape on purpose: an honest standing statement first, the
 * intent second, and what still has to be decided third — that last block only
 * in the review build, because it is a conversation with Esther, not with a
 * client. Nothing here is bookable and nothing carries a price.
 */
export function OfferingPage({ id }: { id: string }) {
  const offering = plannedOffering(id);
  if (!offering) notFound();

  return (
    <>
      <PageHeader overline={offering.overline} title={offering.title} lede={offering.lede} />

      <Section tone="ivory">
        <div className="container-page offering-inner">
          <div className="offering-main">
            <PlannedNotice>{offering.standing}</PlannedNotice>

            <SectionHeading
              overline="The intention"
              title="What it is meant to become."
              lede="Written as intent, not as a promise. None of it is scheduled, and none of it is for sale."
            />

            <ul className="offering-list">
              {offering.intent.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <PlannedInterest subject={offering.navLabel.toLowerCase()} />
          </div>

          {features.previewLabels ? (
            <aside className="offering-aside">
              <div className="offering-card">
              <span className="seal-plate offering-card-seal" aria-hidden="true">
                <Seal sizes="4rem" />
              </span>
              <h2 className="t-h4 offering-card-title">Still to be decided</h2>
              <p className="t-body-sm t-muted offering-card-note">
                Shown while the site is in review. Esther confirms each of these before this page
                says anything publicly.
              </p>
              <ul className="offering-prereqs">
                {offering.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <PreviewBadge status={offering.status} note={offering.sourceNote} />
            </div>
            </aside>
          ) : null}
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
