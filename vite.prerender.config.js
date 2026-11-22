import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  ssr: { noExternal: ['gsap'] },
  build: { ssr: 'src/prerender.jsx', outDir: '.prerender', emptyOutDir: true },
});
