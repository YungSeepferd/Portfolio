import { tokens } from '../../design/tokens';

// Light mode palette configuration
export const palette = {
  // Primary colors
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
  
  // Background colors
  background: {
    default: tokens.colors.grey[100],
    paper: tokens.colors.common.white,
    card: '#ffffff',
    section: '#f8f9fa',
    footer: '#0a1929',
    overlay: 'rgba(255, 255, 255, 0.9)',
    overlayHover: 'rgba(255, 255, 255, 0.95)',
  },
  
  // Text colors
  text: {
    primary: tokens.colors.grey[900],
    secondary: tokens.colors.grey[700],
    tertiary: tokens.colors.grey[500],
    disabled: tokens.colors.grey[400],
  },
  
  // Common colors
  common: {
    black: tokens.colors.common.black,
    white: tokens.colors.common.white,
  },
  
  // Divider color
  divider: 'rgba(0, 0, 0, 0.12)',
  
  // Project-specific colors for card variants
  // These will be accessible through theme.palette.project.primary, etc.
  project: {
    primary: tokens.colors.blue[500],
    secondary: tokens.colors.pink[500],
    success: tokens.colors.green[500],
    warning: tokens.colors.orange[500],
    error: tokens.colors.red[500],
    info: tokens.colors.teal[500],
  },
  
  // Shadow colors for consistent shadows
  shadow: {
    light: 'rgba(0, 0, 0, 0.08)',
    medium: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
};

export default palette;
