import { beforeAll, afterAll } from 'vitest';
import { performance } from 'perf_hooks';

// Define performance test thresholds
export const PERFORMANCE_THRESHOLDS = {
  RENDER_TIME: 100, // ms
  ANIMATION_TIME: 50, // ms
  LOAD_TIME: 200, // ms
  INTERACTION_TIME: 50, // ms
};

// Setup performance measurement hooks
beforeAll(() => {
  // Reset performance marks before each test
  performance.clearMarks();
  performance.clearMeasures();
});

afterAll(() => {
  // Clean up after tests
  performance.clearMarks();
  performance.clearMeasures();
});

// Helper functions for performance measurements
export const measurePerformance = (name: string, fn: () => void): number => {
  const startMark = `${name}_start`;
  const endMark = `${name}_end`;

  performance.mark(startMark);
  fn();
  performance.mark(endMark);

  const measure = performance.measure(name, startMark, endMark);
  return measure.duration;
};

// Helper for measuring async operations
export const measureAsyncPerformance = async (
  name: string,
  fn: () => Promise<void>
): Promise<number> => {
  const startMark = `${name}_start`;
  const endMark = `${name}_end`;

  performance.mark(startMark);
  await fn();
  performance.mark(endMark);

  const measure = performance.measure(name, startMark, endMark);
  return measure.duration;
};
