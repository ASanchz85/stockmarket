import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Sin StrictMode a propósito: evita montar dos veces cada widget en desarrollo.
createRoot(document.getElementById('root')).render(<App />);
