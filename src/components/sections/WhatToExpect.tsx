import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageFrame } from "@/components/ui/ImageFrame";

/**
 * Five steps, worded only against what Esther confirmed she does. Notably it
 * does NOT promise a consultation, a wash, a blow-dry, provided hair, or
 * refreshments — none of which are part of her service today.
 */
const steps = [
  {
    title: "Choose your size",
    body: "Pick a braid count and a length. That combination sets both your price and your appointment window.",
  },
  {
    title: "Wash and blow-dry",
    body: "Come with clean, blow-dried hair. This is the single thing that keeps your quoted time accurate.",
  },
  {
    title: "Reserve with a deposit",
    body: "Your deposit holds the appointment and comes off your balance on the day.",
  },
  {
    title: "Arrive and exhale",
    body: "A quiet room, no gossip, no audience. Plenty of clients sleep through the middle of it.",
  },
  {
    title: "Leave with a finish that holds",
    body: "Clean parts, natural density, and a style that looks the same the next time you come back.",
  },
] as const;

export function WhatToExpect() {
  return (
    <Section tone="emerald" id="what-to-expect">
      <div className="container-page expect-inner">
        <div className="expect-copy">
          <SectionHeading
            overline="What to Expect"
            title="Five steps, and no surprises in any of them."
            lede="The appointment is braiding. Knowing that in advance is what makes the day run the way it was quoted."
          />

          <ol className="expect-steps">
            {steps.map((step, index) => (
              <li key={step.title} className="expect-step">
                <span className="expect-step-num t-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-h4 expect-step-title">{step.title}</h3>
                  <p className="t-body-sm t-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="expect-media">
          <ImageFrame
            src={null}
            alt=""
            width={1000}
            height={1250}
            status="placeholder"
            tone="deep"
            label="Process: hands parting, low-tension technique, quiet care"
            note="See docs/PHOTO_SHOOT_BRIEF.md, shots 05–07."
            sizes="(min-width: 64rem) 34vw, 100vw"
          />
        </div>
      </div>
    </Section>
  );
}
