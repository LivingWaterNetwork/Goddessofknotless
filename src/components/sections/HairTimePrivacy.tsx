import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The strategic signature of the site.
 *
 * Deliberately NOT three icon cards. It reads as an editorial triptych: a large
 * serif numeral, a hairline rule, and copy that widens as you move down —
 * carrying the brand's positioning line ("for women whose hair, time and
 * privacy matter") as structure rather than as a slogan.
 */
const pillars = [
  {
    numeral: "I",
    title: "Your Hair",
    lede: "Natural artistry, and a comfort-conscious hand.",
    body:
      "Clean foundations, realistic density, and a low-tension technique that keeps the finished style looking like it grew that way. Nine sizes means the work is matched to your hair rather than the other way round.",
  },
  {
    numeral: "II",
    title: "Your Time",
    lede: "Quoted honestly, and respected once you arrive.",
    body:
      "Every size on this site publishes its real appointment range — an hour and a half at Jumbo, up to fourteen at Micro. You arrive washed and blow-dried, Esther braids, and the day runs the length it was quoted.",
  },
  {
    numeral: "III",
    title: "Your Privacy",
    lede: "A calm room, and a closed one.",
    body:
      "No gossip, no audience, no performance. Clients regularly fall asleep in the chair. If your work or your visibility means discretion matters, that is the ordinary standard here, not a special request.",
  },
] as const;

export function HairTimePrivacy() {
  return (
    <Section tone="white" id="standards">
      <div className="container-page">
        <SectionHeading
          overline="The Standard"
          title={
            <>
              Three things she trusts you with,
              <br />
              and the reason clients refer you.
            </>
          }
          lede="She is not only asking who can braid her hair. She is asking who she can trust with her hair, her time, and her privacy."
          className="pillars-head"
        />

        <ol className="pillars">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="pillar">
              <Reveal delayMs={index * 90}>
                <p className="pillar-numeral" aria-hidden="true">
                  {pillar.numeral}
                </p>
                <div className="rule-gold pillar-rule" />
                <h3 className="t-h3 pillar-title">{pillar.title}</h3>
                <p className="pillar-lede">{pillar.lede}</p>
                <p className="t-body-sm t-muted pillar-body">{pillar.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
