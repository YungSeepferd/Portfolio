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
        '&:hover': {
        },
      },
      text: {
        color: theme.palette.accent.contrastText || '#0E1A27',
      },
      barBg: {
        backgroundColor: 'transparent',
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
    },
    text: {
      color: theme.palette.accent.contrastText || '#0E1A27',
    },
    barBg: {
      backgroundColor: theme.palette.background.paper,
    }
  };
}
