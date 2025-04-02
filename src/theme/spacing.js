/**
 * Spacing System
 * 
 * This file defines spacing constants and utilities for consistent spacing
 * throughout the application.
 */

// Define spacing constants to ensure consistent spacing
const spacing = {
  unit: 8, // Base unit = 8px
  xs: 4,   // 4px - Extra small spacing
  sm: 8,   // 8px - Small spacing
  md: 16,  // 16px - Medium spacing
  lg: 24,  // 24px - Large spacing
  xl: 32,  // 32px - Extra large spacing
  xxl: 48, // 48px - Double extra large spacing
  section: 64 // 64px - Section spacing
};

/**
 * Creates a spacing function for Material UI's createTheme
 *
 * @returns {Function} Spacing function that multiplies the factor by the base unit
 */
export const createSpacing = () => {
  return (factor) => `${factor * spacing.unit}px`;
};

// Export more advanced spacing functions if needed
export const getSpacing = (size) => {
  if (spacing[size]) {
    return `${spacing[size]}px`;
  }
  return `${spacing.unit * size}px`;
};

export default spacing;