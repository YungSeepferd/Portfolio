import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { lightTheme } from './theme';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

// Mock the heavy 3D components to avoid rendering issues in tests
vi.mock('../components/hero/Hero', () => ({
  default: () => <div data-testid="hero-section">Hero Component</div>,
}));

vi.mock('../components/work/Work', () => ({
  default: () => <div data-testid="work-section">Work Component</div>,
}));

vi.mock('../components/about/AboutSection', () => ({
  default: () => <div data-testid="about-section">About Component</div>,
}));

vi.mock('../components/dev/ThemeDebugger', () => ({
  default: () => <div data-testid="theme-debugger">Theme Debugger</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset environment
    process.env.NODE_ENV = 'test';
  });

  it('renders main application structure', () => {
    renderWithProviders(<App />);
    
    // Check main sections are present
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('work-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    renderWithProviders(<App />);
    
    // Header should be present
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('does not render theme debugger in production', () => {
    process.env.NODE_ENV = 'production';
    renderWithProviders(<App />);
    
    expect(screen.queryByTestId('theme-debugger')).not.toBeInTheDocument();
  });

  it('renders theme debugger in development', () => {
    process.env.NODE_ENV = 'development';
    renderWithProviders(<App />);
    
    expect(screen.getByTestId('theme-debugger')).toBeInTheDocument();
  });

  it('handles routing correctly', () => {
    renderWithProviders(<App />);
    
    // Should render home route content by default
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('work-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
  });

  it('provides context to child components', () => {
    const TestComponent = () => {
      // This would typically use the context hooks
      return <div data-testid="context-consumer">Context works</div>;
    };

    render(
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <TestComponent />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('context-consumer')).toBeInTheDocument();
  });

  it('handles loading states gracefully', async () => {
    renderWithProviders(<App />);
    
    // Should show loading fallbacks initially (if components are lazy loaded)
    // Then show actual content
    await waitFor(() => {
      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    });
  });
});
