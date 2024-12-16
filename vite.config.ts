import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-label', '@radix-ui/react-select'],
          'animation-vendor': ['framer-motion'],
          'utils-vendor': ['date-fns', 'fuse.js', 'zustand'],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'date-fns',
      'fuse.js',
      'zustand',
      '@radix-ui/react-dialog',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
    ],
    exclude: ['lucide-react'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  }
});
