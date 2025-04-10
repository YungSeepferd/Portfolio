import { createTheme } from '@mui/material/styles';

// Creating a unified theme setup with proper light/dark mode support
const createAppTheme = (mode) => {
  // Define shared values
  const fontFamily = '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif';
  
  // Base colors that change between modes
  const baseColors = {
    light: {
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
      },
      structure: {
        borders: 'rgba(203, 213, 225, 0.8)',
        divider: 'rgba(203, 213, 225, 0.8)',
      }
    },
    dark: {
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
        default: '#0F172A',  // Dark blue background
        paper: '#1E293B',    // Slightly lighter dark blue
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
      },
      structure: {
        borders: 'rgba(51, 65, 85, 0.6)',
        divider: 'rgba(51, 65, 85, 0.6)',
      }
    }
  };
  
  // Custom theme options shared between modes
  const customOptions = {
    customButtons: {
      contact: {
        borderRadius: 24,
        fontWeight: 600,
        textTransform: 'none',
        py: 1.2,
        px: 3,
        boxShadow: mode === 'dark' ? '0 4px 10px rgba(0,0,0,0.5)' : '0 4px 10px rgba(0,0,0,0.15)',
      }
    },
    customSizes: {
      bigCardHeight: '400px',
      bigCardImageWidth: '40%',
    },
    customEffects: {
      cardHover: {
        y: -5,
        boxShadow: mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.1)',
      }
    },
    animationSettings: {
      durations: {
        short: 200,
        medium: 300,
        long: 500
      },
      easings: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
      }
    }
  };
  
  // Choose the appropriate palette based on mode
  const colors = baseColors[mode];
  
  // Create and return the theme object
  return createTheme({
    palette: {
      mode,
      ...colors,
      common: {
        black: '#000000',
        white: '#FFFFFF',
      },
      error: {
        main: mode === 'dark' ? '#F87171' : '#DC2626',
        light: mode === 'dark' ? '#FCA5A5' : '#EF4444',
        dark: mode === 'dark' ? '#B91C1C' : '#991B1B',
      },
      warning: {
        main: mode === 'dark' ? '#FBBF24' : '#F59E0B',
        light: mode === 'dark' ? '#FCD34D' : '#FBBF24',
        dark: mode === 'dark' ? '#D97706' : '#B45309',
      },
      info: {
        main: mode === 'dark' ? '#38BDF8' : '#0EA5E9',
        light: mode === 'dark' ? '#7DD3FC' : '#38BDF8',
        dark: mode === 'dark' ? '#0284C7' : '#0369A1',
      },
      success: {
        main: mode === 'dark' ? '#4ADE80' : '#22C55E',
        light: mode === 'dark' ? '#86EFAC' : '#4ADE80',
        dark: mode === 'dark' ? '#16A34A' : '#15803D',
      },
      divider: colors.structure.divider,
    },
    typography: {
      fontFamily,
      h1: {
        fontFamily,
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontFamily,
        fontWeight: 700,
        fontSize: '2.75rem',
        lineHeight: 1.3,
        letterSpacing: '-0.005em',
      },
      h3: {
        fontFamily,
        fontWeight: 600,
        fontSize: '2.25rem',
        lineHeight: 1.3,
      },
      h4: {
        fontFamily,
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.4,
      },
      h5: {
        fontFamily,
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h6: {
        fontFamily,
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.5,
      },
      subtitle1: {
        fontFamily,
        fontWeight: 500,
        fontSize: '1.125rem',
        lineHeight: 1.6,
        letterSpacing: '0.005em',
      },
      subtitle2: {
        fontFamily,
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.005em',
      },
      body1: {
        fontFamily,
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.7,
      },
      body2: {
        fontFamily,
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.7,
      },
      button: {
        fontFamily,
        fontWeight: 500,
        fontSize: '0.9375rem',
        textTransform: 'none',
      },
      caption: {
        fontFamily,
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.5,
      },
      overline: {
        fontFamily,
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: 1.5,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
      chipText: {
        fontSize: '0.85rem',
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 8px rgba(0, 0, 0, 0.1)',
      '0px 6px 12px rgba(0, 0, 0, 0.12)',
      '0px 8px 16px rgba(0, 0, 0, 0.14)',
      '0px 10px 20px rgba(0, 0, 0, 0.16)',
      '0px 12px 24px rgba(0, 0, 0, 0.18)',
      '0px 14px 28px rgba(0, 0, 0, 0.2)',
      '0px 16px 32px rgba(0, 0, 0, 0.22)',
      '0px 18px 36px rgba(0, 0, 0, 0.24)',
      '0px 20px 40px rgba(0, 0, 0, 0.26)',
      '0px 22px 44px rgba(0, 0, 0, 0.28)',
      '0px 24px 48px rgba(0, 0, 0, 0.3)',
      '0px 26px 52px rgba(0, 0, 0, 0.32)',
      '0px 28px 56px rgba(0, 0, 0, 0.34)',
      '0px 30px 60px rgba(0, 0, 0, 0.36)',
      '0px 32px 64px rgba(0, 0, 0, 0.38)',
      '0px 34px 68px rgba(0, 0, 0, 0.4)',
      '0px 36px 72px rgba(0, 0, 0, 0.42)',
      '0px 38px 76px rgba(0, 0, 0, 0.44)',
      '0px 40px 80px rgba(0, 0, 0, 0.46)',
      '0px 42px 84px rgba(0, 0, 0, 0.48)',
      '0px 44px 88px rgba(0, 0, 0, 0.5)',
      '0px 46px 92px rgba(0, 0, 0, 0.52)',
      '0px 48px 96px rgba(0, 0, 0, 0.54)',
    ],
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: {
              xs: 16,
              sm: 24,
              md: 40,
              lg: 60,
            },
            paddingRight: {
              xs: 16,
              sm: 24,
              md: 40,
              lg: 60,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
            boxShadow: 'none',
          },
          contained: {
            boxShadow: mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.6)' : '0 4px 12px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontWeight: 500,
          },
        },
      },
    },
    // Custom properties
    ...customOptions
  });
};

// Export the theme creation function
export default createAppTheme;