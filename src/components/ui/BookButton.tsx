"use client";

import { usePathname } from "next/navigation";
import { business } from "@/content/business";
import { track, type BookPlacement } from "@/lib/analytics";
import { ButtonLink, Button } from "./Button";

/**
 * The single booking control used everywhere on the site.
 *
 * Every instance reads `business.bookingUrl` (from NEXT_PUBLIC_BOOKING_URL),
 * so approving a booking platform is one environment variable — no component
 * changes. Until a URL is configured the button renders as a disabled control
 * with an honest explanation instead of a dead `#` link.
 */
export function BookButton({
  placement,
  label = "Reserve Your Experience",
  variant = "primary",
  size = "md",
  serviceSlug,
  className = "",
}: {
  placement: BookPlacement;
  label?: string;
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "lg";
  /** Set on service cards/pages so we can see which sizes drive bookings. */
  serviceSlug?: string;
  className?: string;
}) {
  const pathname = usePathname();

  if (!business.bookingUrl) {
    /* No booking platform is connected yet, so there is nothing honest to link
       to. The control renders disabled rather than as a dead link.
       
       Every instance is described by an explanation for assistive tech, but the
       note is only VISIBLE at the closing CTA — repeating it beside all seven
       placements would turn the page into a construction notice. */
    const visibleNote = placement === "closing-cta";
    const noteId = `booking-pending-${placement}`;

    return (
      <span className={`book-unavailable ${className}`}>
        <Button variant={variant} size={size} disabled aria-describedby={noteId}>
          {label}
        </Button>
        <span
          id={noteId}
          className={visibleNote ? "book-unavailable-note" : "sr-only"}
        >
          Online booking opens once the studio&rsquo;s booking platform is connected.
        </span>
      </span>
    );
  }

  return (
    <ButtonLink
      href={business.bookingUrl}
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        track({ name: "book_click", route: pathname, placement });
        if (serviceSlug) {
          track({ name: "service_booking_click", slug: serviceSlug, route: pathname });
        }
      }}
    >
      {label}
    </ButtonLink>
  );
}

/** Fast path for returning clients, shown only when a rebook link exists. */
export function RebookLink({ placement }: { placement: BookPlacement }) {
  const pathname = usePathname();
  if (!business.rebookUrl) return null;

  return (
    <a
      href={business.rebookUrl}
      className="rebook-link"
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => track({ name: "rebook_click", route: pathname, placement })}
    >
      Booked before? Rebook in one tap
    </a>
  );
}
