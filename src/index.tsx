import App from '@/App';
import { ThemeProvider } from '@/components/Theme/theme-provider';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
