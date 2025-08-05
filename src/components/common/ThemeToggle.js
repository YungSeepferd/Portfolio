import React from 'react';
import { IconButton, Tooltip, useTheme, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon

/**
 * ThemeToggle Component
 * 
 * Provides a toggle button to switch between light and dark themes
 * Can be rendered as an icon button (default) or a full-width button (mobile)
 * 
 * @param {Object} props
 * @param {Function} props.onToggle - Function to call when toggle is clicked
 * @param {string} props.mode - Current theme mode ('dark' or 'light')
 * @param {string} props.variant - Display variant ('icon' or 'button')
 */
const ThemeToggle = ({ onToggle, mode, variant = 'icon' }) => {
  const theme = useTheme();
  const label = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  const icon = mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />;
  
  if (variant === 'button') {
    return (
      <Button
        onClick={onToggle}
        fullWidth
        variant="text"
        color="inherit"
        aria-label={label}
        sx={{
          py: 1.2,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '1.05rem',
          textTransform: 'none',
          justifyContent: 'flex-start',
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.text.primary,
          mb: 1, // Add bottom margin to match other menu items
          '&:hover': {
            backgroundColor: theme.palette.action.hover, // Consistent hover effect
          },
        }}
        startIcon={icon}
      >
        {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </Button>
    );
  }
  
  return (
    <Tooltip title={label}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        aria-label={label}
        sx={{
          p: 1,
          borderRadius: '50%',
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;