import { useEffect, useRef, useState } from 'react';
import { FiArrowDownRight, FiBox, FiCode, FiMousePointer, FiPlay, FiLayers, FiMove } from 'react-icons/fi';
import { SiReact, SiFigma, SiJavascript, SiAdobeaftereffects, SiThreedotjs } from 'react-icons/si';
import { SpecialtyNav } from './SpecialtyNav';
import { useGsapScope } from '../../hooks/useGsapScope';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';

export function StoryImage({ name, alt = '', className = '', priority = false }) {
  const dimensions = name === 'nicolas-agency-cutout' ? [1064, 1478] : name === 'nicolas-walking-cutout' ? [1024, 1536] : ['nicolas-chess','nicolas-reading'].includes(name) ? [1122, 1402] : [1536, 1024];
  const portrait = dimensions[1] > dimensions[0];
  return <img className={className} src={`/img/stories/${name}-768.webp`} srcSet={`/img/stories/${name}-768.webp 768w, /img/stories/${name}-1440.webp ${Math.min(1440, dimensions[0])}w`} sizes={portrait ? '(max-width: 700px) 85vw, 45vw' : '(max-width: 600px) 100vw, 70vw'} width={dimensions[0]} height={dimensions[1]} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />;
}


const stageCopy = {
  web: { title: <>La idea es tuya.<br /><em>Hagámosla funcionar.</em></>, lead: 'Del primer boceto a una web que responde. Diseño el recorrido y construyo lo que ocurre en cada clic.', cta: 'Prueba el producto', label: '01 / WEB Y PRODUCTO DIGITAL', phases: ['Estructura', 'Sistema', 'Interacción'] },
  motion: { title: <>Dale ritmo.<br /><em>Deja huella.</em></>, lead: 'Una forma atrae. Un ritmo conecta. El movimiento convierte un mensaje en algo que se siente.', cta: 'Entra en la secuencia', label: '02 / MOTION Y CONTENIDO VISUAL', phases: ['Composición', 'Ritmo', 'Recuerdo'] },
  '3d': { title: <>La forma<br /><em>de una idea.</em></>, lead: 'Geometría que puedes recorrer. Materiales que cambian la percepción. Una escena que responde a tu mirada.', cta: 'Explora el objeto 3D', label: '03 / 3D Y EXPERIENCIAS INTERACTIVAS', phases: ['Geometría', 'Materia', 'Perspectiva'] },
};

export function SceneArtwork({ name, className = '', priority = false, alt = '' }) {
  return <img className={className} src={`/img/specialties/${name}-768.webp`} srcSet={`/img/specialties/${name}-768.webp 768w, /img/specialties/${name}-1440.webp 1440w`} sizes="(max-width: 700px) 100vw, 75vw" width="1536" height="1024" alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />;
}

function ToolMedallion({ icon: Icon, name, index }) {
  return <div className={`stage-medallion stage-medallion--${index}`} data-stage-object><span><Icon /></span><small>{name}</small></div>;
}

function WebStage() {
  return <div className="specialty-stage-art web-assembly" aria-hidden="true">
    <div className="web-assembly-grid" />
    <SceneArtwork name="interface-assembly" className="stage-main-art" priority />
    <div className="web-object web-object--plan" data-stage-object><span>01 / ESTRUCTURA</span><div className="web-skeleton"><i /><i /><i /><i /></div><strong>Una decisión<br />cada vez.</strong><FiLayers /></div>
    <div className="web-object web-object--interaction" data-stage-object><span>03 / INTERACCIÓN</span><FiMousePointer /><strong>Todo conectado.</strong><div className="web-response"><i />Respuesta clara</div></div>
    <ToolMedallion icon={SiReact} name="React" index="one" /><ToolMedallion icon={SiFigma} name="Diseño" index="two" /><ToolMedallion icon={SiJavascript} name="Lógica" index="three" />
    <svg className="web-assembly-path" viewBox="0 0 1000 500"><path pathLength="1" d="M100 220C250 400 220 80 460 230S700 450 910 140" /></svg>
  </div>;
}

function MotionStage() {
  return <div className="specialty-stage-art motion-score" aria-hidden="true">
    <span className="motion-outline" data-motion-word>MOVE</span>
    <SceneArtwork name="motion-ribbon" className="stage-main-art" priority />
    <div className="motion-frame motion-frame--one" data-stage-object><span>01 / ATENCIÓN</span><FiPlay /><i /></div>
    <div className="motion-frame motion-frame--two" data-stage-object><span>02 / RITMO</span><div className="motion-bars">{Array.from({length:9},(_,i)=><i key={i} style={{'--bar': [25,50,85,40,100,65,35,80,45][i]+'%'}} />)}</div></div>
    <ToolMedallion icon={SiAdobeaftereffects} name="After Effects" index="one" /><ToolMedallion icon={FiCode} name="Motion web" index="two" />
    <div className="motion-score-track"><span>IN</span><i /><i /><i /><b /><span>OUT</span></div>
  </div>;
}

function MaterialStage() {
  return <div className="specialty-stage-art material-gallery" aria-hidden="true">
    <SceneArtwork name="material-study" className="stage-main-art" priority />
    <span className="material-cross material-cross--one">+</span><span className="material-cross material-cross--two">+</span>
    <div className="material-spec material-spec--one" data-stage-object><FiBox /><span>01<br /><strong>Volumen</strong></span><i /></div>
    <div className="material-spec material-spec--two" data-stage-object><FiLayers /><span>02<br /><strong>Materia</strong></span><i /></div>
    <div className="material-spec material-spec--three" data-stage-object><FiMove /><span>03<br /><strong>Tu mirada</strong></span></div>
    <ToolMedallion icon={SiThreedotjs} name="Three.js" index="one" />
    <span className="material-caption">ESTUDIO VISUAL / LUZ · VIDRIO · COBRE</span>
  </div>;
}

/** Three authored compositions. Scroll moves the objects, never the reading surface. */
export function SpecialtyHero({ specialty: s }) {
  const copy = stageCopy[s.id];
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const animation = useRef(null);
  const scope = useGsapScope(root => {
    const objects = [...root.querySelectorAll('[data-stage-object]')];
    const image = root.querySelector('.stage-main-art');
    const small = window.matchMedia('(max-width: 700px)').matches;
    const timeline = gsap.timeline({scrollTrigger:{trigger:root,start:'top top',end:'bottom top',scrub:.5}});
    animation.current = timeline;
    if (s.id === 'web') {
      objects.forEach((object,i) => timeline.fromTo(object,{x:(i%2 ? 1:-1)*(small?18:75),y:35,rotation:(i%2 ? -1:1)*9},{x:0,y:-25,rotation:0,ease:'none'},0));
      timeline.fromTo(image,{scale:.88,y:25},{scale:1.08,y:-55,ease:'none'},0);
    } else if (s.id === 'motion') {
      timeline.fromTo(image,{rotation:-8,scale:.95},{rotation:12,scale:1.13,y:-60,ease:'none'},0);
      timeline.fromTo(root.querySelector('[data-motion-word]'),{xPercent:-8,scaleX:.9},{xPercent:8,scaleX:1.08,ease:'none'},0);
      objects.forEach((object,i)=>timeline.fromTo(object,{y:30,rotation:i%2?8:-8},{y:-50,rotation:i%2?-5:5,ease:'none'},0));
    } else {
      timeline.fromTo(image,{scale:1},{scale:1.12,yPercent:-5,ease:'none'},0);
      objects.forEach((object,i)=>timeline.fromTo(object,{y:25,x:(i%2?1:-1)*(small?6:20)},{y:-40,x:0,ease:'none'},0));
    }
  }, [s.id]);
  useEffect(()=>{
    const trigger=animation.current?.scrollTrigger;
    if (paused) { trigger?.disable(false,false);trigger?.getTween()?.pause(); }
    else trigger?.enable(false,false);
  },[paused,reduced]);
  return <header id="especialidad" className={`specialty-stage specialty-stage--${s.id}`} ref={scope} data-paused={paused || reduced}>
    <div className="specialty-stage-navigation"><a href="/">← Portfolio completo</a><SpecialtyNav current={s.id} /></div>
    <div className="specialty-stage-heading"><p className="eyebrow">{copy.label} / NICOLÁS RODRÍGUEZ</p><h1>{copy.title}</h1></div>
    {s.id === 'web' ? <WebStage /> : s.id === 'motion' ? <MotionStage /> : <MaterialStage />}
    <div className="specialty-stage-bottom"><div><p>{copy.lead}</p><a className="arrow-link" href="#experiencia">{copy.cta} <FiArrowDownRight aria-hidden="true" /></a></div><ol aria-label="El recorrido de esta especialidad">{copy.phases.map((phase,i)=><li key={phase}><span>0{i+1}</span>{phase}</li>)}</ol><button className="stage-pause" type="button" aria-pressed={paused || reduced} disabled={reduced} onClick={()=>setPaused(value=>!value)}>{paused || reduced ? 'Efectos pausados' : 'Pausar efectos'}</button></div>
  </header>;
}
