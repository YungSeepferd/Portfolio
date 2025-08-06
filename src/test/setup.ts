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
}));

// Mock Tone.js for tests
vi.mock('tone', () => ({
  Synth: vi.fn(() => ({
    toDestination: vi.fn(),
    triggerAttackRelease: vi.fn(),
    dispose: vi.fn(),
  })),
  start: vi.fn(),
  Transport: {
    start: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
  },
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
