import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { getResponsiveRadius } from '../theme';

/**
 * Custom hook for theme utilities
 * Provides consistent access to theme values and calculations
 */
export const useThemeUtils = () => {
  const theme = useTheme();
  
  return useMemo(() => ({
    // Radius utilities
    getRadius: (size = 'md') => getResponsiveRadius(theme, size),
    
    // Spacing utilities
    getSpacing: (multiplier) => theme.spacing(multiplier),
    
    // Breakpoint utilities
    getBreakpoint: (bp) => theme.breakpoints.up(bp),
    getBreakpointDown: (bp) => theme.breakpoints.down(bp),
    getBreakpointBetween: (start, end) => theme.breakpoints.between(start, end),
    
    // Color utilities
    getPrimaryColor: (variant = 'main') => theme.palette.primary[variant],
    getSecondaryColor: (variant = 'main') => theme.palette.secondary[variant],
    getBackgroundColor: (variant = 'default') => theme.palette.background[variant],
    getTextColor: (variant = 'primary') => theme.palette.text[variant],
    
    // Shadow utilities
    getShadow: (elevation = 1) => theme.shadows[elevation],
    
    // Typography utilities
    getTypography: (variant) => theme.typography[variant],
    
    // Z-index utilities
    getZIndex: (layer) => theme.zIndex[layer],
    
    // Theme mode utilities
    isDarkMode: theme.palette.mode === 'dark',
    isLightMode: theme.palette.mode === 'light',
    
    // Custom theme properties
    get3DSceneColors: () => theme.palette.scene3d || {},
    
    // Transition utilities
    getTransition: (props = ['all'], options = {}) => 
      theme.transitions.create(props, {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
        ...options
      })
  }), [theme]);
};

export default useThemeUtils;
