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
        backgroundColor: theme.palette.accent.main,
        color: theme.palette.accent.contrastText || '#0E1A27',
        borderColor: theme.palette.accent.dark,
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
      backgroundColor: theme.palette.accent.main,
      color: theme.palette.accent.contrastText || '#0E1A27',
      borderColor: theme.palette.accent.dark,
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
