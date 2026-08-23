import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { featuredFaqs } from "@/content/faqs";

/** The questions that most often arrive as a pre-booking text message. */
export function FaqTeaser() {
  return (
    <Section tone="white" id="faq">
      <div className="container-page faq-teaser-inner">
        <div className="faq-teaser-head">
          <SectionHeading
            overline="Before You Book"
            title="The questions people text first."
            lede="Answered here so you don't have to ask, and so your appointment starts on the work instead of the logistics."
          />
          <ButtonLink href="/faq" variant="secondary" className="faq-teaser-cta">
            All questions
          </ButtonLink>
        </div>

        <div className="faq-teaser-list">
          <Accordion
            items={featuredFaqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
              bookingCritical: f.bookingCritical,
            }))}
          />
        </div>
      </div>
    </Section>
  );
}
