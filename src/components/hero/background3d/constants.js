/**
 * Constants and configuration settings for the 3D background scene
 */

// Shape type identifiers
export const SHAPE_TYPES = {
  SPHERE: 0,
  BOX: 1, // Changed from CUBE to BOX for consistency
  TORUS: 2,
};

// Canvas settings for @react-three/fiber
export const CANVAS_SETTINGS = {
  camera: {
    position: [0, 0, 16], // Increased from 12 to 16 for a more zoomed-out starting view
    fov: 45,
    near: 0.1,
    far: 1000,
  },
  gl: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
  },
};

// Performance settings for different device capabilities
export const PERFORMANCE_MODES = {
  low: {
    particleCount: 50,
    segmentCount: 12,
    dpr: 1,
  },
  medium: {
    particleCount: 150,
    segmentCount: 32,
    dpr: 1,
  },
  high: {
    particleCount: 300,
    segmentCount: 64,
    dpr: window.devicePixelRatio || 1,
  },
};

// Animation timing constants
export const ANIMATION = {
  transitionDuration: 600, // ms
  hoverTransitionDuration: 300, // ms
  autoRotateDelay: 3000, // ms
  autoRotateSpeed: 0.5,
};

// Scene element dimensions
export const DIMENSIONS = {
  sphere: {
    radius: 1.5,
    segments: 64,
  },
  cube: {
    size: 2,
    segments: 2,
  },
  torus: {
    radius: 1.5,
    tube: 0.4,
    radialSegments: 16,
    tubularSegments: 64,
  },
  clickDetection: {
    radius: 6, // Radius of invisible sphere for better click detection
  },
};

// Scene element materials properties
export const MATERIALS = {
  metalness: 0.7,
  roughness: 0.2,
  emissiveIntensity: 0.3,
  hoverEmissiveIntensity: 0.6,
};

// Limits for the number of shapes in each scene type
export const SHAPE_LIMITS = {
  SPHERE: {
    mobile: 25, // Fewer shapes on mobile for better performance
    desktop: 50, // More shapes on desktop for richer visuals
  },
  BOX: {
    mobile: 20,
    desktop: 40,
  },
  TORUS: {
    mobile: 20,
    desktop: 40,
  },
};

// Create a named object for default export
const constants = {
  SHAPE_TYPES,
  CANVAS_SETTINGS,
  PERFORMANCE_MODES,
  ANIMATION,
  DIMENSIONS,
  MATERIALS,
  SHAPE_LIMITS,
};

export default constants;
