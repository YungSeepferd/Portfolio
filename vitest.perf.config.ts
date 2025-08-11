import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import vitestConfig from './vitest.config';

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      name: 'performance',
      include: ['**/*.perf.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      testTimeout: 30000, // Allow more time for performance tests
      setupFiles: ['./src/test/setup-perf.ts'],
      env: {
        NODE_ENV: 'test',
        PERFORMANCE_TEST: 'true',
      },
    },
  })
);
