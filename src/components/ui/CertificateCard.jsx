import { useState } from 'react';
import { FiArrowUpRight, FiFileText, FiAward, FiEye } from 'react-icons/fi';

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
function readableDate(value) {
  const match = /^(\d{4})-(\d{2})$/.exec(value ?? '');
  const month = match && MONTHS[Number(match[2]) - 1];
  return month ? `${month} de ${match[1]}` : value;
}
export const certificateImage = (certificate) => certificate.image || certificate.file?.replace(/\.pdf$/i, '.jpg');

export function CertificateProofLinks({ certificate }) {
  return <div className="cert-card-actions">
    {certificate.file && <a className="cert-card-link" href={certificate.file} target="_blank" rel="noreferrer">Abrir documento <FiFileText aria-hidden="true" /></a>}
    {certificate.verifyUrl && <a className="cert-card-link" href={certificate.verifyUrl} target="_blank" rel="noreferrer">Verificar <FiArrowUpRight aria-hidden="true" /></a>}
  </div>;
}

export function CertificateCard({ certificate, index, onPreview }) {
  const [failed, setFailed] = useState(false);
  const image = !failed && certificateImage(certificate);
  return <article className="cert-card">
    <button type="button" className="cert-card-media" disabled={!image}
      onClick={() => onPreview(certificate)} aria-label={`Ampliar certificado: ${certificate.title}`}>
      {image ? <img src={image} alt={`Certificado: ${certificate.title} emitido por ${certificate.issuer}`}
        className="cert-card-img" loading="lazy" width="480" height="320" draggable="false" onError={() => setFailed(true)} />
        : <span className="cert-card-fallback"><FiAward className="cert-card-watermark" aria-hidden="true" /></span>}
      <span className="cert-card-badge">{String(index + 1).padStart(2, '0')}</span>
      {image && <span className="cert-card-zoom-hint" aria-hidden="true"><FiEye /> Ampliar</span>}
    </button>
    <div className="cert-card-body">
      <span className="cert-card-issuer">{certificate.issuer}</span>
      <h3 className="cert-card-title">{certificate.title}</h3>
      {certificate.date && <span className="cert-card-date">{readableDate(certificate.date)}</span>}
    </div>
    <CertificateProofLinks certificate={certificate} />
    <span className="cert-card-glare" aria-hidden="true" />
  </article>;
}
