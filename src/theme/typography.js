/**
 * Typography System
 * 
 * This file defines all typography settings used throughout the application.
 * It includes font families, sizes, weights, and variants.
 */

// Define and export typography settings directly (do not import tokens here)
const typography = {
  fontFamily: [
    'Montserrat',
    'IBM Plex Mono',
    '-apple-system',
    'BlinkMacSystemFont',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontWeight: 700,
    fontSize: '3.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.75rem',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: '2.25rem',
    lineHeight: 1.3,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.4,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '1.1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0.01071em',
  },
  button: {
    fontWeight: 600,
    fontSize: '0.875rem',
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.03333em',
  },
  chipText: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
};

export default typography;