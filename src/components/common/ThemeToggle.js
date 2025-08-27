import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon

/**
 * ThemeToggle Component
 * 
 * Provides a toggle button to switch between light and dark themes
 */
const ThemeToggle = ({ onToggle, mode }) => {
  const theme = useTheme();
  
  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        aria-label="toggle theme"
        sx={{
          p: theme.spacing(1.5),
          borderRadius: theme.shape.borderRadius * 2,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.action.hover,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[2],
          transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
          }),
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[4],
          },
          '&:active': {
            transform: 'scale(0.95)',
          }
        }}
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;