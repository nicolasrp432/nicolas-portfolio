/**
 * A fixed film-grain layer over the whole page.
 *
 * The noise is an inline SVG turbulence filter rather than a bitmap: it costs
 * roughly 300 bytes, scales to any display density, and is what stops the flat
 * paper palette from reading as plain "white website".
 */
export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
