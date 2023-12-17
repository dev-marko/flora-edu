import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import theme from '@/styles/themes/custom-theme.ts';
import { ColorModeScript } from '@chakra-ui/react';
import { AnalyticsProvider } from 'use-analytics';
import analyticsInstance from './utils/analytics-instance.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AnalyticsProvider instance={analyticsInstance}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </AnalyticsProvider>
  </React.StrictMode>
);
