import { useEffect, useState } from 'react';
import { bonds, BONDS_REFRESH_SECONDS } from '../config.js';

const ENDPOINT = 'https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol';

const num = (v) => {
  const n = parseFloat(String(v ?? '').replace('%', '').replace(',', ''));
  return Number.isFinite(n) ? n : null;
};
const fmt = (n, d = 2) => n.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const signed = (n, d = 0) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${fmt(Math.abs(n), d)}`;
const trend = (n) => (n > 0 ? 'up' : n < 0 ? 'down' : 'flat');

async function fetchYields() {
  const params = new URLSearchParams({
    symbols: bonds.map((b) => b.symbol).join('|'),
    requestMethod: 'itv',
    noform: '1',
    partnerId: '2',
    fund: '1',
    exthrs: '1',
    output: 'json',
  });
  const res = await fetch(`${ENDPOINT}?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  let quotes = json?.FormattedQuoteResult?.FormattedQuote ?? [];
  if (!Array.isArray(quotes)) quotes = [quotes];
  const bySymbol = Object.fromEntries(quotes.map((q) => [q.symbol, q]));

  return bonds
    .map((b) => {
      const q = bySymbol[b.symbol];
      const yld = num(q?.last);
      if (yld === null) return null;
      return { ...b, yld, changeBp: (num(q?.change) ?? 0) * 100 };
    })
    .filter(Boolean);
}

function BondItem({ b, bund }) {
  const spread = bund && !b.benchmark ? Math.round((b.yld - bund.yld) * 100) : null;
  return (
    <li className={`bond ${b.code === 'ES' ? 'bond--home' : ''}`}>
      <span className="bond__top">
        <span className="bond__code">{b.code}</span>
        <span className="bond__name">{b.name}</span>
        <span className="bond__yld">{fmt(b.yld, 3)}%</span>
      </span>
      <span className="bond__bottom">
        <span className={`bond__chg ${trend(b.changeBp)}`}>{signed(b.changeBp, 1)} pb</span>
        {b.benchmark && <span className="bond__spread is-ref">referencia</span>}
        {spread !== null && <span className="bond__spread">prima {signed(spread)} pb</span>}
      </span>
    </li>
  );
}

// showPremium: bloque fijo con la prima de riesgo de España (la versión TV no lo usa:
// España ya aparece con su prima dentro de la cinta que rota).
export default function BondTape({ showPremium = true }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetchYields()
        .then((d) => alive && (setData(d), setError(false)))
        .catch(() => alive && setError(true)); // se conservan los últimos datos
    load();
    const id = setInterval(load, BONDS_REFRESH_SECONDS * 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const bund = data.find((b) => b.benchmark);
  const spain = data.find((b) => b.code === 'ES');
  const premium = bund && spain ? Math.round((spain.yld - bund.yld) * 100) : null;

  return (
    <div className="tape area-bonds">
      <span className="tape__label">
        Deuda 10A
        {error && <span className="tape__warn" title="Sin conexión con la fuente">●</span>}
      </span>
      {showPremium && premium !== null && (
        <span className="premium">
          <span className="premium__label">Prima de riesgo ES</span>
          <span className="premium__value">{premium} pb</span>
        </span>
      )}
      <div className="marquee">
        {data.length > 0 && (
          <div className="marquee__track" style={{ '--items': data.length }}>
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee__group" aria-hidden={copy === 1}>
                {data.map((b) => (
                  <BondItem key={b.code} b={b} bund={bund} />
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
