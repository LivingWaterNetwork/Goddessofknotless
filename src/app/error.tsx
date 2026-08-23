"use client";

import { useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="emerald">
      <div className="container-prose error-page">
        <p className="overline">Something went wrong</p>
        <h1 className="t-h2 error-title">That didn&rsquo;t load properly.</h1>
        <p className="t-body-lg error-lede">
          Try again, or head back to the services page. Nothing you were doing has been lost.
        </p>
        <div className="error-actions">
          <Button variant="inverse" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
