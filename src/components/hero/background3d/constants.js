/**
 * Constants for ThreeJSBackground component
 */

// Shape limits for different device types
export const SHAPE_LIMITS = {
  SPHERE: { mobile: 15, desktop: 35 },
  CUBE: { mobile: 20, desktop: 40 },
  TORUS: { mobile: 12, desktop: 25 }
};

// Shape types enumeration - REMOVED CONE
export const SHAPE_TYPES = {
  SPHERE: 0,
  BOX: 1,
  TORUS: 2
};

// Scene modes enumeration
export const SCENE_MODES = {
  INTERACTIVE_SHAPES: 0,
  CUBE_ELEVATION: 1,
  TORUS_MOTION: 2,
};

// Default geometries for each shape type - REMOVED CONE entry
export const DEFAULT_GEOMETRIES = [
  { component: 'sphereGeometry', args: [0.2, 16, 16] }, // SPHERE
  { component: 'boxGeometry', args: [0.3, 0.3, 0.3] },  // BOX
  { component: 'torusGeometry', args: [0.2, 0.08, 16, 32] } // TORUS
];

// Canvas settings
export const CANVAS_SETTINGS = {
  camera: { position: [0, 0, 10], fov: 50, near: 0.1, far: 100 },
  gl: {
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
    logarithmicDepthBuffer: false,
    alpha: true,
    stencil: false,
    depth: true,
  }
};

// Animation timings
export const ANIMATION_TIMINGS = {
  sceneTransition: 800,
  scrollTimeout: 100
};
