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

// Color palette tokens
const baseColors = {
  // Primary blue spectrum
  blue: {
    50: '#E9EBFE',
    100: '#C7CCFC',
    200: '#A3ABFA',
    300: '#808AF8',
    400: '#6673F7',
    500: '#5363EE', // Primary main
    600: '#3545D6', // Primary dark
    700: '#2736A7',
    800: '#1A2778',
    900: '#0C1749'
  },
  // Secondary pink spectrum
  pink: {
    50: '#FCE4EC',
    100: '#F8BBD0',
    200: '#F48FB1',
    300: '#F06292',
    400: '#EC407A',
    500: '#E56B9E', // Secondary main
    600: '#D81B60', // Secondary dark
    700: '#C2185B',
    800: '#AD1457',
    900: '#880E4F'
  },
  // Grey spectrum
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Success green spectrum
  green: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Success main
    600: '#43A047', // Success dark
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20'
  },
  // Warning orange spectrum
  orange: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Warning main
    600: '#FB8C00', // Warning dark
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100'
  },
  // Error red spectrum
  red: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336', // Error main
    600: '#E53935', // Error dark
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C'
  },
  // Info teal spectrum
  teal: {
    50: '#E0F2F1',
    100: '#B2DFDB',
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#009688', // Info main
    600: '#00897B', // Info dark
    700: '#00796B',
    800: '#00695C',
    900: '#004D40'
  },
  // Common colors
  common: {
    black: '#000000',
    white: '#FFFFFF'
  },
  // Dark mode specific colors
  darkMode: {
    background: '#0F172A', // Dark blue background
    paper: '#1E293B', // Slightly lighter blue for paper elements
    divider: '#334155' // Grey-blue for dividers
  }
};

// Spacing tokens
const spacing = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px'
};

// Typography tokens
const typography = {
  fontFamilies: {
    heading: "'Montserrat', sans-serif", // For headings
    body: "'Roboto', 'Helvetica', 'Arial', sans-serif" // For body text
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
    xxl: '2rem', // 32px
    xxxl: '3rem' // 48px
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75
  }
};

// Border radius tokens
const borderRadius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  pill: '500px',
  circle: '50%'
};

// Shadow tokens for elevations
const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
};

// Animation tokens
const animations = {
  durations: {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slowest: '500ms'
  },
  easings: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)'
  }
};

// Breakpoint tokens
const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px'
};

// Complete tokens object
export const tokens = {
  colors: baseColors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
  breakpoints
};

/**
 * Convert design tokens to CSS variables
 * @returns {Object} CSS variables object
 */
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

/**
 * Export tokens to JSON for design tools
 * @returns {string} JSON string of tokens
 */
export const exportTokensToJson = () => {
  return JSON.stringify(tokens, null, 2);
};

// Export individual token groups for direct use
export const { colors, spacing: spacingTokens, typography: typographyTokens, borderRadius: borderRadiusTokens, shadows: shadowTokens, animations: animationTokens, breakpoints: breakpointTokens } = tokens;

/**
 * Color System
 * 
 * This file defines all color values used throughout the application.
 * It serves as a single source of truth for the color palette.
 */

// Define reusable color variables for dark theme (default)
const darkColors = {
  primaryMain: '#5363EE',
  primaryContrastText: '#FFFFFF',
  primaryDark: '#4353D9',
  primaryLight: '#6E7CFF',
  secondaryMain: '#C2F750', // Preserved accent yellow-green
  secondaryContrastText: '#0E1A27',
  secondaryDark: '#ABDF3A',
  secondaryLight: '#D4FF69',
  backgroundDefault: '#0E1A27',
  backgroundPaper: '#131F2D',
  backgroundAlternatePanel: '#1A2736',
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#A0A0A0',
  textAccent: '#C2F750', // Preserved accent yellow-green
  accentMain: '#C2F750', // Preserved accent yellow-green
  accentDark: '#ABDF3A',
  accentLight: '#D4FF69',
  accentContrast: '#0E1A27',
  bubblesBackground: '#1A2736',
  bubblesBorder: '#3545D6',
  cardBackground: '#131F2D',
  cardShadow: 'rgba(5, 10, 15, 0.4)',
  cardActiveGlow: 'rgba(194, 247, 80, 0.25)',
  cardBorder: '#3545D6',
  filterActive: '#C2F750', // Preserved accent yellow-green
  filterInactive: '#505050',
  actionHover: 'rgba(194, 247, 80, 0.15)',
  actionSelected: 'rgba(194, 247, 80, 0.25)',
  actionDisabled: 'rgba(255, 255, 255, 0.3)',
  actionDisabledBackground: 'rgba(255, 255, 255, 0.12)',
  divider: '#3545D6',
  shadowLight: 'rgba(5, 10, 15, 0.3)',
  shadowMedium: 'rgba(5, 10, 15, 0.5)',
  shadowDark: 'rgba(5, 10, 15, 0.7)',
  overlayBackground: 'rgba(14, 26, 39, 0.85)',
  overlayDark: 'rgba(10, 18, 28, 0.9)',
  dotsInactive: '#3545D6',
  placeholder: '#1A2736',
  statusSuccess: '#C2F750', // Preserved accent yellow-green
  statusWarning: '#FFA726',
  statusError: '#F44336',
  statusInfo: '#5363EE',
  focusOutline: '#C2F750', // Preserved accent yellow-green
  structureBorders: '#3545D6',
  structureLines: '#3545D6',
  structureOutlines: '#3545D6',
  errorMain: '#f44336',
  warningMain: '#ff9800',
  infoMain: '#2196f3',
  successMain: '#4caf50',
};

// Define light theme colors that complement the dark theme
const lightColors = {
  primaryMain: '#5363EE', // Keep primary color consistent
  primaryContrastText: '#FFFFFF',
  primaryDark: '#4353D9',
  primaryLight: '#6E7CFF',
  secondaryMain: '#C2F750', // Preserved accent yellow-green
  secondaryContrastText: '#0E1A27',
  secondaryDark: '#ABDF3A',
  secondaryLight: '#D4FF69',
  backgroundDefault: '#F5F8FC',
  backgroundPaper: '#FFFFFF',
  backgroundAlternatePanel: '#F0F3F9',
  textPrimary: '#0E1A27',
  textSecondary: '#495A6B',
  textMuted: '#6E7A88',
  textAccent: '#4353D9', // Better contrast for light theme
  accentMain: '#C2F750', // Preserved accent yellow-green
  accentDark: '#ABDF3A',
  accentLight: '#D4FF69',
  accentContrast: '#0E1A27',
  bubblesBackground: '#F0F3F9',
  bubblesBorder: '#D8E0F0',
  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(60, 90, 120, 0.15)',
  cardActiveGlow: 'rgba(83, 99, 238, 0.15)',
  cardBorder: '#E3E9F4',
  filterActive: '#C2F750', // Preserved accent yellow-green
  filterInactive: '#CCCCCC',
  actionHover: 'rgba(83, 99, 238, 0.08)',
  actionSelected: 'rgba(83, 99, 238, 0.15)',
  actionDisabled: 'rgba(0, 0, 0, 0.3)',
  actionDisabledBackground: 'rgba(0, 0, 0, 0.08)',
  divider: '#E3E9F4',
  shadowLight: 'rgba(60, 90, 120, 0.1)',
  shadowMedium: 'rgba(60, 90, 120, 0.2)',
  shadowDark: 'rgba(60, 90, 120, 0.3)',
  overlayBackground: 'rgba(245, 248, 252, 0.85)',
  overlayDark: 'rgba(245, 248, 252, 0.95)',
  dotsInactive: '#D8E0F0',
  placeholder: '#F0F3F9',
  statusSuccess: '#4CAF50',
  statusWarning: '#FF9800',
  statusError: '#F44336',
  statusInfo: '#5363EE',
  focusOutline: '#5363EE',
  structureBorders: '#E3E9F4',
  structureLines: '#D8E0F0',
  structureOutlines: '#D8E0F0',
  errorMain: '#f44336',
  warningMain: '#ff9800',
  infoMain: '#2196f3',
  successMain: '#4caf50',
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
export const darkThemeColors = darkColors;
export const lightThemeColors = lightColors;

// Default export is the dark theme colors for backward compatibility
export default darkColors;
