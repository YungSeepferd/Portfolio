import React from 'react';
import { IconButton, Tooltip, useTheme, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Theme } from '@mui/material/styles';

interface ThemeToggleProps {
  onToggle: () => void;
  mode: 'dark' | 'light';
  variant?: 'icon' | 'button';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle, mode, variant = 'icon' }) => {
  const theme: Theme = useTheme();
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
          mb: 1,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
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
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
