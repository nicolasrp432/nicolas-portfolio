import { FiArrowUpRight, FiFileText } from 'react-icons/fi';
import { certificates } from '../../data/education';

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

/** `2025-11` → `noviembre de 2025`. Falls back to the raw string. */
function readableDate(value) {
  const match = /^(\d{4})-(\d{2})$/.exec(value ?? '');
  if (!match) return value ?? '';
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} de ${match[1]}` : match[1];
}

/**
 * Certifications, folded away at the end of the page.
 *
 * Native `<details>` / `<summary>` rather than a JS disclosure: keyboard
 * support, screen-reader semantics and the open/closed state come free, and it
 * works with JavaScript off — which matters here, because the rest of the site
 * only ever pre-hides content while `<html data-motion="on">`. A hand-rolled
 * toggle would be the one place where content could get stuck behind script.
 *
 * Renders nothing while the list is empty. An empty section reads as an
 * unfinished site, which is worse than no section at all.
 */
export function Certificates() {
  if (certificates.length === 0) return null;

  return (
    <section className="section certificates" id="certificaciones">
      <details className="certificates-fold">
        <summary>
          <span className="certificates-label">Certificaciones</span>
          <span className="certificates-count" aria-hidden="true">
            {String(certificates.length).padStart(2, '0')}
          </span>
          <span className="certificates-marker" aria-hidden="true" />
        </summary>

        <ul className="certificates-list">
          {certificates.map((certificate) => (
            <li key={certificate.id}>
              <div className="certificate-head">
                <h3>{certificate.title}</h3>
                <span className="certificate-meta">
                  {certificate.issuer}
                  {certificate.date && ` · ${readableDate(certificate.date)}`}
                </span>
              </div>

              <div className="certificate-links">
                {certificate.verifyUrl && (
                  <a href={certificate.verifyUrl} target="_blank" rel="noreferrer">
                    Verificar <FiArrowUpRight aria-hidden="true" />
                    <span className="visually-hidden"> {certificate.title} (se abre en una pestaña nueva)</span>
                  </a>
                )}
                {certificate.file && (
                  <a href={certificate.file} target="_blank" rel="noreferrer">
                    <FiFileText aria-hidden="true" /> Documento
                    <span className="visually-hidden"> de {certificate.title}</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
