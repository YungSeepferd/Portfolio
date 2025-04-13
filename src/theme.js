import { createTheme } from '@mui/material/styles';

// Creating a unified theme setup with proper light/dark mode support
const createAppTheme = (modeParam) => {
  // Ensure the mode is a valid string
  const mode = (typeof modeParam === 'string' && (modeParam === 'light' || modeParam === 'dark')) 
    ? modeParam 
    : 'light'; // Default to light if invalid
  
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
    }
  };

  // Select the appropriate colors based on mode
  const colors = baseColors[mode];

  // Update the shape configuration to have less rounded corners
  const shape = {
    borderRadius: 4, // Reduced from 8
    buttonBorderRadius: 4, // If this property exists, reduce it as well
  };

  // Create and return theme object with mode and selected colors
  return createTheme({
    palette: {
      mode: mode, // Important: This should be a string, not an object
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: colors.background,
      text: colors.text,
      shadow: colors.shadow,
    },
    typography: {
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
    },
    shape,
    shadows: [
      'none',
      // Customize shadows for different elevations
      `0 1px 2px ${colors.shadow.light}`,
      `0 3px 6px ${colors.shadow.light}`,
      `0 5px 12px ${colors.shadow.light}`,
      `0 8px 16px ${colors.shadow.medium}`,
      `0 12px 24px ${colors.shadow.medium}`,
      // Additional shadows for higher elevations
      `0 16px 32px ${colors.shadow.medium}`,
      `0 20px 40px ${colors.shadow.dark}`,
      // Keep the rest of the shadows from the default theme
      ...Array(16).fill('none').map((_, i) => 
        i > 7 ? `0 ${i * 2}px ${i * 4}px ${colors.shadow.dark}` : 'none'
      )
    ],
    components: {
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
    },
    customComponents: {
      // Custom properties for specific components
      parallax: {
        dot: {
          size: '10px',
        },
      },
    },
    // Custom defaults can be used by your components
    customDefaults: {
      placeholderImage: '/path/to/placeholder.jpg',
    },
  });
};

// Export the createAppTheme function as the default export
export default createAppTheme;