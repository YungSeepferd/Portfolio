/**
 * Typography System
 * 
 * This file defines all typography settings used throughout the application.
 * It includes font families, sizes, weights, and variants.
 */

// Define typography settings
const typography = {
  // Base font is now Kumbh Sans for body text
  fontFamily: `'Kumbh Sans', 'Helvetica', 'Arial', sans-serif`,
  
  // Headings use IBM Plex Mono
  h1: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`,
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`,
    fontSize: '2.5rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`,
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`,
    fontSize: '1.6rem',
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`,
    fontSize: '1.4rem',
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
  h6: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`,
    fontSize: '1.2rem',
    fontWeight: 500,
    letterSpacing: '-0.01em',
  },
  
  // All other text elements use Kumbh Sans (inherited from base fontFamily)
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.66,
  },
  overline: {
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
  projectTitle: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`, // Updated to IBM Plex Mono
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  chipText: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
};

/**
 * Creates typography configuration for use with Material UI's createTheme
 * 
 * @param {Object} colors - The colors object from the theme
 * @returns {Object} Material UI compatible typography configuration
 */
export const createTypography = (colors) => {
  // Apply color-dependent typography styles
  return {
    ...typography,
    h3: {
      ...typography.h3,
      color: colors.primaryMain,
    },
    projectTitle: {
      ...typography.projectTitle,
      color: colors.primaryMain,
    }
  };
};

export default typography;