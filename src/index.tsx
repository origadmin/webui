import App from '@/App';
import { ThemeProvider } from '@/components/theme-provider';
import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
