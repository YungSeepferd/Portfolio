/**
 * Theme Components
 * 
 * This file provides component customizations for the theme.
 * It exports a function that receives the theme and returns component overrides.
 */

const components = (theme) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        // Better font rendering
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        fontSmooth: 'always',
        // Prevent content jumping when scrollbar appears
        scrollbarGutter: 'stable'
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: theme.shape.borderRadius,
        fontWeight: 500,
        padding: theme.spacing(1, 2)
      },
      containedPrimary: {
        '&:hover': {
          boxShadow: theme.shadows[4]
        }
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        transition: theme.transitions.create(['transform', 'box-shadow']),
        '&:hover': {
          boxShadow: theme.shadows[4]
        }
      }
    }
  },
  // Add more component overrides as needed
});

export default components;