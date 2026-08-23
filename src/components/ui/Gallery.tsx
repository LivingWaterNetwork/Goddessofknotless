"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageFrame } from "./ImageFrame";
import type { GalleryItem } from "@/content/types";
import { track } from "@/lib/analytics";

/**
 * Filterable gallery with a keyboard-accessible dialog.
 *
 * No auto-playing carousel and no masonry: every frame reserves a fixed aspect
 * ratio, so filtering never causes the page to jump. Only items with a real
 * image are openable — placeholders are inert, because there is nothing to
 * enlarge.
 */
export function Gallery({
  items,
  filters,
}: {
  items: GalleryItem[];
  filters: { slug: string; label: string }[];
}) {
  const [active, setActive] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const visible =
    active === "all" ? items : items.filter((i) => i.serviceSlugs.includes(active));

  const openItem = visible.find((i) => i.id === openId) ?? null;
  const hasRealImages = items.some((i) => i.src !== null);

  const close = useCallback(() => {
    setOpenId(null);
    lastTriggerRef.current?.focus();
  }, []);

  /* Escape closes; Tab is trapped inside the dialog while it is open. */
  useEffect(() => {
    if (!openId) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
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
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openId, close]);

  return (
    <div className="gallery">
      {filters.length > 0 ? (
        <div className="gallery-filters" role="group" aria-label="Filter gallery by size">
          <FilterChip
            label="All work"
            value="all"
            active={active === "all"}
            onSelect={setActive}
            count={items.length}
          />
          {filters.map((f) => (
            <FilterChip
              key={f.slug}
              label={f.label}
              value={f.slug}
              active={active === f.slug}
              onSelect={setActive}
              count={items.filter((i) => i.serviceSlugs.includes(f.slug)).length}
            />
          ))}
        </div>
      ) : null}

      {/* Counts placeholders honestly: calling twelve empty frames "12 images"
          would read as twelve photographs that failed to load. */}
      <p className="gallery-status" role="status">
        {hasRealImages
          ? `${visible.length} ${visible.length === 1 ? "image" : "images"}${active === "all" ? "" : " in this size"}`
          : `${visible.length} ${visible.length === 1 ? "slot" : "slots"} reserved${active === "all" ? "" : " in this size"} \u2014 awaiting photography`}
      </p>

      <ul className="gallery-grid">
        {visible.map((item) => (
          <li key={item.id} className="gallery-cell">
            {item.src ? (
              <button
                type="button"
                className="gallery-open"
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setOpenId(item.id);
                  track({ name: "gallery_open", itemId: item.id });
                }}
              >
                <span className="sr-only">Enlarge: {item.alt}</span>
                <ImageFrame
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  status={item.status}
                />
              </button>
            ) : (
              <ImageFrame
                src={null}
                alt=""
                width={item.width}
                height={item.height}
                status={item.status}
                note={item.sourceNote}
                tone={item.serviceSlugs.length > 0 ? "emerald" : "olive"}
                label={labelFor(item, filters)}
              />
            )}
          </li>
        ))}
      </ul>

      {openItem?.src ? (
        <div className="lightbox-scrim" onClick={close}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={openItem.alt || "Gallery image"}
            className="lightbox"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="lightbox-close" onClick={close}>
              <span className="sr-only">Close</span>
              <span aria-hidden="true">✕</span>
            </button>
            <ImageFrame
              src={openItem.src}
              alt={openItem.alt}
              width={openItem.width}
              height={openItem.height}
              sizes="(min-width: 64rem) 60vw, 92vw"
            />
            {openItem.caption ? <p className="lightbox-caption">{openItem.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function labelFor(item: GalleryItem, filters: { slug: string; label: string }[]): string {
  const first = item.serviceSlugs[0];
  if (first) {
    const match = filters.find((f) => f.slug === first);
    return match ? `${match.label} — finished result` : "Finished result";
  }
  if (item.id.startsWith("process")) return "Process detail";
  return "Studio";
}

function FilterChip({
  label,
  value,
  active,
  count,
  onSelect,
}: {
  label: string;
  value: string;
  active: boolean;
  count: number;
  onSelect: (value: string) => void;
}) {
  return (
    <button
      type="button"
      className="gallery-chip"
      aria-pressed={active}
      onClick={() => {
        onSelect(value);
        track({ name: "gallery_filter", filter: value });
      }}
    >
      {label}
      <span className="gallery-chip-count t-nums" aria-hidden="true">
        {count}
      </span>
    </button>
  );
}
