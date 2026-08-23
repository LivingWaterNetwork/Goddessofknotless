"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookButton } from "@/components/ui/BookButton";
import type { NavItem } from "@/content/navigation";

/**
 * The mobile menu island: toggle, panel, focus management, scroll lock.
 *
 * Below the md breakpoint this is the whole navigation; above it, CSS hides
 * both the toggle and the panel.
 */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  /* The menu is "open for" a specific route, so navigating closes the panel
     without an effect having to reset state afterwards. */
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpenFor(null);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenFor(open ? null : pathname)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="menu-toggle-bars" data-open={open} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <div id="mobile-menu" ref={panelRef} className="mobile-menu" data-open={open} hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="mobile-menu-list">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="mobile-menu-link"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-cta">
          <BookButton placement="header" size="lg" />
        </div>
      </div>

      {open ? <div className="mobile-menu-scrim" onClick={close} aria-hidden="true" /> : null}
    </>
  );
}
