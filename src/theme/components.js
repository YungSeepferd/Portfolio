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
    },
    variants: [
      {
        props: { variant: 'projectAction' },
        style: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          },
        },
      },
      // Add more variants as needed
    ],
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
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: 16,
        // Add other global chip styles as needed
      },
    },
    variants: [
      {
        props: { variant: 'category' },
        style: {
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
          color: theme.palette.mode === 'dark'
            ? theme.palette.secondary.light
            : theme.palette.secondary.dark,
          border: `1px solid ${theme.palette.secondary.main}`,
          fontWeight: 400,
          letterSpacing: 0.2,
        },
      },
      {
        props: { variant: 'skill' },
        style: {
          backgroundColor: theme.palette.accent.main,
          color: theme.palette.accent.contrastText || theme.palette.text.primary,
          border: `1px solid ${theme.palette.accent.dark}`,
        },
      },
      // Add more variants as needed
    ],
  },
  // Add more component overrides as needed
});

export default components;