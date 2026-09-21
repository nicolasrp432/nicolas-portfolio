import { useState, useRef, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiX, FiArrowUpRight, FiMessageSquare } from 'react-icons/fi';
import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { Magnetic } from '../motion/Magnetic';
import { site, whatsappPresets, getWhatsappUrl } from '../../data/site';

/**
 * Interactive floating WhatsApp action button with curated preset message prompts.
 *
 * Features:
 * - Editorial Brutalism styling (ink surface, coral slab shadow, pill curvature, color morph).
 * - Animated entrance & micro-interactions with GSAP.
 * - Preset prompt flyout to lower friction for prospective clients.
 * - Magnetic pull on desktop, responsive condensation on mobile.
 * - Accessible dialog semantics, keyboard navigation and focus trapping.
 */
export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);
  const modalRef = useRef(null);

  // Focus trap keeps keyboard users within the modal when open
  useFocusTrap(modalRef, isOpen);

  // Entrance animation for the float trigger
  const scope = useGsapScope(
    () => {
      gsap.fromTo(
        '.whatsapp-float',
        { opacity: 0, y: 35, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.5)', delay: 0.5 },
      );
    },
    [],
    MOTION_OK,
  );

  // Flyout entrance animation when opened
  useIsomorphicLayoutEffect(() => {
    const modal = modalRef.current;
    if (!isOpen || !modal) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline();
        tl.fromTo(
          modal,
          { opacity: 0, scale: 0.88, y: 16, transformOrigin: 'bottom right' },
          { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: 'expo.out' },
        ).fromTo(
          '.whatsapp-preset-item',
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, stagger: 0.045, duration: 0.32, ease: 'expo.out' },
          '-=0.22',
        );
      });
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Click outside and Escape listener to close the preset flyout
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const onPointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen]);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const handlePresetClick = () => setIsOpen(false);

  return (
    <div className="whatsapp-float-wrap" ref={wrapRef}>
      <div ref={scope}>
        {isOpen && (
          <div
            className="whatsapp-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Opciones de contacto rápido por WhatsApp"
          >
            <div className="whatsapp-modal-head">
              <div className="whatsapp-modal-title-group">
                <span className="whatsapp-modal-title">
                  <FaWhatsapp aria-hidden="true" />
                  Chat con {site.shortName}
                </span>
                <span className="whatsapp-modal-status">
                  <span className="live-dot" aria-hidden="true" />
                  {site.availability}
                </span>
              </div>

              <button
                type="button"
                className="whatsapp-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar opciones de WhatsApp"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            <p className="whatsapp-modal-intro">Selecciona un tema para iniciar la conversación:</p>

            <ul className="whatsapp-presets-list" role="list">
              {whatsappPresets.map((preset) => (
                <li key={preset.id}>
                  <a
                    href={getWhatsappUrl(preset.text)}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-preset-item"
                    onClick={handlePresetClick}
                    data-cursor="ENVIAR"
                  >
                    <div className="whatsapp-preset-top">
                      <span className="whatsapp-preset-badge">{preset.badge}</span>
                      <FiArrowUpRight className="whatsapp-preset-arrow" aria-hidden="true" />
                    </div>
                    <strong className="whatsapp-preset-title">{preset.title}</strong>
                    <span className="whatsapp-preset-subtitle">{preset.subtitle}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="whatsapp-modal-foot">
              <a
                href={getWhatsappUrl('')}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-custom-link"
                onClick={handlePresetClick}
                data-cursor="CHAT"
              >
                <FiMessageSquare aria-hidden="true" />
                O abrir chat en blanco directamente ↗
              </a>
            </div>
          </div>
        )}

        <Magnetic strength={0.35}>
          <button
            type="button"
            className="whatsapp-float"
            onClick={toggleOpen}
            data-open={isOpen}
            data-cursor={isOpen ? 'CERRAR' : 'CHAT'}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar ventana de WhatsApp' : 'Contactar por WhatsApp'}
          >
            <span className="whatsapp-float-icon-wrapper" aria-hidden="true">
              {isOpen ? (
                <FiX className="whatsapp-float-close-icon" />
              ) : (
                <>
                  <FaWhatsapp className="whatsapp-float-icon" />
                  <span className="whatsapp-float-pulse" />
                </>
              )}
            </span>
            <span className="whatsapp-float-label">
              {isOpen ? 'Cerrar' : 'WhatsApp'}
            </span>
          </button>
        </Magnetic>
      </div>
    </div>
  );
}
