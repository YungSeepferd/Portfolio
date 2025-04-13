/**
 * Background3D Module
 * 
 * This module exports the Background3D component and its related scenes.
 * The component provides an interactive 3D background with multiple scenes
 * that users can switch between.
 */

// Export the main Background3D component as the default export
export { default } from './Background3D';

// Export individual scenes for direct use if needed
export { default as SphereScene } from './scenes/SphereScene';
export { default as CubeScene } from './scenes/CubeScene';
export { default as TorusScene } from './scenes/TorusScene';

// Export any utilities related to 3D backgrounds
export { default as useThreeInteraction } from './hooks/useThreeInteraction';
