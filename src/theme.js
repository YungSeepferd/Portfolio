/**
 * Main Theme Configuration - Simplified Re-export
 * 
 * This file simply re-exports the theme from the theme folder
 * to maintain backward compatibility with existing imports.
 */
import theme, { globalStyles, themeConstants } from './theme/index';
import { alpha } from '@mui/material/styles';

// Modify the existing theme to add layout configuration
theme.layout = {
  // Maximum content width (matches MUI's lg breakpoint)
  maxContentWidth: '1200px',
  // Content horizontal padding at different breakpoints
  contentPadding: {
    xs: '20px',
    sm: '30px',
    md: '40px',
    lg: '50px',
  },
  // Setting for centering content containers
  container: {
    centered: true,
  }
};

// Add component overrides to the existing theme
if (!theme.components) {
  theme.components = {};
}

// Override default Container styling
theme.components.MuiContainer = {
  styleOverrides: {
    root: ({ theme }) => ({
      // Center all containers and apply consistent padding
      marginLeft: 'auto !important',
      marginRight: 'auto !important',
      paddingLeft: theme.layout?.contentPadding?.xs || '20px',
      paddingRight: theme.layout?.contentPadding?.xs || '20px',
      maxWidth: theme.layout?.maxContentWidth || '1200px',
      
      // Responsive padding based on breakpoints
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.layout?.contentPadding?.sm || '30px',
        paddingRight: theme.layout?.contentPadding?.sm || '30px',
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.layout?.contentPadding?.md || '40px',
        paddingRight: theme.layout?.contentPadding?.md || '40px',
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.layout?.contentPadding?.lg || '50px',
        paddingRight: theme.layout?.contentPadding?.lg || '50px',
      },
    })
  }
};

// Add consistent Box styling for sections
theme.components.MuiBox = {
  ...(theme.components.MuiBox || {}),
  variants: [
    ...(theme.components.MuiBox?.variants || []),
    {
      props: { variant: 'section' },
      style: ({ theme }) => ({
        width: '100%',
        '& > .section-content': {
          maxWidth: theme.layout?.maxContentWidth || '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }
      })
    }
  ]
};

// Add global CSS styles to the existing theme object through theme components
if (theme.components) {
  // Add or ensure CssBaseline component exists
  theme.components.MuiCssBaseline = {
    ...theme.components.MuiCssBaseline,
    styleOverrides: {
      // Global styles from App.css
      'html, body, #root': {
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
      },
      '.App': {
        textAlign: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      },
      // Accessibility focus styles
      ':focus': {
        outline: '2px solid rgba(33, 150, 243, 0.5)',
        outlineOffset: '2px',
      },
      ':focus:not(:focus-visible)': {
        outline: 'none',
      },
      ...theme.components.MuiCssBaseline?.styleOverrides
    }
  };

  // Add this override for MuiContainer
  theme.components.MuiContainer = {
    styleOverrides: {
      root: {
        // Reset margins explicitly
        marginLeft: '0 !important',
        marginRight: '0 !important',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        // Apply padding through the sx prop instead
      },
    },
  };
}

export { globalStyles, themeConstants };
export default theme;

// Export spacing or remove/comment it if not used
const themeSpacing = {
  // ...spacing values
  pagePadding: {
    xs: 2, // 16px on mobile
    sm: 4, // 32px on tablet
    md: 6, // 48px on small desktop
    lg: 12.5, // 100px on desktop (8px * 12.5 = 100px)
  },
};

// Make sure it's exported and used
export { themeSpacing as spacing };