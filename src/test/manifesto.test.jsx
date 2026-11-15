import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Profile } from '../components/sections/Profile';

describe('Interactive manifesto', () => {
  it('connects the moving pieces to the principles and pauses the menu', async () => {
    const user = userEvent.setup();
    const { container } = render(<Profile />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Así muevo mis ideas.');
    const strategy = screen.getByRole('button', { name: 'Pensar la siguiente jugada' });
    await user.click(strategy);
    expect(strategy).toHaveAttribute('aria-pressed', 'true');
    expect(within(container.querySelector('.manifesto-idea')).getByRole('heading')).toHaveTextContent('Pensar la siguiente jugada');
    expect(container.querySelector('.tilted-grid-hero')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.manifesto-symbol')).toHaveLength(5);
    await user.click(screen.getByRole('button', { name: 'Idea siguiente' }));
    expect(within(container.querySelector('.manifesto-idea')).getByRole('heading')).toHaveTextContent('Crear algo que se sienta');
    await user.click(screen.getByRole('button', { name: 'Reanudar movimiento del manifiesto' }));
    expect(screen.getByRole('button', { name: 'Pausar movimiento del manifiesto' })).toBeInTheDocument();
  });

  it('preserves the personal statement and education link', () => {
    const { container } = render(<Profile />);
    expect(container.querySelector('blockquote')).toHaveTextContent('No me interesa solo hacer cosas que funcionen, sino dejar huella en este mundo.');
    expect(screen.getByRole('link', { name: /La curiosidad se practica/ })).toHaveAttribute('href', '/educacion/');
  });
});
