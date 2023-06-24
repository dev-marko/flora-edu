import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import theme from '@/styles/themes/custom-theme.ts';
import { ColorModeScript } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>
);
