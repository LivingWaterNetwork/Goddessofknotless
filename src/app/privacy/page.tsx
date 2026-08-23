import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { business } from "@/content/business";
import { features } from "@/content/features";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        overline="Privacy"
        title="What this website collects, and what it does not."
      />

      <Section tone="ivory">
        <div className="container-prose legal prose-body">
          <p className="legal-updated t-body-sm t-muted">
            Last updated August 2026
            <PreviewBadge
              status="needs-confirmation"
              note="A named legal contact (email or postal address) is required before production. Esther must supply one."
              className="legal-badge"
            />
          </p>

          <h2 className="t-h3">The short version</h2>
          <p>
            This website does not ask you for personal information. There is no account to create,
            no newsletter sign-up, and no contact form. If you choose to book an appointment, you
            leave this site and do so through {business.name}&rsquo;s booking provider, which
            handles that information under its own privacy policy.
          </p>

          <h2 className="t-h3">Analytics</h2>
          <p>
            {features.analytics
              ? "We measure aggregate, privacy-preserving usage — which pages are viewed and which booking buttons are used. This does not use cookies to track you across other websites, and it does not build a profile of you."
              : "Analytics are currently switched off entirely. If they are enabled later, they will be aggregate and privacy-preserving: page views and booking-button clicks, with no cross-site tracking and no personal profile."}
          </p>
          <p>
            We do not run advertising pixels, session-recording tools, or heat-mapping software,
            and we do not sell or share data with advertisers.
          </p>

          <h2 className="t-h3">Cookies</h2>
          <p>
            This site sets no advertising or tracking cookies of its own.
          </p>

          <h2 className="t-h3">Your appointment information</h2>
          <p>
            Anything you share when booking — your name, your contact details, notes about your
            hair — is held by {business.name} and its booking provider for the purpose of
            delivering your appointment. It is not published, sold, or shared for marketing by
            anyone else. Please do not send health, financial, or identity-document information
            through any channel on this website; it is never required.
          </p>

          <h2 className="t-h3">Contact</h2>
          <p>
            To ask what information is held about you, or to have it corrected or deleted, contact{" "}
            {business.name} directly. A named contact address will be published here before
            launch.
          </p>
        </div>
      </Section>
    </>
  );
}
