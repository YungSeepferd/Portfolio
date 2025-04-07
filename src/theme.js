/**
 * Main Theme Configuration - Simplified Re-export
 * 
 * This file simply re-exports the theme from the theme folder
 * to maintain backward compatibility with existing imports.
 */
import theme, { globalStyles, themeConstants } from './theme/index';

export { globalStyles, themeConstants };
export default theme;