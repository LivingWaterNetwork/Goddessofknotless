"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A nav link that knows whether it is the current page. Kept as its own tiny
 * client component so the surrounding header can stay on the server.
 */
export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className="site-nav-link" aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}
