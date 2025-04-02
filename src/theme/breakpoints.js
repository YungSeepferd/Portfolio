/**
 * Breakpoints System
 * 
 * This file defines breakpoints and media queries for responsive design.
 */

// Standard Material UI breakpoint values
const breakpointValues = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

/**
 * Creates breakpoint configuration for Material UI's createTheme
 */
export const createBreakpoints = () => {
  return {
    values: breakpointValues
  };
};

/**
 * Creates media query strings for use in custom CSS
 */
export const createMediaQueries = () => {
  return {
    xs: '@media (max-width:599px)',
    sm: '@media (min-width:600px) and (max-width:899px)',
    md: '@media (min-width:900px) and (max-width:1199px)',
    lg: '@media (min-width:1200px) and (max-width:1535px)',
    xl: '@media (min-width:1536px)',
    smUp: '@media (min-width:600px)',
    mdUp: '@media (min-width:900px)',
    lgUp: '@media (min-width:1200px)',
    xlUp: '@media (min-width:1536px)',
    smDown: '@media (max-width:599px)',
    mdDown: '@media (max-width:899px)',
    lgDown: '@media (max-width:1199px)',
    xlDown: '@media (max-width:1535px)',
  };
};

/**
 * Creates custom breakpoint strings for non-MUI use cases
 */
export const createCustomBreakpoints = () => {
  return {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  };
};

export default breakpointValues;