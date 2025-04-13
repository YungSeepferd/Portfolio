/**
 * Theme Configuration
 * 
 * This file exports a function to create theme configurations
 * and pre-configured light and dark themes.
 */
import { createTheme } from '@mui/material/styles';

// Define the color palettes
const lightPalette = {
  primary: {
    main: '#5363EE',  // Primary blue
    light: '#7D89F2',
    dark: '#3245CB',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#C2F750',  // Accent green
    light: '#D5FF7D',
    dark: '#9AC433',
    contrastText: '#000000',
  },
  accent: {
    main: '#C2F750',  // Same as secondary for consistency
    light: '#D5FF7D',
    dark: '#9AC433',
    contrastText: '#000000',
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    card: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.9)',
    overlayHover: 'rgba(255, 255, 255, 0.95)',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    disabled: '#94A3B8',
  },
  shadow: {
    light: 'rgba(15, 23, 42, 0.08)',
    medium: 'rgba(15, 23, 42, 0.12)',
    dark: 'rgba(15, 23, 42, 0.2)',
  }
};

const darkPalette = {
  primary: {
    main: '#5363EE',  // Keep consistent with light mode
    light: '#7D89F2',
    dark: '#3245CB',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#C2F750',  // Keep consistent with light mode
    light: '#D5FF7D',
    dark: '#9AC433',
    contrastText: '#000000',
  },
  accent: {
    main: '#C2F750',  // Same as secondary for consistency
    light: '#D5FF7D',
    dark: '#9AC433',
    contrastText: '#000000',
  },
  background: {
    default: '#0A1628',
    paper: '#0F172A',
    card: '#1E293B',
    overlay: 'rgba(15, 23, 42, 0.9)',
    overlayHover: 'rgba(15, 23, 42, 0.95)',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    disabled: '#64748B',
  },
  shadow: {
    light: 'rgba(0, 0, 0, 0.2)',
    medium: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.6)',
  }
};

// Typography settings remain consistent across themes
const typography = {
  fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: '2rem',
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
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: '1.125rem',
    lineHeight: 1.5,
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
};

// Shape settings
const shape = {
  borderRadius: 4, // Reduced from 8
};

// Media and design constants (separate from the theme but easily accessible)
export const designConstants = {
  // These will be directly importable without needing to access theme
  placeholderImages: {
    project: '/assets/images/placeholders/project.jpg',
    profile: '/assets/images/placeholders/profile.jpg',
    hero: '/assets/images/placeholders/hero.jpg',
  },
  projectColors: {
    primary: '#5363EE',    // Blue
    secondary: '#C2F750',  // Green
    success: '#10B981',    // Emerald
    warning: '#FBBF24',    // Amber
    error: '#EF4444',      // Red
    info: '#3B82F6',       // Blue
  },
  transitions: {
    standard: '0.2s ease-in-out',
    slow: '0.4s ease-in-out',
    fast: '0.1s ease-in-out',
  }
};

// Function to create component overrides
const createComponentOverrides = (colors) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: colors.background.default,
        color: colors.text.primary,
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
        padding: '8px 16px',
        fontWeight: 500,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: colors.background.card,
        borderRadius: 12,
        boxShadow: `0 4px 8px ${colors.shadow.light}`,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: colors.background.paper,
      },
    },
  },
});

// Function to create shadow array
const createShadows = (shadowColors) => [
  'none',
  `0 1px 2px ${shadowColors.light}`,
  `0 3px 6px ${shadowColors.light}`,
  `0 5px 12px ${shadowColors.light}`,
  `0 8px 16px ${shadowColors.medium}`,
  `0 12px 24px ${shadowColors.medium}`,
  `0 16px 32px ${shadowColors.medium}`,
  `0 20px 40px ${shadowColors.dark}`,
  ...Array(16).fill('none').map((_, i) => 
    i > 7 ? `0 ${i * 2}px ${i * 4}px ${shadowColors.dark}` : 'none'
  )
];

/**
 * Create theme function
 * @param {string} mode - 'light' or 'dark'
 * @returns {object} - MUI theme object
 */
export const createAppTheme = (mode = 'light') => {
  // Select palette based on mode
  const colors = mode === 'dark' ? darkPalette : lightPalette;
  
  // Create and return theme
  return createTheme({
    palette: {
      mode,
      ...colors,
    },
    typography,
    shape,
    shadows: createShadows(colors.shadow),
    components: createComponentOverrides(colors),
  });
};

// Pre-created themes for direct import
export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

// Default export is the theme creation function
export default createAppTheme;