import { useCallback, useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { gsap, ScrollTrigger, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useScrollLock } from '../../hooks/useScrollLock';
import { navLinks, socials, GITHUB_USER } from '../../data/site';
import { BrandMark } from '../ui/BrandMark';
import { ArrowLink } from '../ui/ArrowLink';

/**
 * Sticky masthead plus the full-screen mobile menu.
 *
 * On desktop the bar retracts when the reader scrolls down and returns the
 * moment they scroll up, so long sections are read without a permanent strip
 * across the top. On mobile the menu takes the whole viewport and animates in
 * as an ink panel with numbered entries.
 */
export function Navbar() {
  const root = useRef(null);
  const panel = useRef(null);
  const [open, setOpen] = useState(false);

  useScrollLock(open);

  const close = useCallback(() => setOpen(false), []);

  // Retracting masthead.
  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const show = gsap.to(element, {
          yPercent: -100,
          duration: 0.4,
          ease: 'power2.inOut',
          paused: true,
        });

        const trigger = ScrollTrigger.create({
          start: 'top -200',
          end: 'max',
          onUpdate: (self) => {
            // Never hide the bar while the mobile menu is using it.
            if (element.dataset.menuOpen === 'true') return;
            if (self.direction === 1) show.play();
            else show.reverse();
          },
          onLeaveBack: () => show.reverse(),
        });

        return () => {
          trigger.kill();
          show.kill();
        };
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Mobile menu entrance.
  useIsomorphicLayoutEffect(() => {
    const element = panel.current;
    if (!element || !open) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline();
        tl.fromTo(element, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out' })
          .fromTo(
            element.querySelectorAll('.menu-entry'),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out' },
            '-=0.35',
          )
          .fromTo(element.querySelector('.menu-foot'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.3');
        return () => tl.kill();
      });
    }, panel);

    return () => ctx.revert();
  }, [open]);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <header className="masthead" ref={root} data-menu-open={open}>
      <a className="masthead-brand" href="#inicio" onClick={close} aria-label="Nicolás Rodríguez — ir al inicio">
        <BrandMark />
      </a>

      <nav className="masthead-nav" aria-label="Navegación principal">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`}>
            <i aria-hidden="true">{link.index}</i>
            {link.label}
          </a>
        ))}
      </nav>

      <ArrowLink
        className="masthead-cta"
        href={`https://github.com/${GITHUB_USER}`}
        label="Ver el perfil de GitHub de Nicolás (se abre en una pestaña nueva)"
      >
        GitHub
      </ArrowLink>

      <button
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="menu-panel"
      >
        {open ? <FiX aria-hidden="true" /> : <span className="menu-bars" aria-hidden="true" />}
        <span className="visually-hidden">{open ? 'Cerrar navegación' : 'Abrir navegación'}</span>
      </button>

      {open && (
        <div className="menu-panel on-ink" id="menu-panel" ref={panel}>
          <nav aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a className="menu-entry" key={link.id} href={`#${link.id}`} onClick={close}>
                <i aria-hidden="true">{link.index}</i>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="menu-foot">
            {socials.map((social) => (
              <ArrowLink key={social.id} href={social.url} external={social.id !== 'email'}>
                {social.label}
              </ArrowLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
