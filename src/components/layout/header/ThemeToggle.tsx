import React from 'react';
import { IconButton, Button, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface ThemeToggleProps {
  mode: string;
  onToggle: () => void;
  variant: 'icon' | 'button';
}

/**
 * ThemeToggle component that can be rendered as an icon button or a full button
 * 
 * @param mode - Current theme mode ('light' or 'dark')
 * @param onToggle - Function to toggle the theme
 * @param variant - 'icon' for icon only, 'button' for full button with text
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, onToggle, variant }) => {
  const theme = useTheme();
  const isDark = mode === 'dark';

  if (variant === 'icon') {
    return (
      <IconButton
        onClick={onToggle}
        color="inherit"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        sx={{
          p: 1,
          borderRadius: '50%',
          color: theme.palette.text.secondary,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        {isDark ? (
          <Brightness7Icon fontSize="small" />
        ) : (
          <Brightness4Icon fontSize="small" />
        )}
      </IconButton>
    );
  }

  return (
    <Button
      variant="text"
      color="inherit"
      startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
      onClick={onToggle}
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        px: 2,
        py: 1.2,
        mb: 1,
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1.05rem',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;
