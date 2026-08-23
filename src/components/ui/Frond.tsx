/**
 * The frond motif from the brand packet, as inline SVG.
 *
 * It is the brand's only piece of ornament, so it carries real weight here:
 * large, cropped, and layered behind sections rather than dropped in at a
 * whisper. Always decorative — never the sole carrier of meaning.
 */
export function Frond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 420" fill="none" aria-hidden="true" className={className} focusable="false">
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
