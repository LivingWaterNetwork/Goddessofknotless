"use client";

import { useId, useState } from "react";
import { track } from "@/lib/analytics";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
  bookingCritical?: boolean;
}

/**
 * Native details/summary would be simpler, but we need an open event for
 * analytics and full control of the marker, so this is a button + region
 * pattern with explicit aria-expanded / aria-controls wiring.
 */
export function Accordion({
  items,
  headingLevel = 3,
}: {
  items: AccordionItem[];
  /** 2 where the accordion sits directly under the page h1; 3 under a section h2. */
  headingLevel?: 2 | 3;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const uid = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <ul className="accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${uid}-${item.id}-panel`;
        const buttonId = `${uid}-${item.id}-button`;

        return (
          <li key={item.id} className="accordion-item">
            <Heading className="accordion-heading">
              <button
                id={buttonId}
                type="button"
                className="accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  const next = isOpen ? null : item.id;
                  setOpenId(next);
                  if (next) {
                    track({
                      name: "faq_open",
                      id: item.id,
                      bookingCritical: Boolean(item.bookingCritical),
                    });
                  }
                }}
              >
                <span className="accordion-question">{item.question}</span>
                <span className="accordion-marker" data-open={isOpen} aria-hidden="true" />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion-panel"
              hidden={!isOpen}
            >
              <p className="t-body t-muted measure">{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
