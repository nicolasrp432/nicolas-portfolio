import { FiArrowUpRight } from 'react-icons/fi';

/**
 * The site's outbound link style: monospaced label, rule underneath, arrow
 * that kicks up-right on hover. External targets get `rel="noreferrer"` and an
 * accessible name that says where they lead.
 */
export function ArrowLink({ href, children, className = '', label, external = true, ...rest }) {
  const externalProps = external ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <a
      className={`arrow-link ${className}`.trim()}
      href={href}
      aria-label={label}
      {...externalProps}
      {...rest}
    >
      <span>{children}</span>
      <FiArrowUpRight aria-hidden="true" />
    </a>
  );
}
