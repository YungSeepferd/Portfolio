import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from './theme-context';
import { useContext } from 'react';

// Mock component to test theme context
const TestComponent = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-mode">{mode}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    // Reset any mocks
    vi.clearAllMocks();

    // Mock localStorage with an in-memory store
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => (key in store ? store[key] : null)),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = String(value);
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        for (const k of Object.keys(store)) delete store[k];
      }),
      key: vi.fn(),
      length: 0,
    } as any);
    // Reset localStorage before each test
    (globalThis as any).localStorage.clear();
  });

  it('provides default dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  it('toggles theme mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const toggleButton = screen.getByText('Toggle Theme');

    // Initial state
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');

    // Toggle to light
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');

    // Toggle back to dark
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  it('persists theme mode to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');

    // Toggle to light
    act(() => {
      fireEvent.click(toggleButton);
    });

    expect((globalThis as any).localStorage.getItem('themeMode')).toBe('light');
  });

  it('loads persisted theme mode from localStorage', () => {
    // Pre-set localStorage
    (globalThis as any).localStorage.setItem('themeMode', 'light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });

  it('syncs with system preferences when available', () => {
    // Mock matchMedia for system dark mode preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });
});
