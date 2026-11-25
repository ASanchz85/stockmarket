import TradingViewWidget from '../components/TradingViewWidget.jsx';
import Panel from '../components/Panel.jsx';
import Header from '../components/Header.jsx';
import BondTape from '../components/BondTape.jsx';
import RatesStrip from '../components/RatesStrip.jsx';
import { tickerTapeTv, vix, miniChart, tvIndices, tvStocks } from '../config.js';

const ACCENTS = ['var(--accent)', 'var(--violet)', 'var(--cyan)', 'var(--green)', 'var(--amber)', 'var(--red)'];

// Versión simplificada para TV 1440×900 vista a distancia:
// rejilla de mini-charts de índices (1 año) + columna derecha con VIX y top 5 del S&P 500.
export default function TvLayout() {
  return (
    <div className="dashboard dashboard--tv">
      <div className="tape area-ticker">
        <TradingViewWidget type="ticker-tape" config={tickerTapeTv} className="zoom-tape" />
      </div>

      <div className="area-header">
        <Header />
      </div>

      <div className="area-main" style={{ '--rows': Math.ceil(tvIndices.length / 3) }}>
        {tvIndices.map((idx, i) => (
          <Panel key={idx.symbol} title={idx.title} tag="1 año" accent={ACCENTS[i % ACCENTS.length]}>
            <TradingViewWidget type="mini-symbol-overview" config={miniChart(idx.symbol)} className="fill zoom-mini" />
          </Panel>
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
        <BondTape />
        <RatesStrip />
      </div>
    </div>
  );
}
