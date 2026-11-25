// Toda la configuración del panel en un solo sitio.
// Si algún símbolo no carga en el widget, basta con cambiarlo aquí.

const LOCALE = 'es';
const BG = 'rgba(0,0,0,0)';

const tapeBase = {
  showSymbolLogo: true,
  isTransparent: true,
  displayMode: 'adaptive',
  colorTheme: 'dark',
  locale: LOCALE,
};

// Cinta superior: materias primas, cripto, divisa, índices fuera de la tabla e hipoteca EE. UU.
export const tickerTape = {
  ...tapeBase,
  symbols: [
    { proName: 'TVC:GOLD', title: 'Oro' },
    { proName: 'TVC:SILVER', title: 'Plata' },
    { proName: 'TVC:UKOIL', title: 'Brent' },
    { proName: 'TVC:USOIL', title: 'WTI' },
    { proName: 'CAPITALCOM:NATURALGAS', title: 'Gas natural' },
    { proName: 'CAPITALCOM:COPPER', title: 'Cobre' },
    { proName: 'BITSTAMP:BTCEUR', title: 'BTC/EUR' },
    { proName: 'BITSTAMP:ETHEUR', title: 'ETH/EUR' },
    { proName: 'FX:EURUSD', title: 'EUR/USD' },
    { proName: 'XETR:DAX', title: 'DAX' },
    { proName: 'EURONEXT:PX1', title: 'CAC 40' },
    { proName: 'FOREXCOM:UKXGBP', title: 'FTSE 100' },
    { proName: 'INDEX:FTSEMIB', title: 'FTSE MIB' },
    { proName: 'SSE:000001', title: 'Shanghái' },
    { proName: 'HSI:HSI', title: 'Hang Seng' },
    // Referencia de las hipotecas en EE. UU. (Freddie Mac, tipo fijo a 30 años, semanal)
    { proName: 'FRED:MORTGAGE30US', title: 'Hipoteca 30A EE. UU.' },
  ],
};

// Versión TV: misma cinta en modo de una sola línea (se amplía por CSS).
export const tickerTapeTv = { ...tickerTape, displayMode: 'regular' };

// Cinta inferior: rentabilidad del bono a 10 años del G8 + España.
// TradingView no permite rentabilidades soberanas en sus widgets, así que se leen del
// servicio público de cotizaciones de CNBC (no oficial, sin clave, con CORS abierto).
// La prima de riesgo se calcula frente al Bund alemán (`benchmark: true`).
export const bonds = [
  { code: 'ES', name: 'España', symbol: 'ES10Y-ES' },
  { code: 'DE', name: 'Alemania', symbol: 'DE10Y-DE', benchmark: true },
  { code: 'FR', name: 'Francia', symbol: 'FR10Y-FR' },
  { code: 'IT', name: 'Italia', symbol: 'IT10Y-IT' },
  { code: 'GB', name: 'Reino Unido', symbol: 'GB10Y-GB' },
  { code: 'US', name: 'EE. UU.', symbol: 'US10Y' },
  { code: 'JP', name: 'Japón', symbol: 'JP10Y-JP' },
  { code: 'CA', name: 'Canadá', symbol: 'CA10Y-CA' },
  { code: 'RU', name: 'Rusia', symbol: 'RU10Y-RU' }, // sin datos desde las sanciones; se oculta si no hay cotización
];
export const BONDS_REFRESH_SECONDS = 60;

// Tipos de referencia de la zona euro (API pública del BCE, con CORS abierto).
// El Euríbor 12M en media mensual es el índice oficial de revisión de hipotecas en España.
export const ECB_API = 'https://data-api.ecb.europa.eu/service/data';
export const rates = [
  { key: 'FM/M.U2.EUR.RT.MM.EURIBOR1YD_.HSTA', label: 'Euríbor 12M', note: 'hipotecas', monthly: true, highlight: true },
];
export const RATES_REFRESH_HOURS = 3;

export const vix = {
  symbols: [{ proName: 'CAPITALCOM:VIX', title: 'VIX' }],
  showSymbolLogo: false,
  isTransparent: true,
  colorTheme: 'dark',
  locale: LOCALE,
};

export const mainChart = {
  autosize: true,
  symbol: 'BME:IBC',
  interval: 'D',
  timezone: 'Europe/Madrid',
  theme: 'dark',
  style: '1',
  locale: LOCALE,
  backgroundColor: BG,
  gridColor: 'rgba(148,163,184,0.06)',
  hide_top_toolbar: false, // barra superior: buscar símbolo y cambiar intervalo
  hide_legend: false,
  hide_side_toolbar: true,
  hide_volume: true,
  allow_symbol_change: true, // clic en el nombre para cambiar de valor (vuelve al IBEX al recargar)
  save_image: false,
  calendar: false,
  withdateranges: false,
  details: false,
  studies: ['STD;EMA', 'STD;RSI'],
  support_host: 'https://www.tradingview.com',
};

export const news = {
  feedMode: 'all_symbols',
  isTransparent: true,
  displayMode: 'regular',
  width: '100%',
  height: '100%',
  colorTheme: 'dark',
  locale: LOCALE,
};

const quotesBase = {
  width: '100%',
  height: '100%',
  showSymbolLogo: true,
  isTransparent: true,
  colorTheme: 'dark',
  locale: LOCALE,
  backgroundColor: BG,
};

export const worldIndices = {
  ...quotesBase,
  symbolsGroups: [
    {
      name: 'Índices',
      originalName: 'Indices',
      symbols: [
        { name: 'FOREXCOM:SPXUSD', displayName: 'S&P 500' },
        { name: 'FOREXCOM:DJI', displayName: 'Dow Jones 30' },
        { name: 'FOREXCOM:NSXUSD', displayName: 'Nasdaq 100' },
        { name: 'FOREXCOM:EU50', displayName: 'Euro Stoxx 50' },
        { name: 'INDEX:NKY', displayName: 'Nikkei 225' },
      ],
    },
  ],
};

// Top 5 del S&P 500 por capitalización (noviembre 2026). Revisar de vez en cuando.
export const featuredStocks = {
  ...quotesBase,
  symbolsGroups: [
    {
      name: 'Top 5 S&P 500',
      originalName: 'Top 5',
      symbols: [
        { name: 'NASDAQ:AAPL', displayName: 'Apple' },
        { name: 'NASDAQ:NVDA', displayName: 'NVIDIA' },
        { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
        { name: 'NASDAQ:GOOGL', displayName: 'Alphabet' },
        { name: 'NASDAQ:AMZN', displayName: 'Amazon' },
      ],
    },
  ],
};

export const ibexHeatmap = {
  exchanges: [],
  dataSource: 'IBEX35',
  grouping: 'no_group',
  blockSize: 'market_cap_basic',
  blockColor: 'change',
  locale: LOCALE,
  symbolUrl: '',
  colorTheme: 'dark',
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: false,
  hasSymbolTooltip: false,
  isMonoSize: false,
  width: '100%',
  height: '100%',
};

// ---------- Versión TV: mini-charts a 1 año ----------
export const miniChart = (symbol, extra = {}) => ({
  symbol,
  width: '100%',
  height: '100%',
  autosize: true,
  locale: LOCALE,
  dateRange: '12M',
  colorTheme: 'dark',
  isTransparent: true,
  largeChartUrl: '',
  chartOnly: false,
  noTimeScale: false,
  ...extra,
});

// Rejilla principal (3 columnas; las filas se ajustan al número de elementos).
export const tvIndices = [
  { title: 'IBEX 35', symbol: 'BME:IBC' },
  { title: 'Euro Stoxx 50', symbol: 'FOREXCOM:EU50' },
  { title: 'S&P 500', symbol: 'FOREXCOM:SPXUSD' },
  { title: 'Dow Jones 30', symbol: 'FOREXCOM:DJI' },
  { title: 'Nasdaq 100', symbol: 'FOREXCOM:NSXUSD' },
  { title: 'Nikkei 225', symbol: 'INDEX:NKY' },
];

// Columna derecha: top 5 del S&P 500 (misma lista que featuredStocks).
export const tvStocks = featuredStocks.symbolsGroups[0].symbols.map((s) => s.name);

// Sesiones bursátiles (horario local de cada plaza, lunes a viernes; no contempla festivos).
export const sessions = [
  { label: 'Madrid', tz: 'Europe/Madrid', open: '09:00', close: '17:30' },
  { label: 'Londres', tz: 'Europe/London', open: '08:00', close: '16:30' },
  { label: 'Fráncfort', tz: 'Europe/Berlin', open: '09:00', close: '17:30' },
  { label: 'Nueva York', tz: 'America/New_York', open: '09:30', close: '16:00' },
  { label: 'Tokio', tz: 'Asia/Tokyo', open: '09:00', close: '15:30' },
];

// Recarga completa de la página cada N horas (útil para una TV encendida días enteros).
export const RELOAD_EVERY_HOURS = 6;

// Altura mínima de ventana (px) para usar la versión completa; por debajo se usa la versión TV.
export const FULL_LAYOUT_MIN_HEIGHT = 1000;
