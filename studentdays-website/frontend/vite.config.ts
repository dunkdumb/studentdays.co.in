import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// StudentDays Static Frontend Vite Configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
