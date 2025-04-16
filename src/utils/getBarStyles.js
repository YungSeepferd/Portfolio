/**
 * Returns style objects for bar components (TechBar, ActionButtonGroup, etc.)
 * based on the variant and theme.
 * @param {'default'|'overlay'} variant
 * @param {object} theme
 */
export function getBarStyles(variant, theme) {
  if (variant === 'overlay') {
    return {
      chip: {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.secondary.dark,
          borderColor: theme.palette.secondary.dark,
          backgroundColor: 'transparent',
        },
      },
      button: {
        color: theme.palette.accent.contrastText || '#0E1A27',
        borderColor: theme.palette.accent.dark,
        backgroundColor: theme.palette.accent.main,
        '&:hover': {
          backgroundColor: theme.palette.accent.light,
          borderColor: theme.palette.accent.main,
        },
      },
      text: {
        color: theme.palette.accent.contrastText || '#0E1A27',
      },
      barBg: {
        backgroundColor: 'rgba(0,0,0,0.75)',
      }
    };
  }
  // Default (light/dark mode aware)
  return {
    chip: {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
        backgroundColor: 'transparent',
      },
    },
    button: {
      color: theme.palette.accent.contrastText || '#0E1A27',
      borderColor: theme.palette.accent.dark,
      backgroundColor: theme.palette.accent.main,
      '&:hover': {
        backgroundColor: theme.palette.accent.light,
        borderColor: theme.palette.accent.main,
      },
    },
    text: {
      color: theme.palette.accent.contrastText || '#0E1A27',
    },
    barBg: {
      backgroundColor: theme.palette.background.paper,
    }
  };
}
