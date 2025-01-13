import App from '@/App';
import { ThemeProvider } from '@/components/theme-provider';
import '@/index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
