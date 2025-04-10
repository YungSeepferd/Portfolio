// Renamed to sceneThemeUtils.js to avoid conflicts with global themeUtils.js
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
 */
export const extractThemeColors = (theme) => {
  if (!theme || !theme.palette) {
    // Provide fallback colors if theme isn't available
    return {
      shapeColors: {
        0: { h: 0.6, s: 0.6, l: 0.6 }, // Blue-ish
        1: { h: 0.3, s: 0.6, l: 0.6 }, // Green-ish
        2: { h: 0.1, s: 0.6, l: 0.6 }, // Orange-ish
        hover: { h: 0.5, s: 0.8, l: 0.7 }
      },
      sceneColors: {
        cubeGrid: {
          primary: new THREE.Color('#5363EE'),
          secondary: new THREE.Color('#C2F750'),
          accent: new THREE.Color('#29b6f6')
        },
        torus: {
          primary: '#5363EE',
          secondary: '#C2F750',
          trail: '#C2F750'
        }
      }
    };
  }

  // Extract colors from theme, using fallbacks if needed
  const primary = hexToHSL(theme.palette.primary?.main || '#5363EE');
  const secondary = hexToHSL(theme.palette.secondary?.main || '#C2F750');
  const info = hexToHSL(theme.palette.info?.main || '#29b6f6');
  
  // Base scene color mapping
  const shapeColors = {
    [SHAPE_TYPES.SPHERE]: primary,
    [SHAPE_TYPES.BOX]: secondary,
    [SHAPE_TYPES.TORUS]: info,
    hover: hexToHSL(theme.palette.secondary?.light || '#D4FF69'),
  };
  
  // Additional colors for other scenes
  const sceneColors = {
    cubeGrid: {
      primary: new THREE.Color(theme.palette.primary?.main || '#5363EE'),
      secondary: new THREE.Color(theme.palette.secondary?.main || '#C2F750'),
      accent: new THREE.Color(theme.palette.info?.main || '#29b6f6'),
    },
    torus: {
      primary: theme.palette.primary?.main || '#5363EE',
      secondary: theme.palette.secondary?.main || '#C2F750',
      trail: theme.palette.secondary?.main || '#C2F750'
    }
  };
  
  return { shapeColors, sceneColors };
};

/**
 * Create a material with theme-based properties
 */
export const createThemedMaterial = (theme, options = {}) => {
  return new THREE.MeshStandardMaterial({
    color: theme.palette.primary?.main || '#5363EE',
    emissive: theme.palette.primary?.light || '#6E7CFF',
    emissiveIntensity: 0.2,
    metalness: 0.2,
    roughness: 0.7,
    ...options
  });
};

// Add direct alias for backward compatibility
export const extractColorsFromTheme = extractThemeColors;
