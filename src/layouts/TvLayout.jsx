import TradingViewWidget from '../components/TradingViewWidget.jsx';
import Panel from '../components/Panel.jsx';
import BondTape from '../components/BondTape.jsx';
import RatesStrip from '../components/RatesStrip.jsx';
import { tickerTapeTv, vix, miniChart, tvIndices, tvStocks } from '../config.js';

// Versión simplificada para TV 1440×900 vista a distancia.
// Columna derecha: 6 tarjetas iguales (VIX + top 5 S&P 500). Las dos cintas miden lo mismo
// que una tarjeta y se alinean con la primera y la última; los índices ocupan el resto.
export default function TvLayout() {
  return (
    <div className="dashboard dashboard--tv">
      <div className="tape area-ticker">
        <TradingViewWidget type="ticker-tape" config={tickerTapeTv} className="zoom-tape" />
      </div>

      <div className="area-main" style={{ '--rows': Math.ceil(tvIndices.length / 3) }}>
        {tvIndices.map((idx) => (
          <div key={idx.symbol} className="panel mini-card" title={idx.title}>
            <TradingViewWidget type="mini-symbol-overview" config={miniChart(idx.symbol)} className="fill zoom-mini" />
          </div>
        ))}
      </div>

      <aside className="area-side">
        <Panel className="area-vix" title="VIX" tag="Volatilidad" accent="var(--red)">
          <TradingViewWidget type="tickers" config={vix} className="zoom-vix" />
        </Panel>
        {tvStocks.map((symbol) => (
          <div key={symbol} className="panel mini-card">
            <TradingViewWidget
              type="mini-symbol-overview"
              config={miniChart(symbol, { noTimeScale: true })}
              className="fill zoom-stock"
            />
          </div>
        ))}
      </aside>

      <div className="row-tape area-bottom">
        <RatesStrip />
        <BondTape showPremium={false} />
      </div>
    </div>
  );
}
