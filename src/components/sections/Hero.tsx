import Image from "next/image";
import { BookButton, RebookLink } from "@/components/ui/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { Frond } from "@/components/ui/Frond";
import { ScriptMark } from "@/components/ui/BrandMark";
import { StockMarker } from "@/components/ui/StockMarker";
import { business } from "@/content/business";
import { heroImage } from "@/content/placeholder-images";
import { priceFloorUsd, servicesByOrder } from "@/content/services";
import { durationRange, usd } from "@/lib/format";

/**
 * First viewport.
 *
 * A full-bleed photograph under an emerald wash, with the script mark, the
 * headline and the booking path over it. The type sits in its own scrimmed
 * column, so service, location, differentiator and booking path are all
 * legible in static markup whether or not the photograph ever loads — the
 * image is decoration on top of a solid emerald field, not the field itself.
 */
export function Hero() {
  const durations = servicesByOrder.map((s) => s.duration);
  const shortest = Math.min(...durations.map((d) => d.fromHours));
  const longest = Math.max(...durations.map((d) => d.toHours));

  return (
    <section id="hero" className="hero on-dark" aria-labelledby="hero-heading">
      <div className="hero-photo">
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          /* Next emits the preload link from `priority`, but it does not add a
             priority hint unless one is asked for — and without it the browser
             discovers the LCP image at normal priority behind the CSS and the
             fonts. This is the site's only image that gets it. */
          fetchPriority="high"
          sizes="100vw"
          className="hero-photo-img"
        />
        <span className="hero-photo-wash" aria-hidden="true" />
        <StockMarker className="hero-photo-marker" />
      </div>

      <span className="hero-frond hero-frond-right" aria-hidden="true">
        <Frond />
      </span>

      <div className="container-page hero-inner">
        <div className="hero-copy">
          <ScriptMark className="hero-script" priority sizes="(min-width: 64rem) 21rem, 46vw" />

          <p className="overline hero-overline">
            {business.neighborhood.value} · {business.city.value} · By Appointment
          </p>

          <h1 id="hero-heading" className="t-display hero-heading">
            Natural-looking braids.
            <br />
            A calm experience.
            <br />
            <em className="hero-heading-em">Results you can trust.</em>
          </h1>

          <div className="rule-foil hero-rule" />

          <p className="hero-subhead t-body-lg">
            Knotless braids in Chicago&rsquo;s West Loop, delivered with gentle care, reliable
            service, and thoughtful discretion.
          </p>

          <div className="hero-actions">
            <BookButton placement="hero" size="lg" variant="inverse" />
            <ButtonLink href="/services" variant="secondary" size="lg">
              Explore Sizes &amp; Pricing
            </ButtonLink>
          </div>

          <RebookLink placement="hero" />
        </div>
      </div>

      {/* The differentiator, set as three figures rather than a sentence:
          almost no competitor publishes any of them. */}
      <div className="hero-figures">
        <div className="container-page hero-figures-inner">
          <dl className="hero-figure-list t-nums">
            <div className="hero-figure">
              <dt className="t-label">Braid-count sizes</dt>
              <dd className="hero-figure-value">{servicesByOrder.length}</dd>
              <dd className="hero-figure-note t-body-sm">Jumbo through Microbraids</dd>
            </div>
            <div className="hero-figure">
              <dt className="t-label">Published prices from</dt>
              <dd className="hero-figure-value">{usd(priceFloorUsd)}</dd>
              <dd className="hero-figure-note t-body-sm">Real ranges, before you book</dd>
            </div>
            <div className="hero-figure">
              <dt className="t-label">Appointment window</dt>
              <dd className="hero-figure-value hero-figure-value-sm">
                {durationRange(shortest, longest)}
              </dd>
              <dd className="hero-figure-note t-body-sm">Quoted honestly, held to</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
