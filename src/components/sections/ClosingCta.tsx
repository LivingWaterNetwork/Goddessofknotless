import { BookButton, RebookLink } from "@/components/ui/BookButton";
import { Seal } from "@/components/ui/BrandMark";
import { originStatement } from "@/content/business";

/** Composed closing invitation. No countdown, no scarcity, no discount. */
export function ClosingCta() {
  return (
    <section className="closing on-dark" aria-labelledby="closing-heading">
      <div className="container-page closing-inner">
        <span className="closing-seal" aria-hidden="true">
          <Seal sizes="6rem" />
        </span>
        <p className="overline">Reserve</p>
        <h2 id="closing-heading" className="t-h2 closing-heading">
          When you are ready, the chair is ready.
        </h2>
        <div className="rule-foil closing-rule" />
        <p className="closing-lede t-body-lg">{originStatement}</p>
        <div className="closing-actions">
          <BookButton placement="closing-cta" size="lg" variant="inverse" />
          <RebookLink placement="closing-cta" />
        </div>
      </div>
    </section>
  );
}
