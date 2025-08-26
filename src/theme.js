import { createTheme, responsiveFontSizes, experimental_extendTheme } from '@mui/material/styles';
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
 * Updated to use Material Design 3 tokens
 */
const createAppTheme = (mode = 'dark') => {
  // Define color palette based on mode
  const isDark = mode === 'dark';
  
  // Define primary colors - used in 3D scenes and UI elements
  const primaryHue = 230; // Indigo/blue
  const secondaryHue = 85; // Lime/light green
  const tertiaryHue = 190; // Cyan/light blue (previously accent)
  
  // Lightness values - adjust based on light/dark mode
  const primaryLightness = isDark ? 65 : 45;
  const secondaryLightness = isDark ? 65 : 50;
  const tertiaryLightness = isDark ? 60 : 45;
  
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
  
  const tertiaryMain = hslToHex(tertiaryHue, 75, tertiaryLightness);
  const tertiaryLight = hslToHex(tertiaryHue, 70, tertiaryLightness + 10);
  const tertiaryDark = hslToHex(tertiaryHue, 80, tertiaryLightness - 10);
  
  // Define theme with Material Design 3 color system
  let theme = experimental_extendTheme({
    // Use the new M3 colorSchemes structure
    colorSchemes: {
      [mode]: {
        palette: {
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
          tertiary: {
            main: tertiaryMain,
            light: tertiaryLight,
            dark: tertiaryDark,
            contrastText: '#ffffff',
          },
          // In M3, "info" color is typically mapped to tertiary
          info: {
            main: tertiaryMain,
          },
          background: {
            default: isDark ? '#121212' : '#f7f9fc',
            paper: isDark ? '#1e1e1e' : '#ffffff',
            surface: isDark ? '#1e1e1e' : '#ffffff',
            subtle: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
          },
          text: {
            primary: isDark ? '#ffffff' : '#111111',
            secondary: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            disabled: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)',
          },
          divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
          // Custom color values specifically for the 3D scenes
          scene3d: {
            sphere: primaryMain,
            box: secondaryMain,
            torus: tertiaryMain,
            particleColor: isDark ? '#ffffff' : primaryMain,
            emissive: isDark ? secondaryLight : secondaryMain,
          }
        },
      }
    },
    // Set the default color mode
    defaultColorScheme: mode,
    // Material Design 3 typography system
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Arial',
        'sans-serif',
      ].join(','),
      // M3 typography uses more precise naming and specifications
      // Display styles (large headings)
      displayLarge: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2,
      },
      displayMedium: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.2,
      },
      displaySmall: {
        fontWeight: 700,
        fontSize: '2.75rem',
        lineHeight: 1.2,
      },
      // Headline styles
      headlineLarge: {
        fontWeight: 600,
        fontSize: '2.25rem',
        lineHeight: 1.3,
      },
      headlineMedium: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      headlineSmall: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.4,
      },
      // Title styles
      titleLarge: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      titleMedium: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      titleSmall: {
        fontWeight: 600,
        fontSize: '1.1rem',
        lineHeight: 1.4,
      },
      // Label styles
      labelLarge: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
      },
      labelMedium: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.01071em',
      },
      labelSmall: {
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.03333em',
      },
      // Body styles
      bodyLarge: {
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.00938em',
      },
      bodyMedium: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        letterSpacing: '0.01071em',
      },
      bodySmall: {
        fontSize: '0.75rem',
        lineHeight: 1.6,
        letterSpacing: '0.03333em',
      },
      // Legacy typography variants for backward compatibility
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
    // Material Design 3 uses a more dynamic shape system with different corner styles
    shape: {
      borderRadius: tokens.shape.radius?.default || 8,
      // M3 uses different corner radii for different components
      cornerFamily: 'rounded',
      cornerSize: {
        xs: tokens.shape.radius?.xs || 2, 
        sm: tokens.shape.radius?.sm || 4,
        md: tokens.shape.radius?.md || 8,
        lg: tokens.shape.radius?.lg || 12,
        xl: tokens.shape.radius?.xl || 16,
        default: tokens.shape.radius?.default || 8
      },
      // Keep the existing radius object for backwards compatibility
      radius: tokens.shape.radius || { xs: 2, sm: 4, md: 8, lg: 12, xl: 16, default: 8 },
    },
    spacing: 8,
    // M3 has a more nuanced elevation system with 6 levels
    elevation: {
      0: 'none',
      1: '0px 1px 2px rgba(0, 0, 0, 0.3)',
      2: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      3: '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
      4: '0px 2px 3px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
      5: '0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
    },
    // Keep shadows for compatibility
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)', // level 1
      '0px 4px 8px rgba(0, 0, 0, 0.08)', // level 2
      '0px 6px 12px rgba(0, 0, 0, 0.12)', // level 3
      '0px 8px 16px rgba(0, 0, 0, 0.15)', // level 4
      '0px 10px 20px rgba(0, 0, 0, 0.18)', // level 5
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
    // Material Design 3 component styling
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true, // M3 buttons don't have elevation by default
          disableRipple: false,   // M3 buttons have ripple by default
          variant: 'filled',      // Default variant in M3 is 'filled' (was 'contained' in MUI)
        },
        styleOverrides: {
          root: {
            borderRadius: getResponsiveRadius(tokens, 'md'),
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
          // Map older variants to M3 variants
          contained: {
            padding: '8px 24px',
          },
          filled: {
            padding: '8px 24px', // Same as contained
          },
          tonal: {
            padding: '8px 24px',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            color: isDark ? '#ffffff' : '#000000',
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
            borderRadius: getResponsiveRadius(tokens, 'lg'),
            boxShadow: isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.4)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: getResponsiveRadius(tokens, 'sm'),
            fontWeight: 500,
          }
        }
      },
      // M3-specific component overrides
      MuiFab: {
        defaultProps: {
          color: 'primary',
          size: 'medium',
          variant: 'circular', // M3 defaults to circular FABs
        },
        styleOverrides: {
          root: {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // M3 uses more pronounced shadows for FABs
          }
        }
      },
      MuiIconButton: {
        defaultProps: {
          size: 'medium',
          color: 'default',
        },
        styleOverrides: {
          root: {
            borderRadius: '50%', // M3 icon buttons are always circular
          }
        }
      },
      // Dialog in M3 has more rounded corners
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: getResponsiveRadius(tokens, 'lg'),
          }
        }
      },
      // M3 has more prominent focus indicators
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            }
          }
        }
      },
      // M3 lists have specific styling
      MuiList: {
        styleOverrides: {
          root: {
            padding: '8px 0',
          }
        }
      },
      // M3 list items have specific styling
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: getResponsiveRadius(tokens, 'sm'),
            marginLeft: '8px',
            marginRight: '8px',
            width: 'calc(100% - 16px)',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'
            }
          }
        }
      },
      // M3 divider styling
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
          }
        }
      },
      // M3 switch styling
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 58,
            height: 38,
            padding: 8,
          },
          switchBase: {
            padding: 11,
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: isDark ? '#8796A5' : '#aab4be',
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              border: '6px solid #fff',
            },
          },
          thumb: {
            width: 16,
            height: 16,
            boxShadow: 'none',
          },
          track: {
            borderRadius: 20 / 2,
            opacity: 1,
            backgroundColor: isDark ? '#39393D' : '#E9E9EA',
            boxSizing: 'border-box',
          },
        },
      },
      // M3 slider styling
      MuiSlider: {
        styleOverrides: {
          root: {
            height: 8,
          },
          thumb: {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            '&:focus, &:hover, &.Mui-active': {
              boxShadow: '0px 0px 0px 8px rgba(58, 133, 137, 0.16)',
            },
          },
          track: {
            height: 8,
            borderRadius: 4,
          },
          rail: {
            height: 8,
            borderRadius: 4,
            opacity: 0.5,
          },
        },
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

// Material Design 3 color token map for reference
export const m3ColorTokens = {
  // Surface colors
  surfaceBright: 'surface.bright',
  surfaceContainer: 'surface.container',
  surfaceContainerHigh: 'surface.containerHigh',
  surfaceContainerHighest: 'surface.containerHighest',
  surfaceContainerLow: 'surface.containerLow',
  surfaceContainerLowest: 'surface.containerLowest',
  surfaceDim: 'surface.dim',
  
  // On-surface colors
  onSurface: 'text.primary',
  onSurfaceVariant: 'text.secondary',
  
  // Primary colors
  primaryContainer: 'primary.container',
  onPrimaryContainer: 'primary.contrastText',
  
  // Secondary colors
  secondaryContainer: 'secondary.container',
  onSecondaryContainer: 'secondary.contrastText',
  
  // Tertiary colors (accent in our theme)
  tertiaryContainer: 'tertiary.container',
  onTertiaryContainer: 'tertiary.contrastText',
  
  // Outline colors
  outline: 'divider',
  outlineVariant: 'divider',
};

export default createAppTheme;