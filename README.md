# Mercados · Panel para TV (1440×900)

Dashboard sin interacción construido con React + Vite y widgets de TradingView (locale `es`).

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173 (expuesto en la red con --host)
npm run build     # genera dist/ (estático, servible con cualquier servidor web)
npm run preview   # sirve dist/ en http://localhost:4173
```

- Símbolos y configuración de cada widget: `src/config.js`.
- Layout y estética: `src/styles.css` (grid de 3 columnas y 4 filas).
- La cinta de deuda (`src/components/BondTape.jsx`) lee las rentabilidades a 10A del servicio público de CNBC cada 60 s (TradingView no las permite en widgets) y calcula la prima de riesgo frente al Bund.
- La página se recarga sola cada `RELOAD_EVERY_HOURS` horas.
- En la TV: abrir en modo quiosco/pantalla completa (F11) a 1440×900.
