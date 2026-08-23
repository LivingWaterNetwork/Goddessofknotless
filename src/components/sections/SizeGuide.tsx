"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { servicesByOrder } from "@/content/services";
import { durationRange, priceRange } from "@/lib/format";
import { track } from "@/lib/analytics";

/**
 * "Find Your Size" — guidance, not a quiz and not a diagnosis.
 *
 * Two questions, because those are the only two variables that actually drive
 * Esther's pricing and timing: how much time you can give, and how fine you
 * want the work. It recommends from the real service table and always ends in
 * a real service page.
 */
type TimeAnswer = "short" | "half-day" | "full-day";
type FinishAnswer = "bold" | "balanced" | "fine";

const timeOptions: { value: TimeAnswer; label: string; hint: string }[] = [
  { value: "short", label: "Two or three hours", hint: "In and out the same afternoon" },
  { value: "half-day", label: "Half a day", hint: "Three to six hours in the chair" },
  { value: "full-day", label: "A full day or more", hint: "Six hours and up, planned ahead" },
];

const finishOptions: { value: FinishAnswer; label: string; hint: string }[] = [
  { value: "bold", label: "Bold and graphic", hint: "Fewer, larger braids" },
  { value: "balanced", label: "Balanced", hint: "The look most clients picture" },
  { value: "fine", label: "Fine and detailed", hint: "Closest to natural density" },
];

/** Maps an answer pair onto a real slug from the service table. */
function recommend(time: TimeAnswer, finish: FinishAnswer): string {
  if (time === "short") {
    if (finish === "bold") return "jumbo";
    return finish === "fine" ? "medium-large" : "large";
  }
  if (time === "half-day") {
    if (finish === "bold") return "medium-large";
    return finish === "fine" ? "medium-fine" : "28-braid-count";
  }
  if (finish === "bold") return "medium";
  return finish === "fine" ? "microbraids" : "small";
}

export function SizeGuide() {
  const [time, setTime] = useState<TimeAnswer | null>(null);
  const [finish, setFinish] = useState<FinishAnswer | null>(null);
  const [started, setStarted] = useState(false);

  const result = useMemo(() => {
    if (!time || !finish) return null;
    const slug = recommend(time, finish);
    return servicesByOrder.find((s) => s.slug === slug) ?? null;
  }, [time, finish]);

  function begin() {
    if (started) return;
    setStarted(true);
    track({ name: "size_guide_start" });
  }

  return (
    <div className="size-guide">
      <div className="size-guide-head">
        <p className="overline">Find Your Size</p>
        <h2 className="t-h3 size-guide-title">
          Two questions, and a real starting point.
        </h2>
        <p className="t-body-sm t-muted measure-tight size-guide-note">
          This narrows the nine sizes down to one. It is a starting point for the conversation,
          not a diagnosis — Esther confirms the final choice when you book.
        </p>
      </div>

      <fieldset className="size-guide-field">
        <legend className="t-label size-guide-legend">1. How long can you sit?</legend>
        <div className="size-guide-options">
          {timeOptions.map((option) => (
            <label key={option.value} className="size-guide-option">
              <input
                type="radio"
                name="size-guide-time"
                value={option.value}
                checked={time === option.value}
                onChange={() => {
                  begin();
                  setTime(option.value);
                }}
              />
              <span className="size-guide-option-body">
                <span className="size-guide-option-label">{option.label}</span>
                <span className="size-guide-option-hint">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="size-guide-field">
        <legend className="t-label size-guide-legend">2. What finish do you want?</legend>
        <div className="size-guide-options">
          {finishOptions.map((option) => (
            <label key={option.value} className="size-guide-option">
              <input
                type="radio"
                name="size-guide-finish"
                value={option.value}
                checked={finish === option.value}
                onChange={() => {
                  begin();
                  setFinish(option.value);
                }}
              />
              <span className="size-guide-option-body">
                <span className="size-guide-option-label">{option.label}</span>
                <span className="size-guide-option-hint">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Live region: the result is announced without moving focus. */}
      <div className="size-guide-result" role="status" aria-live="polite">
        {result ? (
          <ResultCard
            name={result.name}
            price={priceRange(result.price.fromUsd, result.price.toUsd)}
            time={durationRange(result.duration.fromHours, result.duration.toHours)}
            slug={result.slug}
            tagline={result.tagline}
          />
        ) : (
          <p className="t-body-sm t-muted">
            Answer both questions to see a suggested size.
          </p>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  name,
  price,
  time,
  slug,
  tagline,
}: {
  name: string;
  price: string;
  time: string;
  slug: string;
  tagline: string;
}) {
  return (
    <div className="size-guide-card">
      <p className="t-label size-guide-card-label">Start here</p>
      <p className="t-h3 size-guide-card-name">{name}</p>
      <p className="t-body-sm size-guide-card-tagline">{tagline}</p>
      <dl className="size-guide-card-stats t-nums">
        <div>
          <dt className="t-label">Price</dt>
          <dd>{price}</dd>
        </div>
        <div>
          <dt className="t-label">Time</dt>
          <dd>{time}</dd>
        </div>
      </dl>
      <Link
        href={`/services/${slug}`}
        className="btn btn-primary btn-md size-guide-card-cta"
        onClick={() => track({ name: "size_guide_complete", recommendedSlug: slug })}
      >
        See {name} in full
      </Link>
    </div>
  );
}
