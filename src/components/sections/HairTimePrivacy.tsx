import { Section, SectionHeading } from "@/components/ui/Section";
import { Frond } from "@/components/ui/Frond";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The strategic signature of the site.
 *
 * Deliberately NOT three icon cards. It reads as an editorial triptych: an
 * oversized foil numeral, a gold rule, and copy that steps down the page —
 * carrying the brand's positioning line ("for women whose hair, time and
 * privacy matter") as structure rather than as a slogan.
 *
 * VOICE: everything in this section speaks to the visitor. The heading and
 * lede used to be written to Esther instead ("three things she trusts you
 * with… the reason clients refer you"), which cast the reader as the braider
 * and ran the trust backwards, while the three pillars below addressed the
 * reader directly. Second person here always means the person reading.
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
    <Section tone="white" id="standards" className="pillars-section">
      <span className="pillars-frond" aria-hidden="true">
        <Frond />
      </span>

      <div className="container-page">
        <SectionHeading
          overline="The Standard"
          title={
            <>
              Three things you are
              <br />
              trusting Esther with.
            </>
          }
          lede="The question is never only who can braid your hair. It is who you trust with your hair, your time, and your privacy — and it is why clients pass her name on."
          className="pillars-head"
        />

        <ol className="pillars">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="pillar">
              <Reveal delayMs={index * 90}>
                <p className="pillar-numeral" aria-hidden="true">
                  {pillar.numeral}
                </p>
                <div className="rule-foil pillar-rule" />
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
