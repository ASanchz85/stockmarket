import { useEffect } from 'react';
import FullLayout from './layouts/FullLayout.jsx';
import TvLayout from './layouts/TvLayout.jsx';
import useAutoHideCursor from './useAutoHideCursor.js';
import { RELOAD_EVERY_HOURS, FULL_LAYOUT_MIN_HEIGHT } from './config.js';

// Elige la versión: ?layout=full | ?layout=tv, o automáticamente según la altura de la pantalla.
function pickLayout() {
  const forced = new URLSearchParams(window.location.search).get('layout');
  if (forced === 'full' || forced === 'tv') return forced;
  return window.innerHeight >= FULL_LAYOUT_MIN_HEIGHT ? 'full' : 'tv';
}

export default function App() {
  useAutoHideCursor();

  useEffect(() => {
    const id = setTimeout(() => window.location.reload(), RELOAD_EVERY_HOURS * 3600 * 1000);
    return () => clearTimeout(id);
  }, []);

  return pickLayout() === 'full' ? <FullLayout /> : <TvLayout />;
}
