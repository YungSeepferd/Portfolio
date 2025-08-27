import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { tokens } from './theme/design/tokens';

// Utility to get responsive border radius from theme/tokens
export const getResponsiveRadius = (theme, bp = 'md') => {
  // Prefer theme.shape.radius if available, else fallback to tokens
  const shape = theme?.shape?.radius || tokens.shape.radius;
  return shape[bp] || shape.default || 8;
};

/**
 * Primary theme configuration for the portfolio
 * Provides consistent colors, typography, and spacing throughout the app
 */
const createAppTheme = (mode = 'dark') => {
  // Define color palette based on mode
  const isDark = mode === 'dark';
  
  // Define primary colors - used in 3D scenes and UI elements
  const primaryHue = 230; // Indigo/blue
  const secondaryHue = 85; // Lime/light green
  const accentHue = 190; // Cyan/light blue
  
  // Lightness values - adjust based on light/dark mode
  const primaryLightness = isDark ? 65 : 45;
  const secondaryLightness = isDark ? 65 : 50;
  const accentLightness = isDark ? 60 : 45;
  
  // Convert HSL to RGB hex for Material UI
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  
  // Create primary and secondary colors with consistent HSL values
  const primaryMain = hslToHex(primaryHue, 80, primaryLightness);
  const primaryLight = hslToHex(primaryHue, 75, primaryLightness + 10);
  const primaryDark = hslToHex(primaryHue, 85, primaryLightness - 10);
  
  const secondaryMain = hslToHex(secondaryHue, 80, secondaryLightness);
  const secondaryLight = hslToHex(secondaryHue, 75, secondaryLightness + 10);
  const secondaryDark = hslToHex(secondaryHue, 85, secondaryLightness - 10);
  
  const accentMain = hslToHex(accentHue, 75, accentLightness);
  const accentLight = hslToHex(accentHue, 70, accentLightness + 10);
  const accentDark = hslToHex(accentHue, 80, accentLightness - 10);
  
  // Create base theme first to ensure all MUI defaults are included
  const baseTheme = createTheme({ palette: { mode } });
  
  // Define theme with consistent color relationships, extending the base theme
  let theme = createTheme(baseTheme, {
    palette: {
      mode,
      primary: {
        main: primaryMain,
        light: primaryLight,
        dark: primaryDark,
        contrastText: '#ffffff',
      },
      secondary: {
        main: secondaryMain,
        light: secondaryLight,
        dark: secondaryDark,
        contrastText: isDark ? '#000000' : '#ffffff',
      },
      accent: {
        main: accentMain,
        light: accentLight,
        dark: accentDark,
        contrastText: '#ffffff',
      },
      // Status colors
      success: {
        main: isDark ? '#66bb6a' : '#2e7d32',
        light: isDark ? '#81c784' : '#4caf50',
        dark: isDark ? '#388e3c' : '#1b5e20',
        contrastText: '#ffffff',
      },
      error: {
        main: isDark ? '#f44336' : '#d32f2f',
        light: isDark ? '#e57373' : '#ef5350',
        dark: isDark ? '#d32f2f' : '#c62828',
        contrastText: '#ffffff',
      },
      warning: {
        main: isDark ? '#ffa726' : '#ed6c02',
        light: isDark ? '#ffb74d' : '#ff9800',
        dark: isDark ? '#f57c00' : '#e65100',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      info: {
        main: accentMain,
        light: accentLight,
        dark: accentDark,
        contrastText: '#ffffff',
      },
      // Background colors
      background: {
        default: isDark ? '#121212' : '#f7f9fc',
        paper: isDark ? '#1e1e1e' : '#ffffff',
        subtle: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
        overlay: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
      },
      // Text colors
      text: {
        primary: isDark ? '#ffffff' : '#111111',
        secondary: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
        disabled: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)',
        hint: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)',
        icon: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.54)',
      },
      // Common colors
      common: {
        black: '#000000',
        white: '#ffffff',
      },
      // Action colors
      action: {
        active: isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.54)',
        hover: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        selected: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
        disabled: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
        disabledBackground: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      // Color values specifically for the 3D scenes
      scene3d: {
        sphere: primaryMain,
        box: secondaryMain,
        torus: accentMain,
        particleColor: isDark ? '#ffffff' : primaryMain,
        emissive: isDark ? secondaryLight : secondaryMain,
        background: isDark ? '#121212' : '#f7f9fc',
      }
    },
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        '@media (max-width:900px)': {
          fontSize: '2.5rem',
        },
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
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
    },
    shape: {
      borderRadius: 8,
      borderRadiusSm: 4,
      borderRadiusMd: 8,
      borderRadiusLg: 16,
      borderRadiusXl: 24,
      // For custom components
      cardRadius: 16,
      buttonRadius: 8,
      inputRadius: 8,
      // For 3D scene controls
      controlRadius: 4,
    },
    spacing: 8,
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
      '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
      '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
      '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
      '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)',
      '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.07),0px 1px 18px 0px rgba(0,0,0,0.06)',
      '0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.07),0px 2px 16px 1px rgba(0,0,0,0.06)',
      '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
      '0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.07),0px 3px 16px 2px rgba(0,0,0,0.06)',
      '0px 6px 6px -3px rgba(0,0,0,0.1),0px 10px 14px 1px rgba(0,0,0,0.07),0px 4px 18px 3px rgba(0,0,0,0.06)',
      '0px 6px 7px -4px rgba(0,0,0,0.1),0px 11px 15px 1px rgba(0,0,0,0.07),0px 4px 20px 3px rgba(0,0,0,0.06)',
      '0px 7px 8px -4px rgba(0,0,0,0.1),0px 12px 17px 2px rgba(0,0,0,0.07),0px 5px 22px 4px rgba(0,0,0,0.06)',
      '0px 7px 8px -4px rgba(0,0,0,0.1),0px 13px 19px 2px rgba(0,0,0,0.07),0px 5px 24px 4px rgba(0,0,0,0.06)',
      '0px 7px 9px -4px rgba(0,0,0,0.1),0px 14px 21px 2px rgba(0,0,0,0.07),0px 5px 26px 4px rgba(0,0,0,0.06)',
      '0px 8px 9px -5px rgba(0,0,0,0.1),0px 15px 22px 2px rgba(0,0,0,0.07),0px 6px 28px 5px rgba(0,0,0,0.06)',
      '0px 8px 10px -5px rgba(0,0,0,0.1),0px 16px 24px 2px rgba(0,0,0,0.07),0px 6px 30px 5px rgba(0,0,0,0.06)',
      '0px 8px 11px -5px rgba(0,0,0,0.1),0px 17px 26px 2px rgba(0,0,0,0.07),0px 6px 32px 5px rgba(0,0,0,0.06)',
      '0px 9px 11px -5px rgba(0,0,0,0.1),0px 18px 28px 2px rgba(0,0,0,0.07),0px 7px 34px 6px rgba(0,0,0,0.06)',
      '0px 9px 12px -6px rgba(0,0,0,0.1),0px 19px 29px 2px rgba(0,0,0,0.07),0px 7px 36px 6px rgba(0,0,0,0.06)',
      '0px 10px 13px -6px rgba(0,0,0,0.1),0px 20px 31px 3px rgba(0,0,0,0.07),0px 8px 38px 7px rgba(0,0,0,0.06)',
      '0px 10px 13px -6px rgba(0,0,0,0.1),0px 21px 33px 3px rgba(0,0,0,0.07),0px 8px 40px 7px rgba(0,0,0,0.06)',
      '0px 10px 14px -6px rgba(0,0,0,0.1),0px 22px 35px 3px rgba(0,0,0,0.07),0px 8px 42px 7px rgba(0,0,0,0.06)',
      '0px 11px 14px -7px rgba(0,0,0,0.1),0px 23px 36px 3px rgba(0,0,0,0.07),0px 9px 44px 8px rgba(0,0,0,0.06)',
      '0px 11px 15px -7px rgba(0,0,0,0.1),0px 24px 38px 3px rgba(0,0,0,0.07),0px 9px 46px 8px rgba(0,0,0,0.06)',
    ],
    zIndex: {
      mobileStepper: 1000,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
      // Custom z-indexes for portfolio components
      heroBackground: 0,
      heroContent: 10,
      section: 2,
      header: 1100,
      footer: 1100,
      modalOverlay: 1299,
      // 3D scene specific
      sceneControls: 5,
      sceneContent: 2,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
          contained: {
            padding: '12px 24px',
            '&:hover': {
              boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
            },
          },
          outlined: {
            padding: '11px 23px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            },
          },
          text: {
            padding: '8px 16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.4)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
            '&:hover': {
              boxShadow: isDark 
                ? '0 8px 32px rgba(0, 0, 0, 0.6)'
                : '0 8px 32px rgba(0, 0, 0, 0.12)',
            },
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
            fontSize: '0.875rem',
            height: 'auto',
            padding: '4px 8px',
            '& .MuiChip-label': {
              padding: '0 4px',
            },
          },
          colorPrimary: {
            backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
            color: isDark ? '#a5b4fc' : '#4338ca',
          },
          colorSecondary: {
            backgroundColor: isDark ? 'rgba(132, 204, 22, 0.2)' : 'rgba(132, 204, 22, 0.1)',
            color: isDark ? '#bef264' : '#365314',
          },
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: isDark 
              ? '0 2px 8px rgba(0, 0, 0, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.06)',
          },
          elevation2: {
            boxShadow: isDark 
              ? '0 4px 16px rgba(0, 0, 0, 0.4)'
              : '0 4px 16px rgba(0, 0, 0, 0.08)',
          },
          elevation3: {
            boxShadow: isDark 
              ? '0 8px 24px rgba(0, 0, 0, 0.5)'
              : '0 8px 24px rgba(0, 0, 0, 0.1)',
          },
        }
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
          },
          h2: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
          },
          h3: {
            fontWeight: 600,
            letterSpacing: '-0.015em',
          },
          h4: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        }
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
            borderRadius: 8,
          },
        }
      },
    }
  });
  
  // Make typography responsive
  theme = responsiveFontSizes(theme);
  
  // Define transitions configuration
  const transitionsConfig = {
    // Standard transitions
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    // Common durations in ms
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // Most basic recommended timing
      standard: 300,
      // This is to be used in complex animations
      complex: 375,
      // Recommended when something is entering screen
      enteringScreen: 225,
      // Recommended when something is leaving screen
      leavingScreen: 195,
    },
  };
  
  // Update theme with custom transitions while preserving the create function
  const themeWithTransitions = createTheme(theme, {
    transitions: {
      easing: transitionsConfig.easing,
      duration: transitionsConfig.duration,
    },
  });
  
  // Make typography responsive and return the final theme
  return responsiveFontSizes(themeWithTransitions);
};

// Create the light and dark themes once
export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

// Export design constants that are used in MediaPathResolver.js
export const designConstants = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  paths: {
    images: {
      base: '/images',
      projects: '/images/projects',
      about: '/images/about',
    },
    videos: {
      base: '/videos',
      projects: '/videos/projects',
    }
  },
  aspectRatios: {
    portrait: 3/4,
    landscape: 16/9,
    square: 1,
  }
};

export default createAppTheme;