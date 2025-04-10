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

export default tokens;
