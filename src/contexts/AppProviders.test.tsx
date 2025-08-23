import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProviders } from './AppProviders';
import { useTheme } from './ThemeContext';
import { useAccessibility } from './AccessibilityContext';
import { useModal } from './ModalContext';

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

// Mock the lazily loaded components
jest.mock('../components/common/pdf-viewer', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="pdf-viewer">PDF Viewer</div>,
  };
});

jest.mock('../components/common/iframe-modal', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="iframe-modal">Iframe Modal</div>,
  };
});

// Test component that uses all contexts
const TestComponent = () => {
  const { mode, toggleTheme } = useTheme();
  const { reducedMotion, toggleReducedMotion } = useAccessibility();
  const { openProjectModal, projectOpen } = useModal();
  
  return (
    <div>
      <div data-testid="theme-mode">{mode}</div>
      <div data-testid="reduced-motion">{reducedMotion ? 'true' : 'false'}</div>
      <div data-testid="project-open">{projectOpen ? 'true' : 'false'}</div>
      
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button data-testid="toggle-motion" onClick={toggleReducedMotion}>
        Toggle Motion
      </button>
      <button 
        data-testid="open-project" 
        onClick={() => openProjectModal(<div>Project Content</div>)}
      >
        Open Project
      </button>
    </div>
  );
};

describe('AppProviders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    Object.defineProperty(window, 'matchMedia', { value: mockMatchMedia });
    
    // Mock ResizeObserver
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  
  it('should provide theme context', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');
    
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    
    fireEvent.click(screen.getByTestId('toggle-theme'));
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });
  
  it('should provide accessibility context', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false');
    
    fireEvent.click(screen.getByTestId('toggle-motion'));
    
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
  });
  
  it('should provide modal context', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );
    
    expect(screen.getByTestId('project-open')).toHaveTextContent('false');
    
    fireEvent.click(screen.getByTestId('open-project'));
    
    expect(screen.getByTestId('project-open')).toHaveTextContent('true');
  });
  
  it('should use initial values when provided', () => {
    render(
      <AppProviders 
        initialThemeMode="light" 
        initialAccessibility={{ reducedMotion: true }}
        syncThemeWithSystem={false}
        syncAccessibilityWithSystem={false}
      >
        <TestComponent />
      </AppProviders>
    );
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
  });
});
