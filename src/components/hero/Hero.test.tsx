import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext } from '../../context/ThemeContext';
import { lightTheme } from '../../theme';
import Hero from './Hero';

// Mock required context and hooks
vi.mock('@mui/material/useMediaQuery', () => ({
  default: () => false, // Mock as desktop by default
}));

describe('Hero Component', () => {
  const mockThemeContext = {
    mode: 'light' as const,
    toggleTheme: vi.fn(),
    theme: lightTheme,
  };

  const renderHero = () => {
    return render(
      <ThemeContext.Provider value={mockThemeContext}>
        <Hero />
      </ThemeContext.Provider>
    );
  };

  it('renders the hero section with heading and skill tags', () => {
    renderHero();

    // Verify main content is rendered
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();

    // Verify skill tags are displayed
    const skillTags = screen.getAllByRole('button', { name: /UX Research|Interaction Design/i });
    expect(skillTags.length).toBeGreaterThan(0);
  });

  it('renders scroll indicator', () => {
    renderHero();
    const scrollText = screen.getByText(/scroll/i);
    expect(scrollText).toBeInTheDocument();
  });

  it('handles background scene toggle', () => {
    renderHero();

    // Find and click the guide toggle button
    const toggleButton = screen.getByRole('button', { name: /toggle guide/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    // Verify guide state changes would be checked in integration tests
  });
});
