import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from './ThemeContext';

// Declare Jest globals for TypeScript
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: any;
declare const beforeEach: (fn: () => void) => void;
declare const jest: any;

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Mock window.matchMedia
const mockMatchMedia = jest.fn(() => ({
  matches: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Test component that uses the theme context
const TestComponent = () => {
  const { mode, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-mode">{mode}</div>
      <div data-testid="is-dark-mode">{isDarkMode ? 'true' : 'false'}</div>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    Object.defineProperty(window, 'matchMedia', { value: mockMatchMedia });
  });
  
  it('should use default dark theme when no preference exists', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    
    render(
      <ThemeProvider syncWithSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('true');
  });
  
  it('should respect saved theme in localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('light');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark-mode')).toHaveTextContent('false');
  });
  
  it('should toggle theme when button is clicked', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    
    fireEvent.click(screen.getByTestId('toggle-btn'));
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'light');
    
    fireEvent.click(screen.getByTestId('toggle-btn'));
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('themeMode', 'dark');
  });
  
  it('should use initialMode when provided', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider initialMode="light">
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });
});
