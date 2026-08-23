import Image from "next/image";
import { PreviewBadge } from "./PreviewBadge";
import type { VerificationStatus } from "@/content/types";

/**
 * Aspect-ratio-stable image frame.
 *
 * When no real image exists it renders a branded placeholder rather than a
 * grey box or a stock photo — clearly labelled in preview, and blocked from
 * production by the launch gate. The frame reserves its aspect ratio either
 * way, so swapping a real photograph in causes no layout shift.
 */
export function ImageFrame({
  src,
  alt,
  width,
  height,
  status = "verified",
  note,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  label,
  className = "",
  tone = "emerald",
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  status?: VerificationStatus;
  note?: string;
  priority?: boolean;
  sizes?: string;
  /** Short text shown on the placeholder to say what belongs here. */
  label?: string;
  className?: string;
  tone?: "emerald" | "olive" | "onyx" | "ivory" | "deep";
}) {
  const ratio = `${width} / ${height}`;

  if (src) {
    return (
      <div className={`image-frame ${className}`} style={{ aspectRatio: ratio }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          /* Only the true LCP image is eager; everything else defers. */
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          className="image-frame-img"
        />
      </div>
    );
  }

  return (
    <div
      className={`image-frame image-placeholder image-placeholder-${tone} ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label ? `Placeholder: ${label}` : "Photography placeholder"}
    >
      <span className="image-placeholder-mark" aria-hidden="true">
        <svg viewBox="0 0 240 420" className="image-placeholder-frond" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none">
            <path d="M28 412C58 322 96 232 148 152 176 108 204 68 226 34" />
            <path d="M148 152c-18-34-22-70-14-104 22 26 34 58 32 92" />
            <path d="M120 210c-24-28-34-62-30-96 26 22 42 52 44 86" />
            <path d="M92 268c-28-22-42-54-42-88 29 17 49 45 55 79" />
            <path d="M64 330c-31-16-50-45-55-79 31 12 55 36 65 69" />
          </g>
        </svg>
      </span>
      {label ? <span className="image-placeholder-label">{label}</span> : null}
      <span className="image-placeholder-badge">
        <PreviewBadge status={status} note={note} />
      </span>
    </div>
  );
}
