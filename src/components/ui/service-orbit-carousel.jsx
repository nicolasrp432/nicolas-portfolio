import { useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { gsap, ScrollTrigger, MOTION_OK } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { ArrowLink } from './ArrowLink';

const SCROLL_QUERY = `${MOTION_OK} and (min-width: 1101px) and (min-height: 720px)`;
const wrap = (index, length) => ((index % length) + length) % length;

/** Dish Orbit Carousel, adapted to services. A finite scroll sequence replaces
 * the source's infinite scroll resets; controls remain available at every size.
 * The cutouts swing around an elevated pivot, as in the supplied component.
 */
export function ServiceOrbitCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useState('service');
  const root = useRef(null);
  const trigger = useRef(null);
  const previous = useRef(0);
  const direction = useRef(1);
  const swipe = useRef(null);
  const current = items[index];

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(SCROLL_QUERY, () => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top 64px', end: 'bottom bottom',
        onUpdate: (self) => {
          direction.current = self.direction;
          setIndex(Math.min(items.length - 1, Math.round(self.progress * (items.length - 1))));
        },
      });
      trigger.current = st;
      return () => { st.kill(); trigger.current = null; };
    });
    return () => mm.revert();
  }, [items.length]);

  useIsomorphicLayoutEffect(() => {
    const from = previous.current;
    previous.current = index;
    if (from === index) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const images = root.current.querySelectorAll('.service-orbit-object');
        const d = direction.current;
        const tl = gsap.timeline();
        tl.fromTo(images[from], { autoAlpha: 1, rotation: 0 }, { rotation: 55 * d, autoAlpha: 0, duration: 0.55, ease: 'power2.in' }, 0)
          .fromTo(images[index], { autoAlpha: 0, rotation: -55 * d }, { autoAlpha: 1, rotation: 0, duration: 0.9, ease: 'power3.out' }, 0.15)
          .fromTo('.service-title-line', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0)', duration: 0.65, ease: 'power3.out' }, 0.1)
          .fromTo('.service-title-emphasis', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)', duration: 0.7, ease: 'power3.out' }, 0.15)
          .fromTo('.service-detail-body', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
          .fromTo('.service-orbit-arc', { rotation: -12 * d }, { rotation: 0, duration: 1, ease: 'power3.out' }, 0);
      });
    }, root);
    return () => ctx.revert();
  }, [index]);

  const go = (next) => {
    direction.current = next >= index ? 1 : -1;
    const target = wrap(next, items.length);
    setIndex(target);
    const st = trigger.current;
    if (st) st.scroll(st.start + ((st.end - st.start) * target) / (items.length - 1));
  };
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
  };

  return (
    <div className="service-orbit-track" ref={root}>
      <div className="service-orbit" role="region" aria-roledescription="carrusel" aria-label="Servicios y proceso" onKeyDown={onKeyDown}>
        <div className="service-orbit-top">
          <span>Del criterio a la ejecución</span>
          <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        </div>
        <div className="service-orbit-layout">
          <div className="service-orbit-art" aria-hidden="true"
            onPointerDown={(event) => { swipe.current = { x: event.clientX, y: event.clientY }; }}
            onPointerCancel={() => { swipe.current = null; }}
            onPointerUp={(event) => {
              const start = swipe.current; swipe.current = null;
              if (!start) return;
              const dx = event.clientX - start.x;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.4) go(index + (dx < 0 ? 1 : -1));
            }}>
            <svg className="service-orbit-arc" viewBox="0 0 400 400"><path d="M55 120 C-15 350 315 470 370 205" /></svg>
            {items.map((item, i) => (
              <div key={item.id} className="service-orbit-object" data-active={i === index}>
                <img src={item.image} alt="" width="1254" height="1254" loading="lazy" draggable="false" />
              </div>
            ))}
            <span className="service-figure-caption">Fig. {String(index + 1).padStart(2, '0')} / {current.label}</span>
          </div>
          <div className="service-orbit-copy">
            <p className="eyebrow">{current.caption}</p>
            <h3><span className="service-title-line">{current.title}</span><em className="service-title-emphasis">{current.emphasis}</em></h3>
            <p className="service-description">{current.description}</p>
            <ul className="tag-row" aria-label={`Herramientas para ${current.label}`}>
              {current.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
            <ArrowLink href={current.href} external={false}>{current.cta}</ArrowLink>
          </div>
          <aside className="service-detail" aria-label={`Detalles de ${current.label}`}>
            <div className="service-detail-switch" role="group" aria-label="Qué quieres conocer">
              <button type="button" aria-pressed={detail === 'service'} onClick={() => setDetail('service')}>Qué aporto</button>
              <button type="button" aria-pressed={detail === 'process'} onClick={() => setDetail('process')}>Mi proceso</button>
            </div>
            <div className="service-detail-body">
              <span className="service-detail-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h4>{detail === 'service' ? 'Qué podemos crear' : 'Cómo lo trabajo'}</h4>
              <ol>
                {(detail === 'service' ? current.deliverables : current.process).map((line, i) => (
                  <li key={line}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{line}</li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
        <div className="service-orbit-bottom">
          <button className="service-arrow" type="button" aria-label="Servicio anterior" onClick={() => go(index - 1)}><FiArrowLeft aria-hidden="true" /></button>
          <div className="service-thumbnails" role="group" aria-label="Elegir área de trabajo">
            {items.map((item, i) => (
              <button key={item.id} type="button" aria-pressed={index === i} onClick={() => go(i)}>
                <img src={item.image} alt="" width="64" height="64" loading="lazy" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <button className="service-arrow" type="button" aria-label="Servicio siguiente" onClick={() => go(index + 1)}><FiArrowRight aria-hidden="true" /></button>
        </div>
        <p className="service-orbit-hint">Explora las áreas <span aria-hidden="true">↔</span> Descubre el proceso</p>
      </div>
    </div>
  );
}
