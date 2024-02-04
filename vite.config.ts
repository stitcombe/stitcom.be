/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      assets: resolve(__dirname, 'src/assets'),
      components: resolve(__dirname, 'src/components'),
      features: resolve(__dirname, '/src/features'),
      hooks: resolve(__dirname, 'src/hooks'),
      mocks: resolve(__dirname, 'src/mocks'),
      pages: resolve(__dirname, 'src/pages'),
      providers: resolve(__dirname, 'src/providers'),
      routes: resolve(__dirname, 'src/routes'),
      types: resolve(__dirname, 'src/types'),
      utils: resolve(__dirname, 'src/utils'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json', 'json-summary'],
    },
    reporters: ['default', 'html', 'junit'],
    exclude: [...configDefaults.exclude, '**/__mocks__/**'],
    includeSource: ['src/**/*.{js,ts}'],
    outputFile: {
      junit: './coverage/vitest-junit.xml',
    },
  },
});
