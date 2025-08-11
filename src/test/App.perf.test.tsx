import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';
import { measurePerformance, PERFORMANCE_THRESHOLDS } from './setup-perf';

describe('App Performance Tests', () => {
  it('should render App component within performance threshold', () => {
    const renderDuration = measurePerformance('App_Initial_Render', () => {
      render(<App />);
    });

    expect(renderDuration).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME);
  });

  // Add more performance tests for critical user paths
  // Example: Loading projects, switching themes, navigation transitions
});
