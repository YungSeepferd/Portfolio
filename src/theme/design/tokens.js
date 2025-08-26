/**
 * Design Tokens
 * 
 * A centralized system for design tokens that can be exported to both
 * design tools and code. This creates a single source of truth for
 * design values throughout the application.
 * 
 * These tokens can be exported to JSON for use in design tools like Figma
 * or used directly in the theme creation.
 */

// Decentralized Design Tokens
import colors from '../colors';
import breakpoints from '../breakpoints';
import spacing from '../spacing';
import typography from '../typography';
import shadows from '../shadows';
import animations from '../animations';
import shape from '../shape';
import lightColors from '../palette/light';
import darkColors from '../palette/dark';

// Aggregate all tokens from modular files
export const tokens = {
  colors,
  breakpoints,
  spacing,
  typography,
  shadows,
  animations,
  shape,
};

// Export individual token groups for direct use
export { colors, breakpoints, spacing, typography, shadows, animations, shape };

// Utility: Convert tokens to CSS variables
export const tokensToCssVariables = () => {
  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? `${prefix}-` : '';
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
      } else {
        acc[`--${pre}${key}`] = obj[key];
      }
      return acc;
    }, {});
  };
  return flattenObject(tokens);
};

// Utility: Export tokens to JSON for design tools
export const exportTokensToJson = () => {
  return JSON.stringify(tokens, null, 2);
};

/**
 * Creates a palette configuration for Material UI's createTheme for dark mode
 */
export const createDarkPalette = () => {
  return createPaletteFromColors(darkColors);
};

/**
 * Creates a palette configuration for Material UI's createTheme for light mode
 */
export const createLightPalette = () => {
  return createPaletteFromColors(lightColors);
};

/**
 * Creates a palette configuration from a set of colors
 */
const createPaletteFromColors = (colors) => {
  return {
    primary: {
      main: colors.primaryMain,
      dark: colors.primaryDark,
      light: colors.primaryLight,
      contrastText: colors.primaryContrastText,
    },
    secondary: {
      main: colors.secondaryMain,
      dark: colors.secondaryDark,
      light: colors.secondaryLight,
      contrastText: colors.secondaryContrastText,
    },
    error: {
      main: colors.errorMain,
    },
    warning: {
      main: colors.warningMain,
    },
    info: {
      main: colors.infoMain,
    },
    success: {
      main: colors.successMain,
    },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
      alternatePanel: colors.backgroundAlternatePanel,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      muted: colors.textMuted,
      accent: colors.textAccent,
    },
    divider: colors.divider,
    accent: {
      main: colors.accentMain,
      dark: colors.accentDark,
      light: colors.accentLight,
      contrastText: colors.accentContrast,
    },
    card: {
      background: colors.cardBackground,
      shadow: colors.cardShadow,
      activeGlow: colors.cardActiveGlow,
      border: colors.cardBorder,
    },
    structure: {
      borders: colors.structureBorders,
      lines: colors.structureLines,
    },
    shadow: {
      light: colors.shadowLight,
      medium: colors.shadowMedium,
      dark: colors.shadowDark,
    },
    bubbles: {
      background: colors.bubblesBackground,
      border: colors.bubblesBorder,
    },
    overlay: {
      background: colors.overlayBackground,
      dark: colors.overlayDark,
    },
    dots: {
      inactive: colors.dotsInactive,
      active: colors.secondaryMain,
    },
    status: {
      success: colors.statusSuccess,
      warning: colors.statusWarning,
      error: colors.statusError,
      info: colors.statusInfo,
    },
  };
};

// Export both color sets for direct access if needed
export { darkColors, lightColors };

// Default export is the dark theme colors for backward compatibility
export default darkColors;
