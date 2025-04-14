import { alpha } from '@mui/material/styles';

/**
 * Component Overrides
 * 
 * This file contains all Material UI component customizations
 * following the proper theme.components pattern.
 * 
 * @param {Object} theme - The base theme object
 * @returns {Object} Component override object for createTheme
 */
export const getComponentOverrides = (theme) => {
  return {
    // Global styles applied to all components
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'all 0.3s ease-out',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
        // Global animations
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        '@keyframes slideUp': {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 }
        },
      },
    },
    
    // Button component customization
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase text
          borderRadius: theme.shape.borderRadius * 1.5, // Slightly more rounded buttons
          padding: '8px 16px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: theme.shadows[2],
          },
        },
        // Contained button variant
        contained: {
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
        },
        // Text button variant
        text: {
          padding: '6px 8px',
        },
        // Outlined button variant
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
        // Size overrides
        sizeSmall: {
          padding: '4px 10px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        }
      },
    },
    
    // Card component customization
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius * 2, // Rounder cards
          overflow: 'hidden',
          boxShadow: theme.shadows[2],
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: theme.shadows[6],
            transform: 'translateY(-4px)',
          },
          // Mode-specific styling
          ...(theme.palette.mode === 'dark' && {
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'none',
          }),
        },
      },
    },
    
    // CardContent padding
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          '&:last-child': {
            paddingBottom: theme.spacing(3),
          },
        },
      },
    },
    
    // Paper component
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default gradient
          transition: 'box-shadow 0.3s ease',
        },
        elevation1: {
          boxShadow: `0 1px 3px 0 ${alpha(theme.palette.shadow.medium, 0.1)}, 0 1px 2px 0 ${alpha(theme.palette.shadow.medium, 0.06)}`,
        }
      },
    },
    
    // TabPanel styling
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
    
    // AppBar styling
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[3],
          ...(theme.palette.mode === 'dark' && {
            backgroundImage: 'none',
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
          }),
        },
      },
    },
    
    // Chip styling
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.2s ease',
          fontWeight: 500,
          '&:hover': {
            boxShadow: theme.shadows[1],
          },
        },
        sizeSmall: {
          height: 24,
          fontSize: '0.75rem',
        },
      },
    },
    
    // List item styling
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease',
        },
      },
    },
    
    // Dialog styling
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: theme.shape.borderRadius * 2,
          boxShadow: theme.shadows[10],
        },
      },
    },
    
    // Tabs styling
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      },
    },
    
    // Tab styling
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    
    // TextField styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: alpha(theme.palette.text.primary, 0.2),
              transition: 'border-color 0.2s ease',
            },
            '&:hover fieldset': {
              borderColor: alpha(theme.palette.text.primary, 0.4),
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        },
      },
    },
    
    // Links styling
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: 'color 0.2s ease, text-decoration 0.2s ease',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    
    // Modal styling
    MuiModal: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(5px)',
        },
      },
    },
    
    // Tooltip styling
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha(theme.palette.background.default, 0.95),
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[1],
          fontSize: '0.75rem',
          padding: '8px 12px',
          borderRadius: theme.shape.borderRadius,
          maxWidth: 300,
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        },
        arrow: {
          color: alpha(theme.palette.background.default, 0.95),
        },
      },
    },
  };
};