/**
 * Main Theme Configuration
 * 
 * This file combines all theme modules and creates the final Material UI theme.
 * It serves as the central point for theme configuration.
 */
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Import theme modules
import colors, { createPalette } from './theme/colors';
import { createTypography } from './theme/typography';
import spacing, { createSpacing } from './theme/spacing';
import animations, { createAnimationVariants, createGlobalAnimations } from './theme/animations';
import { createBreakpoints, createMediaQueries, createCustomBreakpoints } from './theme/breakpoints';
import {
  createComponentStyles,
  createCustomComponents,
  createCustomSections,
  createResponsiveStyles,
  createCustomButtons,
  createCustomSizes
} from './theme/components';

// Create base theme with all modules
const baseTheme = createTheme({
  // Core theme settings
  palette: createPalette(),
  typography: createTypography(colors),
  spacing: createSpacing(),
  breakpoints: createBreakpoints(),
  
  // Shape settings
  shape: {
    borderRadius: 4, // Reduced from 6px to 4px for less rounded corners globally
  },
  
  // Add custom properties
  mediaQueries: createMediaQueries(),
  elevations: {
    1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
  },
  
  customSizes: createCustomSizes(),
  spacingSizes: {
    section: 8,
    container: 4,
    cardPadding: 3,
    elementGap: 2,
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  customBreakpoints: createCustomBreakpoints(),
  
  // Animation settings
  animations: {
    slideIn: {
      from: {
        transform: 'translateX(-50%)',
        opacity: 0,
      },
      to: {
        transform: 'translateX(0)',
        opacity: 1,
      },
      duration: '1.5s',
      easing: 'ease',
      fillMode: 'forwards',
    },
  },
  animationSettings: {
    ...animations,
    variants: createAnimationVariants()
  },
  
  // Custom components configuration
  customComponents: createCustomComponents(),
  customSections: createCustomSections(),
  responsiveStyles: createResponsiveStyles(),
  heroBottomMargin: 15,
  heroLeftMargin: 8,
  customButtons: createCustomButtons(),
});

// Apply component style overrides
baseTheme.components = {
  ...createComponentStyles(baseTheme),
  // Add specific override for Typography to ensure consistent color for h3
  MuiTypography: {
    styleOverrides: {
      h3: {
        color: colors.primaryMain, // Ensure h3 always uses primary color
      },
      // Keep any existing Typography overrides
      ...(baseTheme.components?.MuiTypography?.styleOverrides || {})
    }
  }
};

// Apply responsive font sizes
const theme = responsiveFontSizes(baseTheme);

// Generate global CSS animation keyframes
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
  
  ${createGlobalAnimations()}
`;

// Export theme-related constants for use in other files
export const themeConstants = {
  colors,
  spacing,
  animations
};

export { globalStyles };
export default theme;