/**
 * Scene shape types
 */
export const SHAPE_TYPES = {
  SPHERE: 'SPHERE',
  BOX: 'BOX',
  TORUS: 'TORUS',
} as const;

/**
 * Performance configurations for different modes
 */
export const PERFORMANCE_CONFIG = {
  low: {
    maxParticles: 100,
    particleSize: 0.08,
    mouseInfluence: 0.1,
    shadows: false,
    postProcessing: false,
  },
  medium: {
    maxParticles: 300,
    particleSize: 0.05,
    mouseInfluence: 0.2,
    shadows: true,
    postProcessing: false,
  },
  high: {
    maxParticles: 500,
    particleSize: 0.04,
    mouseInfluence: 0.3,
    shadows: true,
    postProcessing: true,
  },
} as const;

/**
 * Canvas settings
 */
export const CANVAS_SETTINGS = {
  pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
  shadowMapType: 'PCFSoftShadowMap',
  toneMappingExposure: 1,
  antialias: true,
} as const;

/**
 * Shape limits for each scene type
 */
export const SHAPE_LIMITS = {
  SPHERE: {
    min: 100,
    max: 500,
  },
  BOX: {
    min: 64,
    max: 256,
  },
  TORUS: {
    min: 50,
    max: 200,
  },
} as const;

/**
 * Animation timings (in milliseconds)
 */
export const ANIMATION_TIMING = {
  sceneTransition: 1000,
  shapeTransition: 500,
  particleFade: 300,
} as const;
