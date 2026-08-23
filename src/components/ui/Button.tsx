import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

function classes(variant: Variant, size: Size, extra: string): string {
  return ["btn", `btn-${variant}`, `btn-${size}`, extra].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const cls = classes(variant, size, className);

  /** Booking links point off-site; internal routes stay client-side. */
  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
