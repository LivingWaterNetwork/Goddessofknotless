import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PreviewBadge } from "@/components/ui/PreviewBadge";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { publishablePolicies, pendingPolicies } from "@/content/policies";
import { features } from "@/content/features";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/policies");

export default function PoliciesPage() {
  return (
    <>
      <PageHeader
        overline="Policies"
        title="What you are agreeing to when you book."
        lede="Short, plain, and confirmed with you at the time of booking. Nothing here is buried in small print."
      />

      <Section tone="ivory">
        <div className="container-prose">
          <dl className="policy-list policy-list-page">
            {publishablePolicies.map((policy) => (
              <div key={policy.id} className="policy-item">
                <dt className="t-h3">
                  {policy.title}
                  <PreviewBadge
                    status={policy.status}
                    note={policy.sourceNote}
                    className="policy-badge"
                  />
                </dt>
                <dd className="t-body t-muted measure">{policy.body}</dd>
              </div>
            ))}
          </dl>

          {/* Preview-only. These are launch blockers, not published policy —
              the gate refuses production while any of them remain. */}
          {features.previewLabels && pendingPolicies.length > 0 ? (
            <div className="pending-panel">
              <h2 className="t-h4">Internal: policies still needed from Esther</h2>
              <p className="t-body-sm t-muted">
                These are not shown to clients and are not published anywhere on the live site.
                The production content gate fails while any remain unwritten.
              </p>
              <ul className="pending-list">
                {pendingPolicies.map((policy) => (
                  <li key={policy.id}>
                    <strong>{policy.title}</strong>
                    <span className="t-body-sm t-muted"> — {policy.sourceNote}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
