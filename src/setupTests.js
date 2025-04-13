import '@testing-library/jest-dom';

// Mock IntersectionObserver for Jest
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};