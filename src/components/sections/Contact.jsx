import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';
import { site, socials } from '../../data/site';
import { SplitHeadline } from '../motion/SplitHeadline';
import { Magnetic } from '../motion/Magnetic';
import { CopyEmail } from '../ui/CopyEmail';
import { BrandMark } from '../ui/BrandMark';

const HEADING = [[{ text: 'Hagámoslo' }], [{ text: 'real.', accent: true }]];

/**
 * The closing call to action.
 *
 * The coral disc behind the headline scales and rotates on scrub, so the
 * section resolves as the reader arrives rather than sitting static — it is
 * the last thing they see and the only place the monogram appears at scale.
 */
export function Contact() {
  const scope = useGsapScope((root) => {
    gsap.fromTo(
      '.contact-orb',
      { scale: 0.6, rotate: -28 },
      {
        scale: 1,
        rotate: -12,
        ease: 'none',
        // `root` is the section itself, not a descendant selector.
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'center center', scrub: 0.6 },
      },
    );

    gsap.fromTo(
      '.contact-channels > *',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-channels', start: 'top 88%', once: true },
      },
    );
  }, [], MOTION_OK);

  return (
    <section className="section contact on-ink ink-surface" id="contacto" ref={scope}>
      <span className="contact-orb" aria-hidden="true">
        <BrandMark />
      </span>

      <div className="contact-inner">
        <p className="eyebrow">¿Tienes una idea, un problema o algo por mejorar?</p>
        <SplitHeadline as="h2" lines={HEADING} className="contact-title" />

        <div className="contact-channels">
          <CopyEmail email={site.email} />

          <ul className="contact-socials">
            {socials
              .filter((social) => social.id !== 'email')
              .map((social) => (
                <li key={social.id}>
                  <Magnetic strength={0.25}>
                    <a href={social.url} target="_blank" rel="noreferrer" data-cursor="IR">
                      <span className="contact-social-label">{social.label}</span>
                      <span className="contact-social-handle">{social.handle}</span>
                    </a>
                  </Magnetic>
                </li>
              ))}
          </ul>

          <p className="contact-note">
            <span className="hero-pulse" aria-hidden="true" />
            {site.availability} · {site.location}
          </p>
        </div>
      </div>
    </section>
  );
}
