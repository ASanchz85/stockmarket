import { useEffect, useState } from 'react';
import { ECB_API, rates, RATES_REFRESH_HOURS } from '../config.js';

const fmt = (n, d) => n.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const monthName = (period) =>
  new Date(`${period}-01T12:00:00`).toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });

async function fetchRate({ key }) {
  const res = await fetch(`${ECB_API}/${key}?lastNObservations=2&format=csvdata`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const [header, ...rows] = (await res.text()).trim().split('\n');
  const cols = header.split(',');
  const iTime = cols.indexOf('TIME_PERIOD');
  const iValue = cols.indexOf('OBS_VALUE');
  const obs = rows
    .map((r) => r.split(','))
    .map((c) => ({ period: c[iTime], value: parseFloat(c[iValue]) }))
    .filter((o) => Number.isFinite(o.value));
  const last = obs.at(-1);
  const prev = obs.at(-2);
  return last ? { ...last, changeBp: prev ? (last.value - prev.value) * 100 : null } : null;
}

export default function RatesStrip() {
  const [values, setValues] = useState({});

  useEffect(() => {
    let alive = true;
    const load = () =>
      rates.forEach((r) =>
        fetchRate(r)
          .then((v) => alive && v && setValues((prev) => ({ ...prev, [r.key]: v })))
          .catch(() => {}), // se conservan los últimos datos
      );
    load();
    const id = setInterval(load, RATES_REFRESH_HOURS * 3600 * 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="rates">
      {rates.map((r) => {
        const v = values[r.key];
        const chg = v?.changeBp;
        return (
          <div key={r.key} className={`rate ${r.highlight ? 'is-highlight' : ''}`}>
            <span className="rate__label">{r.label}</span>
            <span className="rate__value">{v ? `${fmt(v.value, r.monthly ? 3 : 2)}%` : '—'}</span>
            {v && r.monthly && (
              <span className="rate__meta">
                <span>media {monthName(v.period)}</span>
                {chg != null && (
                  <span className={`rate__chg ${chg > 0 ? 'up' : chg < 0 ? 'down' : ''}`}>
                    {chg > 0 ? '+' : chg < 0 ? '−' : ''}
                    {fmt(Math.abs(chg), 1)} pb
                  </span>
                )}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
