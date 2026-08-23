import { features } from "@/content/features";
import type { VerificationStatus } from "@/content/types";

/**
 * Internal-only marker shown in preview builds so nobody mistakes an
 * unconfirmed fact for an approved one. Never renders in production mode —
 * and the launch gate refuses production while `placeholder` content remains,
 * so it cannot silently disappear with the problem unsolved.
 */
export function PreviewBadge({
  status,
  note,
  className = "",
}: {
  status: VerificationStatus;
  note?: string;
  className?: string;
}) {
  if (!features.previewLabels) return null;
  if (status === "verified") return null;

  const label = status === "placeholder" ? "Needs content" : "Confirm with Esther";

  return (
    <span className={`preview-badge preview-badge-${status} ${className}`} title={note}>
      <span aria-hidden="true">◆</span>
      <span>
        <span className="sr-only">Internal note: </span>
        {label}
      </span>
    </span>
  );
}
