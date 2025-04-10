import * as THREE from 'three';
import { SHAPE_TYPES } from '../constants';

/**
 * Converts a hex color string to HSL color object
 * @param {string} hex - Hex color string
 * @returns {Object} HSL color object with h, s, l properties
 */
export const hexToHSL = (hex) => {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Find max and min values to calculate lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  
  let h, s;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    
    h /= 6;
  }
  
  return { h, s, l };
};

/**
 * Extract theme colors for Three.js scenes
 * @param {Object} theme - MUI theme object
 * @returns {Object} Object containing color information for scenes
 */
export const extractThemeColors = (theme) => {
  // Extract colors from theme, using fallbacks if needed
  const primary = hexToHSL(theme.palette.primary.main);
  const secondary = hexToHSL(theme.palette.secondary.main);
  const info = hexToHSL(theme.palette.info?.main || '#29b6f6');
  const warning = hexToHSL(theme.palette.warning?.main || '#ffa726');
  // Remove unused variables
  // const error = hexToHSL(theme.palette.error?.main || '#f44336');
  // const success = hexToHSL(theme.palette.success?.main || '#4caf50');
  
  // Base scene color mapping
  const shapeColors = {
    [SHAPE_TYPES.SPHERE]: primary,
    [SHAPE_TYPES.BOX]: secondary,
    [SHAPE_TYPES.CONE]: warning,
    [SHAPE_TYPES.TORUS]: info,
    hover: hexToHSL(theme.palette.secondary.light),
  };
  
  // Additional colors for other scenes
  const sceneColors = {
    cubeGrid: {
      primary: new THREE.Color(theme.palette.primary.main),
      secondary: new THREE.Color(theme.palette.secondary.main),
      accent: new THREE.Color(theme.palette.info.main),
    },
    torus: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      trail: theme.palette.secondary.main
    }
  };
  
  return { shapeColors, sceneColors };
};

/**
 * Create a material with theme-based properties
 * @param {Object} theme - MUI theme object
 * @param {Object} options - Additional material options
 * @returns {THREE.Material} Three.js material
 */
export const createThemedMaterial = (theme, options = {}) => {
  return new THREE.MeshStandardMaterial({
    color: theme.palette.primary.main,
    emissive: theme.palette.primary.light,
    emissiveIntensity: 0.2,
    metalness: 0.2,
    roughness: 0.7,
    ...options
  });
};
