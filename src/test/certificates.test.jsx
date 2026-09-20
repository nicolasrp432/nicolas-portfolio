import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// The real list ships empty, so the populated state has to be simulated. The
// mock is module-wide, which is why these tests live in their own file.
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
  it('starts folded', () => {
    const { container } = render(<Certificates />);

    const fold = container.querySelector('details');
    expect(fold).toBeInTheDocument();
    expect(fold.open).toBe(false);
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('is reachable by keyboard and opens on activation', async () => {
    const { container } = render(<Certificates />);
    const fold = container.querySelector('details');
    const summary = container.querySelector('summary');

    // Tab reaches it without a tabindex: that is the native element earning
    // its keep. jsdom implements click activation on <summary> but not Enter
    // or Space, so the activation itself is asserted with a click — the key
    // handling is the browser's, which is precisely why it is not hand-rolled.
    await userEvent.tab();
    expect(summary).toHaveFocus();

    await userEvent.click(summary);
    expect(fold.open).toBe(true);

    await userEvent.click(summary);
    expect(fold.open).toBe(false);
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
    expect(screen.getByText(/noviembre de 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/marzo de 2026/i)).toBeInTheDocument();
  });
});
