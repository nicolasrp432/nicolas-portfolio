import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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
  it('renders the certificates gallery section with track and cards', () => {
    const { container } = render(<Certificates />);

    const section = container.querySelector('section#certificaciones');
    expect(section).toBeInTheDocument();
    expect(container.querySelector('.cert-track')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('shows whichever proof each certificate has', () => {
    render(<Certificates />);

    expect(screen.getByRole('link', { name: /verificar/i })).toHaveAttribute(
      'href',
      'https://ejemplo.test/verificar',
    );
    expect(screen.getByRole('link', { name: /documento/i })).toHaveAttribute(
      'href',
      '/certificados/dos.pdf',
    );
    // Only one of the two entries carries each kind of proof.
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('writes the date in words', () => {
    render(<Certificates />);
    expect(screen.getAllByText(/noviembre de 2025/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/marzo de 2026/i).length).toBeGreaterThan(0);
  });

  it('provides a duplicate set for the seamless infinite loop with aria-hidden', () => {
    const { container } = render(<Certificates />);
    const clones = container.querySelectorAll('.cert-card[aria-hidden="true"]');
    expect(clones.length).toBe(2);
  });
});
