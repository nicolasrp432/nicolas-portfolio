import { useState } from 'react';
import { FiCheck, FiArrowUpRight, FiLayers, FiLayout, FiMousePointer, FiGitBranch } from 'react-icons/fi';
import { SiReact, SiFigma } from 'react-icons/si';
import { useStoryChapters } from '../../hooks/useStoryChapters';

const chapters = [
  ['Primero, la pregunta.', 'Encontrar una actividad. Elegir un día. Una estructura que empieza por lo que necesitas hacer.'],
  ['Después, el recorrido.', 'La misma idea, con jerarquía, contraste y una dirección visual.'],
  ['Por fin, la experiencia.', 'Elige un día y confirma. La interfaz responde; la reserva es solo una demostración.'],
];
const phases = ['Estructura', 'Identidad', 'Interacción'];
const chapterIcons = [FiLayout, FiLayers, FiMousePointer];

export function WebWorkshop() {
  const { root, chapter, choose } = useStoryChapters();
  const [day, setDay] = useState('Viernes');
  const [confirmed, setConfirmed] = useState(false);
  return <section id="experiencia" className="section web-workshop" ref={root} data-lab="web" data-chapter={chapter}>
    <header className="specialty-section-head"><p className="eyebrow">Dentro de mi taller / Estudio interactivo propio</p><h2>De «tengo una idea»<br /><em>a «ya funciona».</em></h2></header>
    <div className="experience-grid"><div className="experience-sticky">
      <div className="web-workbench">
        <div className="lab-toolbar"><span><FiGitBranch aria-hidden="true" /> idea / versión 0{chapter + 1}</span><span className="lab-tools" aria-label="Figma y React"><SiFigma aria-hidden="true" /><SiReact aria-hidden="true" /></span></div>
        <div className="web-workbench-body">
          <aside className="web-component-rail" aria-label="Elementos del prototipo"><span className="lab-micro">CAPAS</span>{chapterIcons.map((Icon, i) => <span key={phases[i]} data-active={chapter === i}><Icon aria-hidden="true" /><span>{['Plano', 'Estilo', 'Acción'][i]}</span></span>)}<span className="web-rail-swatches" aria-hidden="true"><i /><i /><i /></span></aside>
          <div className="prototype-browser" data-phase={chapter}>
            <div className="prototype-chrome"><span aria-hidden="true">● ● ●</span><span>estudio / pequeña escapada</span><FiArrowUpRight aria-hidden="true" /></div>
            <div className="prototype-content">
              <div className="prototype-landscape" aria-hidden="true"><span className="prototype-sun" /><i /><b /><span className="web-landscape-caption">ESCAPADA / 01</span></div>
              <p className="prototype-kicker">UNA PAUSA PARA DESCONECTAR</p><h3>Fuera del ruido.</h3><p>Un paseo. Aire libre. Tiempo para mirar.</p>
              {chapter < 2 ? <div className="prototype-wire" aria-hidden="true"><span /><span /><span /></div> : <div className="prototype-booking"><span>Elige tu día</span><div role="group" aria-label="Día de la experiencia">{['Viernes', 'Sábado', 'Domingo'].map(d => <button key={d} type="button" aria-pressed={day === d} onClick={() => { setDay(d); setConfirmed(false); }}>{d}</button>)}</div><button className="prototype-confirm" onClick={() => setConfirmed(true)} type="button">{confirmed ? <><FiCheck aria-hidden="true" /> Listo, {day.toLowerCase()}</> : <>Probar reserva <FiArrowUpRight aria-hidden="true" /></>}</button><p role="status">{confirmed ? '¡Así de sencillo! Es una demostración; no se ha enviado ninguna reserva.' : 'Demostración local · sin datos personales'}</p></div>}
            </div>
          </div>
        </div>
        <div className="web-stage-schema" aria-label={`Fase actual: ${phases[chapter]}`}><span>idea</span><i aria-hidden="true" /><span data-active={chapter >= 1}>sistema</span><i aria-hidden="true" /><span data-active={chapter === 2}>respuesta <FiCheck aria-hidden="true" /></span></div>
      </div>
      <div className="experience-controls" role="group" aria-label="Fases del taller">{phases.map((name, i) => <button key={name} aria-pressed={chapter === i} onClick={() => choose(i)} type="button">0{i + 1} {name}</button>)}</div>
    </div><div className="experience-chapters">{chapters.map(([title, text], i) => {
      const Icon = chapterIcons[i];
      return <article key={title} data-story-chapter={i} data-active={chapter === i}>
        <span className="eyebrow">0{i + 1} / {['Entender', 'Dar forma', 'Hacerlo real'][i]}</span>
        <div className="web-chapter-drawing" aria-hidden="true"><Icon /><span>{['↳ mapa de la experiencia', 'Aa / forma + función', 'clic → estado → respuesta'][i]}</span></div>
        <h3>{title}</h3><p>{text}</p>
      </article>;
    })}</div></div>
  </section>;
}
