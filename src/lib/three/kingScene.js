import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createKing } from './kingModel';

/** Render on demand: no perpetual loop, network textures, or global listeners after disposal. */
export function createKingScene(host, {onSelect, onError, reduced=false}) {
  const renderer=new THREE.WebGLRenderer({alpha:false,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,host.clientWidth<600?1.25:1.5));
  renderer.setClearColor('#141413'); renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-label','Rey de ajedrez tridimensional interactivo');
  renderer.domElement.setAttribute('role','img');host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.fog=new THREE.Fog('#141413',13,25);
  const camera=new THREE.PerspectiveCamera(36,1,.1,40);camera.position.set(4.6,3.6,6.6);
  const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();
  const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#fff1d7','#292521',2.2));
  const light=new THREE.DirectionalLight('#fff1dd',4);light.position.set(3,7,4);light.castShadow=true;
  light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-5;light.shadow.camera.right=5;light.shadow.camera.top=5;light.shadow.camera.bottom=-5;light.shadow.bias=-.0005;scene.add(light);
  const rim=new THREE.DirectionalLight('#fa7645',3);rim.position.set(-4,3,-3);scene.add(rim);
  const {root,parts}=createKing();scene.add(root);
  const board=new THREE.Group();board.position.y=-.15;scene.add(board);
  const tileGeometry=new THREE.BoxGeometry(1,.16,1);
  const tileMaterials=[new THREE.MeshStandardMaterial({color:'#32332e',roughness:.36,metalness:.25}),new THREE.MeshStandardMaterial({color:'#111211',roughness:.24,metalness:.4})];
  for(let x=0;x<8;x++)for(let z=0;z<8;z++) { const tile=new THREE.Mesh(tileGeometry,tileMaterials[(x+z)%2]);tile.position.set(x-3.5,0,z-3.5);tile.receiveShadow=true;board.add(tile); }
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.94,.012,8,80),new THREE.MeshBasicMaterial({color:'#ed8652'}));ring.rotation.x=Math.PI/2;ring.position.y=-.035;scene.add(ring);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1.35,0);controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=false;controls.minPolarAngle=.35;controls.maxPolarAngle=1.5;controls.update();
  const fine=window.matchMedia('(pointer:fine)').matches;
  let visible=true,disposed=false,raf=0,tween=null,state={phase:1,angle:28,expanded:false,material:'glass',selected:null,touch:false};
  const render=()=> {raf=0;if(disposed||!visible||document.hidden)return;renderer.render(scene,camera);};
  const schedule=()=>{if(!raf&&!disposed&&visible&&!document.hidden)raf=requestAnimationFrame(render);};
  controls.addEventListener('change',schedule);
  function apply(next) {
    state={...state,...next};controls.enabled=fine||state.touch;renderer.domElement.style.touchAction=state.touch?'none':'pan-y';
    root.rotation.y=THREE.MathUtils.degToRad(state.angle);
    const target=state.expanded?1:0;
    if(tween)cancelAnimationFrame(tween);tween=null;
    const start=parts.map(p=>p.position.y);const startTarget=controls.target.y;const endTarget=state.expanded?1.9:1.35;const time=performance.now();
    const move=now=>{const t=reduced?1:Math.min((now-time)/420,1);const ease=1-Math.pow(1-t,3);parts.forEach((part,i)=>{part.position.y=THREE.MathUtils.lerp(start[i],part.userData.homeY+target*i*.34,ease);});const nextTarget=THREE.MathUtils.lerp(startTarget,endTarget,ease);camera.position.y+=nextTarget-controls.target.y;controls.target.y=nextTarget;controls.update();schedule();if(t<1&&visible&&!disposed)tween=requestAnimationFrame(move);else tween=null;};
    if(visible)move(time);else parts.forEach((p,i)=>{p.position.y=p.userData.homeY+target*i*.34;});
    parts.forEach((part,index)=>part.children.forEach(mesh=>{
      if(mesh.userData.wire) {mesh.visible=state.phase===0;return;}
      mesh.visible=state.phase!==0;const m=mesh.material;
      const glass=state.material==='glass';m.color.set(glass?'#d38555':state.material==='ceramic'?'#ded5bf':'#827767');
      m.transmission=glass?.65:0;m.metalness=state.material==='metal'?.9:.05;m.roughness=glass?.16:state.material==='metal'?.23:.45;
      m.emissive.set(index===state.selected?'#52220f':'#000000');m.needsUpdate=true;
    }));schedule();
  }
  const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let down=null;
  const onDown=e=>{down=[e.clientX,e.clientY];};
  const onUp=e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;down=null;const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(parts,true).find(h=>h.object.isMesh&&h.object.visible);if(hit)onSelect(hit.object.userData.part);};
  renderer.domElement.addEventListener('pointerdown',onDown);renderer.domElement.addEventListener('pointerup',onUp);
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();schedule();};
  const ro=new ResizeObserver(resize);ro.observe(host);
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){apply(state);schedule();}else{cancelAnimationFrame(raf);raf=0;if(tween)cancelAnimationFrame(tween);tween=null;}},{threshold:.01});io.observe(host);
  const visibility=()=>{if(!document.hidden)schedule();else {cancelAnimationFrame(raf);raf=0;}};document.addEventListener('visibilitychange',visibility);
  const lost=e=>{e.preventDefault();onError();};renderer.domElement.addEventListener('webglcontextlost',lost);
  resize();apply(state);
  return {update:apply,reset(){camera.position.set(4.6,3.6,6.6);controls.target.set(0,1.35,0);controls.update();schedule();},dispose(){
    disposed=true;cancelAnimationFrame(raf);if(tween)cancelAnimationFrame(tween);ro.disconnect();io.disconnect();controls.removeEventListener('change',schedule);controls.dispose();document.removeEventListener('visibilitychange',visibility);
    renderer.domElement.removeEventListener('pointerdown',onDown);renderer.domElement.removeEventListener('pointerup',onUp);renderer.domElement.removeEventListener('webglcontextlost',lost);
    const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());env.dispose();light.shadow.dispose();renderer.dispose();renderer.domElement.remove();
  }};
}
