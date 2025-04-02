// FUNCTIONALITY: Defines the Material UI theme for the entire application
// Summary: This file sets the overall Material-UI theme values with the new color scheme.
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Define reusable color variables
const colors = {
  primaryMain: '#5363EE',
  primaryContrastText: '#FFFFFF',
  primaryDark: '#4353D9',
  primaryLight: '#6E7CFF',
  secondaryMain: '#C2F750',
  secondaryContrastText: '#0E1A27',
  secondaryDark: '#ABDF3A',
  secondaryLight: '#D4FF69',
  backgroundDefault: '#0E1A27',
  backgroundPaper: '#131F2D',
  backgroundAlternatePanel: '#1A2736',
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: '#A0A0A0',
  textAccent: '#C2F750',
  accentMain: '#C2F750',
  accentDark: '#ABDF3A',
  accentLight: '#D4FF69',
  accentContrast: '#0E1A27',
  bubblesBackground: '#1A2736',
  bubblesBorder: '#3545D6',
  cardBackground: '#131F2D',
  cardShadow: 'rgba(5, 10, 15, 0.4)',
  cardActiveGlow: 'rgba(194, 247, 80, 0.25)',
  cardBorder: '#3545D6',
  filterActive: '#C2F750',
  filterInactive: '#505050',
  actionHover: 'rgba(194, 247, 80, 0.15)',
  actionSelected: 'rgba(194, 247, 80, 0.25)',
  actionDisabled: 'rgba(255, 255, 255, 0.3)',
  actionDisabledBackground: 'rgba(255, 255, 255, 0.12)',
  divider: '#3545D6',
  shadowLight: 'rgba(5, 10, 15, 0.3)',
  shadowMedium: 'rgba(5, 10, 15, 0.5)',
  shadowDark: 'rgba(5, 10, 15, 0.7)',
  overlayBackground: 'rgba(14, 26, 39, 0.85)',
  overlayDark: 'rgba(10, 18, 28, 0.9)',
  dotsInactive: '#3545D6',
  placeholder: '#1A2736',
  statusSuccess: '#C2F750',
  statusWarning: '#FFA726',
  statusError: '#F44336',
  statusInfo: '#5363EE',
  focusOutline: '#C2F750',
  structureBorders: '#3545D6',
  structureLines: '#3545D6',
  structureOutlines: '#3545D6',
};

// Define animation constants - new section to consolidate animation values
const animations = {
  durations: {
    short: 300,  // in ms
    medium: 500,
    long: 800,
    veryLong: 1500
  },
  easings: {
    // CSS string formats for CSS transitions
    css: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    // Framer Motion compatible formats (arrays)
    motion: {
      standard: [0.4, 0, 0.2, 1],
      accelerate: [0.4, 0, 1, 1],
      decelerate: [0, 0, 0.2, 1],
      sharp: [0.4, 0, 0.6, 1]
    }
  },
  transitions: {
    hover: 'all 0.3s ease',
    active: 'all 0.2s ease-in',
    layout: 'all 0.5s ease-out'
  }
};

// Define spacing constants to ensure consistent spacing
const spacing = {
  unit: 8, // Base unit = 8px
  xs: 4,   // 4px - Extra small spacing
  sm: 8,   // 8px - Small spacing
  md: 16,  // 16px - Medium spacing
  lg: 24,  // 24px - Large spacing
  xl: 32,  // 32px - Extra large spacing
  xxl: 48, // 48px - Double extra large spacing
  section: 64 // 64px - Section spacing
};

// Create base theme
const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primaryMain,
      contrastText: colors.primaryContrastText,
      dark: colors.primaryDark,
      light: colors.primaryLight,
    },
    secondary: {
      main: colors.secondaryMain,
      contrastText: colors.secondaryContrastText,
      dark: colors.secondaryDark,
      light: colors.secondaryLight,
    },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
      alternatePanel: colors.backgroundAlternatePanel,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      muted: colors.textMuted,
      accent: colors.textAccent,
    },
    accent: {
      main: colors.accentMain,
      dark: colors.accentDark,
      light: colors.accentLight,
      contrast: colors.accentContrast,
    },
    bubbles: {
      background: colors.bubblesBackground,
      border: colors.bubblesBorder,
    },
    card: {
      background: colors.cardBackground,
      shadow: colors.cardShadow,
      activeGlow: colors.cardActiveGlow,
      border: colors.cardBorder,
    },
    filter: {
      active: colors.filterActive,
      inactive: colors.filterInactive,
    },
    action: {
      hover: colors.actionHover,
      selected: colors.actionSelected,
      disabled: colors.actionDisabled,
      disabledBackground: colors.actionDisabledBackground,
    },
    divider: colors.divider,
    shadow: {
      light: colors.shadowLight,
      medium: colors.shadowMedium,
      dark: colors.shadowDark,
    },
    overlay: {
      background: colors.overlayBackground,
      dark: colors.overlayDark,
    },
    dots: {
      inactive: colors.dotsInactive,
      active: theme => theme.palette.secondary.main,
    },
    placeholder: colors.placeholder,
    transitions: {
      short: '0.3s',
      medium: '0.5s',
      long: '0.8s',
    },
    status: {
      success: colors.statusSuccess,
      warning: colors.statusWarning,
      error: colors.statusError,
      info: colors.statusInfo,
    },
    focus: {
      outline: colors.focusOutline,
    },
    structure: {
      borders: colors.structureBorders,
      lines: colors.structureLines,
      outlines: colors.structureOutlines,
    },
  },
  shape: {
    borderRadius: 4, // Reduced from 6px to 4px for less rounded corners globally
  },
  typography: {
    fontFamily: `'IBM Plex Mono', 'Courier New', monospace`,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      color: colors.primaryMain,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.4rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    projectTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: colors.primaryMain,
    },
    chipText: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  spacing: spacing.unit, // Set the base spacing unit
  
  // Add standardized media query values for responsive design
  mediaQueries: {
    xs: '@media (max-width:599px)',
    sm: '@media (min-width:600px) and (max-width:899px)',
    md: '@media (min-width:900px) and (max-width:1199px)',
    lg: '@media (min-width:1200px) and (max-width:1535px)',
    xl: '@media (min-width:1536px)',
    smUp: '@media (min-width:600px)',
    mdUp: '@media (min-width:900px)',
    lgUp: '@media (min-width:1200px)',
    xlUp: '@media (min-width:1536px)',
    smDown: '@media (max-width:599px)',
    mdDown: '@media (max-width:899px)',
    lgDown: '@media (max-width:1199px)',
    xlDown: '@media (max-width:1535px)',
  },
  
  // Add elevation styles for consistency
  elevations: {
    1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
  },
  
  customSizes: {
    bigCardHeight: '400px',
    bigCardImageWidth: '300px',
    projectBubbleSize: '250px',
    projectImageMaxWidth: '800px',
    overlayWidth: '90%',
    overlayMaxWidth: '800px',
    overlayMaxHeight: '90%',
  },
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
  customBreakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
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
    variants: {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { 
          duration: animations.durations.medium / 1000,
          ease: animations.easings.motion.standard // Use motion format for Framer Motion
        }
      },
      slideUp: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { 
          duration: animations.durations.medium / 1000,
          ease: animations.easings.motion.decelerate // Use motion format for Framer Motion
        }
      },
      slideIn: {
        initial: { x: -30, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { 
          duration: animations.durations.medium / 1000,
          ease: animations.easings.motion.decelerate // Use motion format for Framer Motion
        }
      }
    }
  },
  customComponents: {
    work: {
      container: {
        padding: '64px 0',
      },
    },
    parallax: {
      container: {
        width: '800vw',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
      },
      section: {
        flex: '0 0 100vw',
        scrollSnapAlign: 'start',
      },
      content: {
        maxWidth: '840px',
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
      },
      slideshow: {
        height: '300px',
      },
      dot: {
        size: '8px',
      },
    },
    projectBubble: {
      width: '250px',
      height: '250px',
      hoverScale: 1.05,
    },
    hero: {
      contentPosition: {
        bottom: '30%',
        left: '5%',
      },
    },
    filter: {
      buttonRadius: '20px',
      buttonPadding: '0.5rem 1rem',
    },
    overlay: {
      zIndex: 2000,
      backdropZIndex: 1999,
      padding: '40px',
      backdropOpacity: 0.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 4, // Explicitly setting card border radius to be less rounded
          backgroundColor: theme.palette.card.background,
          minHeight: '300px',
          border: `1px solid ${theme.palette.structure.borders}`,
          height: '100%',
          transition: `transform ${theme.palette.transitions.short} ease, box-shadow ${theme.palette.transitions.short} ease`,
          boxShadow: `0 4px 12px ${theme.palette.shadow.light}`,
          '&:hover': {
            boxShadow: `0 12px 24px ${theme.palette.shadow.medium}`,
            borderColor: theme.palette.accent.main,
          },
        }),
      },
    },
  },
  customSections: {
    about: {
      container: {
        maxWidth: '1200px',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
      },
      tabContent: {
        py: 3,
        px: { xs: 2, sm: 3 },
        borderRadius: 1,
        backgroundColor: 'background.paper',
      },
      contentCard: {
        p: { xs: 2, sm: 3, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      imageContainer: {
        height: { xs: 240, sm: 300, md: 360 },
        borderRadius: 1,
        overflow: 'hidden',
        mb: { xs: 2, md: 0 },
      },
      textContent: {
        maxHeight: { xs: 'auto', md: '460px' },
        overflowY: 'auto',
        pr: { md: 2 },
        '& > *:last-child': {
          mb: 0, // Remove margin from last child to avoid extra spacing
        },
      },
      spacingBetweenSections: 4,
    },
    work: {
      container: {
        padding: '64px 0',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  responsiveStyles: {
    hideOnMobile: {
      display: { xs: 'none', sm: 'block' },
    },
    centerOnMobile: {
      textAlign: { xs: 'center', sm: 'left' },
    },
    columnOnMobile: {
      flexDirection: { xs: 'column', sm: 'row' },
    },
  },
  heroBottomMargin: 15,
  heroLeftMargin: 8,
  customButtons: {
    close: {
      color: '#fff',
      backgroundColor: 'rgba(19, 31, 45, 0.7)',
      hoverBackgroundColor: 'rgba(19, 31, 45, 0.9)',
    },
    contact: {
      padding: '8px 24px',
      fontWeight: 600,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
});

// Apply responsive font sizes
const theme = responsiveFontSizes(baseTheme);

// Add custom CSS animation keyframes that can't be directly added to the theme
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
  
  @keyframes slideIn {
    0% {
      transform: translateX(-50%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  /* Add additional keyframe animations here for reusability */
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(194, 247, 80, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(194, 247, 80, 0); }
    100% { box-shadow: 0 0 0 0 rgba(194, 247, 80, 0); }
  }
`;

// Export theme-related constants for use in other files
export const themeConstants = {
  colors,
  spacing,
  animations
};

export { globalStyles };
export default theme;