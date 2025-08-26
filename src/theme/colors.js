/**
 * Theme Colors
 * 
 * This file provides a consistent color palette for the entire application.
 * All colors should be referenced from this file to maintain consistency.
 */

// Primary color palette
const primary = {
  main: '#5363EE',
  light: '#7B8AFF',
  dark: '#2B3A9A',
  contrastText: '#FFFFFF',
};

// Secondary color palette
const secondary = {
  main: '#C2F750',
  light: '#E6FFB2',
  dark: '#8CBF2F',
  contrastText: '#111111',
};

// Status colors
const status = {
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
};

// Text colors
const text = {
  primary: '#111111',
  secondary: 'rgba(17, 17, 17, 0.6)',
  disabled: 'rgba(17, 17, 17, 0.38)',
  hint: 'rgba(17, 17, 17, 0.38)',
  icon: 'rgba(17, 17, 17, 0.54)',
};

// Background colors
const background = {
  default: '#F7F9FC',
  paper: '#FFFFFF',
  alternate: '#F4F6FA',
};

// Common colors
const common = {
  black: '#000000',
  white: '#FFFFFF',
};

// Action colors
const action = {
  active: 'rgba(0, 0, 0, 0.54)',
  hover: 'rgba(0, 0, 0, 0.04)',
  selected: 'rgba(0, 0, 0, 0.08)',
  disabled: 'rgba(0, 0, 0, 0.26)',
  disabledBackground: 'rgba(0, 0, 0, 0.12)',
};

// Border colors
const border = {
  light: 'rgba(0, 0, 0, 0.12)',
  medium: 'rgba(0, 0, 0, 0.23)',
  dark: 'rgba(0, 0, 0, 0.87)',
};

// Shadow styles
const shadows = {
  light: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  medium: '0px 6px 12px rgba(0, 0, 0, 0.12)',
  dark: '0px 10px 20px rgba(0, 0, 0, 0.18)',
  card: '0px 4px 16px rgba(0, 0, 0, 0.08)',
};

// Export all colors as a single object
export const colors = {
  primary,
  secondary,
  status,
  text,
  background,
  common,
  action,
  border,
  shadows,
  // Legacy support (deprecated, will be removed in future versions)
  primaryMain: primary.main,
  primaryLight: primary.light,
  primaryDark: primary.dark,
  primaryContrastText: primary.contrastText,
  secondaryMain: secondary.main,
  secondaryLight: secondary.light,
  secondaryDark: secondary.dark,
  secondaryContrastText: secondary.contrastText,
  errorMain: status.error,
  warningMain: status.warning,
  infoMain: status.info,
  successMain: status.success,
  backgroundDefault: background.default,
  backgroundPaper: background.paper,
  backgroundAlternatePanel: background.alternate,
  textPrimary: text.primary,
  textSecondary: text.secondary,
  textMuted: text.disabled,
  textAccent: primary.main,
  divider: border.light,
  accentMain: primary.main,
  accentLight: primary.light,
  accentDark: primary.dark,
  accentContrast: primary.contrastText,
  cardBackground: background.paper,
  cardShadow: shadows.card,
  cardActiveGlow: `0 0 0 2px ${primary.main}33`,
  cardBorder: border.light,
  structureBorders: border.light,
  structureLines: 'rgba(0, 0, 0, 0.04)',
  shadowLight: shadows.light,
  shadowMedium: shadows.medium,
  shadowDark: shadows.dark,
  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
};

export default colors;