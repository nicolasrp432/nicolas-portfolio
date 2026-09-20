/**
 * The six-armed asterisk used as the manifesto's anchor.
 *
 * Drawn rather than typed: the character it replaced (U+2733) resolves to a
 * colour emoji on iOS and Android, which ignored the coral, ignored the type
 * scale, and rendered as a flat blue-green glyph on half the devices that saw
 * it. An inline SVG renders identically everywhere, inherits `currentColor`,
 * and rotates on its exact centre.
 */
export function Asterisk({ className = '' }) {
  return (
    <svg
      className={`asterisk ${className}`.trim()}
      viewBox="0 0 100 100"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 60, 120].map((angle) => (
        <rect
          key={angle}
          x="45"
          y="4"
          width="10"
          height="92"
          rx="5"
          fill="currentColor"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}
