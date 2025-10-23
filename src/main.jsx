import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Cannot find the root element to mount the React application.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
