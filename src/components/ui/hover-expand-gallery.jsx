import { useId,useState } from 'react';
/** Adapted from Hover Expand Gallery by kedhareswer (21st.dev, demo 27010).
 * The source's flex-basis rails become native disclosure buttons plus separate
 * links, keeping the destinations valid and focusable without nested controls. */
export function HoverExpandGallery({items}) {
 const [active,setActive]=useState(0);const uid=useId();
 return <div className="specialty-gallery"><ul>{items.map((item,index)=>{
  const open=active===index;
  return <li key={item.id} data-active={open} onPointerEnter={e=>{if(e.pointerType==='mouse')setActive(index);}}>
   <button className="specialty-gallery-rail" type="button" aria-label={`${item.number} ${item.label}`} aria-expanded={open} aria-controls={`${uid}-${item.id}`} onFocus={()=>setActive(index)} onClick={()=>setActive(index)}><span>{item.number}</span><strong>{item.label}</strong><span aria-hidden="true">↗</span></button>
   <div className="specialty-gallery-panel" id={`${uid}-${item.id}`} aria-hidden={!open} inert={!open}>
    <img src={item.cover} alt={item.alt} loading="lazy" width="1200" height="800" />
    <div className="specialty-gallery-copy"><p className="eyebrow">{item.verb}</p><h3>{item.headline}</h3><p>{item.summary}</p><a href={item.path} className="button-slab">Entrar en {item.short} ↗</a></div>
   </div>
  </li>;
 })}</ul></div>;
}
