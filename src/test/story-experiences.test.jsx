import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WebWorkshop } from '../components/ui/WebWorkshop';
import { DimensionLab } from '../components/ui/DimensionLab';
import HistoryPage from '../HistoryPage';
import { services } from '../data/services';
import { heroIdentity } from '../data/hero';
import { tickerWords } from '../data/site';

afterEach(()=>vi.unstubAllGlobals());

describe('visual storytelling',()=>{
 it('preserves all five original services and the original home identity',()=>{
  expect(services.map(s=>s.id)).toEqual(['web','design','motion','marketing','ai']);
  expect(heroIdentity.eyebrow).toBe('Desarrollador & creativo digital');
  expect(tickerWords).toContain('Automatización');
  expect(tickerWords).toContain('Diseño gráfico');
  expect(tickerWords).toContain('Estrategia digital');
 });
 it('lets visitors try the web prototype without sending a reservation',async()=>{
  const fetch=vi.fn();vi.stubGlobal('fetch',fetch);
  render(<WebWorkshop />);
  await userEvent.click(screen.getByRole('button',{name:'03 Interacción'}));
  await userEvent.click(screen.getByRole('button',{name:'Sábado'}));
  await userEvent.click(screen.getByRole('button',{name:'Probar reserva'}));
  expect(screen.getByRole('button',{name:'Listo, sábado'})).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('no se ha enviado ninguna reserva');
  expect(fetch).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button',{name:'Domingo'}));
  expect(screen.getByRole('button',{name:'Probar reserva'})).toBeInTheDocument();
 });
 it('changes perspective, material and separation using keyboard-accessible controls',async()=>{
  const {container}=render(<DimensionLab />);
  await userEvent.click(screen.getByText('Materiales, piezas y controles'));
  fireEvent.change(screen.getByRole('slider',{name:'Girar la escena'}),{target:{value:'135'}});
  expect(screen.getByRole('slider',{name:'Girar la escena'})).toHaveValue('135');
  await userEvent.click(screen.getByRole('button',{name:'Separar las piezas'}));
  expect(container.querySelector('.dimension-viewport')).toHaveAttribute('data-expanded','true');
  await userEvent.click(screen.getByRole('button',{name:'02 Materia'}));
  expect(container.querySelector('.dimension-viewport')).toHaveAttribute('data-phase','1');
 });
 it('keeps a manual chapter selected while its controls are being used',async()=>{
  let report;
  vi.stubGlobal('IntersectionObserver',class { constructor(callback){report=callback;} observe(){} disconnect(){} });
  const {container}=render(<WebWorkshop />);
  await userEvent.click(screen.getByRole('button',{name:'03 Interacción'}));
  const entry={isIntersecting:true,target:container.querySelector('[data-story-chapter="0"]')};
  act(()=>report([entry]));
  expect(screen.getByRole('button',{name:'Probar reserva'})).toBeInTheDocument();
  fireEvent.wheel(document.body);
  act(()=>report([entry]));
  expect(container.querySelector('.prototype-browser')).toHaveAttribute('data-phase','0');
 });
 it('connects the personal story to all three specialties and the complete portfolio',()=>{
  render(<HistoryPage />);
  expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1);
  expect(screen.getByRole('link',{name:'← Volver al portfolio completo'})).toHaveAttribute('href','/');
  expect(screen.getByRole('link',{name:/Explora cómo construyo/})).toHaveAttribute('href','/web-producto/');
  expect(screen.getByRole('link',{name:/Sigue el movimiento/})).toHaveAttribute('href','/motion/');
  expect(screen.getByRole('link',{name:/Explora mi otra dimensión/})).toHaveAttribute('href','/3d/');
 });
});
