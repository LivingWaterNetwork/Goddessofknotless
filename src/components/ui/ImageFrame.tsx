import Image from "next/image";
import { PreviewBadge } from "./PreviewBadge";
import { Frond } from "./Frond";
import { StockMarker } from "./StockMarker";
import type { VerificationStatus } from "@/content/types";

/**
 * Aspect-ratio-stable image frame.
 *
 * Three states:
 *   • a verified photograph — rendered plainly;
 *   • a STOCK PLACEHOLDER photograph — rendered with an unmissable marker
 *     saying so, because it is somebody else's work standing in for Esther's;
 *   • no photograph at all — a branded, labelled empty frame.
 *
 * The frame reserves its aspect ratio in every state, so nothing here can move
 * the page (CLS stays 0.000).
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
  markerSize = "default",
  frame = "plain",
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
  /** Small frames (cards, grids) get the abbreviated marker. */
  markerSize?: "default" | "compact";
  /** `gold` adds an offset gold rule behind the frame. */
  frame?: "plain" | "gold";
}) {
  const ratio = `${width} / ${height}`;
  const wrapperClass = frame === "gold" ? "image-frame-gold" : "";

  if (src) {
    const body = (
      <div className={`image-frame ${wrapperClass ? "" : className}`} style={{ aspectRatio: ratio }}>
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
        {status === "placeholder" ? <StockMarker size={markerSize} /> : null}
      </div>
    );

    if (frame === "gold") {
      return <div className={`image-frame-gold-wrap ${className}`}>{body}</div>;
    }
    return body;
  }

  return (
    <div
      className={`image-frame image-placeholder image-placeholder-${tone} ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label ? `Placeholder: ${label}` : "Photography placeholder"}
    >
      <span className="image-placeholder-mark" aria-hidden="true">
        <Frond className="image-placeholder-frond" />
      </span>
      {label ? <span className="image-placeholder-label">{label}</span> : null}
      <span className="image-placeholder-badge">
        <PreviewBadge status={status} note={note} />
      </span>
    </div>
  );
}
