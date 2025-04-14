import { tokens } from '../../design/tokens';

// Dark mode palette configuration
export const palette = {
  // Primary colors - we keep the same colors as light mode
  primary: {
    main: tokens.colors.blue[500],
    light: tokens.colors.blue[300],
    dark: tokens.colors.blue[700],
    contrastText: tokens.colors.common.white,
  },
  
  // Secondary colors
  secondary: {
    main: tokens.colors.pink[500],
    light: tokens.colors.pink[300],
    dark: tokens.colors.pink[700],
    contrastText: tokens.colors.common.white,
  },
  
  // Error, warning, info, success colors
  error: {
    main: tokens.colors.red[500],
    light: tokens.colors.red[300],
    dark: tokens.colors.red[700],
    contrastText: tokens.colors.common.white,
  },
  warning: {
    main: tokens.colors.orange[500],
    light: tokens.colors.orange[300],
    dark: tokens.colors.orange[700],
    contrastText: tokens.colors.common.black,
  },
  info: {
    main: tokens.colors.teal[500],
    light: tokens.colors.teal[300],
    dark: tokens.colors.teal[700],
    contrastText: tokens.colors.common.white,
  },
  success: {
    main: tokens.colors.green[500],
    light: tokens.colors.green[300],
    dark: tokens.colors.green[700],
    contrastText: tokens.colors.common.white,
  },
  
  // Background colors - dark mode specific
  background: {
    default: tokens.colors.darkMode.background,
    paper: tokens.colors.darkMode.paper,
    card: 'rgba(30, 41, 59, 0.8)', // Semi-transparent cards
    section: '#131f2d',
    footer: '#071221',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayHover: 'rgba(0, 0, 0, 0.85)',
  },
  
  // Text colors
  text: {
    primary: tokens.colors.grey[100],
    secondary: tokens.colors.grey[300],
    tertiary: tokens.colors.grey[400],
    disabled: tokens.colors.grey[600],
  },
  
  // Common colors
  common: {
    black: tokens.colors.common.black,
    white: tokens.colors.common.white,
  },
  
  // Divider color
  divider: 'rgba(255, 255, 255, 0.12)',
  
  // Project-specific colors for card variants
  project: {
    primary: tokens.colors.blue[400], // Slightly lighter in dark mode
    secondary: tokens.colors.pink[400],
    success: tokens.colors.green[400],
    warning: tokens.colors.orange[400],
    error: tokens.colors.red[400],
    info: tokens.colors.teal[400],
  },
  
  // Shadow colors for consistent shadows in dark mode
  shadow: {
    light: 'rgba(0, 0, 0, 0.2)',
    medium: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.6)',
  },
};

export default palette;
