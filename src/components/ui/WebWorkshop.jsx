import { useState } from 'react';
import { FiCheck, FiArrowUpRight } from 'react-icons/fi';
import { useStoryChapters } from '../../hooks/useStoryChapters';
const chapters = [
  ['Primero, la pregunta.', 'Una web empieza antes del código. ¿Qué necesita hacer quien llega? En este pequeño estudio, encontrar una actividad y elegir cuándo ir.'],
  ['Después, el recorrido.', 'Ordeno la información y diseño una decisión cada vez. El mismo contenido gana jerarquía, contraste y una dirección visual.'],
  ['Por fin, la experiencia.', 'Una interfaz debe responder. Prueba a elegir un día y confirmar: el estado cambia, el mensaje es claro y sabes qué ha pasado.'],
];
export function WebWorkshop() {
  const { root, chapter, choose } = useStoryChapters();
  const [day, setDay] = useState('Viernes');
  const [confirmed, setConfirmed] = useState(false);
  return <section id="experiencia" className="section web-workshop" ref={root}>
    <header className="specialty-section-head"><p className="eyebrow">Dentro de mi taller / Estudio interactivo propio</p><h2>De «tengo una idea»<br /><em>a «ya funciona».</em></h2></header>
    <div className="experience-grid"><div className="experience-sticky">
      <div className="prototype-browser" data-phase={chapter}><div className="prototype-chrome"><span>● ● ●</span><span>estudio / pequeña escapada</span><span>↗</span></div>
        <div className="prototype-content"><div className="prototype-landscape" aria-hidden="true"><span className="prototype-sun" /><i /><b /></div><p className="prototype-kicker">UNA PAUSA PARA DESCONECTAR</p><h3>Fuera del ruido.</h3><p>Un paseo. Aire libre. Tiempo para mirar.</p>
          {chapter < 2 ? <div className="prototype-wire" aria-hidden="true"><span /><span /><span /></div> : <div className="prototype-booking"><span>Elige tu día</span><div role="group" aria-label="Día de la experiencia">{['Viernes','Sábado','Domingo'].map(d => <button key={d} type="button" aria-pressed={day === d} onClick={() => {setDay(d);setConfirmed(false);}}>{d}</button>)}</div><button className="prototype-confirm" onClick={() => setConfirmed(true)} type="button">{confirmed ? <><FiCheck /> Listo, {day.toLowerCase()}</> : <>Probar reserva <FiArrowUpRight /></>}</button><p role="status">{confirmed ? '¡Así de sencillo! Es una demostración; no se ha enviado ninguna reserva.' : 'Demostración local · sin datos personales'}</p></div>}
        </div>
      </div>
      <div className="experience-controls" role="group" aria-label="Fases del taller">{['Estructura','Identidad','Interacción'].map((name,i)=><button key={name} aria-pressed={chapter===i} onClick={()=>choose(i)} type="button">0{i+1} {name}</button>)}</div>
    </div><div className="experience-chapters">{chapters.map(([title,text],i)=><article key={title} data-story-chapter={i}><span className="eyebrow">0{i+1} / {['Entender','Dar forma','Hacerlo real'][i]}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
  </section>;
}
