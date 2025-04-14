/**
 * Theme Index
 * 
 * This file exports theme components from the theme folder structure
 * and re-exports theme objects/functions from the root theme.js.
 * 
 * This creates a unified access point for theme-related imports.
 */

// First, export individual theme components
export { default as typography } from './typography';
export { default as breakpoints } from './breakpoints';
export { palette as lightPalette } from './palette/light';
export { palette as darkPalette } from './palette/dark';
export { default as shadows } from './shadows';
export { default as shape } from './shape';

// Import components if available
let components = {};
try {
  components = require('./components').default;
} catch (error) {
  console.info('No components found in theme/components.js');
}
export { components };

// Import from theme.js and re-export
import createAppTheme, { 
  lightTheme, 
  darkTheme, 
  designConstants 
} from '../theme';

// Re-export the theme objects and functions
export {
  createAppTheme,
  lightTheme,
  darkTheme,
  designConstants
};

// Default export is the theme creation function
export default createAppTheme;
