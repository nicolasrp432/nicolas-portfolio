import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { site, socials, getWhatsappUrl } from '../data/site';
import { Footer } from '../components/chrome/Footer';
import { WhatsAppButton } from '../components/ui/WhatsAppButton';
import { Contact } from '../components/sections/Contact';

describe('WhatsApp configuration in site data', () => {
  it('generates a valid WhatsApp URL with clean digits and encoded message', () => {
    const url = getWhatsappUrl();
    expect(url).toContain('https://wa.me/');
    expect(url).toContain(site.whatsapp);
    if (site.whatsappMessage) {
      expect(url).toContain(encodeURIComponent(site.whatsappMessage));
    }
  });

  it('includes WhatsApp in the socials list', () => {
    const wa = socials.find((item) => item.id === 'whatsapp');
    expect(wa).toBeDefined();
    expect(wa.label).toBe('WhatsApp');
    expect(wa.url).toContain('https://wa.me/');
    expect(wa.handle).toBeTruthy();
  });
});

describe('WhatsApp in Footer', () => {
  it('renders a WhatsApp link in the colophon with appropriate target and rel', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'WhatsApp' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/'));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});

describe('WhatsAppButton', () => {
  it('renders a persistent floating action link with accessible label and custom cursor attribute', () => {
    render(<WhatsAppButton />);
    const button = screen.getByRole('link', { name: /contactar por whatsapp/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', expect.stringContaining('https://wa.me/'));
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noreferrer');
    expect(button).toHaveAttribute('data-cursor', 'CHAT');
    expect(within(button).getByText('WhatsApp')).toBeInTheDocument();
  });
});

describe('WhatsApp in Contact section', () => {
  it('displays WhatsApp channel among the contact options', () => {
    render(<Contact />);
    const waLink = screen.getByRole('link', { name: /whatsapp/i });
    expect(waLink).toBeInTheDocument();
    expect(waLink).toHaveAttribute('href', expect.stringContaining('https://wa.me/'));
    expect(waLink).toHaveAttribute('target', '_blank');
  });
});
