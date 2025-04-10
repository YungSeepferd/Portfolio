/**
 * Color System
 * 
 * This file defines all color values used throughout the application.
 * It serves as a single source of truth for the color palette.
 */

// Define reusable color variables
const colors = {
  primaryMain: '#5363EE',
  primaryContrastText: '#FFFFFF',
  primaryDark: '#4353D9',
  primaryLight: '#6E7CFF',
  secondaryMain: '#C2F750',
  secondaryContrastText: '#0E1A27',
  secondaryDark: '#ABDF3A',
  secondaryLight: '#D4FF69',
  backgroundDefault: '#0E1A27',
  backgroundPaper: '#131F2D',
  backgroundAlternatePanel: '#1A2736',
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#A0A0A0',
  textAccent: '#C2F750',
  accentMain: '#C2F750',
  accentDark: '#ABDF3A',
  accentLight: '#D4FF69',
  accentContrast: '#0E1A27',
  bubblesBackground: '#1A2736',
  bubblesBorder: '#3545D6',
  cardBackground: '#131F2D',
  cardShadow: 'rgba(5, 10, 15, 0.4)',
  cardActiveGlow: 'rgba(194, 247, 80, 0.25)',
  cardBorder: '#3545D6',
  filterActive: '#C2F750',
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
  statusSuccess: '#C2F750',
  statusWarning: '#FFA726',
  statusError: '#F44336',
  statusInfo: '#5363EE',
  focusOutline: '#C2F750',
  structureBorders: '#3545D6',
  structureLines: '#3545D6',
  structureOutlines: '#3545D6',
  errorMain: '#f44336',
  warningMain: '#ff9800',
  infoMain: '#2196f3',
  successMain: '#4caf50',
};

/**
 * Creates a palette configuration for Material UI's createTheme
 */
export const createPalette = () => {
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

export default colors;