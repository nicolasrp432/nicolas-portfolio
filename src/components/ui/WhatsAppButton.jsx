import { FaWhatsapp } from 'react-icons/fa6';
import { Magnetic } from '../motion/Magnetic';
import { getWhatsappUrl } from '../../data/site';

/**
 * Floating WhatsApp action button.
 *
 * Sits persistently at the bottom-right corner of the viewport,
 * styled in the site's "Editorial Brutalism" identity (ink surface,
 * coral slab shadow, pill boundary, live pulse indicator).
 *
 * Supported across desktop and mobile, with magnetic pointer pull
 * on desktop devices and WCAG-compliant touch target and focus outlines.
 */
export function WhatsAppButton() {
  const whatsappUrl = getWhatsappUrl();

  return (
    <aside className="whatsapp-float-wrap" aria-label="Contacto directo por WhatsApp">
      <Magnetic strength={0.3}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-float"
          data-cursor="CHAT"
          aria-label="Contactar por WhatsApp (abre en una ventana nueva)"
        >
          <span className="whatsapp-float-icon-wrapper" aria-hidden="true">
            <FaWhatsapp className="whatsapp-float-icon" />
            <span className="whatsapp-float-pulse" />
          </span>
          <span className="whatsapp-float-label">WhatsApp</span>
        </a>
      </Magnetic>
    </aside>
  );
}
