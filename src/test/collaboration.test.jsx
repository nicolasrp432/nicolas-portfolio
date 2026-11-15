import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from '../components/sections/Contact';
import { Roadmap } from '../components/sections/Roadmap';
import { closingImages } from '../data/manifesto';
import { site, socials } from '../data/site';

describe('Client collaboration path and closing', () => {
  it('explains the four stages and leads to contact', () => {
    render(<Roadmap />);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByRole('heading', { name: 'Acordamos un plan claro' })).toBeInTheDocument();
    expect(screen.getByText(/Definimos alcance, entregables, tiempos y presupuesto/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hablemos de tu proyecto/ })).toHaveAttribute('href', '#contacto');
  });
  it('keeps the CTA and contact channels alongside a pausable artwork ribbon', async () => {
    const user = userEvent.setup();
    const { container } = render(<Contact />);
    const heading = screen.getByRole('heading', { name: 'Hagámoslo real.' });
    expect(heading).toBeInTheDocument();
    const gallery = container.querySelector('.contact-gallery');
    expect(heading.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(gallery.compareDocumentPosition(container.querySelector('.contact-channels')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute('href', `mailto:${site.email}`);
    const links = within(container.querySelector('.contact-socials')).getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(socials.filter((social) => social.id !== 'email').map((social) => social.url));
    await user.click(screen.getByRole('button', { name: 'Pausar cinta visual' }));
    expect(screen.getByRole('button', { name: 'Reanudar cinta visual' })).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('.tilted-grid-hero')).toHaveAttribute('data-paused', 'true');
    await user.click(screen.getByRole('button', { name: 'Reanudar cinta visual' }));
    expect(screen.getByRole('button', { name: 'Pausar cinta visual' })).toHaveAttribute('aria-pressed', 'false');
    expect(closingImages).toHaveLength(3);
    expect(closingImages.every(({ src }) => src.startsWith('/img/manifesto/'))).toBe(true);
  });
});
