import { useState } from 'react';
import { ThreeKing } from './ThreeKing';
import { useStoryChapters } from '../../hooks/useStoryChapters';
const chapters = [
  ['Todo tiene estructura.', 'Antes de un material o una luz, hay proporción. El perfil de este rey se convierte en una superficie al girar alrededor de su eje. Base, cuerpo, collar y corona son geometría real.'],
  ['La luz cambia la lectura.', 'El mismo objeto se siente distinto cuando aparecen el color y la transparencia. El material también cuenta una historia.'],
  ['Tu mirada la completa.', 'La profundidad cobra sentido cuando puedes explorarla. Gira el rey, selecciona una pieza y separa sus partes: ahora tú eliges cómo verlo.'],
];
export function DimensionLab() {
  const {root,chapter,choose}=useStoryChapters();
  const [angle,setAngle]=useState(28);
  const [expanded,setExpanded]=useState(false);
  const [material,setMaterial]=useState('glass');
  const [selected,setSelected]=useState(null);
  const [touch,setTouch]=useState(false);
  const [resetKey,setResetKey]=useState(0);
  return <section className="section dimension-lab" id="experiencia" ref={root}>
    <header className="specialty-section-head"><p className="eyebrow">De la geometría a la sensación / Estudio propio</p><h2>Una pieza.<br /><em>Infinitas miradas.</em></h2><p>Un rey de ajedrez modelado con código. Explora su estructura, cambia el material y descubre cómo está construido.</p></header>
    <div className="experience-grid"><div className="experience-sticky">
      <div className="dimension-viewport dimension-viewport--webgl" data-phase={chapter} data-expanded={expanded}>
        <ThreeKing phase={chapter} angle={angle} expanded={expanded} material={material} selected={selected} touch={touch} onSelect={setSelected} resetKey={resetKey} />
      </div>
      <details className="king-settings"><summary>Materiales, piezas y controles</summary>
      <div className="dimension-inputs"><label>Girar la escena <input aria-label="Girar la escena" type="range" min="0" max="360" value={angle} onChange={e=>setAngle(Number(e.target.value))} /></label><button type="button" aria-pressed={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Reunir las piezas':'Separar las piezas'}</button></div>
      <div className="king-materials" role="group" aria-label="Material de la escultura">{[['glass','Vidrio ámbar'],['ceramic','Porcelana'],['metal','Metal']].map(([id,label])=><button key={id} type="button" aria-pressed={material===id} onClick={()=>{setMaterial(id);if(chapter===0)choose(1);}}>{label}</button>)}</div>
      <div className="king-parts" role="group" aria-label="Piezas de la escultura">{['Base','Cuerpo','Collar','Corona'].map((name,i)=><button type="button" key={name} aria-pressed={selected===i} onClick={()=>setSelected(selected===i?null:i)}>{name}</button>)}</div>
      <p className="king-part-note" aria-live="polite">{selected===null?'Selecciona una pieza para descubrir su construcción.':['La base sostiene el conjunto: anillos concéntricos construidos por revolución.','El cuerpo conecta la base y la corona con un perfil curvo modelado con código.','El collar separa las proporciones y recoge la luz en sus bordes.','La corona combina un perfil de revolución y una cruz de dos volúmenes.'][selected]}</p>
      <div className="king-utilities"><button className="king-touch" type="button" aria-pressed={touch} onClick={()=>setTouch(!touch)}>{touch?'Volver al scroll':'Explorar con el dedo'}</button><button type="button" onClick={()=>{setAngle(28);setExpanded(false);setTouch(false);setSelected(null);setResetKey(k=>k+1);}}>Restablecer vista</button></div>

      </details>
      <div className="experience-controls" role="group" aria-label="Capítulos de profundidad">{['Geometría','Materia','Interacción'].map((name,i)=><button key={name} aria-pressed={chapter===i} onClick={()=>choose(i)} type="button">0{i+1} {name}</button>)}</div>
    </div><div className="experience-chapters">{chapters.map(([title,text],i)=><article key={title} data-story-chapter={i}><span className="eyebrow">0{i+1} / Profundidad</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
  </section>;
}
