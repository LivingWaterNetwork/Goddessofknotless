import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { faqs } from "@/content/faqs";
import { metadataForRoute } from "@/lib/page-metadata";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = metadataForRoute("/faq");

export default function FaqPage() {
  /* Only fully verified answers go into FAQPage structured data — Google's
     quality guidelines require the marked-up answer to be the real one. */
  const verified = faqs.filter((f) => f.status === "verified");

  return (
    <>
      <PageHeader
        overline="Questions & Answers"
        title="Everything people usually text first."
        lede="Pricing, preparation, timings, boho finishes, bringing your own hair, deposits. If your question is not here, it is worth asking directly when you book."
      />

      <Section tone="ivory">
        <div className="container-prose">
          <Accordion
            headingLevel={2}
            items={faqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: f.answer,
              bookingCritical: f.bookingCritical,
            }))}
          />
        </div>
      </Section>

      <ClosingCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd(verified.map((f) => ({ question: f.question, answer: f.answer }))),
          ),
        }}
      />
    </>
  );
}
