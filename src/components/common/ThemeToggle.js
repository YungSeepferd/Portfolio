import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon

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
          color: 'text.primary',
          width: 'auto',
          height: 'auto',
          minWidth: 'auto',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          background: 'transparent',
          border: 'none',
          '&:hover': {
            background: 'transparent',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          transition: theme.transitions.create(['transform'], {
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