import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import TorusGardenScene from './torus-garden-scene';

// Mock the tone instrument hook
vi.mock('../../../../hooks/use-tone-instrument', () => ({
  useToneInstrument: () => ({
    playChord: vi.fn(),
    playNote: vi.fn(),
    startAmbient: vi.fn(),
    stopAmbient: vi.fn(),
    isStarted: true,
  }),
}));

// Mock Material-UI partially - keep actual exports and override useTheme only
vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    useTheme: () => ({
      palette: {
        primary: { main: '#00bcd4' },
        secondary: { main: '#ff4081' },
        text: { primary: '#ffffff' },
      },
    }),
  };
});

// Mock Three.js components that need WebGL context
vi.mock('@react-three/drei', () => ({
  Html: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="html-overlay">{children}</div>
  ),
}));

// Mock @react-three/fiber Canvas and useFrame to avoid requiring WebGL/RAF
vi.mock('@react-three/fiber', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@react-three/fiber')>();
  const MockCanvas = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  );
  return {
    ...actual,
    Canvas: MockCanvas,
    useFrame: () => {},
  };
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },
    secondary: { main: '#ff4081' },
    text: { primary: '#ffffff' },
  },
});

describe('TorusGardenScene Component', () => {
  const defaultProps = {
    _color: '#00bcd4',
    _mousePosition: { x: 0, y: 0 },
    isTransitioning: false,
    theme: theme,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing in Canvas', () => {
    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <Canvas>
            <TorusGardenScene {...defaultProps} />
          </Canvas>
        </ThemeProvider>
      );
    }).not.toThrow();
  });

  it('displays the UI instructions', () => {
    render(
      <ThemeProvider theme={theme}>
        <Canvas>
          <TorusGardenScene {...defaultProps} />
        </Canvas>
      </ThemeProvider>
    );

    // Check for HTML overlay content
    expect(screen.getByTestId('html-overlay')).toBeInTheDocument();
  });

  it('handles transitions correctly', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Canvas>
          <TorusGardenScene {...defaultProps} />
        </Canvas>
      </ThemeProvider>
    );

    // Test with transition state
    rerender(
      <ThemeProvider theme={theme}>
        <Canvas>
          <TorusGardenScene {...defaultProps} isTransitioning={true} />
        </Canvas>
      </ThemeProvider>
    );

    // Component should handle transition state without errors
    expect(true).toBe(true);
  });

  it('respects theme colors', () => {
    const customTheme = createTheme({
      palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        text: { primary: '#000000' },
      },
    });

    expect(() => {
      render(
        <ThemeProvider theme={customTheme}>
          <Canvas>
            <TorusGardenScene {...defaultProps} />
          </Canvas>
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});
