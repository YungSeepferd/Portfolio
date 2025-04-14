import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Import theme components
import typography from './theme/typography';
import breakpoints from './theme/breakpoints';
import shadows from './theme/shadows';
import shape from './theme/shape';
import { palette as lightPalette } from './theme/palette/light';
import { palette as darkPalette } from './theme/palette/dark';

// Import design tokens directly
import { tokens } from './design/tokens';

// Try to import components
let components = {};
try {
  // Use dynamic import to prevent circular dependencies
  const importedComponents = require('./theme/components');
  components = importedComponents?.default || {};
} catch (error) {
  console.info('No component overrides found in theme/components');
}

// Design constants derived from tokens to ensure consistency
export const designConstants = {
  transitions: {
    standard: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
  media: {
    paths: {
      documents: '/assets/documents',
      images: '/assets/images',
      videos: '/assets/videos',
    },
    fileFormats: {
      documents: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
      images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
      videos: ['.mp4', '.webm', '.mov', '.avi']
    }
  },
  spacing: tokens.spacing, // Use spacing from tokens
  sizes: {
    header: {
      height: '70px'
    },
    avatar: {
      xs: tokens.spacing.xs || '40px',
      sm: tokens.spacing.sm || '60px',
      md: tokens.spacing.md || '80px',
      lg: tokens.spacing.lg || '100px'
    }
  }
};

/**
 * Create a theme with the given mode
 * @param {string} mode - 'light' or 'dark'
 * @returns {Object} MUI theme object
 */
export const createAppTheme = (mode = 'light') => {
  // Validate mode
  const themeMode = typeof mode === 'string' ? mode : 'light';
  
  // Select palette based on mode
  const palette = themeMode === 'dark' ? darkPalette : lightPalette;
  
  // Add state colors directly from tokens for consistent error, warning, success states
  const stateColors = {
    error: {
      light: tokens.colors.red[300],
      main: tokens.colors.red[500],
      dark: tokens.colors.red[700],
      contrastText: tokens.colors.common.white
    },
    warning: {
      light: tokens.colors.orange[300],
      main: tokens.colors.orange[500],
      dark: tokens.colors.orange[700],
      contrastText: tokens.colors.common.black
    },
    info: {
      light: tokens.colors.teal[300],
      main: tokens.colors.teal[500],
      dark: tokens.colors.teal[700],
      contrastText: tokens.colors.common.white
    },
    success: {
      light: tokens.colors.green[300],
      main: tokens.colors.green[500],
      dark: tokens.colors.green[700],
      contrastText: tokens.colors.common.white
    }
  };
  
  // Create the base theme - using colorSchemes for better dark mode support (MUI v5.14+)
  let theme = createTheme({
    // Set up color schemes for dark mode support
    colorSchemes: {
      light: {
        palette: {
          mode: 'light',
          ...lightPalette,
          ...stateColors // Add state colors to light scheme
        }
      },
      dark: {
        palette: {
          mode: 'dark', 
          ...darkPalette,
          ...stateColors // Add state colors to dark scheme
        }
      }
    },
    // Default palette with state colors
    palette: {
      mode: themeMode,
      ...palette,
      ...stateColors
    },
    typography,
    breakpoints: { values: breakpoints },
    shape,
    shadows,
    // Enable CSS variables for better dark mode performance
    cssVarsPrefix: 'app',
    unstable_strictMode: true,
  });
  
  // Helper function for shadow access
  const getShadow = (index) => {
    if (!theme.shadows || !Array.isArray(theme.shadows) || !theme.shadows[index]) {
      return 'none';
    }
    return theme.shadows[index];
  };
  
  // Add component overrides
  if (typeof components === 'function') {
    theme = createTheme(theme, {
      components: components(theme)
    });
  } else if (components && typeof components === 'object' && Object.keys(components).length > 0) {
    theme = createTheme(theme, { components });
  }
  
  // Add custom properties to theme
  theme = {
    ...theme,
    
    // Add tokens directly to the theme for easy access throughout the app
    tokens,
    
    // Add design constants 
    designConstants,
    
    transitions: {
      ...theme.transitions,
      custom: {
        fade: 'opacity 0.3s ease-in-out',
        transform: 'transform 0.3s ease-in-out'
      }
    },
    
    // Custom functions that can be used throughout the app
    customFunctions: {
      pxToRem: (px) => `${px / 16}rem`,
      getCardElevation: (level = 'low') => {
        const elevations = {
          none: 0,
          low: 1,
          medium: 3,
          high: 6,
          raised: 12
        };
        return elevations[level] || elevations.low;
      }
    },
    
    // Custom properties for consistent styling
    customComponents: {
      section: {
        marginY: designConstants.spacing.section
      },
      card: {
        borderRadius: tokens.borderRadius?.md || '8px',
        hoveredShadow: getShadow(8)
      }
    }
  };
  
  // Make theme responsive
  theme = responsiveFontSizes(theme);
  
  return theme;
};

// Export pre-created themes
export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');

// Export default theme creation function
export default createAppTheme;