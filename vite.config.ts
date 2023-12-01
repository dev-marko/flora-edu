import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': `${path.resolve(__dirname, './src/components')}`,
      '@hooks': `${path.resolve(__dirname, './src/hooks')}`,
      '@pages': path.resolve(__dirname, './src/pages'),
      '@public': `${path.resolve(__dirname, './public')}`,
      '@themes': `${path.resolve(__dirname, './src/styles/themes')}`,
      '@interfaces': `${path.resolve(__dirname, './src/interfaces')}`,
      '@utils': `${path.resolve(__dirname, './src/utils')}`,
    },
  },
});
