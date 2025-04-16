/**
 * Theme Colors
 * 
 * This file provides a wrapper around tokens.colors to ensure consistent
 * color usage throughout the application. It imports directly from tokens.js
 * to avoid redundancy.
 */

import { tokens } from '../design/tokens';

// Re-export the colors from tokens
export const colors = tokens.colors;

// Add any additional color-related utility functions here
export const getStatusColor = (status, theme) => {
  const statusMap = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
    default: theme.palette.primary.main
  };
  
  return statusMap[status] || statusMap.default;
};

export default colors;