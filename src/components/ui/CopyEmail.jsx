import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

/**
 * The email address as a dual control: the address itself is a `mailto:` link,
 * and a separate button copies it to the clipboard.
 *
 * Two affordances because visitors split cleanly between people who want their
 * mail client and people who are writing the address down somewhere else.
 * Result is announced via `aria-live` so it is not a purely visual confirmation,
 * and falls back to selecting the text where the Clipboard API is unavailable.
 */
export function CopyEmail({ email }) {
  const [state, setState] = useState('idle');
  const timer = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = (next) => {
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2400);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      flash('copied');
    } catch {
      // No clipboard permission (or no secure context): select the address so
      // the visitor can copy it with the keyboard instead.
      const node = addressRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      flash('manual');
    }
  };

  const message = {
    idle: '',
    copied: 'Email copiado al portapapeles',
    manual: 'Email seleccionado: cópialo con tu teclado',
  }[state];

  return (
    <div className="copy-email">
      <a className="copy-email-address" href={`mailto:${email}`} ref={addressRef} data-cursor="ESCRIBIR">
        {email}
      </a>
      <button className="copy-email-button" type="button" onClick={copy}>
        {state === 'copied' ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
        <span>{state === 'copied' ? 'Copiado' : 'Copiar'}</span>
      </button>
      <p className="copy-email-status" role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
