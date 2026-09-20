import { FiArrowUp } from 'react-icons/fi';
import { site, socials } from '../../data/site';
import { BrandMark } from '../ui/BrandMark';

/**
 * Colophon: authorship, the three channels again, and a way back to the top.
 *
 * @param {object} props
 * @param {string} [props.homeHref] Where the monogram leads. `/` off the home page.
 * @param {string} [props.topHref]  The top of *this* document.
 */
export function Footer({ homeHref = '#inicio', topHref = '#inicio' }) {
  return (
    <footer className="colophon on-ink ink-surface">
      <a className="colophon-brand" href={homeHref} aria-label="Ir al inicio">
        <BrandMark compact />
      </a>

      <p>Diseñado y construido con curiosidad por {site.shortName}.</p>

      <ul className="colophon-links">
        {socials.map((social) => (
          <li key={social.id}>
            <a href={social.url} target={social.id === 'email' ? undefined : '_blank'} rel="noreferrer">
              {social.label}
            </a>
          </li>
        ))}
      </ul>

      <span className="colophon-year">© {new Date().getFullYear()}</span>

      <a className="colophon-top" href={topHref}>
        <FiArrowUp aria-hidden="true" />
        <span className="visually-hidden">Volver al inicio</span>
      </a>
    </footer>
  );
}
