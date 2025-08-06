/**
 * Theme Colors
 *
 * This file provides a wrapper around tokens.colors to ensure consistent
 * color usage throughout the application. It defines and exports the color
 * palette directly to avoid circular dependencies.
 */

// Define and export color palette directly (do not import tokens here)
const colors = {
  primaryMain: '#5363EE',
  primaryLight: '#7B8AFF',
  primaryDark: '#2B3A9A',
  primaryContrastText: '#fff',
  secondaryMain: '#C2F750',
  secondaryLight: '#E6FFB2',
  secondaryDark: '#8CBF2F',
  secondaryContrastText: '#111',
  errorMain: '#FF5252',
  warningMain: '#FFC107',
  infoMain: '#29b6f6',
  successMain: '#4caf50',
  backgroundDefault: '#f7f9fc',
  backgroundPaper: '#fff',
  backgroundAlternatePanel: '#f4f6fa',
  textPrimary: '#111',
  textSecondary: 'rgba(0,0,0,0.6)',
  textMuted: 'rgba(0,0,0,0.38)',
  textAccent: '#5363EE',
  divider: 'rgba(0,0,0,0.12)',
  accentMain: '#29b6f6',
  accentLight: '#7ee7ff',
  accentDark: '#0086c3',
  accentContrast: '#fff',
  cardBackground: '#fff',
  cardShadow: '0px 4px 16px rgba(0,0,0,0.08)',
  cardActiveGlow: '0 0 0 2px #5363EE33',
  cardBorder: 'rgba(0,0,0,0.08)',
  structureBorders: 'rgba(0,0,0,0.08)',
  structureLines: 'rgba(0,0,0,0.04)',
  shadowLight: '0px 2px 4px rgba(0,0,0,0.05)',
  shadowMedium: '0px 6px 12px rgba(0,0,0,0.12)',
  shadowDark: '0px 10px 20px rgba(0,0,0,0.18)',
  bubblesBackground: '#f7f9fc',
  bubblesBorder: '#e0e0e0',
  overlayBackground: 'rgba(0,0,0,0.5)',
  overlayDark: 'rgba(0,0,0,0.8)',
  dotsInactive: '#e0e0e0',
  statusSuccess: '#4caf50',
  statusWarning: '#FFC107',
  statusError: '#FF5252',
  statusInfo: '#29b6f6',
};

export default colors;
