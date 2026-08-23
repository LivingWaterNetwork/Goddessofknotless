import type { ReactNode } from "react";

/**
 * The standing statement on a roadmap page.
 *
 * Says what is true today, in the first screen, before any of the intent. A
 * "coming soon" page that leads with what it will be and buries what it is not
 * reads as a soft-launch; this leads with the limitation. There is deliberately
 * no date, no countdown, no waiting-list form, and no email capture — none of
 * those could be honoured yet, and a form that goes nowhere costs more trust
 * than the page earns.
 */
export function PlannedNotice({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`planned-notice ${className}`}>
      <span className="planned-notice-tag">
        <span aria-hidden="true">◆</span> Not available yet
      </span>
      <span className="planned-notice-body">{children}</span>
    </p>
  );
}

/**
 * How to express interest, without a channel we cannot stand behind.
 *
 * Esther's phone, email and booking platform are all still unconfirmed, so
 * every other route would mean publishing a contact detail nobody has verified.
 * The one channel that certainly exists is the appointment itself.
 */
export function PlannedInterest({ subject }: { subject: string }) {
  return (
    <p className="planned-interest t-body-sm">
      Interested? Mention {subject} at your next appointment. There is no sign-up
      list yet — when there is one, it will be here.
    </p>
  );
}
