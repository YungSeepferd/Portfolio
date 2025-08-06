/**
 * Three.js 3D Background Components
 *
 * This module exports the Three.js-based 3D background system.
 * Note: This is different from the simple Canvas-based background (CanvasBackground.js)
 */

import Background3D from './Background3D';

export default Background3D;

// Export other components
export { default as SphereScene } from './scenes/SphereScene';
export { default as BoxScene } from './scenes/BoxScene';
export { default as AudioVisualScene } from './scenes/AudioVisualScene';
export { default as ParticleComponent } from './ParticleComponent';
export { default as ActiveScene } from './ActiveScene';
export { default as SceneContext, SceneProvider, useSceneState } from './SceneContext';

// Export utilities
export * from './constants';
export * from './particles';
export * from './utils/webglDetector';
export * from './utils/performanceUtils';
export * from './utils/sceneThemeUtils';
