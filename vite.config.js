import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      // Two documents, not a client router. Paths are relative to Vite's
      // `root`, which avoids `__dirname` (absent in an ESM config) and
      // `import.meta.dirname` (which Vite may rewrite).
      input: {
        main: 'index.html',
        educacion: 'educacion/index.html',
      },
      output: {
        // GSAP is the heaviest runtime dependency: split it so the app shell
        // can be parsed while the animation engine downloads in parallel.
        manualChunks: { gsap: ['gsap'] },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
});
