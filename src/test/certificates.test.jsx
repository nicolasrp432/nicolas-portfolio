import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, within } from '@testing-library/react';

// The mock is module-wide, so these tests live in their own file.
vi.mock('../data/education', async (importOriginal) => ({
  ...(await importOriginal()),
  certificates: [
    {
      id: 'uno',
      title: 'Curso de prueba',
      issuer: 'Platzi',
      date: '2025-11',
      verifyUrl: 'https://ejemplo.test/verificar',
    },
    {
      id: 'dos',
      title: 'Otro curso',
      issuer: '42',
      date: '2026-03',
      file: '/certificados/dos.pdf',
    },
  ],
}));

const { Certificates } = await import('../components/sections/Certificates');

describe('Certificates', () => {
  it('exposes only the front credential and its original proof', () => {
    const { container } = render(<Certificates />);
    expect(container.querySelector('section#certificaciones')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link', { name: /verificar/i })).toHaveAttribute('href', 'https://ejemplo.test/verificar');
    expect(screen.getByRole('button', { name: /Ampliar certificado: Curso/ })).toBeDisabled();
  });

  it('cycles both ways without counting the repeated visual faces as credentials', async () => {
    const user = userEvent.setup();
    render(<Certificates />);
    await user.click(screen.getByRole('button', { name: 'Certificado siguiente' }));
    expect(screen.getByRole('link', { name: /documento/i })).toHaveAttribute('href', '/certificados/dos.pdf');
    expect(screen.getByRole('group', { name: '2 de 2' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Certificado siguiente' }));
    expect(screen.getByRole('group', { name: '1 de 2' })).toBeInTheDocument();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('group', { name: '2 de 2' })).toBeInTheDocument();
  });

  it('opens the full image, traps focus and restores focus after Escape', async () => {
    const user = userEvent.setup();
    render(<Certificates />);
    await user.click(screen.getByRole('button', { name: 'Certificado siguiente' }));
    const opener = screen.getByRole('button', { name: 'Ampliar certificado: Otro curso' });
    await user.click(opener);
    const dialog = screen.getByRole('dialog', { name: 'Otro curso' });
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', '/certificados/dos.jpg');
    const close = within(dialog).getByRole('button', { name: 'Cerrar certificado' });
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(within(dialog).getByRole('link')).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body).not.toHaveAttribute('data-scroll-locked');
  });

  it('keeps the document available when an image fails', async () => {
    const user = userEvent.setup();
    render(<Certificates />);
    await user.click(screen.getByRole('button', { name: 'Certificado siguiente' }));
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('button', { name: /Ampliar certificado: Otro/ })).toBeDisabled();
    expect(screen.getByRole('link', { name: /documento/i })).toHaveAttribute('href', '/certificados/dos.pdf');
  });

  it('writes dates in words and removes background faces from interaction', () => {
    const { container } = render(<Certificates />);
    expect(screen.getAllByText(/noviembre de 2025/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/marzo de 2026/i).length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.three-d-carousel-face[inert][aria-hidden="true"]')).toHaveLength(5);
  });
});
