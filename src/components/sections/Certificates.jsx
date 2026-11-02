import { gsap, ScrollTrigger, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { certificates } from '../../data/education';
import { FiArrowUpRight, FiFileText, FiAward, FiEye } from 'react-icons/fi';

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
 * Galería de certificados en carrusel infinito con GSAP y ScrollTrigger.
 *
 * Muestra directamente la imagen JPG de cada diploma o certificación
 * en la tarjeta, permitiendo ver las credenciales a primera vista.
 * Se desplaza en bucle sin fin de 0% a -50% y reacciona al scroll vertical.
 * Se pausa al posar el cursor o enfocar con teclado.
 */
export function Certificates() {
  if (certificates.length === 0) return null;

  const scopeRef = useGsapScope(
    (root) => {
      const track = root.querySelector('.cert-track');
      if (!track) return;

      // 1. Desplazamiento continuo infinito de 0% a -50%
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1,
      });

      // 2. Respuesta dinámica y fluida al scroll vertical
      const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });
      let direction = 1;

      const settle = gsap.delayedCall(0.4, () => {
        skewTo(0);
        gsap.to(loop, { timeScale: direction, duration: 0.6, ease: 'power2.out' });
      }).pause();

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.direction !== 0 && self.direction !== direction) {
            direction = self.direction;
          }
          const velocity = self.getVelocity();
          const boost = Math.min(Math.abs(velocity) / 140, 5);
          const targetScale = direction * (1 + boost);

          gsap.to(loop, {
            timeScale: targetScale,
            duration: 0.25,
            overwrite: 'auto',
          });

          skewTo(-gsap.utils.clamp(-6, 6, velocity / 320));
          settle.restart(true);
        },
      });

      // 3. Pausar en hover o focus para máxima accesibilidad y usabilidad
      const pause = () => loop.pause();
      const resume = () => loop.play();

      track.addEventListener('mouseenter', pause);
      track.addEventListener('mouseleave', resume);
      track.addEventListener('focusin', pause);
      track.addEventListener('focusout', resume);

      return () => {
        track.removeEventListener('mouseenter', pause);
        track.removeEventListener('mouseleave', resume);
        track.removeEventListener('focusin', pause);
        track.removeEventListener('focusout', resume);
        trigger.kill();
        settle.kill();
      };
    },
    [certificates],
    MOTION_OK,
  );

  return (
    <section className="section certificates" id="certificaciones" ref={scopeRef}>
      <div className="certificates-wrap">
        <span className="certificates-eyebrow">
          <FiAward aria-hidden="true" />
          Galería de certificaciones
        </span>
        <h2 className="certificates-title">
          Certificaciones<span className="accent"> y formación</span>
        </h2>
        <p className="certificates-intro">
          Formación verificada y experiencias documentadas. Las imágenes de las credenciales
          son visibles a primera vista y enlazan a su documento fuente o página de verificación.
        </p>

        <div className="certificates-track-wrap" aria-label="Carrusel de certificaciones">
          <div className="cert-track">
            {/* Juego principal: accesible para teclado y lectores de pantalla */}
            {certificates.map((certificate, i) => {
              const imageSrc = certificate.image || (certificate.file ? certificate.file.replace(/\.pdf$/, '.jpg') : null);
              return (
                <a
                  key={`cert-${certificate.id}-${i}`}
                  className="cert-card"
                  href={certificate.file || certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="cert-card-media">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={`Certificado: ${certificate.title} emitido por ${certificate.issuer}`}
                        className="cert-card-img"
                        loading="lazy"
                        width="480"
                        height="320"
                      />
                    ) : (
                      <div className="cert-card-fallback">
                        <FiAward className="cert-card-watermark" aria-hidden="true" />
                      </div>
                    )}
                    <span className="cert-card-badge">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="cert-card-zoom-hint" aria-hidden="true">
                      <FiEye /> Ver completo
                    </span>
                  </div>
                  <div className="cert-card-body">
                    <span className="cert-card-issuer">{certificate.issuer}</span>
                    <h3 className="cert-card-title">{certificate.title}</h3>
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
              );
            })}

            {/* Juego duplicado: clon visual para el bucle continuo sin fin */}
            {certificates.map((certificate, i) => {
              const imageSrc = certificate.image || (certificate.file ? certificate.file.replace(/\.pdf$/, '.jpg') : null);
              return (
                <a
                  key={`cert-clone-${certificate.id}-${i}`}
                  className="cert-card"
                  href={certificate.file || certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="cert-card-media">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={`Certificado: ${certificate.title} emitido por ${certificate.issuer}`}
                        className="cert-card-img"
                        loading="lazy"
                        width="480"
                        height="320"
                      />
                    ) : (
                      <div className="cert-card-fallback">
                        <FiAward className="cert-card-watermark" aria-hidden="true" />
                      </div>
                    )}
                    <span className="cert-card-badge">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="cert-card-zoom-hint" aria-hidden="true">
                      <FiEye /> Ver completo
                    </span>
                  </div>
                  <div className="cert-card-body">
                    <span className="cert-card-issuer">{certificate.issuer}</span>
                    <h3 className="cert-card-title">{certificate.title}</h3>
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
              );
            })}
          </div>
        </div>

        <p className="certificates-hint">
          Desplázate por la página o sitúa el cursor encima para explorar las credenciales.
        </p>
      </div>
    </section>
  );
}
