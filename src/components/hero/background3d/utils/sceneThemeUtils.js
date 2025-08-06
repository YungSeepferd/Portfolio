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
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }

    h /= 6;
  }

  return { h, s, l };
};

/**
 * Create a dynamic color based on theme, time, and energy level
 * @param {Object} theme - MUI theme object
 * @param {number} time - Current elapsed time
 * @param {number} energy - Energy/excitement level (0-1)
 * @param {number} sceneType - Type of scene (from SHAPE_TYPES)
 * @param {boolean} isHovered - Whether the object is hovered
 * @returns {Object} - Color object with main, emissive, and emissiveIntensity
 */
export const getDynamicColor = (
  theme,
  time,
  energy = 0,
  sceneType = SHAPE_TYPES.SPHERE,
  isHovered = false
) => {
  // Extract base colors from theme
  const colors = extractThemeColors(theme).shapeColors;

  // Get base color for this shape type
  const baseColor = colors[sceneType] || colors[SHAPE_TYPES.SPHERE];
  const hoverColor = colors.hover;

  // Calculate hue shift based on time and energy
  const timeShift = (time * 0.05) % 1.0;
  const energyBoost = Math.min(1, energy * 1.2);

  // Calculate final color values with time and energy influences
  let hue, saturation, lightness;

  if (isHovered) {
    // Use hover color directly when hovered
    hue = hoverColor.h;
    saturation = hoverColor.s + energy * 0.2;
    lightness = hoverColor.l + energy * 0.1;
  } else {
    // Shift colors based on energy level
    const hueShift = energy * 0.2 * Math.sin(time * 2);
    hue = (baseColor.h + hueShift + energy * timeShift * 0.3) % 1.0;
    saturation = THREE.MathUtils.lerp(baseColor.s, 0.9, energy * 0.7);
    lightness = THREE.MathUtils.lerp(baseColor.l, 0.6, energy * 0.5);
  }

  // Create THREE.Color objects for both main color and emissive
  const mainColor = new THREE.Color().setHSL(hue, saturation, lightness);

  // Emissive color is slightly shifted and brighter
  const emissiveHue = (hue + 0.1) % 1.0;
  const emissiveColor = new THREE.Color().setHSL(
    emissiveHue,
    Math.min(1, saturation + 0.1),
    Math.min(0.8, lightness + 0.2)
  );

  // Calculate emissive intensity based on energy
  const emissiveIntensity = energyBoost * 0.8;

  return {
    main: mainColor,
    emissive: emissiveColor,
    emissiveIntensity: emissiveIntensity,
  };
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
        hover: { h: 0.5, s: 0.8, l: 0.7 },
      },
      sceneColors: {
        cubeGrid: {
          primary: new THREE.Color('#5363EE'),
          secondary: new THREE.Color('#C2F750'),
          accent: new THREE.Color('#29b6f6'),
        },
        torus: {
          primary: '#5363EE',
          secondary: '#C2F750',
          trail: '#C2F750',
        },
      },
    };
  }

  // First try to use dedicated scene3d colors if available in the theme
  let primaryColor, secondaryColor, infoColor;

  if (theme.palette.scene3d) {
    primaryColor = theme.palette.scene3d.sphere || theme.palette.primary?.main;
    secondaryColor = theme.palette.scene3d.box || theme.palette.secondary?.main;
    infoColor = theme.palette.scene3d.torus || theme.palette.info?.main;
  } else {
    // Fallback to standard theme colors
    primaryColor = theme.palette.primary?.main;
    secondaryColor = theme.palette.secondary?.main;
    infoColor = theme.palette.info?.main;
  }

  // Extract colors from theme, using fallbacks if needed
  const primary = hexToHSL(primaryColor || '#5363EE');
  const secondary = hexToHSL(secondaryColor || '#C2F750');
  const info = hexToHSL(infoColor || '#29b6f6');

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
      trail: theme.palette.secondary?.main || '#C2F750',
    },
  };

  return { shapeColors, sceneColors };
};

// Add direct alias for backward compatibility
export const extractColorsFromTheme = extractThemeColors;

/**
 * Convert MUI theme color to THREE.js color
 */
export const themeColorToThreeColor = (colorString) => {
  return new THREE.Color(colorString);
};

// Get environment settings based on theme
export const getEnvironmentSettings = (theme) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    fogColor: isDark ? 0x0a1022 : 0xf0f4f8,
    fogDensity: isDark ? 0.02 : 0.01,
    ambientLight: {
      color: isDark ? 0x333344 : 0xffffff,
      intensity: isDark ? 0.7 : 0.5,
    },
    directionalLight: {
      color: isDark ? 0xaabbff : 0xffffff,
      intensity: isDark ? 0.8 : 1.0,
    },
    backgroundColor: isDark ? 0x0a1022 : 0xf0f4f8,
  };
};
