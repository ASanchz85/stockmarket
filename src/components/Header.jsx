import { useEffect, useState } from 'react';
import { sessions } from '../config.js';

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

function sessionState(now, { tz, open, close }) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const weekend = parts.weekday === 'Sat' || parts.weekday === 'Sun';
  const isOpen = !weekend && minutes >= toMinutes(open) && minutes < toMinutes(close);
  return { isOpen, localTime: `${parts.hour}:${parts.minute}` };
}

export default function Header() {
  const now = useNow();

  const time = now.toLocaleTimeString('es-ES', { timeZone: 'Europe/Madrid', hour12: false });
  const date = now.toLocaleDateString('es-ES', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand__live" />
        <span className="brand__name">Mercados</span>
      </div>

      <div className="clock">
        <span className="clock__time">{time}</span>
        <span className="clock__date">{date}</span>
      </div>

      <ul className="sessions">
        {sessions.map((s) => {
          const { isOpen, localTime } = sessionState(now, s);
          return (
            <li key={s.label} className={`session ${isOpen ? 'is-open' : 'is-closed'}`}>
              <span className="session__dot" />
              <span className="session__name">{s.label}</span>
              <span className="session__time">{localTime}</span>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
