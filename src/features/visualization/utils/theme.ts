import { Color } from 'three';
import { useTheme } from '@mui/material';

/**
 * Convert a theme color to Three.js Color
 */
export function themeColorToThreeColor(color: string): Color {
  return new Color(color);
}

/**
 * Get visualization-specific theme colors using MUI theme
 */
export function useVisualizationTheme() {
  const theme = useTheme();

  return {
    primary: themeColorToThreeColor(theme.palette.primary.main),
    secondary: themeColorToThreeColor(theme.palette.secondary.main),
    background: themeColorToThreeColor(theme.palette.background.default),
    surface: themeColorToThreeColor(theme.palette.background.paper),
    accent: themeColorToThreeColor(theme.palette.primary.light),
  };
}

/**
 * Get visualization-specific theme values
 */
export function useVisualizationValues() {
  const theme = useTheme();

  return {
    transitionDuration: theme.transitions.duration.standard,
    spacing: (multiplier: number) => theme.spacing(multiplier),
  };
}
