import { useRef, useEffect, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { certificates } from '../../data/education';
import { FiArrowUpRight, FiFileText } from 'react-icons/fi';

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function readableDate(value) {
  const match = /^(\d{4})-(\d{2})$/.exec(value ?? '');
  if (!match) return value ?? '';
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} de ${match[1]}` : match[1];
}

/**
 * Galería de certificados en carrusel con animación moderna estilo 21std.dev.
 *
 * Las tarjetas se disponen en una pista horizontal que se desplaza con GSAP.
 * Cada tarjeta es un PDF clicable con su propia sombra de suelo y borde fino.
 * El carrusel reproduce automáticamente y se puede navegar con flechas.
 */
export function Certificates() {
  if (certificates.length === 0) return null;

  const scopeRef = useGsapScope((root) => {
    gsap.from('.cert-card', {
      opacity: 0,
      y: 40,
      rotateX: 12,
      duration: 0.8,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: { trigger: root, start: 'top 85%', once: true },
    });
  }, []);

  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const cards = track.querySelectorAll('.cert-card');
    const cardWidth = cards[0]?.offsetWidth || 0;
    const gap = 16;
    const step = cardWidth + gap;
    const maxScroll = Math.max(0, cards.length * step - containerWidthRef.current);

    let raf;

    const play = () => {
      const next = (activeIndex + 1) % certificates.length;
      setActiveIndex(next);
      const target = Math.min(next * step, maxScroll);
      gsap.to(track, { x: -target, duration: 0.8, ease: 'expo.out' });
      raf = requestAnimationFrame(play);
    };

    raf = requestAnimationFrame(play);

    return () => cancelAnimationFrame(raf);
  }, [activeIndex]);

  return (
    <section className="section certificates" id="certificaciones" ref={scopeRef}>
      <div className="certificates-wrap">
        <span className="certificates-eyebrow">Galería de certificaciones</span>
        <h2 className="certificates-title">
          Certificaciones<span className="accent"> y formación</span>
        </h2>
        <p className="certificates-intro">
          Formación verificada y experiencias de aprendizaje documentadas. Cada
          tarjeta enlaza al documento fuente o a su página de verificación.
        </p>

        <div className="certificates-track-wrap">
          <button className="cert-nav cert-nav-prev" aria-label="Certificado anterior">
            <span className="visually-hidden">Anterior</span>
          </button>
          <div
            className="certificates-track"
            ref={(el) => {
              trackRef.current = el;
              containerWidthRef.current = el?.offsetWidth || 0;
            }}
          >
            {certificates.map((certificate, i) => (
              <a
                key={certificate.id}
                className={`cert-card${i === activeIndex ? ' is-active' : ''}`}
                href={certificate.file}
                target="_blank"
                rel="noreferrer"
              >
                <div className="cert-card-media">
                  <span className="cert-card-badge">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="cert-card-body">
                  <h3 className="cert-card-title">{certificate.title}</h3>
                  <span className="cert-card-issuer">{certificate.issuer}</span>
                  {certificate.date && (
                    <span className="cert-card-date">{readableDate(certificate.date)}</span>
                  )}
                </div>
                <div className="cert-card-actions">
                  {certificate.file && (
                    <span className="cert-card-link">
                      Abrir documento <FiFileText aria-hidden="true" />
                    </span>
                  )}
                  {certificate.verifyUrl && (
                    <span className="cert-card-link">
                      Verificar <FiArrowUpRight aria-hidden="true" />
                    </span>
                  )}
                </div>
                <span className="cert-card-glare" aria-hidden="true" />
              </a>
            ))}
          </div>
          <button className="cert-nav cert-nav-next" aria-label="Siguiente certificado">
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>

        <ol className="certificates-dots" aria-label="Certificados">
          {certificates.map((_, i) => (
            <li key={i}>
              <button
                className={i === activeIndex ? 'is-active' : ''}
                onClick={() => {
                  setActiveIndex(i);
                  const track = trackRef.current;
                  if (!track) return;
                  const cards = track.querySelectorAll('.cert-card');
                  const cardWidth = cards[0]?.offsetWidth || 0;
                  const gap = 16;
                  const step = cardWidth + gap;
                  const maxScroll = Math.max(0, cards.length * step - containerWidthRef.current);
                  gsap.to(track, { x: -Math.min(i * step, maxScroll), duration: 0.6, ease: 'power2.out' });
                }}
                aria-label={`Certificado ${i + 1}`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
