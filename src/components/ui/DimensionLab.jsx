import { useState } from 'react';
import { FiBox, FiSun, FiMove, FiRotateCw, FiLayers } from 'react-icons/fi';
import { ThreeKing } from './ThreeKing';
import { useStoryChapters } from '../../hooks/useStoryChapters';
const chapters = [
  ['Todo tiene estructura.', 'Un perfil gira alrededor de su eje. Base, cuerpo, collar y corona: cuatro piezas, una proporción.'],
  ['La luz cambia la lectura.', 'Vidrio, porcelana o metal. Una misma geometría; tres formas de recoger la luz.'],
  ['Tu mirada la completa.', 'Gira el rey, selecciona una pieza y separa sus partes. Tú eliges el punto de vista.'],
];
const chapterIcons = [FiBox, FiSun, FiMove];
const materialNames = { glass: 'Vidrio ámbar', ceramic: 'Porcelana', metal: 'Metal' };
export function DimensionLab() {
  const {root,chapter,choose}=useStoryChapters();
  const [angle,setAngle]=useState(28);
  const [expanded,setExpanded]=useState(false);
  const [material,setMaterial]=useState('glass');
  const [selected,setSelected]=useState(null);
  const [touch,setTouch]=useState(false);
  const [resetKey,setResetKey]=useState(0);
  return <section className="section dimension-lab" id="experiencia" ref={root} data-lab="dimension" data-chapter={chapter}>
    <header className="specialty-section-head"><p className="eyebrow">De la geometría a la sensación / Estudio propio</p><h2>Una pieza.<br /><em>Infinitas miradas.</em></h2><p>Un rey de ajedrez modelado con código. Una pequeña exposición que puedes tocar.</p></header>
    <div className="experience-grid"><div className="experience-sticky">
      <div className="dimension-exhibit">
      <div className="lab-toolbar"><span><FiBox aria-hidden="true" /> OBJETO 001 / REY</span><span>Estudio de revolución</span></div>
      <div className="dimension-exhibit-stage">
      <div className="dimension-viewport dimension-viewport--webgl" data-phase={chapter} data-expanded={expanded}>
        <div className="dimension-axis" aria-hidden="true"><span>Y</span><span>X</span><span>Z</span><i /><i /><i /></div>
        <span className="dimension-measure" aria-hidden="true">PERFIL / 360°</span>
        <ThreeKing phase={chapter} angle={angle} expanded={expanded} material={material} selected={selected} touch={touch} onSelect={setSelected} resetKey={resetKey} />
      </div>
      <aside className="dimension-specimen" aria-label="Ficha de la escultura">
        <span className="lab-micro">EN OBSERVACIÓN</span>
        <FiLayers className="dimension-specimen-icon" aria-hidden="true" />
        <dl><div><dt>Material elegido</dt><dd>{materialNames[material]}</dd></div><div><dt>Rotación</dt><dd>{angle}°</dd></div><div><dt>Enfoque</dt><dd>{selected === null ? 'Pieza completa' : ['Base', 'Cuerpo', 'Collar', 'Corona'][selected]}</dd></div><div><dt>Montaje</dt><dd>{expanded ? 'Despiece' : 'Ensamblado'}</dd></div></dl>
        <span className="dimension-specimen-footer"><FiRotateCw aria-hidden="true" /> Geometría real</span>
      </aside>
      </div>
      </div>
      <details className="king-settings"><summary>Materiales, piezas y controles</summary>
      <div className="dimension-inputs"><label>Girar la escena <input aria-label="Girar la escena" type="range" min="0" max="360" value={angle} onChange={e=>setAngle(Number(e.target.value))} /></label><button type="button" aria-pressed={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Reunir las piezas':'Separar las piezas'}</button></div>
      <div className="king-materials" role="group" aria-label="Material de la escultura">{[['glass','Vidrio ámbar'],['ceramic','Porcelana'],['metal','Metal']].map(([id,label])=><button key={id} type="button" aria-pressed={material===id} onClick={()=>{setMaterial(id);if(chapter===0)choose(1);}}><span className="dimension-material-sample" data-material={id} aria-hidden="true" />{label}</button>)}</div>
      <div className="king-parts" role="group" aria-label="Piezas de la escultura">{['Base','Cuerpo','Collar','Corona'].map((name,i)=><button type="button" key={name} aria-pressed={selected===i} onClick={()=>setSelected(selected===i?null:i)}>{name}</button>)}</div>
      <p className="king-part-note" aria-live="polite">{selected===null?'Selecciona una pieza para descubrir su construcción.':['La base sostiene el conjunto: anillos concéntricos construidos por revolución.','El cuerpo conecta la base y la corona con un perfil curvo modelado con código.','El collar separa las proporciones y recoge la luz en sus bordes.','La corona combina un perfil de revolución y una cruz de dos volúmenes.'][selected]}</p>
      <div className="king-utilities"><button className="king-touch" type="button" aria-pressed={touch} onClick={()=>setTouch(!touch)}>{touch?'Volver al scroll':'Explorar con el dedo'}</button><button type="button" onClick={()=>{setAngle(28);setExpanded(false);setTouch(false);setSelected(null);setResetKey(k=>k+1);}}>Restablecer vista</button></div>

      </details>
      <div className="experience-controls" role="group" aria-label="Capítulos de profundidad">{['Geometría','Materia','Interacción'].map((name,i)=><button key={name} aria-pressed={chapter===i} onClick={()=>choose(i)} type="button">0{i+1} {name}</button>)}</div>
    </div><div className="experience-chapters">{chapters.map(([title,text],i)=><article key={title} data-story-chapter={i} data-active={chapter===i}><div className="dimension-catalog-graphic" aria-hidden="true">{(() => { const Icon = chapterIcons[i]; return <Icon />; })()}<span>FIG. 0{i+1}</span><div className="dimension-catalog-lines"><i /><i /><i /></div></div><span className="eyebrow">0{i+1} / Profundidad</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
  </section>;
}
