import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import modalFooterTokens from '../../theme/components/modalFooter';

/**
 * ThemeToggle Component
 * 
 * Provides a toggle button to switch between light and dark themes
 * Uses design tokens from modalFooter for consistent glassmorphic styling
 * Accepts optional sx prop for custom styling overrides
 */
const ThemeToggle = ({ onToggle, mode, sx = {} }) => {
  const theme = useTheme();
  
  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={onToggle}
        aria-label="toggle theme"
        sx={{
          color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
          width: modalFooterTokens.controls.size,
          height: modalFooterTokens.controls.size,
          background: theme.palette.mode === 'dark'
            ? modalFooterTokens.controls.glassmorphic.dark.background
            : modalFooterTokens.controls.glassmorphic.light.background,
          backdropFilter: theme.palette.mode === 'dark'
            ? modalFooterTokens.controls.glassmorphic.dark.backdropFilter
            : modalFooterTokens.controls.glassmorphic.light.backdropFilter,
          WebkitBackdropFilter: theme.palette.mode === 'dark'
            ? modalFooterTokens.controls.glassmorphic.dark.WebkitBackdropFilter
            : modalFooterTokens.controls.glassmorphic.light.WebkitBackdropFilter,
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            background: theme.palette.mode === 'dark'
              ? modalFooterTokens.controls.glassmorphic.dark.hover.background
              : modalFooterTokens.controls.glassmorphic.light.hover.background,
            backdropFilter: theme.palette.mode === 'dark'
              ? modalFooterTokens.controls.glassmorphic.dark.hover.backdropFilter
              : modalFooterTokens.controls.glassmorphic.light.hover.backdropFilter,
            WebkitBackdropFilter: theme.palette.mode === 'dark'
              ? modalFooterTokens.controls.glassmorphic.dark.hover.WebkitBackdropFilter
              : modalFooterTokens.controls.glassmorphic.light.hover.WebkitBackdropFilter,
            transform: 'scale(1.05)',
          },
          '&:active': {
            background: theme.palette.mode === 'dark'
              ? modalFooterTokens.controls.glassmorphic.dark.active.background
              : modalFooterTokens.controls.glassmorphic.light.active.background,
            transform: 'scale(0.98)',
          },
          transition: theme.transitions.create(['background', 'transform', 'backdrop-filter'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...sx,
        }}
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;