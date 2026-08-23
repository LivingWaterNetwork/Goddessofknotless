import { BookButton, RebookLink } from "@/components/ui/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { business } from "@/content/business";
import { priceFloorUsd } from "@/content/services";
import { usd } from "@/lib/format";

/**
 * First viewport.
 *
 * Communicates service, location, differentiator, and the booking path in
 * static markup — no animation is required to read or act on any of it. The
 * frond line art is inline SVG (not a 1MB flat-colour JPEG as in the deck), so
 * it costs nothing and scales cleanly.
 */
export function Hero() {
  return (
    <section id="hero" className="hero on-dark" aria-labelledby="hero-heading">
      <span className="hero-frond hero-frond-left" aria-hidden="true">
        <Frond />
      </span>
      <span className="hero-frond hero-frond-right" aria-hidden="true">
        <Frond />
      </span>

      <div className="container-page hero-inner">
        <div className="hero-copy">
          <p className="overline hero-overline">
            {business.neighborhood.value} · {business.city.value} · By Appointment
          </p>

          <h1 id="hero-heading" className="t-h1 hero-heading">
            Natural-looking braids.
            <br />
            A calm experience.
            <br />
            <em className="hero-heading-em">Results you can trust.</em>
          </h1>

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

          <div className="hero-meta">
            <p className="t-body-sm">
              <span className="t-label hero-meta-label">Every size, every price</span>
              Nine braid-count sizes, from {usd(priceFloorUsd)}. Real ranges and real appointment
              times, published before you book.
            </p>
            <RebookLink placement="hero" />
          </div>
        </div>

        <div className="hero-media">
          <ImageFrame
            src={null}
            alt=""
            width={1000}
            height={1300}
            status="placeholder"
            tone="deep"
            priority
            label="Hero: finished knotless braids, natural density, clean parts"
            note="The single most important missing asset. See docs/PHOTO_SHOOT_BRIEF.md, shot 01."
            sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 45vw, 100vw"
            className="hero-media-frame"
          />
        </div>
      </div>

    </section>
  );
}

function Frond() {
  return (
    <svg viewBox="0 0 240 420" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M28 412C58 322 96 232 148 152 176 108 204 68 226 34" />
        <path d="M148 152c-18-34-22-70-14-104 22 26 34 58 32 92" />
        <path d="M120 210c-24-28-34-62-30-96 26 22 42 52 44 86" />
        <path d="M92 268c-28-22-42-54-42-88 29 17 49 45 55 79" />
        <path d="M64 330c-31-16-50-45-55-79 31 12 55 36 65 69" />
        <path d="M176 104c-12-30-12-62 0-92 18 24 25 54 19 84" />
      </g>
    </svg>
  );
}
