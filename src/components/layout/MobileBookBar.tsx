"use client";

import { useEffect, useRef } from "react";
import { BookButton } from "@/components/ui/BookButton";

/**
 * Persistent mobile booking action.
 *
 * Appears once the visitor has scrolled past the hero, so the first viewport is
 * never covered. Visibility is written straight onto the DOM by the observer
 * rather than held in React state — the bar's appearance is a synchronisation
 * with an external system (scroll position), and keeping it out of state avoids
 * a cascading render on every scroll transition.
 *
 * `body[data-book-bar]` carries bottom padding while the bar is up (see
 * globals.css), so it can never obscure the end of the page or a focused
 * element near the bottom of the viewport.
 */
export function MobileBookBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function setVisible(visible: boolean) {
      bar!.dataset.shown = String(visible);
      bar!.setAttribute("aria-hidden", String(!visible));
      /* `inert` keeps the hidden bar out of the tab order entirely. */
      if (visible) bar!.removeAttribute("inert");
      else bar!.setAttribute("inert", "");

      if (visible) document.body.dataset.bookBar = "true";
      else delete document.body.dataset.bookBar;
    }

    /* The HERO is observed, not a thin sentinel at its end. A 1px sentinel
       looks equivalent but is not: IntersectionObserver only reports threshold
       CROSSINGS, and an instant jump past a 1px element (an anchor link, a
       restored scroll position, a deep link with a hash) goes from
       not-intersecting-below to not-intersecting-above without ever
       intersecting — so no callback fires and the bar stays hidden. The hero is
       tall enough that leaving it is always a genuine crossing. */
    const hero = document.getElementById("hero");

    /* Routes without a hero (services, gallery, legal) show the bar at once. */
    if (!hero) {
      setVisible(true);
      return () => {
        delete document.body.dataset.bookBar;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => {
      observer.disconnect();
      delete document.body.dataset.bookBar;
    };
  }, []);

  return (
    <div ref={barRef} className="mobile-book-bar" data-shown="false" aria-hidden="true" inert>
      <BookButton placement="mobile-bar" label="Reserve Your Experience" size="md" />
    </div>
  );
}
