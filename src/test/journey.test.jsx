import { describe,it,expect,vi,afterEach } from 'vitest';
import { render,screen,within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPage from '../HistoryPage';
import { journey } from '../data/journey';
afterEach(()=>vi.unstubAllGlobals());
describe('biographical journey',()=>{
 it('tells the confirmed career stages and provides working chapter destinations',()=>{
  const {container}=render(<HistoryPage />);
  expect(screen.getByText(/Entre 2023 y 2025 trabajé en marketing en Colombia/)).toBeVisible();
  expect(screen.getByText(/En Platzi aprendí diseño/)).toBeVisible();
  expect(screen.getByText(/Estudio en 42 Urduliz Bizkaia/)).toBeVisible();
  expect(screen.getByText(/Hoy vivo en Bilbao/)).toBeVisible();
  const nav=within(screen.getByRole('navigation',{name:'Etapas de mi recorrido'}));
  journey.forEach(chapter=>{expect(nav.getByRole('link',{name:new RegExp(chapter.label)})).toHaveAttribute('href',`#${chapter.id}`);expect(container.querySelector(`#${chapter.id}`)).not.toBeNull();});
  expect(screen.getByText(/Las escenas de este relato son recreaciones/)).toBeVisible();
 });
 it('lets the visitor pause depth effects without removing biography or links',async()=>{
  const {container}=render(<HistoryPage />);await userEvent.click(screen.getByRole('button',{name:'Pausar efectos'}));
  expect(container.querySelector('.journey-experience')).toHaveAttribute('data-still','true');
  expect(screen.getByRole('heading',{name:'Después quise darle vida.'})).toBeVisible();
  expect(screen.getByRole('link',{name:'Explora cómo construyo ↗'})).toHaveAttribute('href','/web-producto/');
 });
 it('starts with effects disabled when reduced motion is requested',()=>{
  vi.stubGlobal('matchMedia',q=>({matches:q.includes('reduced-motion'),addEventListener(){},removeEventListener(){}}));
  render(<HistoryPage />);expect(screen.getByRole('button',{name:'Efectos pausados'})).toBeDisabled();
 });
 it('provides a chapter-specific symbol before WebGL loads and with reduced motion',()=>{
  vi.stubGlobal('matchMedia',q=>({matches:q.includes('reduced-motion'),addEventListener(){},removeEventListener(){}}));
  const {container}=render(<HistoryPage />);
  const stages=['social','design','react','king'];
  journey.forEach((chapter,index)=>{
   const symbol=container.querySelector(`#${chapter.id} .atlas-static-symbol`);
   expect(symbol).toHaveAttribute('data-stage',stages[index]);
   expect(symbol).toBeVisible();
   if(index<3) expect(symbol.tagName.toLowerCase()).toBe('svg');
  });
  expect(container.querySelectorAll('img[src="/img/manifesto/icons/strategy.webp"]')).toHaveLength(1);
  expect(container.querySelectorAll('.atlas-traveller-canvas')).toHaveLength(1);
 });
});
