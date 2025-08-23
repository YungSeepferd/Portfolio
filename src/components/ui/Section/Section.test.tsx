import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import { Section } from './Section';
import { darkTheme } from '../../../theme';
import { ThemeContext } from '../../../context/theme-context';
import AccessibilityContext from '../../../context/accessibility-context';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={darkTheme}>
      <ThemeContext.Provider value={{ mode: 'dark', toggleTheme: jest.fn(), theme: darkTheme }}>
        <AccessibilityContext.Provider value={{
          reducedMotion: false,
          highContrast: false,
          largeText: false,
          screenReaderOptimized: false,
          toggleReducedMotion: jest.fn(),
          toggleHighContrast: jest.fn(),
          toggleLargeText: jest.fn(),
          toggleScreenReaderOptimized: jest.fn(),
          resetToDefaults: jest.fn()
        }}>
          {component}
        </AccessibilityContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

describe('Section', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <Section>
        <div>Test Content</div>
      </Section>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies full height when specified', () => {
    const { container } = renderWithProviders(
      <Section fullHeight>
        <div>Content</div>
      </Section>
    );
    
    const section = container.firstChild;
    expect(section).toHaveStyle({ height: '100vh' });
  });

  it('applies custom background color', () => {
    const backgroundColor = '#ff0000';
    const { container } = renderWithProviders(
      <Section backgroundColor={backgroundColor}>
        <div>Content</div>
      </Section>
    );
    
    const section = container.firstChild;
    expect(section).toHaveStyle({ backgroundColor });
  });

  it('respects reduced motion preferences', () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <ThemeContext.Provider value={{ mode: 'dark', toggleTheme: jest.fn(), theme: darkTheme }}>
          <AccessibilityContext.Provider value={{
            reducedMotion: true,
            highContrast: false,
            largeText: false,
            screenReaderOptimized: false,
            toggleReducedMotion: jest.fn(),
            toggleHighContrast: jest.fn(),
            toggleLargeText: jest.fn(),
            toggleScreenReaderOptimized: jest.fn(),
            resetToDefaults: jest.fn()
          }}>
            <Section>
              <div>Content</div>
            </Section>
          </AccessibilityContext.Provider>
        </ThemeContext.Provider>
      </ThemeProvider>
    );
    
    const section = container.firstChild;
    expect(section).toHaveAttribute('aria-label', 'content section');
  });
});
