/**
 * UI Configuration for Work Section
 *
 * Contains settings for grid layout, animations, filtering options, etc.
 */

const uiConfig = {
  // Grid configuration
  grid: {
    spacing: 3,
    columnWidths: {
      xs: 12, // Full width on mobile
      sm: 6, // Two columns on tablets
      md: 4, // Three columns on desktops
      lg: 4, // Three columns on larger screens
    },
  },

  // Card display options
  cards: {
    aspectRatio: '16/9',
    elevation: 2,
    hoverElevation: 8,
    cornerRadius: 8,
    imageHeight: 220,
  },

  // Animation settings
  animations: {
    staggerDelay: 0.1,
    fadeInDuration: 0.5,
    hoverTransition: 0.3,
  },

  // Filter options
  filters: {
    showAllByDefault: true,
    categories: ['UX Design', 'Research', 'Development', 'Visual Design'],
  },
};

export default uiConfig;
