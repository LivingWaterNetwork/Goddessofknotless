import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { studioImage } from "@/content/placeholder-images";
import { publishablePolicies } from "@/content/policies";
import { metadataForRoute } from "@/lib/page-metadata";
import { business } from "@/content/business";

export const metadata: Metadata = metadataForRoute("/experience");

/** The five standards, stated as what they mean for the client in the chair. */
const standards = [
  {
    title: "Natural Artistry",
    body: "Clean foundations and realistic density. The aim is a style that reads as your own hair, put away well — not an obviously installed one.",
  },
  {
    title: "Gentle Care",
    body: "A low-tension, comfort-conscious hand throughout. Tell Esther if anything feels tight and she will adjust it; the finished look does not depend on discomfort.",
  },
  {
    title: "Reliability",
    body: "Quoted times are real times. Prices are published before you book. The result looks the same on your fourth visit as it did on your first.",
  },
  {
    title: "Calm & Discretion",
    body: "No gossip, no audience, nothing repeated. Sleep through it if you want to — most people do at some point in a six-hour appointment.",
  },
  {
    title: "Confidence",
    body: "You leave looking like a more finished version of yourself, ready for whatever the week asks of you.",
  },
] as const;

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        overline="The Experience"
        title="A calm room, an honest clock, and a closed door."
        lede={`What an appointment at the ${business.neighborhood.value} studio actually involves — how to prepare, how the day runs, and the standards Esther holds whether it is your first visit or your fortieth.`}
      />

      <Section tone="ivory">
        <div className="container-page standards-inner">
          <SectionHeading
            overline="Five Standards"
            title="The things that stay the same every time."
            className="standards-head"
          />
          <ol className="standards">
            {standards.map((standard, index) => (
              <li key={standard.title} className="standard">
                <span className="standard-num t-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-h4 standard-title">{standard.title}</h3>
                  <p className="t-body-sm t-muted measure">{standard.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <WhatToExpect />

      <Section tone="white" id="preparation">
        <div className="container-page prep-inner">
          <div>
            <SectionHeading
              overline="Preparation"
              title="One thing matters more than the rest."
              lede="Arrive with your hair washed and blow-dried. Everything else about the day follows from it."
            />
            <div className="prose-body t-body t-muted measure prep-body">
              <p>
                Esther&rsquo;s appointment time is braiding time. She does not wash or blow-dry as
                part of the service, so hair that arrives ready is what makes a quoted three-hour
                appointment actually take three hours.
              </p>
              <p>
                It also shows in the work. Hair that has been blow-dried properly parts cleanly and
                holds a crisper line, which is most of what makes a finished style look natural
                rather than installed.
              </p>
            </div>

            <h3 className="t-h4 prep-subhead">Booking essentials</h3>
            <dl className="policy-list">
              {publishablePolicies.map((policy) => (
                <div key={policy.id} className="policy-item">
                  <dt className="t-h4">
                    {policy.title}
                    <PreviewBadge
                      status={policy.status}
                      note={policy.sourceNote}
                      className="policy-badge"
                    />
                  </dt>
                  <dd className="t-body-sm t-muted measure">{policy.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ImageFrame
            src={studioImage.src}
            alt={`Stock placeholder photograph, not Esther's work — ${studioImage.alt}`}
            width={studioImage.width}
            height={studioImage.height}
            status="placeholder"
            frame="gold"
            className="prep-media"
            sizes="(min-width: 64rem) 36vw, 100vw"
          />
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
