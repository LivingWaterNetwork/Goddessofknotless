import { BookButton, RebookLink } from "@/components/ui/BookButton";
import { originStatement } from "@/content/business";

/** Composed closing invitation. No countdown, no scarcity, no discount. */
export function ClosingCta() {
  return (
    <section className="closing on-dark" aria-labelledby="closing-heading">
      <div className="container-page closing-inner">
        <p className="overline">Reserve</p>
        <h2 id="closing-heading" className="t-h2 closing-heading">
          When you are ready, the chair is ready.
        </h2>
        <p className="closing-lede t-body-lg">{originStatement}</p>
        <div className="closing-actions">
          <BookButton placement="closing-cta" size="lg" variant="inverse" />
          <RebookLink placement="closing-cta" />
        </div>
      </div>
    </section>
  );
}
