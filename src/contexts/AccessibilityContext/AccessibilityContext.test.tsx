import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccessibilityProvider, useAccessibility } from './AccessibilityContext';

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

// Mock document methods
document.documentElement.classList = {
  toggle: jest.fn(),
} as any;

// Mock window.matchMedia
const mockMatchMedia = jest.fn(() => ({
  matches: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Test component that uses the accessibility context
const TestComponent = () => {
  const { 
    reducedMotion, 
    highContrast,
    largeText,
    screenReaderOptimized,
    toggleReducedMotion,
    toggleHighContrast,
    toggleLargeText,
    toggleScreenReaderOptimized,
    resetToDefaults
  } = useAccessibility();
  
  return (
    <div>
      <div data-testid="reduced-motion">{reducedMotion ? 'true' : 'false'}</div>
      <div data-testid="high-contrast">{highContrast ? 'true' : 'false'}</div>
      <div data-testid="large-text">{largeText ? 'true' : 'false'}</div>
      <div data-testid="screen-reader">{screenReaderOptimized ? 'true' : 'false'}</div>
      
      <button data-testid="toggle-motion" onClick={toggleReducedMotion}>
        Toggle Motion
      </button>
      <button data-testid="toggle-contrast" onClick={toggleHighContrast}>
        Toggle Contrast
      </button>
      <button data-testid="toggle-text" onClick={toggleLargeText}>
        Toggle Text Size
      </button>
      <button data-testid="toggle-screen-reader" onClick={toggleScreenReaderOptimized}>
        Toggle Screen Reader
      </button>
      <button data-testid="reset" onClick={resetToDefaults}>
        Reset
      </button>
    </div>
  );
};

describe('AccessibilityContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    Object.defineProperty(window, 'matchMedia', { value: mockMatchMedia });
  });
  
  it('should use default values when no saved preferences', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    
    render(
      <AccessibilityProvider syncWithSystem={false}>
        <TestComponent />
      </AccessibilityProvider>
    );
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false');
    expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
    expect(screen.getByTestId('large-text')).toHaveTextContent('false');
    expect(screen.getByTestId('screen-reader')).toHaveTextContent('false');
  });
  
  it('should load values from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      reducedMotion: true,
      highContrast: true,
      largeText: false,
      screenReaderOptimized: false
    }));
    
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
    expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
    expect(screen.getByTestId('large-text')).toHaveTextContent('false');
    expect(screen.getByTestId('screen-reader')).toHaveTextContent('false');
  });
  
  it('should toggle preferences when buttons are clicked', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false');
    
    fireEvent.click(screen.getByTestId('toggle-motion'));
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('toggle-contrast'));
    expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('toggle-text'));
    expect(screen.getByTestId('large-text')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('toggle-screen-reader'));
    expect(screen.getByTestId('screen-reader')).toHaveTextContent('true');
  });
  
  it('should reset all preferences to defaults', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      reducedMotion: true,
      highContrast: true,
      largeText: true,
      screenReaderOptimized: true
    }));
    
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
    expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
    expect(screen.getByTestId('large-text')).toHaveTextContent('true');
    expect(screen.getByTestId('screen-reader')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('reset'));
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false');
    expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
    expect(screen.getByTestId('large-text')).toHaveTextContent('false');
    expect(screen.getByTestId('screen-reader')).toHaveTextContent('false');
  });
  
  it('should use system preferences when syncWithSystem is true', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    
    render(
      <AccessibilityProvider syncWithSystem={true}>
        <TestComponent />
      </AccessibilityProvider>
    );
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
  });
  
  it('should use initialState when provided', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <AccessibilityProvider 
        initialState={{ 
          reducedMotion: true, 
          highContrast: true,
          largeText: false,
          screenReaderOptimized: false 
        }}
      >
        <TestComponent />
      </AccessibilityProvider>
    );
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
    expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
  });
});
