import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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
  
  // Define theme with consistent color relationships
  let theme = createTheme({
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
      info: {
        main: accentMain,
      },
      background: {
        default: isDark ? '#121212' : '#f7f9fc',
        paper: isDark ? '#1e1e1e' : '#ffffff',
        subtle: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      },
      text: {
        primary: isDark ? '#ffffff' : '#111111',
        secondary: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
        disabled: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      // Color values specifically for the 3D scenes
      scene3d: {
        sphere: primaryMain,
        box: secondaryMain,
        torus: accentMain,
        particleColor: isDark ? '#ffffff' : primaryMain,
        emissive: isDark ? secondaryLight : secondaryMain,
      }
    },
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2,
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
    },
    spacing: 8,
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 8px rgba(0, 0, 0, 0.08)',
      '0px 6px 12px rgba(0, 0, 0, 0.12)',
      '0px 8px 16px rgba(0, 0, 0, 0.15)',
      '0px 10px 20px rgba(0, 0, 0, 0.18)',
      ...Array(19).fill('none'), // Fill remaining slots with none
    ],
    zIndex: {
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
      // Custom z-indexes for portfolio components
      heroBackground: 5,
      heroContent: 10,
      scrollIndicator: 15,
      sectionNavigation: 20,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
          contained: {
            padding: '8px 24px',
          },
          outlined: {
            padding: '7px 23px',
          },
          text: {
            padding: '8px 16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.4)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            fontWeight: 500,
          }
        }
      }
    }
  });
  
  // Make typography responsive
  theme = responsiveFontSizes(theme);
  
  return theme;
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