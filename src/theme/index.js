/**
 * Theme index file that combines all theme-related imports.
 * This file should be imported from src/theme.js
 */
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { tokens } from '../design/tokens';

// Create light and dark palettes from tokens
const createPalette = (mode = 'dark') => {
  const colors = tokens.colors;
  
  return {
    mode,
    primary: {
      main: colors.blue[500],
      light: colors.blue[300],
      dark: colors.blue[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.pink[500],
      light: colors.pink[300],
      dark: colors.pink[700],
      contrastText: '#ffffff',
    },
    error: {
      main: colors.red[500],
      light: colors.red[300],
      dark: colors.red[700],
      contrastText: '#ffffff',
    },
    warning: {
      main: colors.orange[500],
      light: colors.orange[300],
      dark: colors.orange[700],
      contrastText: '#ffffff',
    },
    info: {
      main: colors.teal[500],
      light: colors.teal[300],
      dark: colors.teal[700],
      contrastText: '#ffffff',
    },
    success: {
      main: colors.green[500],
      light: colors.green[300],
      dark: colors.green[700],
      contrastText: '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? colors.grey[100] : colors.grey[900],
      secondary: mode === 'dark' ? colors.grey[300] : colors.grey[700],
      disabled: mode === 'dark' ? colors.grey[500] : colors.grey[500],
    },
    background: {
      default: mode === 'dark' ? colors.darkMode.background : colors.grey[100],
      paper: mode === 'dark' ? colors.darkMode.paper : colors.common.white,
    },
    divider: mode === 'dark' ? colors.darkMode.divider : colors.grey[300],
    // Additional custom colors
    accent: {
      main: colors.green[400],
      light: colors.green[200],
      dark: colors.green[600],
    },
  };
};

// Import typography, spacing, & breakpoints
import typography from './typography';
import spacing from './spacing';
import breakpoints from './breakpoints';

// Create component overrides based on theme
const createComponents = (theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius * 2,
        textTransform: 'none',
        fontWeight: 600,
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: theme.shadows[2],
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        boxShadow: theme.shadows[2],
        borderRadius: theme.shape.borderRadius * 2,
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3),
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
      },
    },
  },
});

// Create a theme instance
const createAppTheme = (mode = 'dark') => {
  const palette = createPalette(mode);
  
  let theme = createTheme({
    palette,
    typography,
    spacing,
    breakpoints: { values: breakpoints },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 8px rgba(0, 0, 0, 0.1)',
      '0px 8px 16px rgba(0, 0, 0, 0.15)',
      '0px 12px 24px rgba(0, 0, 0, 0.2)',
      '0px 16px 32px rgba(0, 0, 0, 0.25)',
      ...Array(19).fill('none'), // Fill the rest with none
    ],
    // Add tokens as custom property for reference
    tokens,
  });
  
  // Apply component overrides
  theme = createTheme(theme, {
    components: createComponents(theme),
  });
  
  // Apply responsive font sizing
  theme = responsiveFontSizes(theme);
  
  return theme;
};

// Export themes
export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

// Export default theme (dark)
export default darkTheme;

// Export token system for design tool integration
export { tokens } from '../design/tokens';
