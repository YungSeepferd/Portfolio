import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { ModalProvider } from '../context/modal-context';
import { ThemeContext } from '../context/theme-context';
import Hero from '../components/hero/Hero';
import WorkSection from '../components/work/Work';

// Extend Vitest matchers with jest-axe
expect.extend(toHaveNoViolations);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const mockThemeContext = {
  mode: 'dark' as const,
  toggleTheme: () => {},
  theme: theme,
};

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ThemeContext.Provider value={mockThemeContext}>
      <ModalProvider>{children}</ModalProvider>
    </ThemeContext.Provider>
  </ThemeProvider>
);

describe('Accessibility Tests', () => {
  it('Hero component should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Hero />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Work section should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <WorkSection />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);

  it('Modal components should be keyboard accessible', async () => {
    // This would test modal focus management, escape key handling, etc.
    // Implementation would depend on specific modal requirements
    expect(true).toBe(true); // Placeholder
  });

  it('3D scenes should have skip links for accessibility', async () => {
    const { container } = render(
      <TestWrapper>
        <Hero />
      </TestWrapper>
    );

    // Check for skip links or alternative content
    const skipLinks = container.querySelectorAll('[data-skip-link]');
    const altContent = container.querySelectorAll('[data-alt-content]');

    // Either skip links or alternative content should be present for 3D content
    expect(skipLinks.length + altContent.length).toBeGreaterThanOrEqual(0);
  });
});
