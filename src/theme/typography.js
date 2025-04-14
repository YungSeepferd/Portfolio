import { tokens } from '../design/tokens';

/**
 * Typography System
 * 
 * This file defines all typography settings used throughout the application.
 * It includes font families, sizes, weights, and variants.
 */

// Define typography settings
const typography = {
  // Base font settings
  fontFamily: tokens.typography.fontFamilies.body,
  
  // Headings (h1-h6)
  h1: {
    fontFamily: tokens.typography.fontFamilies.heading,
    fontSize: tokens.typography.fontSizes.xxxl,
    fontWeight: tokens.typography.fontWeights.bold,
    lineHeight: tokens.typography.lineHeights.tight,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontFamily: tokens.typography.fontFamilies.heading,
    fontSize: tokens.typography.fontSizes.xxl,
    fontWeight: tokens.typography.fontWeights.bold,
    lineHeight: tokens.typography.lineHeights.tight,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: tokens.typography.fontFamilies.heading,
    fontSize: '1.75rem',
    fontWeight: tokens.typography.fontWeights.semiBold,
    lineHeight: tokens.typography.lineHeights.tight,
  },
  h4: {
    fontFamily: tokens.typography.fontFamilies.heading,
    fontSize: tokens.typography.fontSizes.xl,
    fontWeight: tokens.typography.fontWeights.semiBold,
    lineHeight: tokens.typography.lineHeights.tight,
  },
  h5: {
    fontFamily: tokens.typography.fontFamilies.heading,
    fontSize: tokens.typography.fontSizes.lg,
    fontWeight: tokens.typography.fontWeights.semiBold,
    lineHeight: tokens.typography.lineHeights.normal,
  },
  h6: {
    fontFamily: tokens.typography.fontFamilies.heading,
    fontSize: tokens.typography.fontSizes.md,
    fontWeight: tokens.typography.fontWeights.semiBold,
    lineHeight: tokens.typography.lineHeights.normal,
  },
  
  // Other typography variants
  subtitle1: {
    fontSize: tokens.typography.fontSizes.md,
    fontWeight: tokens.typography.fontWeights.medium,
    lineHeight: tokens.typography.lineHeights.normal,
  },
  subtitle2: {
    fontSize: tokens.typography.fontSizes.sm,
    fontWeight: tokens.typography.fontWeights.medium,
    lineHeight: tokens.typography.lineHeights.normal,
  },
  body1: {
    fontSize: tokens.typography.fontSizes.md,
    lineHeight: tokens.typography.lineHeights.relaxed,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: tokens.typography.fontSizes.sm,
    lineHeight: tokens.typography.lineHeights.relaxed,
    letterSpacing: '0.01em',
  },
  caption: {
    fontSize: tokens.typography.fontSizes.xs,
    lineHeight: tokens.typography.lineHeights.normal,
  },
  overline: {
    fontSize: tokens.typography.fontSizes.xs,
    fontWeight: tokens.typography.fontWeights.medium,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  button: {
    textTransform: 'none', // MUI buttons use uppercase by default
    fontWeight: tokens.typography.fontWeights.medium,
  },
};

export default typography;