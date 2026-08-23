"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Quiet entrance: opacity plus a 14px lift, once, on first intersection.
 *
 * The hidden state is ARMED BY JAVASCRIPT, not by the stylesheet. The CSS used
 * to start every wrapped element at `opacity: 0` and rely on an
 * IntersectionObserver to bring it back, which meant that if the bundle failed
 * — blocked script, hydration error, a slow connection giving up — the
 * Hair / Time / Privacy triptych simply never appeared. Arming the effect from
 * the client makes "no JavaScript" degrade to "no animation" instead of "no
 * content".
 */
export function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.shown = "true";
      return;
    }

    /* Already on screen when the effect runs (above the fold, or a deep link):
       show it immediately rather than animating something the visitor is
       already looking at. */
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      node.dataset.shown = "true";
      return;
    }

    node.dataset.armed = "true";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.dataset.shown = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
