import { memo, useEffect, useRef } from 'react';

const BASE = 'https://s3.tradingview.com/external-embedding/embed-widget-';

/**
 * Inserta un widget de TradingView (formato iframe) dentro de un contenedor.
 * `type` es el sufijo del script: 'ticker-tape', 'advanced-chart', 'timeline'...
 */
function TradingViewWidget({ type, config, className = '' }) {
  const ref = useRef(null);
  const configKey = JSON.stringify(config);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.innerHTML = '';
    const target = document.createElement('div');
    target.className = 'tradingview-widget-container__widget';
    container.appendChild(target);

    const script = document.createElement('script');
    script.src = `${BASE}${type}.js`;
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = configKey;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [type, configKey]);

  return <div ref={ref} className={`tradingview-widget-container ${className}`} />;
}

export default memo(TradingViewWidget);
