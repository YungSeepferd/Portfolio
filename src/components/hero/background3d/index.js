/**
 * Background3D - 3D Background System
 * 
 * This module exports the three.js background system components.
 * It provides a modular, optimized replacement for ThreeJSBackground.js
 */

// Main component
export { default } from './Background3D';

// Scene management
export { SceneProvider, useSceneState } from './SceneContext';
export { SCENE_MODES, SHAPE_TYPES } from './constants';

// Individual scenes
export { default as SphereScene } from './scenes/SphereScene';
export { default as CubeScene } from './scenes/CubeScene';
// Add BoxScene as an alias for CubeScene to maintain compatibility
export { default as BoxScene } from './scenes/CubeScene';
export { default as TorusScene } from './scenes/TorusScene';

// Utility components
export { default as ActiveScene } from './ActiveScene';
export { default as LoadingFallback } from './components/LoadingFallback';

// Import particle component explicitly
export { default as ParticleComponent } from './ParticleComponent';
