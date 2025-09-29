/**
 * Theme Components
 * 
 * This file provides component customizations for the theme.
 * It exports a function that receives the theme and returns component overrides.
 */

const components = (theme) => {
  // Common transition config for interactive elements
  const interactiveTransition = theme.transitions.create(
    ['background-color', 'transform', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut
    }
  );

  // Define shape constants to prevent undefined access
  const radius = {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    pill: '50%'
  };

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontSmooth: 'always',
          scrollbarGutter: 'stable'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontWeight: 500,
          letterSpacing: 0.2,
          borderRadius: radius.md,
          transition: interactiveTransition,

          ...(ownerState.variant === 'glassmorphic' && {
            // True glassmorphism to match Hero scene label
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(5, 38, 45, 0.20)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.common.white,
            borderRadius: radius.xxl,
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
            '& .MuiTouchRipple-root': {
              opacity: 0.4
            },
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.25)'
                : 'rgba(5, 38, 45, 0.30)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transform: 'translateY(-2px)',
              boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)'
            },
            '&:active': {
              transform: 'translateY(0)',
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.20)'
                : 'rgba(5, 38, 45, 0.25)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            },
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 2,
            },
          }),

          ...(ownerState.variant === 'contained' && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              boxShadow: theme.shadows[4],
              backgroundColor: theme.palette.primary.dark
            },
            '&:active': {
              transform: 'translateY(0)'
            }
          }),

          ...(ownerState.variant === 'outlined' && {
            borderColor: theme.palette.divider,
            '&:hover': {
              backgroundColor: `rgba(${theme.palette.primary.main}, 0.04)`,
              borderColor: theme.palette.primary.main
            }
          }),

          ...(ownerState.variant === 'text' && {
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }),

          ...(ownerState.size === 'large' && {
            height: 48,
            padding: theme.spacing(2, 4),
            fontSize: '1rem'
          }),
          ...(ownerState.size === 'medium' && {
            height: 40,
            padding: theme.spacing(1.5, 3),
            fontSize: '0.875rem'
          }),
          ...(ownerState.size === 'small' && {
            height: 32,
            padding: theme.spacing(1, 2),
            fontSize: '0.875rem'
          })
        })
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: radius.md,
          padding: theme.spacing(1.5),
          transition: interactiveTransition,

          ...(ownerState.variant === 'glassmorphic' && {
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(5, 38, 45, 0.20)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.common.white,
            borderRadius: radius.xxl,
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
            '& .MuiTouchRipple-root': { opacity: 0.4 },
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.25)'
                : 'rgba(5, 38, 45, 0.30)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transform: 'translateY(-2px)',
              boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)'
            },
            '&:active': {
              transform: 'translateY(0)',
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.20)'
                : 'rgba(5, 38, 45, 0.25)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            },
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 2,
            },
          })
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          overflow: 'hidden',
          transition: theme.transitions.create(['transform', 'box-shadow']),
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4]
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: theme.typography.fontWeightMedium,
          borderRadius: 0,
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
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
            border: '1px solid ' + theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightRegular,
            letterSpacing: theme.typography.caption.letterSpacing,
          },
        },
        {
          props: { variant: 'skill' },
          style: {
            backgroundColor: theme.palette.accent.main,
            color: theme.palette.accent.contrastText || theme.palette.text.primary,
            border: '1px solid ' + theme.palette.accent.dark,
          },
        },
      ],
    },
  };
};

export default components;
