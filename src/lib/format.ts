/** Whole-dollar formatting. Esther's prices are always whole dollars. */
export function usd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function priceRange(from: number, to: number): string {
  return from === to ? usd(from) : `${usd(from)}–${usd(to)}`;
}

/** "1.5" -> "1½" reads better in an editorial context than "1.5 hours". */
function hoursLabel(h: number): string {
  const whole = Math.floor(h);
  const frac = h - whole;
  if (frac === 0) return String(whole);
  if (frac === 0.5) return whole === 0 ? "½" : `${whole}½`;
  return String(h);
}

export function durationRange(fromHours: number, toHours: number): string {
  const unit = toHours === 1 ? "hour" : "hours";
  return fromHours === toHours
    ? `${hoursLabel(fromHours)} ${unit}`
    : `${hoursLabel(fromHours)}–${hoursLabel(toHours)} ${unit}`;
}
