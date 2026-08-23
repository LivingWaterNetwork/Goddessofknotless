import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { business } from "@/content/business";

/**
 * Concise founder block. Standards and client experience, not autobiography —
 * and nothing from the private portions of the strategy calls.
 */
export function FounderStory() {
  return (
    <Section tone="sunken" id="founder">
      <div className="container-page founder-inner">
        <div className="founder-media">
          <ImageFrame
            src={null}
            alt=""
            width={1000}
            height={1200}
            status="placeholder"
            tone="ivory"
            label="Portrait: Esther at work in the West Loop studio"
            note="See docs/PHOTO_SHOOT_BRIEF.md, shot 09."
            sizes="(min-width: 64rem) 38vw, 100vw"
          />
        </div>

        <div className="founder-copy">
          <p className="overline">Behind the Chair</p>
          <blockquote className="founder-quote">
            <p>
              What began in {business.foundedYear} as a self-taught pursuit became a
              referral-built West Loop studio, rooted in consistency, care, and trust.
            </p>
          </blockquote>

          <div className="prose-body t-body t-muted measure founder-body">
            <p>
              {business.founder} taught herself to braid in {business.foundedYear}, after going
              from stylist to stylist and finding that nobody did it the same way twice. The parts
              moved. The appointments ran late. The results were never quite the same.
            </p>
            <p>
              So she learned to do it properly, and then did it the same way every single time.
              Almost every client since has arrived because another client sent them — which is a
              harder standard to hold than any review score, because a referral puts someone
              else&rsquo;s name on the line alongside hers.
            </p>
          </div>

          <ButtonLink href="/about" variant="ghost" className="founder-cta">
            Read Esther&rsquo;s standards
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
