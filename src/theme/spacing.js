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

// Line and paragraph spacing for content
themeSpacing.content = {
  itemSpacing: 1.5,    // 12px spacing between items (8px * 1.5)
  paragraphSpacing: 2, // 16px spacing between paragraphs
  listItemSpacing: 1,  // 8px spacing between list items
  sectionSpacing: 3,   // 24px spacing between sections
  listIndent: 2.5,     // 20px list left padding
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
  padding: 3,       // Default card padding in units (24px)
  paddingX: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
  paddingY: { xs: 1.5, md: 2 },
  marginBottom: 4,  // 32px margin below cards
  gap: 2,           // 16px gap between card elements
};

// Bento grid spacing tokens
themeSpacing.bento = {
  rowGap: 3,      // 24px vertical gap between bento rows
  columnGap: 3,   // 24px horizontal gap between bento columns
};

// Tabs spacing tokens (used in About left nav and mobile tabs)
themeSpacing.tabs = {
  // Min label height in spacing units (7 * 8px = 56px)
  minHeight: 7,
  // Label paddings in spacing units
  labelPaddingLeft: 2.5,
  labelPaddingRight: 1.5,
  // Indicator thickness in px
  indicatorThicknessPx: 3,
};

// About layout tokens
themeSpacing.about = {
  leftNavWidthPx: 240,
  gridGap: 2, // default column/row gap inside about layout grids
};

// Icon size tokens
themeSpacing.icon = {
  sm: 3,  // 24px
  md: 4,  // 32px
  lg: 6,  // 48px
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