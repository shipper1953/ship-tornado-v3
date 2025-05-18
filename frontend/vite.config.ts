// Updated ship-tornado-v3/frontend/vite.config.js (or .ts)
import { defineConfig } from 'vite';
import reactSWC from '@vitejs/plugin-react-swc'; // 👈 Import the new plugin
import path from 'path';

export default defineConfig({
  plugins: [
    reactSWC() // 👈 Use the new plugin here
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});