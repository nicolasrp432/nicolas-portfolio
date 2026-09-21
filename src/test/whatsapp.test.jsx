import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { site, socials, whatsappPresets, getWhatsappUrl } from '../data/site';
import { Footer } from '../components/chrome/Footer';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';
import { Contact } from '../components/sections/Contact';

describe('WhatsApp configuration in site data', () => {
  it('uses the real phone number +34 665015804', () => {
    expect(site.whatsapp).toBe('34665015804');
    expect(site.whatsappDisplay).toBe('+34 665 015 804');
  });

  it('generates a valid WhatsApp URL with the real number and encoded message', () => {
    const url = getWhatsappUrl();
    expect(url).toBe(
      `https://wa.me/34665015804?text=${encodeURIComponent(site.whatsappMessage)}`,
    );
  });

  it('supports generating custom preset URLs', () => {
    const custom = getWhatsappUrl('Hola Nicolás, prueba de mensaje.');
    expect(custom).toContain('https://wa.me/34665015804?text=');
    expect(custom).toContain(encodeURIComponent('Hola Nicolás, prueba de mensaje.'));
  });

  it('includes WhatsApp in the socials list', () => {
    const wa = socials.find((item) => item.id === 'whatsapp');
    expect(wa).toBeDefined();
    expect(wa.label).toBe('WhatsApp');
    expect(wa.url).toContain('https://wa.me/34665015804');
    expect(wa.handle).toBe('+34 665 015 804');
  });

  it('provides curated presets with required fields', () => {
    expect(whatsappPresets.length).toBeGreaterThanOrEqual(3);
    whatsappPresets.forEach((preset) => {
      expect(preset.id).toBeTruthy();
      expect(preset.title).toBeTruthy();
      expect(preset.badge).toBeTruthy();
      expect(preset.text).toBeTruthy();
      expect(preset.text).toContain('Nicolás');
    });
  });
});

describe('WhatsApp in Footer', () => {
  it('renders a WhatsApp link in the colophon targeting the real number', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'WhatsApp' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/34665015804'));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});

describe('WhatsAppButton with preset message flyout', () => {
  it('renders a floating trigger button with accessible attributes', () => {
    render(<WhatsAppButton />);
    const trigger = screen.getByRole('button', { name: /contactar por whatsapp/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('data-cursor', 'CHAT');
  });

  it('opens the preset flyout modal on click and reveals presets', async () => {
    render(<WhatsAppButton />);
    const trigger = screen.getByRole('button', { name: /contactar por whatsapp/i });

    // Open modal
    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const dialog = screen.getByRole('dialog', { name: /opciones de contacto rápido por whatsapp/i });
    expect(dialog).toBeInTheDocument();

    // Check that presets are rendered as actionable links
    whatsappPresets.forEach((preset) => {
      const link = within(dialog).getByText(preset.title).closest('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/34665015804'));
      expect(link).toHaveAttribute('href', expect.stringContaining(encodeURIComponent(preset.text)));
      expect(link).toHaveAttribute('target', '_blank');
    });

    // Check direct blank chat link
    const blankLink = within(dialog).getByText(/abrir chat en blanco/i);
    expect(blankLink.closest('a')).toHaveAttribute('href', 'https://wa.me/34665015804');
  });

  it('can be closed via close button or escape key', async () => {
    render(<WhatsAppButton />);
    const trigger = screen.getByRole('button', { name: /contactar por whatsapp/i });

    await userEvent.click(trigger);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Close via close button in dialog
    const closeBtn = within(dialog).getByRole('button', { name: /cerrar opciones de whatsapp/i });
    await userEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Reopen and close via Escape
    await userEvent.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('WhatsApp in Contact section', () => {
  it('displays WhatsApp channel among the contact options', () => {
    render(<Contact />);
    const waLink = screen.getByRole('link', { name: /whatsapp/i });
    expect(waLink).toBeInTheDocument();
    expect(waLink).toHaveAttribute('href', expect.stringContaining('https://wa.me/34665015804'));
    expect(waLink).toHaveAttribute('target', '_blank');
  });
});
