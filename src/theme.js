/**
 * Main Theme Configuration - Simplified Re-export
 * 
 * This file simply re-exports the theme from the theme folder
 * to maintain backward compatibility with existing imports.
 */
import theme, { globalStyles, themeConstants } from './theme/index';

export { globalStyles, themeConstants };
export default theme;

// Export spacing or remove/comment it if not used
const themeSpacing = {
  // ...spacing values
  pagePadding: {
    xs: 2, // 16px on mobile
    sm: 4, // 32px on tablet
    md: 6, // 48px on small desktop
    lg: 12.5, // 100px on desktop (8px * 12.5 = 100px)
  },
};

// Make sure it's exported and used
export { themeSpacing as spacing };