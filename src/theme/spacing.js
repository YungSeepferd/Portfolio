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

// Define the standard spacing units
const themeSpacing = (factor) => `${8 * factor}px`;

// Add special spacing values
themeSpacing.contentPadding = {
  xs: '20px',   // Mobile
  sm: '40px',   // Small tablets
  md: '80px',   // Large tablets
  lg: '100px',  // Desktops
};

// Additional spacing configurations
themeSpacing.pagePadding = {
  xs: 2,  // 16px on mobile
  sm: 4,  // 32px on tablet
  md: 6,  // 48px on small desktop
  lg: 12.5, // 100px on desktop (8px * 12.5 = 100px)
};

// Consistent section spacing
themeSpacing.section = {
  marginTop: 8,     // 64px top margin
  marginBottom: 8,  // 64px bottom margin
  paddingTop: 6,    // 48px top padding
  paddingBottom: 6, // 48px bottom padding
};

// Card and element spacing
themeSpacing.card = {
  padding: 3,       // 24px padding inside cards
  marginBottom: 4,  // 32px margin below cards
  gap: 2,           // 16px gap between card elements
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

export default themeSpacing;