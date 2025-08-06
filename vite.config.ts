/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      components: resolve(__dirname, './src/components'),
      assets: resolve(__dirname, './src/assets'),
      context: resolve(__dirname, './src/context'),
      hooks: resolve(__dirname, './src/hooks'),
      pages: resolve(__dirname, './src/pages'),
      theme: resolve(__dirname, './src/theme'),
      utils: resolve(__dirname, './src/utils'),
      types: resolve(__dirname, './src/types'),
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@mui/icons-material'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          audio: ['tone'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/types/**',
        'src/stories/**',
      ],
      threshold: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
