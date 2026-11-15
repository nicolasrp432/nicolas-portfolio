import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiAward, FiX } from 'react-icons/fi';
import { certificates } from '../../data/education';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';
import { CertificateCard, CertificateProofLinks, certificateImage } from '../ui/CertificateCard';
import { ThreeDCarousel } from '../ui/3d-carousel';

function CertificatePreview({ certificate, onClose }) {
  const ref = useRef(null);
  const titleId = useId();
  useFocusTrap(ref, true);
  useScrollLock(true);
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(<div className="certificate-preview-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={ref} className="certificate-preview" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="certificate-preview-head">
        <div><span className="cert-card-issuer">{certificate.issuer}</span><h3 id={titleId}>{certificate.title}</h3></div>
        <button type="button" aria-label="Cerrar certificado" onClick={onClose}><FiX aria-hidden="true" /></button>
      </div>
      <img src={certificateImage(certificate)} alt={`Certificado completo: ${certificate.title}`} />
      <CertificateProofLinks certificate={certificate} />
    </div>
  </div>, document.body);
}

export function Certificates() {
  const [preview, setPreview] = useState(null);
  if (!certificates.length) return null;
  return <section className="section certificates" id="certificaciones">
    <div className="certificates-wrap">
      <span className="certificates-eyebrow"><FiAward aria-hidden="true" /> Galería de certificaciones</span>
      <h2 className="certificates-title">Certificaciones<span className="accent"> y formación</span></h2>
      <p className="certificates-intro">Aprender, experimentar y llevarlo a la práctica. Una vuelta por las credenciales que acompañan mi camino.</p>
      <ThreeDCarousel items={certificates} label="Carrusel de certificaciones" getLabel={(certificate) => certificate.issuer}
        renderItem={(certificate, index) => <CertificateCard certificate={certificate} index={index} onPreview={setPreview} />} />
      <p className="certificates-hint">Arrastra para girar · Pulsa un certificado para verlo completo</p>
    </div>
    {preview && <CertificatePreview certificate={preview} onClose={() => setPreview(null)} />}
  </section>;
}
