/**
 * Theme utility functions that help with consistent theme usage across components
 */

import { alpha } from '@mui/material/styles';

/**
 * Creates responsive padding based on theme spacing
 * @param {Object} theme - The MUI theme object
 * @param {Object} options - Padding options for different breakpoints
 * @returns {Object} Responsive padding object
 */
export const responsivePadding = (theme, options = {}) => {
  const { xs = 2, sm, md, lg, xl } = options;
  
  return {
    px: {
      xs: theme.spacing(xs),
      ...(sm && { sm: theme.spacing(sm) }),
      ...(md && { md: theme.spacing(md) }),
      ...(lg && { lg: theme.spacing(lg) }),
      ...(xl && { xl: theme.spacing(xl) }),
    }
  };
};

/**
 * Gets proper elevation from theme based on level
 * @param {Object} theme - The MUI theme object
 * @param {number} level - Elevation level (1-5)
 * @returns {string} CSS shadow value
 */
export const getElevation = (theme, level = 1) => {
  return theme.elevations?.[level] || theme.elevations?.[1] || theme.shadows?.[level] || 'none';
};

/**
 * Returns animation settings for framer-motion
 * @param {Object} theme - The MUI theme object
 * @param {string} variant - Animation variant name ('fadeIn', 'slideUp', etc.)
 * @returns {Object} Animation settings object for framer-motion
 */
export const getAnimation = (theme, variant = 'fadeIn') => {
  return theme.animationSettings?.variants?.[variant] || 
         theme.animationSettings?.variants?.fadeIn || 
         {
           initial: { opacity: 0 },
           animate: { opacity: 1 },
           transition: { 
             duration: 0.5,
             ease: [0.4, 0, 0.2, 1]
           }
         };
};

/**
 * Creates a standardized transition string using theme values
 * @param {Object} theme - The MUI theme object
 * @param {Array} properties - CSS properties to transition
 * @param {string} duration - Duration key ('short', 'medium', 'long')
 * @param {string} easing - Easing function key
 * @returns {string} CSS transition value
 */
export const createTransition = (
  theme, 
  properties = ['all'], 
  duration = 'medium', 
  easing = 'standard'
) => {
  const durationValue = theme.animations?.durations?.[duration] || '300ms';
  const easingValue = theme.animations?.easings?.css?.[easing] || 'cubic-bezier(0.4, 0, 0.2, 1)';
  
  return properties
    .map(prop => `${prop} ${durationValue} ${easingValue}`)
    .join(', ');
};

/**
 * Creates responsive margins based on theme spacing
 * @param {Object} theme - The MUI theme object
 * @param {Object} options - Margin options for different directions and breakpoints
 * @returns {Object} Responsive margin object
 */
export const responsiveMargin = (theme, options = {}) => {
  const { top, right, bottom, left, x, y } = options;
  
  const result = {};
  
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
 * @param {Object} theme - The MUI theme object
 * @param {string} variant - Typography variant from theme
 * @param {Object} options - Additional typography options
 * @returns {Object} Responsive typography styles
 */
export const getTypographyStyles = (theme, variant = 'body1', options = {}) => {
  const baseStyles = theme.typography[variant];
  
  return {
    ...baseStyles,
    ...options,
  };
};

/**
 * Gets a color with specific alpha/opacity value
 * @param {Object} theme - The MUI theme object
 * @param {string} colorPath - Path to color in theme (e.g. 'primary.main')
 * @param {number} alpha - Alpha value between 0-1
 * @returns {string} RGBA color string
 */
export const getColorWithAlpha = (theme, colorPath, alpha = 0.5) => {
  // Split path into parts
  const parts = colorPath.split('.');
  
  // Get base color by traversing theme object
  let baseColor = theme;
  for (const part of parts) {
    baseColor = baseColor?.[part];
    if (!baseColor) break;
  }
  
  // If we couldn't find the color, return a fallback
  if (!baseColor) return `rgba(0, 0, 0, ${alpha})`;
  
  // Handle if color is already rgba
  if (baseColor.startsWith('rgba')) {
    // Replace the alpha in the existing rgba
    return baseColor.replace(/rgba\((.+?),\s*[\d.]+\)/, `rgba($1, ${alpha})`);
  }
  
  // Handle if color is rgb
  if (baseColor.startsWith('rgb')) {
    return baseColor.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }
  
  // Handle hex colors
  if (baseColor.startsWith('#')) {
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
 * @param {Object} theme - The MUI theme object
 * @param {Object} styles - Styles for each breakpoint
 * @returns {Object} Responsive styles object
 */
export const responsiveStyles = (theme, styles) => {
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
 * @param {Object} theme - The MUI theme object
 * @param {string} intensity - 'light', 'medium', or 'dark'
 * @returns {Object} Box shadow style object
 */
export const getShadow = (theme, intensity = 'medium') => {
  return {
    boxShadow: `0 4px 12px ${theme.palette.shadow[intensity] || theme.palette.shadow.medium}`,
  };
};

/**
 * Get project accent color based on project cardVariant or id
 * 
 * @param {Object} project - The project object
 * @param {Object} theme - The theme object
 * @returns {string} - The accent color for the project
 */
export const getProjectAccentColor = (project, theme) => {
  if (!project) return theme.palette.primary.main;
  
  // If project has a specific accent color defined, use it
  if (project.accentColor) return project.accentColor;
  
  // Otherwise determine color from cardVariant
  switch (project.cardVariant) {
    case 'primary':
      return theme.palette.primary.main;
    case 'secondary':
      return theme.palette.secondary.main;
    case 'success':
      return theme.palette.success.main;
    case 'info':
      return theme.palette.info.main;
    case 'warning':
      return theme.palette.warning.main;
    case 'error':
      return theme.palette.error.main;
    default:
      // Use modulo to assign consistent colors based on project ID
      const colorOptions = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.info.main,
        theme.palette.warning.main,
        theme.palette.error.main
      ];
      
      return project.id 
        ? colorOptions[(project.id - 1) % colorOptions.length]
        : theme.palette.primary.main;
  }
};

/**
 * Get text color that contrasts with the project accent color
 * 
 * @param {string} accentColor - The accent color
 * @param {Object} theme - The theme object
 * @returns {string} - A contrasting text color
 */
export const getContrastTextColor = (accentColor, theme) => {
  // If no accent color is provided, return the main text color
  if (!accentColor) return theme.palette.text.primary;
  
  // Check if the accent color is one of the theme's palette colors
  let contrastText = null;
  
  Object.entries(theme.palette).forEach(([key, value]) => {
    if (typeof value === 'object' && value.main === accentColor && value.contrastText) {
      contrastText = value.contrastText;
    }
  });
  
  // If contrast text was found, return it
  if (contrastText) return contrastText;
  
  // Otherwise determine contrast based on brightness
  // Convert hex to RGB if it's a hex color
  let r, g, b;
  
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
 * 
 * @param {string} accentColor - The accent color
 * @returns {string} - CSS gradient string
 */
export const createProjectGradient = (accentColor) => {
  if (!accentColor) return 'none';
  
  const transparent = alpha(accentColor, 0);
  const subtle = alpha(accentColor, 0.05);
  const light = alpha(accentColor, 0.1);
  
  return `radial-gradient(circle at top right, ${light} 0%, ${subtle} 30%, ${transparent} 70%)`;
};

/**
 * Get consistent project card style based on project cardVariant
 * 
 * @param {Object} project - The project object 
 * @param {Object} theme - The theme object
 * @returns {Object} - Style object for the card
 */
export const getProjectCardStyle = (project, theme) => {
  if (!project) return {};
  
  const accentColor = getProjectAccentColor(project, theme);
  
  return {
    borderLeft: `4px solid ${accentColor}`,
    boxShadow: `0 3px 10px ${alpha(accentColor, 0.15)}`,
    '&:hover': {
      boxShadow: `0 8px 20px ${alpha(accentColor, 0.25)}`,
    }
  };
};
