import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Cursor } from '../components/chrome/Cursor';

describe('cursor lifecycle', () => {
  it('keeps the native pointer until the replacement knows its position and restores it on leaving', () => {
    render(<Cursor />);
    expect(document.documentElement).not.toHaveAttribute('data-custom-cursor');
    fireEvent.pointerMove(window, { clientX: 120, clientY: 200 });
    expect(document.documentElement).toHaveAttribute('data-custom-cursor');
    fireEvent.pointerLeave(document);
    expect(document.documentElement).not.toHaveAttribute('data-custom-cursor');
  });
  it('restores the native pointer on blur and on unmount', () => {
    const { unmount } = render(<Cursor />);
    fireEvent.pointerMove(window, { clientX: 20, clientY: 20 });
    fireEvent.blur(window);
    expect(document.documentElement).not.toHaveAttribute('data-custom-cursor');
    fireEvent.pointerMove(window, { clientX: 40, clientY: 40 });
    expect(document.documentElement).toHaveAttribute('data-custom-cursor');
    unmount();
    expect(document.documentElement).not.toHaveAttribute('data-custom-cursor');
    fireEvent.pointerMove(window, { clientX: 60, clientY: 60 });
    expect(document.documentElement).not.toHaveAttribute('data-custom-cursor');
  });
});
