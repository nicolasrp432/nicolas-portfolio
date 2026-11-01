import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { contentPieces } from '../../data/content';
import { SplitHeadline } from '../motion/SplitHeadline';
import { Reveal } from '../motion/Reveal';
import { FiPlay, FiExternalLink, FiImage } from 'react-icons/fi';

const HEADING = [
  [{ text: 'Piezas y' }],
  [{ text: 'contenido', accent: true }],
];

/**
 * Galería de piezas de contenido: vídeos, documentos y enlaces a perfiles de
 * clientes. Cada pieza es una tarjeta con miniatura, etiqueta de tipo y enlace
 * directo. Las tarjetas entran escaladas y se van revelando al scroll.
 */
export function Content() {
  const scope = useGsapScope(() => {
    gsap.utils.toArray('.content-card').forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 32, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        },
      );
    });
  }, [], MOTION_OK);

  return (
    <section className="section content" id="contenido" ref={scope}>
      <div className="content-wrap">
        <span className="content-eyebrow">Laboratorio y trabajo para clientes</span>
        <SplitHeadline as="h2" lines={HEADING} className="section-title" />
        <Reveal as="p" delay={0.1}>
          Vídeos, documentos y enlaces a los sitios que he construido para
          clientes. Cada pieza se abre en su propia página o documento.
        </Reveal>

        <div className="content-grid">
          {contentPieces.map((piece) => (
            <a
              key={piece.id}
              href={piece.url}
              target="_blank"
              rel="noreferrer"
              className={`content-card content-card--${piece.kind}`}
            >
              <div className="content-card-media">
                <img
                  src={piece.thumbnail}
                  alt={piece.title}
                  loading="lazy"
                  decoding="async"
                  className="content-card-img"
                />
                <span className="content-card-kind">{piece.kind === 'video' ? 'Vídeo' : 'Cliente'}</span>
                {piece.kind === 'video' && (
                  <span className="content-card-play" aria-hidden="true">
                    <FiPlay size={20} />
                  </span>
                )}
              </div>
              <div className="content-card-body">
                <h3 className="content-card-title">{piece.title}</h3>
                <span className="content-card-sub">{piece.subtitle}</span>
              </div>
              <span className="content-card-link">
                {piece.label} <FiExternalLink size={16} aria-hidden="true" />
              </span>
              <span className="content-card-glare" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
