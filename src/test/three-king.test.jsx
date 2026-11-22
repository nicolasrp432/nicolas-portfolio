import { describe,it,expect,vi,afterEach } from 'vitest';
import { render,screen,waitFor,act } from '@testing-library/react';
import { ThreeKing } from '../components/ui/ThreeKing';
import { HoverExpandGallery } from '../components/ui/hover-expand-gallery';
import { createKing } from '../lib/three/kingModel';
import userEvent from '@testing-library/user-event';
const {createKingScene}=vi.hoisted(()=>({createKingScene:vi.fn()}));
vi.mock('../lib/three/kingScene',()=>({createKingScene}));
afterEach(()=>{vi.unstubAllGlobals();vi.clearAllMocks();});
function observeScene(){let notify;vi.stubGlobal('IntersectionObserver',class{constructor(fn){notify=fn;}observe(){}disconnect(){}});return()=>act(()=>notify([{isIntersecting:true}]));}
describe('real 3D lifecycle',()=>{
 it('generates finite volumetric meshes with four independently selectable parts',()=>{
  const {root,parts}=createKing();expect(parts.map(p=>p.name)).toEqual(['Base','Cuerpo','Collar','Corona']);
  parts.forEach((part,index)=>{const meshes=part.children.filter(c=>c.isMesh);expect(meshes.length).toBeGreaterThan(0);meshes.forEach(mesh=>{expect(mesh.userData.part).toBe(index);expect([...mesh.geometry.attributes.position.array].every(Number.isFinite)).toBe(true);mesh.geometry.computeBoundingBox();expect(mesh.geometry.boundingBox.max.z-mesh.geometry.boundingBox.min.z).toBeGreaterThan(0);});});
  const resources=new Set();root.traverse(o=>{if(o.geometry)resources.add(o.geometry);if(o.material)resources.add(o.material);});resources.forEach(r=>r.dispose());
 });
 it('defers creation, forwards state and releases the scene on unmount',async()=>{
  const enter=observeScene();const engine={update:vi.fn(),reset:vi.fn(),dispose:vi.fn()};createKingScene.mockReturnValue(engine);
  const {rerender,unmount}=render(<ThreeKing phase={0} angle={28} onSelect={()=>{}} />);
  expect(createKingScene).not.toHaveBeenCalled();enter();await screen.findByText('Escultura 3D en tiempo real');
  rerender(<ThreeKing phase={1} angle={90} material="metal" onSelect={()=>{}} />);
  expect(engine.update).toHaveBeenLastCalledWith(expect.objectContaining({angle:90,material:'metal',phase:1}));unmount();expect(engine.dispose).toHaveBeenCalledOnce();
 });
 it('retains a readable poster when the device cannot create WebGL',async()=>{
  const enter=observeScene();createKingScene.mockImplementation(()=>{throw new Error('No WebGL');});render(<ThreeKing onSelect={()=>{}} />);enter();
  await screen.findByText(/el 3D no está disponible/);expect(screen.getByRole('img',{name:/vista alternativa/})).toBeVisible();
 });
 it('releases GPU resources when context is lost',async()=>{
  const enter=observeScene();const engine={update:vi.fn(),reset:vi.fn(),dispose:vi.fn()};let fail;createKingScene.mockImplementation((host,options)=>{fail=options.onError;return engine;});
  render(<ThreeKing onSelect={()=>{}} />);enter();await screen.findByText('Escultura 3D en tiempo real');act(()=>fail());await waitFor(()=>expect(engine.dispose).toHaveBeenCalledOnce());expect(screen.getByRole('status')).toHaveTextContent('Vista estática');
 });
});
it('opens gallery destinations with keyboard while keeping native links separate',async()=>{
 const items=['Web','Motion','3D'].map((label,i)=>({id:label,number:i,label,short:label,path:`/${label}/`,cover:'/image.webp',alt:label,headline:label}));
 const {container}=render(<HoverExpandGallery items={items} />);const user=userEvent.setup();await user.tab();await user.tab();expect(screen.getByRole('link',{name:'Entrar en Web ↗'})).toHaveFocus();await user.tab();expect(screen.getByRole('button',{name:'1 Motion'})).toHaveAttribute('aria-expanded','true');await user.tab();expect(screen.getByRole('link',{name:'Entrar en Motion ↗'})).toHaveFocus();expect(container.querySelector('button a, a button')).toBeNull();
});
