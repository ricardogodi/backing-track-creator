// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/backing-track-creator/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});