import { useEffect } from 'react';

// Oculta el puntero tras `ms` sin mover el ratón; reaparece al moverlo.
export default function useAutoHideCursor(ms = 3000) {
  useEffect(() => {
    let timer;
    const show = () => {
      document.body.classList.remove('cursor-hidden');
      clearTimeout(timer);
      timer = setTimeout(() => document.body.classList.add('cursor-hidden'), ms);
    };
    show();
    window.addEventListener('mousemove', show);
    window.addEventListener('mousedown', show);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', show);
      window.removeEventListener('mousedown', show);
    };
  }, [ms]);
}
