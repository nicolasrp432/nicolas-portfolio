import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceOrbitCarousel } from '../components/ui/service-orbit-carousel';
import { services } from '../data/services';

describe('service explorer', () => {
  it('changes the service, stack and destination together, and wraps via controls', async () => {
    render(<ServiceOrbitCarousel items={services} />);
    const user = userEvent.setup();
    expect(screen.getByRole('heading', { name: /Desarrollo/ })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Servicio siguiente' }));
    expect(screen.getByRole('heading', { name: /Diseño/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hablemos de diseño/ })).toHaveAttribute('href', '#contacto');
    expect(within(screen.getByRole('list', { name: 'Herramientas para Diseño gráfico & UI' })).getByText('Figma')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Servicio anterior' }));
    await user.click(screen.getByRole('button', { name: 'Servicio anterior' }));
    expect(screen.getByRole('button', { name: 'IA & automatización' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps process selection while choosing another area with the keyboard', async () => {
    render(<ServiceOrbitCarousel items={services} />);
    const user = userEvent.setup();
    const process = screen.getByRole('button', { name: 'Mi proceso' });
    await user.click(process);
    expect(screen.getByText(services[0].process[0])).toBeInTheDocument();
    await user.keyboard('{ArrowRight}');
    expect(process).toHaveFocus();
    expect(process).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(services[1].process[0])).toBeInTheDocument();
    expect(screen.queryByText(services[0].process[0])).not.toBeInTheDocument();
  });
});
