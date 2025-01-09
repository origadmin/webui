import { ThemeProvider } from '@/components/theme-provider';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';
import React from 'react';
import App from '@/App';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
