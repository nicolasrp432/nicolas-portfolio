/**
 * The `<N/>` monogram. An ink slab with a hard coral offset shadow — no
 * gradients, no soft elevation — so it reads the same at 24px in the footer as
 * at 200px inside the closing orb.
 */
export function BrandMark({ compact = false, className = '' }) {
  return (
    <span className={`brand-mark${compact ? ' is-compact' : ''} ${className}`.trim()} aria-hidden="true">
      <i>&lt;</i>
      <strong>N</strong>
      <i>/&gt;</i>
    </span>
  );
}
