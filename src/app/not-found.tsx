import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="emerald">
      <div className="container-prose error-page">
        <p className="overline">404</p>
        <h1 className="t-h2 error-title">This page isn&rsquo;t here.</h1>
        <p className="t-body-lg error-lede">
          The link may be old, or the address slightly off. The services, the gallery, and the
          booking page are all one tap away.
        </p>
        <div className="error-actions">
          <ButtonLink href="/services" variant="inverse">
            Sizes &amp; Pricing
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
