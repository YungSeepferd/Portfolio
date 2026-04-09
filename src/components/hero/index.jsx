/**
 * Hero Section Components Export
 * 
 * This file exports all components related to the Hero section
 * for easier imports throughout the application.
 */

// Main Hero component
export { default } from './Hero';
export { default as Hero } from './Hero';

// Sub-components
export { default as HeroContent } from './HeroContent';
export { default as ScrollIndicator } from './ScrollIndicator';

// Skills data
export * from './skillsData';

// Background Components
export { default as CanvasBackground } from './CanvasBackground';  // Simple 2D canvas background
export { default as ThreeJSBackground } from './background3d/Background3D';  // 3D Three.js background
