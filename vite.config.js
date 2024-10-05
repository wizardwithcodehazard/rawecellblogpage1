import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src', // Make sure this is correct
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
      },
    },
  },
  
});
