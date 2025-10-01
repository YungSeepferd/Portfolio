/**
 * Modal Footer Design Tokens
 * 
 * Centralized design tokens for project modal footer navigation
 * Includes responsive values for padding, sizing, typography, and glassmorphic effects
 */

export const modalFooterTokens = {
  footer: {
    paddingX: { xs: 1, sm: 2, md: 3 },
    paddingY: { xs: 1.5, sm: 2 },
    minHeight: { xs: 72, sm: 80 }, // Increased for multi-line titles on mobile
    gap: { xs: 0.5, sm: 1 },
    glassmorphic: {
      dark: {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: { xs: 'blur(10px)', md: 'blur(12px)' },
        WebkitBackdropFilter: { xs: 'blur(10px)', md: 'blur(12px)' },
      },
      light: {
        background: 'rgba(5, 38, 45, 0.20)',
        backdropFilter: { xs: 'blur(10px)', md: 'blur(12px)' },
        WebkitBackdropFilter: { xs: 'blur(10px)', md: 'blur(12px)' },
      },
    },
  },
  controls: {
    size: { xs: 40, sm: 48 },
    gap: { xs: 0.5, sm: 1 },
    minWidth: 64, // Ensures consistent button container width
    glassmorphic: {
      dark: {
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        WebkitBackdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        hover: {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
          WebkitBackdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
        },
        active: {
          background: 'rgba(255, 255, 255, 0.12)',
        },
      },
      light: {
        background: 'rgba(5, 38, 45, 0.12)',
        backdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        WebkitBackdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        hover: {
          background: 'rgba(5, 38, 45, 0.20)',
          backdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
          WebkitBackdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
        },
        active: {
          background: 'rgba(5, 38, 45, 0.16)',
        },
      },
    },
  },
  title: {
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
    fontWeight: 700,
    lineHeight: { xs: 1.4, sm: 1.3 },
    maxLines: { xs: 2, sm: 1 },
    whiteSpace: { xs: 'normal', sm: 'nowrap' },
  },
  toggle: {
    size: { xs: 40, sm: 36 }, // Larger on mobile for better touch target
    offset: { xs: -20, sm: -18 }, // Negative half of size for top positioning
    glassmorphic: {
      dark: {
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        WebkitBackdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        hover: {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
          WebkitBackdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
        },
        active: {
          background: 'rgba(255, 255, 255, 0.12)',
        },
      },
      light: {
        background: 'rgba(5, 38, 45, 0.12)',
        backdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        WebkitBackdropFilter: { xs: 'blur(6px)', md: 'blur(8px)' },
        hover: {
          background: 'rgba(5, 38, 45, 0.20)',
          backdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
          WebkitBackdropFilter: { xs: 'blur(8px)', md: 'blur(10px)' },
        },
        active: {
          background: 'rgba(5, 38, 45, 0.16)',
        },
      },
    },
  },
  wipDisclaimer: {
    fontSize: { xs: '0.625rem', sm: '0.75rem' },
    padding: { xs: 0.5, sm: 0.75 },
    maxWidth: { xs: 60, sm: 80 },
  },
};

export default modalFooterTokens;
