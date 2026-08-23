import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { business } from "@/content/business";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/terms");

export default function TermsPage() {
  return (
    <>
      <PageHeader overline="Terms" title="Terms of use for this website." />

      <Section tone="ivory">
        <div className="container-prose legal prose-body">
          <p className="legal-updated t-body-sm t-muted">
            Last updated August 2026
            <PreviewBadge
              status="needs-confirmation"
              note="Requires the registered legal entity name and a contact address before production. Esther has confirmed an LLC exists; its registered name was not stated."
              className="legal-badge"
            />
          </p>

          <h2 className="t-h3">Using this site</h2>
          <p>
            This website describes the braiding services offered by {business.name} and links to a
            booking provider. You may read it, share links to it, and use it to book an
            appointment.
          </p>

          <h2 className="t-h3">Prices and appointment times</h2>
          <p>
            Every price shown is a range, because the final figure depends on the size you choose
            and the length you want. Appointment durations are likewise ranges, and real
            appointments vary with head size, hair type, and how the hair has been prepared. The
            figures published here are estimates given in good faith; your exact price and time are
            confirmed when your appointment is booked. Published ranges may change, and the price
            confirmed at booking is the one that applies.
          </p>

          <h2 className="t-h3">Guidance, not a guarantee</h2>
          <p>
            The size guidance on this site is there to help you choose and to reduce the questions
            you need to ask before booking. It is not a professional assessment of your hair, and
            it does not promise a particular outcome. Nothing here is medical or hair-health
            advice.
          </p>

          <h2 className="t-h3">Images and content</h2>
          <p>
            Photography, text, and branding on this site belong to {business.name} and may not be
            reproduced without permission.
          </p>

          <h2 className="t-h3">Booking through a third party</h2>
          <p>
            Booking is completed on an external platform with its own terms and privacy policy.
            {" "}{business.name} is not responsible for that platform&rsquo;s availability.
          </p>

          <h2 className="t-h3">Contact</h2>
          <p>
            Questions about these terms can be sent to {business.name}. A named contact address
            will be published here before launch.
          </p>
        </div>
      </Section>
    </>
  );
}
