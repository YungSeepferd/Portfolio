/**
 * Theme utility functions that help with consistent theme usage across components
 */

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
 * Returns consistent elevation styles from theme
 * @param {Object} theme - The MUI theme object
 * @param {number} level - Elevation level (1-5)
 * @returns {string} Box-shadow CSS value
 */
export const getElevation = (theme, level = 1) => {
  return theme.elevations[level] || theme.elevations[1];
};

/**
 * Returns animation settings for framer-motion
 * @param {Object} theme - The MUI theme object
 * @param {string} variant - Animation variant name ('fadeIn', 'slideUp', etc.)
 * @returns {Object} Animation settings object for framer-motion
 */
export const getAnimation = (theme, variant = 'fadeIn') => {
  return theme.animationSettings.variants[variant] || theme.animationSettings.variants.fadeIn;
};

/**
 * Creates a transition string using theme values
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
  const durationValue = `${theme.animationSettings.durations[duration]}ms`;
  const easingValue = theme.animationSettings.easings.css[easing]; // Use CSS format
  
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
 * Creates a color with alpha transparency
 * @param {Object} theme - The MUI theme object
 * @param {string} colorPath - Dot notation path to color in theme.palette
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} RGBA color string
 */
export const getColorWithAlpha = (theme, colorPath = 'primary.main', alpha = 0.5) => {
  // Split the color path
  const pathParts = colorPath.split('.');
  
  // Navigate to the color in theme
  let color = theme.palette;
  for (const part of pathParts) {
    color = color[part];
    if (!color) return `rgba(0,0,0,${alpha})`;
  }
  
  // If it's already an rgba color
  if (color.startsWith('rgba')) {
    return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),([\d.]+)\)/, `rgba($1,$2,$3,${alpha})`);
  }
  
  // If it's a hex color
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  
  return `rgba(0,0,0,${alpha})`;
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
