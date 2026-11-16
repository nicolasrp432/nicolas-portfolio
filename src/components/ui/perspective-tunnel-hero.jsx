import { gsap, MOTION_OK } from '../../lib/gsap';
import { useGsapScope } from '../../hooks/useGsapScope';

/** Perspective Tunnel adaptation: transparent objects in Z-space.
 * The page owns scrolling; only decorative objects travel through the scene.
 * CSS provides the complete static composition when motion is reduced.
 */
export function PerspectiveTunnelHero({ items }) {
  const scope = useGsapScope((root) => {
    const scene = root.querySelector('.tunnel-world');
    const depths = root.querySelectorAll('.tunnel-object-depth');
    const hero = root.closest('section');

    const mm = gsap.matchMedia();
    mm.add({ immersive: '(min-height: 700px)', compact: '(max-height: 699px)', mobile: '(max-width: 900px)' }, ({ conditions }) => {
      const immersive = conditions.immersive;
      const mobile = conditions.mobile;
      const stage = hero.querySelector('.hero-tunnel-stage');
      const copy = hero.querySelector('.hero-tunnel-copy');
      const portrait = hero.querySelector('.hero-portrait-depth');
      const journey = gsap.timeline({
        scrollTrigger: {
          trigger: hero, start: 'top top',
          end: immersive ? 'bottom bottom' : 'bottom 90%',
          scrub: 0.65, invalidateOnRefresh: true,
        },
      });
      // Start with the paper / orbital background. The identity arrives first;
      // all eight objects then travel out of a single vanishing point and stay.
      if (mobile) {
        gsap.set([portrait, copy, hero.querySelector('.hero-mastline')], { autoAlpha: 1, y: 0, scale: 1 });
      } else {
      journey.fromTo(hero.querySelector('.hero-logo-intro'), { autoAlpha: 1, scale: 1, x: 0, y: 0, xPercent: -50, yPercent: -50 },
        { autoAlpha: 0, scale: 0.65, z: -500, duration: 0.16, ease: 'power2.in' }, 0);
      gsap.set([portrait, copy], { autoAlpha: 0, y: 28, scale: 0.94 });
      journey.to([portrait, copy], { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, stagger: 0.035, ease: 'power2.out' }, 0.12);
      journey.fromTo(hero.querySelector('.hero-mastline'), { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.12 }, 0.16);
      }
      depths.forEach((depth, i) => {
        const figure = depth.closest('figure');
        // Layout positions, not transformed bounds: stable across refresh / resize.
        const frame = mobile ? scene : stage;
        const originX = () => frame.clientWidth / 2 - figure.offsetLeft;
        const originY = () => frame.clientHeight * 0.42 - figure.offsetTop;
        journey.fromTo(depth, {
          z: -2200 - i * 160, x: originX, y: originY,
          autoAlpha: 0, scale: 0.28, rotationZ: i % 2 ? -22 : 22,
        }, {
          z: 0, x: 0, y: 0, autoAlpha: 1, scale: 1, rotationZ: 0,
          duration: 0.4, ease: 'power2.out',
        }, (mobile ? 0.02 : 0.25) + i * 0.065);
      });
      const words = hero.querySelectorAll('.hero-hook-word');
      words.forEach((word, index) => {
        if (!index) return;
        const beat = index === 1 ? 0.43 : 0.72;
        journey.to(words[index - 1], { autoAlpha: 0, yPercent: -30, filter: 'blur(5px)', duration: 0.08 }, beat);
        journey.fromTo(word, { autoAlpha: 0, yPercent: 30, filter: 'blur(5px)' },
          { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.1 }, beat + 0.035);
      });
      journey.to(hero.querySelector('.hero-depth-progress i'), { scaleX: 1, duration: 1.22, ease: 'none' }, 0);
    });

    const xTo = gsap.quickTo(scene, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(scene, 'y', { duration: 0.9, ease: 'power3.out' });
    const atmosphere = hero.querySelector('.hero-atmosphere');
    const glowX = gsap.quickTo(atmosphere, 'x', { duration: 1.8, ease: 'power3.out' });
    const glowY = gsap.quickTo(atmosphere, 'y', { duration: 1.8, ease: 'power3.out' });
    const move = (event) => {
      if (event.pointerType !== 'mouse' || window.innerWidth <= 900) return;
      const bounds = hero.querySelector('.hero-tunnel').getBoundingClientRect();
      glowX(((event.clientX - bounds.left) / bounds.width - .5) * 90);
      glowY(((event.clientY - bounds.top) / bounds.height - .5) * 70);
      xTo(((event.clientX - bounds.left) / bounds.width - 0.5) * -34);
      yTo(((event.clientY - bounds.top) / bounds.height - 0.5) * -24);
    };
    const leave = () => { xTo(0); yTo(0); glowX(0); glowY(0); };
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    return () => {
      mm.revert();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
    };
  }, [], MOTION_OK);

  return (
    <div className="perspective-tunnel" ref={scope} aria-hidden="true">
      <div className="tunnel-ring tunnel-ring-inner" />
      <div className="tunnel-ring tunnel-ring-outer" />
      <div className="tunnel-world">
        {items.map((item, index) => (
          <figure className={`tunnel-object tunnel-object-${item.id}`} key={item.id} data-desktop-only={item.desktopOnly || undefined} style={{
            '--object-x': item.x, '--object-y': item.y, '--object-size': item.size,
            '--mobile-x': item.mobileX, '--mobile-y': item.mobileY, '--object-rotation': `${item.rotation}deg`,
          }}>
            <div className="tunnel-object-depth">
              <div className="tunnel-object-visual">
                <div className="tunnel-object-hover">
                <picture>
                  {item.desktopOnly && <source media="(min-width: 901px)" srcSet={item.src} />}
                  <img src={item.desktopOnly ? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' : item.src} alt="" width="1254" height="1254" draggable="false" decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'} />
                </picture>
                <figcaption><span>{String(index + 1).padStart(2, '0')}</span> {item.label}</figcaption>
                </div>
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
