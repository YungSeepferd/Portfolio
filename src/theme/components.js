/**
 * Component Theme Settings
 * 
 * This file defines theme overrides for specific Material UI components
 * and custom component styling configurations.
 */

/**
 * Creates component-specific styles for Material UI's createTheme
 * 
 * @param {Object} theme - Partial theme object with palette, typography, etc.
 * @returns {Object} Component style overrides
 */
export const createComponentStyles = (theme) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius, // Use the theme's border radius
          backgroundColor: theme.palette.card.background,
          minHeight: '300px',
          border: `1px solid ${theme.palette.structure.borders}`,
          height: '100%',
          transition: `transform ${theme.animationSettings.durations.short}ms ease, box-shadow ${theme.animationSettings.durations.short}ms ease`,
          boxShadow: `0 4px 12px ${theme.palette.shadow.light}`,
          '&:hover': {
            boxShadow: `0 12px 24px ${theme.palette.shadow.medium}`,
            borderColor: theme.palette.accent.main,
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius, // Use the theme's border radius
        }),
      },
    },
    MuiImageListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius, // Use the theme's border radius
          overflow: 'hidden',
        }),
      },
    },
    // Add other component overrides here as needed
  };
};

/**
 * Creates custom component configurations for the theme
 */
export const createCustomComponents = () => {
  return {
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
  };
};

/**
 * Creates custom section configurations for the theme
 */
export const createCustomSections = () => {
  return {
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
  };
};

/**
 * Creates responsive style presets for easy use throughout the application
 */
export const createResponsiveStyles = () => {
  return {
    hideOnMobile: {
      display: { xs: 'none', sm: 'block' },
    },
    centerOnMobile: {
      textAlign: { xs: 'center', sm: 'left' },
    },
    columnOnMobile: {
      flexDirection: { xs: 'column', sm: 'row' },
    },
  };
};

/**
 * Creates custom button styles configuration
 */
export const createCustomButtons = () => {
  return {
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
  };
};

/**
 * Creates custom sizes configuration
 */
export const createCustomSizes = () => {
  return {
    bigCardHeight: '400px',
    bigCardImageWidth: '300px',
    projectBubbleSize: '250px',
    projectImageMaxWidth: '800px',
    overlayWidth: '90%',
    overlayMaxWidth: '800px',
    overlayMaxHeight: '90%',
  };
};

/**
 * Creates project card styles configuration
 */
export const createProjectCardStyles = () => {
  return {
    base: {
      backgroundColor: 'card.background',
      padding: 2.5,
      borderRadius: 'shape.borderRadius',
      boxShadow: (theme) => `0 3px 10px ${theme.palette.shadow.light}`
    },
    variants: {
      primary: {
        borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
        boxShadow: (theme) => `0 3px 10px ${theme.palette.primary.dark}22`
      },
      secondary: {
        borderLeft: (theme) => `4px solid ${theme.palette.secondary.main}`,
        boxShadow: (theme) => `0 3px 10px ${theme.palette.secondary.dark}22`
      },
      warning: {
        borderLeft: (theme) => `4px solid ${theme.palette.warning.main}`,
        boxShadow: (theme) => `0 3px 10px ${theme.palette.warning.dark}22`
      },
      info: {
        borderLeft: (theme) => `4px solid ${theme.palette.info.main}`,
        boxShadow: (theme) => `0 3px 10px ${theme.palette.info.dark}22`
      },
      success: {
        borderLeft: (theme) => `4px solid ${theme.palette.success.main}`,
        boxShadow: (theme) => `0 3px 10px ${theme.palette.success.dark}22`
      }
    }
  };
};