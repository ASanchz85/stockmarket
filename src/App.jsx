import { useEffect } from 'react';
import TradingViewWidget from './components/TradingViewWidget.jsx';
import Panel from './components/Panel.jsx';
import Header from './components/Header.jsx';
import BondTape from './components/BondTape.jsx';
import RatesStrip from './components/RatesStrip.jsx';
import useAutoHideCursor from './useAutoHideCursor.js';
import {
  tickerTape,
  vix,
  mainChart,
  news,
  worldIndices,
  featuredStocks,
  ibexHeatmap,
  RELOAD_EVERY_HOURS,
} from './config.js';

export default function App() {
  useAutoHideCursor();

  useEffect(() => {
    const id = setTimeout(() => window.location.reload(), RELOAD_EVERY_HOURS * 3600 * 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="dashboard">
      <div className="row-top">
        <div className="tape area-ticker">
          <TradingViewWidget type="ticker-tape" config={tickerTape} />
        </div>
        <div className="area-header">
          <Header />
        </div>
        <Panel className="area-vix" title="VIX" tag="Volatilidad" accent="var(--red)">
          <TradingViewWidget type="tickers" config={vix} />
        </Panel>
      </div>

      <div className="row-middle">
        <Panel className="panel--chart" title="Gráfico" tag="Por defecto: IBEX 35">
          <TradingViewWidget type="advanced-chart" config={mainChart} className="fill" />
        </Panel>

        <Panel title="Últimas noticias" accent="var(--amber)">
          <TradingViewWidget type="timeline" config={news} className="fill" />
        </Panel>
      </div>

      <div className="row-bottom">
        <Panel className="panel--quotes" title="Índices mundiales" accent="var(--violet)">
          <TradingViewWidget type="market-quotes" config={worldIndices} className="fill" />
        </Panel>

        <Panel title="Mapa de calor · IBEX 35" accent="var(--green)">
          <TradingViewWidget type="stock-heatmap" config={ibexHeatmap} className="fill" />
        </Panel>

        <Panel className="panel--quotes" title="Top 5 S&P 500" tag="Capitalización" accent="var(--cyan)">
          <TradingViewWidget type="market-quotes" config={featuredStocks} className="fill" />
        </Panel>
      </div>

      <div className="row-tape">
        <BondTape />
        <RatesStrip />
      </div>
    </div>
  );
}
