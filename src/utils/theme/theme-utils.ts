/**
 * Theme utility functions that help with consistent theme usage across components
 */

import { alpha, Theme } from '@mui/material/styles';
import { colors } from '../../theme/design/tokens';

// Define extensions to Theme and Palette for our custom properties
declare module '@mui/material/styles' {
  interface Theme {
    animationSettings?: {
      variants?: {
        [key: string]: any;
      };
    };
    elevations?: {
      [key: number]: string;
    };
    animations?: {
      durations?: {
        [key: string]: string;
      };
      easings?: {
        css?: {
          [key: string]: string;
        };
      };
    };
  }
  
  interface Palette {
    shadow?: {
      light: string;
      medium: string;
      dark: string;
      [key: string]: string;
    };
    accent?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    scene3d?: {
      [key: string]: string;
    };
  }
  
  interface PaletteOptions {
    shadow?: {
      light: string;
      medium: string;
      dark: string;
      [key: string]: string;
    };
    accent?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    scene3d?: {
      [key: string]: string;
    };
  }
}

// Define types for function parameters
interface ResponsivePaddingOptions {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface ResponsiveMarginOptions {
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
  x?: any;
  y?: any;
}

interface TypographyStylesOptions {
  [key: string]: any;
}

interface ResponsiveStyles {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  [key: string]: any;
}

interface Project {
  id?: number;
  accentColor?: string;
  cardVariant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

/**
 * Creates responsive padding based on theme spacing
 */
export const responsivePadding = (theme: Theme, options: ResponsivePaddingOptions = {}) => {
  const { xs = 2, sm, md, lg, xl } = options;

  return {
    px: {
      xs: theme.spacing(xs),
      ...(sm && { sm: theme.spacing(sm) }),
      ...(md && { md: theme.spacing(md) }),
      ...(lg && { lg: theme.spacing(lg) }),
      ...(xl && { xl: theme.spacing(xl) }),
    },
  };
};

/**
 * Gets proper elevation from theme based on level
 */
export const getElevation = (theme: Theme, level: number = 1) => {
  // @ts-ignore - Custom theme properties
  return theme.elevations?.[level] || theme.elevations?.[1] || theme.shadows?.[level] || 'none';
};

/**
 * Returns animation settings for framer-motion
 */
export const getAnimation = (theme: Theme, variant: string = 'fadeIn') => {
  // @ts-ignore - Custom theme properties
  return (
    theme.animationSettings?.variants?.[variant] ||
    theme.animationSettings?.variants?.fadeIn || {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    }
  );
};

/**
 * Creates a standardized transition string using theme values
 */
export const createTransition = (
  theme: Theme,
  properties: string[] = ['all'],
  duration: string = 'medium',
  easing: string = 'standard'
) => {
  // @ts-ignore - Custom theme properties
  const durationValue = theme.animations?.durations?.[duration] || '300ms';
  // @ts-ignore - Custom theme properties
  const easingValue = theme.animations?.easings?.css?.[easing] || 'cubic-bezier(0.4, 0, 0.2, 1)';

  return properties.map((prop) => `${prop} ${durationValue} ${easingValue}`).join(', ');
};

/**
 * Creates responsive margins based on theme spacing
 */
export const responsiveMargin = (theme: Theme, options: ResponsiveMarginOptions = {}) => {
  const { top, right, bottom, left, x, y } = options;

  const result: Record<string, any> = {};

  if (top !== undefined) result.mt = top;
  if (right !== undefined) result.mr = right;
  if (bottom !== undefined) result.mb = bottom;
  if (left !== undefined) result.ml = left;
  if (x !== undefined) {
    result.mx = x;
  } else if (left !== undefined && right !== undefined) {
    result.mx = { xs: left.xs, sm: left.sm, md: left.md, lg: left.lg, xl: left.xl };
  }
  if (y !== undefined) {
    result.my = y;
  } else if (top !== undefined && bottom !== undefined) {
    result.my = { xs: top.xs, sm: top.sm, md: top.md, lg: top.lg, xl: top.xl };
  }

  return result;
};

/**
 * Creates responsive typography styles
 */
export const getTypographyStyles = (
  theme: Theme, 
  variant: string = 'body1', 
  options: TypographyStylesOptions = {}
) => {
  // @ts-ignore - Custom theme properties
  const baseStyles = theme.typography[variant];

  return {
    ...baseStyles,
    ...options,
  };
};

/**
 * Gets a color with specific alpha/opacity value
 */
export const getColorWithAlpha = (theme: Theme, colorPath: string, alpha: number = 0.5) => {
  // Split path into parts
  const parts = colorPath.split('.');

  // Get base color by traversing theme object
  let baseColor: any = theme;
  for (const part of parts) {
    baseColor = baseColor?.[part];
    if (!baseColor) break;
  }

  // If we couldn't find the color, return a fallback
  if (!baseColor) return `rgba(0, 0, 0, ${alpha})`;

  // Handle if color is already rgba
  if (typeof baseColor === 'string' && baseColor.startsWith('rgba')) {
    // Replace the alpha in the existing rgba
    return baseColor.replace(/rgba\((.+?),\s*[\d.]+\)/, `rgba($1, ${alpha})`);
  }

  // Handle if color is rgb
  if (typeof baseColor === 'string' && baseColor.startsWith('rgb')) {
    return baseColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }

  // Handle hex colors
  if (typeof baseColor === 'string' && baseColor.startsWith('#')) {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Fallback
  return `rgba(0, 0, 0, ${alpha})`;
};

/**
 * Returns responsive styles for different breakpoints
 */
export const responsiveStyles = (theme: Theme, styles: ResponsiveStyles) => {
  const { xs, sm, md, lg, xl, ...rest } = styles;

  return {
    ...rest,
    [theme.breakpoints.up('xs')]: xs,
    [theme.breakpoints.up('sm')]: sm,
    [theme.breakpoints.up('md')]: md,
    [theme.breakpoints.up('lg')]: lg,
    [theme.breakpoints.up('xl')]: xl,
  };
};

/**
 * Creates consistent shadow styles from theme
 */
export const getShadow = (theme: Theme, intensity: 'light' | 'medium' | 'dark' = 'medium') => {
  // @ts-ignore - Custom theme properties
  return {
    boxShadow: `0 4px 12px ${theme.palette.shadow?.[intensity] || theme.palette.shadow?.medium || 'rgba(0,0,0,0.1)'}`,
  };
};

/**
 * Get project accent color based on project cardVariant or id
 */
export const getProjectAccentColor = (project: Project | null | undefined, theme: Theme) => {
  if (!project) return theme.palette.primary.main;

  // If project has a specific accent color defined, use it
  if (project.accentColor) return project.accentColor;

  // Otherwise determine color from cardVariant
  switch (project.cardVariant) {
    case 'primary': {
      return theme.palette.primary.main;
    }
    case 'secondary': {
      return theme.palette.secondary.main;
    }
    case 'success': {
      return theme.palette.success.main;
    }
    case 'info': {
      return theme.palette.info.main;
    }
    case 'warning': {
      return theme.palette.warning.main;
    }
    case 'error': {
      return theme.palette.error.main;
    }
    default: {
      // Use modulo to assign consistent colors based on project ID
      const colorOptions = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.info.main,
        theme.palette.warning.main,
      ];

      return project.id
        ? colorOptions[(project.id - 1) % colorOptions.length]
        : theme.palette.primary.main;
    }
  }
};

/**
 * Get text color that contrasts with the project accent color
 */
export const getContrastTextColor = (accentColor: string | undefined, theme: Theme) => {
  // If no accent color is provided, return the main text color
  if (!accentColor) return theme.palette.text.primary;

  // Check if the accent color is one of the theme's palette colors
  let contrastText: string | null = null;

  Object.entries(theme.palette).forEach(([_, value]) => {
    if (typeof value === 'object' && value !== null && 'main' in value && 'contrastText' in value) {
      // @ts-ignore - Dynamic access
      if (value.main === accentColor) {
        // @ts-ignore - Dynamic access
        contrastText = value.contrastText;
      }
    }
  });

  // If contrast text was found, return it
  if (contrastText) return contrastText;

  // Otherwise determine contrast based on brightness
  // Convert hex to RGB if it's a hex color
  let r: number | undefined, g: number | undefined, b: number | undefined;

  if (accentColor.startsWith('#')) {
    const hex = accentColor.slice(1);
    const bigint = parseInt(hex, 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else if (accentColor.startsWith('rgb')) {
    const matches = accentColor.match(/\d+/g);
    if (matches && matches.length >= 3) {
      [r, g, b] = matches.map(Number);
    }
  }

  if (r !== undefined && g !== undefined && b !== undefined) {
    // Calculate brightness using the luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

  // Default fallback
  return theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';
};

/**
 * Create background gradient based on project accent color
 */
export const createProjectGradient = (accentColor?: string) => {
  if (!accentColor) return 'none';

  const transparent = alpha(accentColor, 0);
  const subtle = alpha(accentColor, 0.05);
  const light = alpha(accentColor, 0.1);

  return `radial-gradient(circle at top right, ${light} 0%, ${subtle} 30%, ${transparent} 70%)`;
};

/**
 * Get consistent project card style based on project cardVariant
 */
export const getProjectCardStyle = (project: Project | null | undefined, theme: Theme) => {
  if (!project) return {};

  const accentColor = getProjectAccentColor(project, theme);

  return {
    borderLeft: `4px solid ${accentColor}`,
    boxShadow: `0 3px 10px ${alpha(accentColor, 0.15)}`,
    '&:hover': {
      boxShadow: `0 8px 20px ${alpha(accentColor, 0.25)}`,
    },
  };
};

/**
 * Gets an appropriate color for a status/state
 */
export const getStatusColor = (
  status: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary', 
  variant: 'light' | 'main' | 'dark' = 'main'
) => {
  const colorMap = {
    success: colors.green,
    error: colors.red,
    warning: colors.orange,
    info: colors.teal,
    primary: colors.blue,
    secondary: colors.pink,
  };

  const variantMap = {
    light: 300,
    main: 500,
    dark: 700,
  };

  const colorToken = colorMap[status] || colorMap.primary;
  return colorToken[variantMap[variant] || variantMap.main];
};

/**
 * Determines if a color is light or dark
 */
export const isLightColor = (hexColor: string) => {
  // Remove the hash
  const hex = hexColor.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return true if light, false if dark
  return luminance > 0.5;
};

/**
 * Collection of theme utility functions
 */
const themeUtils = {
  getStatusColor,
  isLightColor,
};

export default themeUtils;
