import TradingViewWidget from '../components/TradingViewWidget.jsx';
import Panel from '../components/Panel.jsx';
import Header from '../components/Header.jsx';
import BondTape from '../components/BondTape.jsx';
import RatesStrip from '../components/RatesStrip.jsx';
import { tickerTapeTv, vix, mainChart, worldIndices, featuredStocks } from '../config.js';

// Versión simplificada para TV 1440×900 vista a distancia: sin noticias ni mapa de calor,
// y con los widgets ampliados (ver .dashboard--tv en styles.css).
export default function TvLayout() {
  return (
    <div className="dashboard dashboard--tv">
      <div className="row-top">
        <div className="tape area-ticker">
          <TradingViewWidget type="ticker-tape" config={tickerTapeTv} className="zoom-tape" />
        </div>
        <div className="area-header">
          <Header />
        </div>
        <Panel className="area-vix" title="VIX" tag="Volatilidad" accent="var(--red)">
          <TradingViewWidget type="tickers" config={vix} className="zoom-vix" />
        </Panel>
      </div>

      <div className="row-middle">
        <Panel className="panel--chart" title="Gráfico" tag="Por defecto: IBEX 35">
          <TradingViewWidget type="advanced-chart" config={mainChart} className="fill zoom-chart" />
        </Panel>

        <div className="stack">
          <Panel className="panel--quotes" title="Índices mundiales" accent="var(--violet)">
            <TradingViewWidget type="market-quotes" config={worldIndices} className="fill zoom-quotes" />
          </Panel>
          <Panel className="panel--quotes" title="Top 5 S&P 500" tag="Capitalización" accent="var(--cyan)">
            <TradingViewWidget type="market-quotes" config={featuredStocks} className="fill zoom-quotes" />
          </Panel>
        </div>
      </div>

      <div className="row-tape">
        <BondTape />
        <RatesStrip />
      </div>
    </div>
  );
}
