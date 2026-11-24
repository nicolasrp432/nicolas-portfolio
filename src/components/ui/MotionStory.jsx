import { useEffect, useRef, useState } from 'react';
import { FiPause, FiPlay, FiCode, FiFilm, FiMaximize } from 'react-icons/fi';
import { SiAdobeaftereffects } from 'react-icons/si';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { useStoryChapters } from '../../hooks/useStoryChapters';

const moments = [
  { title: 'Una señal.', text: 'Un punto. Una pausa. Un lugar al que mirar.' },
  { title: 'Una intención.', text: 'La forma se abre. El ritmo conecta las piezas.' },
  { title: 'Una huella.', text: 'Las piezas encuentran su sitio. La imagen permanece.' },
];

/** Original vector study. The player loads only near the story; no video or
 * engine downloads on the home page. Each moment also works as static copy. */
export function MotionStory() {
  const { root, chapter, choose: chooseChapter } = useStoryChapters();
  const mount = useRef(null);
  const player = useRef(null);
  const playedChapter = useRef(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();


  useEffect(() => {
    let cancelled = false;
    let started = false;
    const start = async () => {
      if (started) return;
      started = true;
      try {
        const [{ default: lottie }, response] = await Promise.all([
          import('lottie-web/build/player/lottie_light'), fetch('/animations/idea-to-form.json'),
        ]);
        if (!response.ok) return;
        const data = await response.json();
        if (cancelled) return;
        const animation = lottie.loadAnimation({ container: mount.current, renderer: 'svg', loop: false, autoplay: false, animationData: data });
        player.current = animation;
        animation.addEventListener('DOMLoaded', () => {
          if (!cancelled) setReady(true);
        });
      } catch { /* The inline SVG remains a complete visual fallback. */ }
    };
    if (typeof IntersectionObserver === 'undefined') start();
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { start(); observer.disconnect(); }
    }, { rootMargin: '200px' }) : null;
    observer?.observe(root.current);
    return () => { cancelled = true; observer?.disconnect(); player.current?.destroy(); player.current = null; };
  }, []);

  useEffect(() => {
    if (!ready || !player.current) return;
    const start = chapter * 60;
    const animation = player.current;
    const changed = playedChapter.current !== chapter;
    if (reduced || (paused && changed)) {
      animation.resetSegments(true);
      animation.goToAndStop(start + 59, true);
    } else if (paused) animation.pause();
    else if (changed) animation.playSegments([start, start + 60], true);
    else animation.play();
    playedChapter.current = chapter;
  }, [chapter, ready, paused, reduced]);


  useEffect(() => {
    const stopWhenHidden = () => { if (document.hidden) setPaused(true); };
    document.addEventListener('visibilitychange', stopWhenHidden);
    return () => document.removeEventListener('visibilitychange', stopWhenHidden);
  }, []);

  return <div className="motion-story" ref={root} data-lab="motion" data-chapter={chapter}>
    <div className="motion-story-sticky">
      <div className="motion-editor-bar lab-toolbar"><span><FiFilm aria-hidden="true" /> idea-to-form / estudio original</span><span className="lab-tools" aria-label="After Effects y código"><SiAdobeaftereffects aria-hidden="true" /><FiCode aria-hidden="true" /></span></div>
      <div className="motion-study" data-chapter={chapter}>
        <span className="eyebrow">Composición / De un punto a una idea</span><span className="motion-frame-mark" aria-hidden="true"><FiMaximize /></span><div className="motion-kinetic" aria-hidden="true"><span>{["MIRA", "SIENTE", "RECUERDA"][chapter]}</span></div>
        <div className="motion-vector" aria-hidden="true" data-ready={ready || undefined}>
          <svg className="motion-poster" viewBox="0 0 600 600"><circle cx="300" cy="300" r="180" fill="none" stroke="var(--paper-on-ink)" /><rect x="180" y="180" width="240" height="240" rx="55" fill="var(--coral)" transform="rotate(-18 300 300)" /><circle cx="300" cy="300" r="54" fill="var(--paper)" /></svg>
          <div ref={mount} className="motion-player" />
        </div>
        <div className="motion-study-caption"><strong>{moments[chapter].title}</strong><span>0{chapter + 1} / 03</span></div>
      </div>
      <div className="motion-timeline" aria-label={`Secuencia del estudio: momento ${chapter + 1} de 3`}>
        <div className="motion-timeline-ruler" aria-hidden="true"><span>000</span><span>060</span><span>120</span><span>180 f</span></div>
        <div className="motion-timeline-tracks" aria-hidden="true">
          {['ATENCIÓN', 'RITMO', 'IDENTIDAD'].map((label, i) => <div key={label} data-active={chapter === i}><span className="motion-keyframe" /><span>{label}</span><span className="motion-keyframe" /></div>)}
          <i className="motion-playhead" style={{ '--moment': chapter }} />
        </div>
        <div className="motion-timeline-foot"><span>3 momentos / 1 composición</span><span>{reduced ? 'Fotograma fijo' : paused ? 'En pausa' : 'Reproducción por capítulos'}</span></div>
      </div>
      <div className="motion-study-controls">
        <div role="group" aria-label="Momentos del estudio">{moments.map((moment, i) => <button key={moment.title} type="button" aria-pressed={chapter === i} onClick={() => chooseChapter(i)} aria-label={moment.title}>0{i + 1}</button>)}</div>
        <button type="button" onClick={() => setPaused(value => !value)} disabled={reduced} aria-label={paused ? 'Activar animación' : 'Pausar animación'}>{paused || reduced ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />} {reduced ? 'Movimiento reducido' : paused ? 'Activar' : 'Pausar'}</button>
      </div>
    </div>
    <div className="motion-story-chapters">{moments.map((moment, i) => <article data-story-chapter={i} key={moment.title} data-active={chapter === i || undefined}>
      <div className="motion-storyboard" data-moment={i} aria-hidden="true"><span className="motion-storyboard-number">0{i + 1}</span><div><i /><i /><i /></div><span className="motion-storyboard-frame">{['000—059', '060—119', '120—179'][i]} f</span></div>
      <span className="eyebrow">0{i + 1} / {['Atención', 'Ritmo', 'Identidad'][i]}</span><h3>{moment.title}</h3><p>{moment.text}</p>
    </article>)}</div>
  </div>;
}
