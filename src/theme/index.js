/**
 * Main Theme Configuration
 * 
 * This file combines all theme modules and creates the final Material UI theme.
 */
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Import theme modules
import colors, { createPalette } from './colors';
import { createTypography } from './typography';
import spacing, { createSpacing } from './spacing';
import animations, { createAnimationVariants, createGlobalAnimations } from './animations';
import { createBreakpoints, createMediaQueries, createCustomBreakpoints } from './breakpoints';
import {
  createComponentStyles,
  createCustomComponents,
  createCustomSections,
  createResponsiveStyles,
  createCustomButtons,
  createCustomSizes
} from './components';

// Create base theme with all modules
const baseTheme = createTheme({
  // Core theme settings
  palette: {
    ...createPalette(),
    background: {
      ...createPalette().background,
      overlay: 'rgba(19, 31, 45, 0.7)',
      overlayHover: 'rgba(19, 31, 45, 0.9)',
    },
  },
  typography: createTypography(colors),
  spacing: createSpacing(),
  breakpoints: createBreakpoints(),
  
  // Shape settings
  shape: {
    borderRadius: 4,
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
      from: { transform: 'translateX(-50%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
      duration: '1.5s',
      easing: 'ease',
      fillMode: 'forwards',
    },
  },
  animationSettings: {
    ...animations,
    variants: createAnimationVariants(),
    durations: {
      short: 300,
      medium: 500,
      long: 800,
    },
    easings: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  
  // Custom components configuration
  customComponents: createCustomComponents(),
  customSections: createCustomSections(),
  responsiveStyles: createResponsiveStyles(),
  heroBottomMargin: 15,
  heroLeftMargin: 8,
  customButtons: createCustomButtons(),
  
  // Add default values needed by components
  customDefaults: {
    placeholderImage: '/images/placeholder.png'
  },
  
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'projectTitle' },
          style: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          },
        },
        // Add other custom typography variants
      ],
    },
  }
});

// Apply component style overrides
baseTheme.components = createComponentStyles(baseTheme);

// Apply responsive font sizes
const theme = responsiveFontSizes(baseTheme);

// Export theme-related constants for use in other files
export const themeConstants = {
  colors,
  spacing,
  animations
};

export default theme;
