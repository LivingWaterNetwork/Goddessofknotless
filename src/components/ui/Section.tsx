import type { ElementType, ReactNode } from "react";

type Tone = "ivory" | "white" | "sunken" | "emerald" | "onyx";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-onyx",
  white: "bg-white text-onyx",
  sunken: "bg-ivory-warm text-onyx",
  emerald: "on-dark bg-emerald",
  onyx: "on-dark bg-onyx",
};

export function Section({
  children,
  tone = "ivory",
  size = "default",
  id,
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  tone?: Tone;
  size?: "default" | "compact";
  id?: string;
  className?: string;
  as?: ElementType;
}) {
  const pad = size === "compact" ? "section-pad-sm" : "section-pad";
  return (
    <Tag id={id} className={`${tones[tone]} ${pad} ${className}`}>
      {children}
    </Tag>
  );
}

/** Overline + heading + optional lede, set consistently across the site. */
export function SectionHeading({
  overline,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  overline?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: ElementType;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col ${centered ? "items-center text-center" : ""} ${className}`}>
      {overline ? <p className="overline mb-4">{overline}</p> : null}
      <Tag className="t-h2 measure-heading">{title}</Tag>
      {lede ? (
        <p className={`t-body-lg t-muted measure mt-5 ${centered ? "mx-auto" : ""}`}>{lede}</p>
      ) : null}
    </div>
  );
}
