import { useStoryChapters } from '../../hooks/useStoryChapters';
import { StoryImage } from './SpecialtyHero';
const moments=[
 {word:'PREGUNTO',name:'nicolas-reading',alt:'Nicolás leyendo un libro',title:'Primero, la pregunta.',text:'El ajedrez me recuerda que una decisión cambia las siguientes. La lectura abre perspectivas. Antes de diseñar una pantalla, intento entender qué necesita resolver.',end:'No quiero añadir por añadir. Busco la pieza que hace que todo tenga sentido.',label:'Mirar',href:'/educacion/',link:'La curiosidad se practica ↗'},
 {word:'CONSTRUYO',name:'nicolas-workspace',alt:'Nicolás pensando una interfaz en su estudio',title:'Lo entiendo cuando lo hago.',text:'Programar me permite convertir preguntas en cosas que se pueden usar. Una app para leer, una plataforma para aprender o una web que conecta un negocio con sus clientes.',end:'Una idea deja de ser abstracta cuando alguien puede usarla.',label:'Construir',href:'/web-producto/',link:'Explora cómo construyo ↗'},
 {word:'SIENTO',name:'nicolas-motion',alt:'Retrato de Nicolás con una cinta luminosa',title:'Que funcione. Que se sienta.',text:'El diseño y la edición de vídeo me enseñan a mirar el conjunto: una pausa, un cambio de escala, la relación entre dos imágenes.',end:'El movimiento puede contar lo que una pantalla quieta no dice.',label:'Mover',href:'/motion/',link:'Sigue el movimiento ↗'},
 {word:'EXPLORO',name:'nicolas-chess',alt:'Nicolás sosteniendo un rey de vidrio',title:'Siempre hay otra dimensión.',text:'El 3D une mi interés por la tecnología, la composición y la exploración. Construyo escenas que invitan a acercarse, girar y descubrir cómo encajan sus partes.',end:'La siguiente jugada empieza con curiosidad.',label:'Explorar',href:'/3d/',link:'Explora mi otra dimensión ↗'},
];
export function PortraitJourney(){
 const {root,chapter,choose}=useStoryChapters();
 return <section className="portrait-journey" id="mirar" ref={root} data-chapter={chapter} aria-label="Mi historia en cuatro movimientos">
  <div className="portrait-journey-stage">
   <div className="portrait-journey-frame"><span className="portrait-journey-word" aria-hidden="true">{moments[chapter].word}</span><span className="portrait-journey-orbit" aria-hidden="true" />
    {moments.map((m,i)=><div className={`portrait-journey-image portrait-journey-image--${m.name}`} key={m.name} data-visible={i===chapter} aria-hidden={i!==chapter}><StoryImage name={m.name} alt={m.alt} /></div>)}
    <span className="portrait-journey-index">0{chapter+1} / 04 · NICOLÁS RODRÍGUEZ</span>
   </div>
   <div className="portrait-journey-controls" role="group" aria-label="Movimientos de mi historia">{moments.map((m,i)=><button key={m.label} type="button" aria-pressed={chapter===i} onClick={()=>choose(i)}>{m.label}</button>)}</div>
  </div>
  <div className="portrait-journey-chapters">{moments.map((m,i)=><article data-story-chapter={i} key={m.name}><p className="eyebrow">0{i+1} / {m.label}</p><h2>{m.title}</h2><p>{m.text}</p><p>{m.end}</p><a className="arrow-link" href={m.href}>{m.link}</a></article>)}</div>
 </section>;
}
