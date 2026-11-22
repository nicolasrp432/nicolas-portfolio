import { useEffect,useRef,useState } from 'react';
import { useReducedMotion } from '../../hooks/useMediaQuery';

export function ThreeKing({phase,angle,expanded,material,selected,touch,onSelect,resetKey}) {
 const host=useRef(null),engine=useRef(null),latest=useRef(null),choose=useRef(onSelect);
 const [status,setStatus]=useState('loading');const reduced=useReducedMotion();choose.current=onSelect;
 latest.current={phase,angle,expanded,material,selected,touch};
 useEffect(()=>{
  let cancelled=false,started=false;
  const start=async()=>{if(started)return;started=true;try {const {createKingScene}=await import('../../lib/three/kingScene');if(cancelled)return;engine.current=createKingScene(host.current,{reduced,onSelect:i=>choose.current(i),onError:()=>setStatus('fallback')});engine.current.update(latest.current);setStatus('ready');}catch {if(!cancelled)setStatus('fallback');}};
  const io=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){start();io.disconnect();}},{rootMargin:'200px'});if(io)io.observe(host.current);else start();
  return()=>{cancelled=true;io?.disconnect();engine.current?.dispose();engine.current=null;};
 },[reduced]);
 useEffect(()=>{engine.current?.update(latest.current);},[phase,angle,expanded,material,selected,touch]);
 useEffect(()=>{engine.current?.reset();},[resetKey]);
 useEffect(()=>{if(status==='fallback'){engine.current?.dispose();engine.current=null;}},[status]);
 return <div className="three-king" data-renderer={status}>
  <img className="three-king-poster" src="/img/manifesto/icons/strategy.webp" alt="Rey de ajedrez de vidrio, vista alternativa de la escultura" width="480" height="480" loading="lazy" hidden={status==='ready'} />
  <div className="three-king-canvas" ref={host} aria-hidden={status!=='ready'} />
  <span className="three-king-status" role="status">{status==='loading'?'Preparando la escultura…':status==='fallback'?'Vista estática · el 3D no está disponible en este dispositivo.':'Escultura 3D en tiempo real'}</span>
 </div>;
}
