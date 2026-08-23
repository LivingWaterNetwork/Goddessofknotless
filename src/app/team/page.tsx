import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Frond } from "@/components/ui/Frond";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { features } from "@/content/features";
import { founderImage } from "@/content/placeholder-images";
import { publishableTeam, reservedSeats, team, teamStandard } from "@/content/team";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/team");

export default function TeamPage() {
  if (!features.team) notFound();

  return (
    <>
      <PageHeader
        overline="The Studio"
        title="One pair of hands today. Room for more."
        lede="Every appointment is currently Esther's, start to finish. The seats below are reserved rather than filled — and they stay visibly empty until somebody real is in them."
        figures={[
          { label: "Braiding today", value: String(publishableTeam.length) },
          { label: "Seats reserved", value: String(reservedSeats.length) },
          { label: "Sizes offered", value: "9" },
        ]}
      />

      <Section tone="ivory" className="team-section">
        <span className="team-frond" aria-hidden="true">
          <Frond />
        </span>

        <div className="container-page">
          <ul className="team-grid">
            {team.map((member) => (
              <li key={member.id}>
                <article className={`team-card${member.name ? "" : " team-card-seat"}`}>
                  <div className="team-card-media">
                    {member.name ? (
                      <ImageFrame
                        src={member.portraitSrc ?? founderImage.src}
                        alt={`Stock placeholder photograph, not Esther's work — ${founderImage.alt}`}
                        width={founderImage.width}
                        height={founderImage.height}
                        status="placeholder"
                        markerSize="compact"
                        sizes="(min-width: 64rem) 30vw, (min-width: 34rem) 46vw, 100vw"
                        className="team-card-image"
                      />
                    ) : (
                      /* A reserved seat gets no photograph at all. A stock
                         portrait here would read as a colleague who does not
                         exist, which is exactly the claim this site cannot make. */
                      <div className="team-seat-frame" role="img" aria-label="Reserved seat, no braider yet">
                        <Frond className="team-seat-frond" />
                        <span className="team-seat-label">Seat reserved</span>
                      </div>
                    )}
                  </div>

                  <div className="team-card-body">
                    <h2 className="t-h3 team-card-name">
                      {member.name ?? "Not yet filled"}
                    </h2>
                    <p className="t-label team-card-role">{member.role}</p>

                    {member.bio ? (
                      <p className="t-body-sm t-muted team-card-bio">{member.bio}</p>
                    ) : (
                      <p className="t-body-sm t-muted team-card-bio">
                        Nobody has been hired for this seat. When somebody has, their name, their
                        photograph and what they braid will appear here &mdash; and not before.
                      </p>
                    )}

                    <ul className="team-card-focus">
                      {member.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>

                    <PreviewBadge status={member.status} note={member.sourceNote} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="emerald" className="team-standard-section">
        <div className="container-page team-standard-inner">
          <SectionHeading
            overline="The Standard"
            title={teamStandard.headline}
            lede={teamStandard.body}
            align="center"
          />
          <div className="rule-foil rule-foil-center team-standard-rule" />
          <p className="team-standard-badge">
            <PreviewBadge status={teamStandard.status} note={teamStandard.sourceNote} />
          </p>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
