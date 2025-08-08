import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Mock Three.js for tests
vi.mock('three', () => ({
  WebGLRenderer: vi.fn(() => ({
    setSize: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
    domElement: document.createElement('canvas'),
  })),
  Scene: vi.fn(),
  PerspectiveCamera: vi.fn(),
  Vector3: vi.fn(() => ({
    set: vi.fn(),
    normalize: vi.fn(),
  })),
  Color: vi.fn(),
  Mesh: vi.fn(),
  BoxGeometry: vi.fn(),
  MeshBasicMaterial: vi.fn(),
  AmbientLight: vi.fn(),
  DirectionalLight: vi.fn(),
  TextureLoader: vi.fn(() => ({
    load: vi.fn(),
  })),
  Euler: vi.fn(() => ({ set: vi.fn() })),
  TorusGeometry: vi.fn(() => ({ dispose: vi.fn() })),
}));

// Mock Tone.js for tests with required classes used by hooks
vi.mock('tone', () => ({
  Gain: vi.fn(() => ({
    toDestination: vi.fn().mockReturnThis(),
    connect: vi.fn().mockReturnThis(),
    gain: {
      setValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      cancelScheduledValues: vi.fn(),
    },
    dispose: vi.fn(),
  })),
  PolySynth: vi.fn(() => ({
    toDestination: vi.fn().mockReturnThis(),
    connect: vi.fn().mockReturnThis(),
    triggerAttackRelease: vi.fn(),
    set: vi.fn(),
    dispose: vi.fn(),
  })),
  Synth: vi.fn(() => ({})),
  Filter: vi.fn(() => ({
    connect: vi.fn().mockReturnThis(),
    frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    dispose: vi.fn(),
  })),
  Reverb: vi.fn(() => ({ connect: vi.fn().mockReturnThis(), dispose: vi.fn() })),
  FeedbackDelay: vi.fn(() => ({ connect: vi.fn().mockReturnThis(), dispose: vi.fn() })),
  Destination: {},
  now: () => 0,
  start: vi.fn().mockResolvedValue(undefined),
  context: { state: 'suspended' },
  Transport: {
    start: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
  },
}));

// Mock react-pdf to avoid requiring pdfjs-dist during tests
vi.mock('react-pdf', () => ({
  Document: ({ children: _children }: { children?: unknown }) => null,
  Page: () => null,
  pdfjs: { GlobalWorkerOptions: { workerSrc: '' }, version: '' },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
(globalThis as any).IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
(globalThis as any).ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Cleanup after each test case
afterEach(() => {
  cleanup();
});
