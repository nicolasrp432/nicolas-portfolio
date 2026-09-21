import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, MOTION_OK, prefersReducedMotion } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { navLinks, chapters, socials, site, GITHUB_USER } from '../../data/site';
import { BrandMark } from '../ui/BrandMark';
import { ArrowLink } from '../ui/ArrowLink';

/** Only in-page chapters can ever be "active": a page link is elsewhere. */
const SECTION_IDS = ['inicio', ...chapters.map((link) => link.id)];

/**
 * The masthead and the mobile menu.
 *
 * Two structural rules make this work where the previous version did not:
 *
 * 1. The overlay panel is a *sibling* of `<header>`, never a child. The
 *    masthead carries `backdrop-filter`, which makes it a containing block for
 *    fixed-position descendants — a panel nested inside it resolves `inset`
 *    against an 86px-tall bar instead of the viewport and collapses to nothing.
 * 2. The bar never translates out of view. It condenses on scroll instead, so
 *    navigation is reachable at every scroll position and anchor jumps cannot
 *    leave the reader with no way back.
 *
 * Orientation is carried by three signals: a capsule that slides to the active
 * chapter, `aria-current` for assistive tech, and a hairline progress rule that
 * stands in for the index rail on screens too narrow to show it.
 */
/**
 * @param {object} props
 * @param {'home'|string} [props.currentPage]
 *        Which document this masthead is mounted in. Anywhere but 'home', a
 *        chapter link has to leave for the home page before it can scroll.
 */
export function Navbar({ currentPage = 'home' }) {
  const isHome = currentPage === 'home';
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const progressRef = useRef(null);
  const panelRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useScrollLock(open);
  useFocusTrap(panelRef, open);

  const close = useCallback(() => setOpen(false), []);

  /** Where a nav entry points from *this* document. */
  const hrefFor = useCallback(
    (link) => {
      if (link.href) return link.href;
      return isHome ? `#${link.id}` : `/#${link.id}`;
    },
    [isHome],
  );

  /**
   * In-page anchors are handled here so the panel can close before the page
   * moves. Everything else is left to the browser.
   *
   * The check has to come *before* `preventDefault`. The previous version
   * cancelled the click first and only looked for the target inside a later
   * frame, so any link pointing at another document was silently dead: the
   * navigation was cancelled and nothing replaced it.
   */
  const goTo = useCallback(
    (event, link) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      if (link.href) return;

      const target = document.getElementById(link.id);
      if (!target) return;

      event.preventDefault();
      setOpen(false);

      requestAnimationFrame(() => {
        target.scrollIntoView?.({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
        window.history.replaceState(null, '', `#${link.id}`);
      });
    },
    [],
  );

  // Condense + progress, on one rAF-throttled listener. Not GSAP: this has to
  // keep working when the visitor has asked for reduced motion.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
      setCondensed(y > 24);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // The capsule tracks the active link's measured box, so it stays correct
  // through font swaps and window resizes without hardcoded widths.
  useIsomorphicLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return undefined;

    let cancelled = false;

    const place = () => {
      if (cancelled) return;
      const target = active ? nav.querySelector(`[data-section="${active}"]`) : null;

      if (!target) {
        gsap.to(pill, { autoAlpha: 0, duration: 0.2, overwrite: true });
        return;
      }

      const bounds = nav.getBoundingClientRect();
      const box = target.getBoundingClientRect();

      gsap.to(pill, {
        autoAlpha: 1,
        x: box.left - bounds.left,
        width: box.width,
        duration: prefersReducedMotion() ? 0 : 0.55,
        ease: 'expo.out',
        overwrite: true,
      });
    };

    place();
    window.addEventListener('resize', place);
    // The first measurement happens against the fallback face. Manrope is
    // narrower, so without this the capsule sits a few pixels off until the
    // next resize — which on a phone never comes.
    document.fonts?.ready.then(place).catch(() => {});

    return () => {
      cancelled = true;
      window.removeEventListener('resize', place);
    };
  }, [active]);

  // Panel entrance: the ink sheet wipes down, then the entries roll up.
  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !open) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline();

        tl.fromTo(
          panel,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'expo.out' },
        )
          .fromTo(
            '.menu-entry-inner',
            { yPercent: 115 },
            { yPercent: 0, duration: 0.75, stagger: 0.055, ease: 'expo.out' },
            '-=0.3',
          )
          .fromTo('.menu-foot > *', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, '-=0.35');

        return () => tl.kill();
      });
    }, panelRef);

    return () => ctx.revert();
  }, [open]);

  // Escape closes; so does growing past the breakpoint where the panel is gone.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    const desktop = window.matchMedia?.('(min-width: 901px)');
    const onBreakpoint = (event) => {
      if (event.matches) close();
    };

    document.addEventListener('keydown', onKeyDown);
    desktop?.addEventListener?.('change', onBreakpoint);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop?.removeEventListener?.('change', onBreakpoint);
    };
  }, [open, close]);

  return (
    <>
      <header className="masthead" data-condensed={condensed}>
        <div className="masthead-bar">
          <a
            className="masthead-brand"
            href={isHome ? '#inicio' : '/'}
            onClick={(event) => goTo(event, { id: 'inicio' })}
            aria-label={`${site.name} — ir al inicio`}
          >
            <BrandMark />
            <span className="masthead-wordmark">
              <strong>{site.name}</strong>
              <small>{site.role}</small>
            </span>
          </a>

          <nav className="masthead-nav" aria-label="Navegación principal" ref={navRef}>
            <span className="nav-pill" ref={pillRef} aria-hidden="true" />
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={hrefFor(link)}
                data-section={link.id}
                aria-current={
                  (link.href ? currentPage === link.id : active === link.id) ? 'true' : undefined
                }
                onClick={(event) => goTo(event, link)}
              >
                {/* A page link has no chapter numeral; the outbound glyph says
                    it leaves this document instead. */}
                <i aria-hidden="true">{link.index ?? '↗'}</i>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="masthead-end">
            <ArrowLink
              className="masthead-cta"
              href={`https://github.com/${GITHUB_USER}`}
              label="Ver el perfil de GitHub de Nicolás (se abre en una pestaña nueva)"
            >
              GitHub
            </ArrowLink>

            <button
              type="button"
              className="menu-toggle"
              data-open={open}
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-panel"
            >
              <span className="menu-bars" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="visually-hidden">{open ? 'Cerrar navegación' : 'Abrir navegación'}</span>
            </button>
          </div>
        </div>

        <span className="masthead-progress" aria-hidden="true">
          <i ref={progressRef} />
        </span>
      </header>

      {open && (
        <div
          className="menu-panel on-ink"
          id="menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navegación"
        >
          <div className="menu-head">
            <BrandMark />
            <button type="button" className="menu-toggle is-close" data-open="true" onClick={close}>
              <span className="menu-bars" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="visually-hidden">Cerrar navegación</span>
            </button>
          </div>

          <nav className="menu-list" aria-label="Navegación del sitio">
            {[{ id: 'inicio', index: '00', label: 'Inicio' }, ...navLinks].map((link) => (
              <a
                className="menu-entry"
                key={link.id}
                href={link.id === 'inicio' && !isHome ? '/' : hrefFor(link)}
                aria-current={
                  (link.href ? currentPage === link.id : active === link.id) ? 'true' : undefined
                }
                onClick={(event) => goTo(event, link)}
              >
                <span className="menu-entry-inner">
                  <i aria-hidden="true">{link.index ?? '↗'}</i>
                  {link.label}
                </span>
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
    </>
  );
}
