import { useEffect } from 'react';
import theme, { globalStyles } from '../theme';

/**
 * CSSVariables Component
 * 
 * This component generates CSS variables from the theme object
 * to be used in regular CSS files or styled components.
 */
const CSSVariables = () => {
  useEffect(() => {
    // Get document root element to set CSS variables
    const root = document.documentElement;
    
    // Add global animation keyframes and font imports
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
      ${globalStyles || ''}
    `;
    document.head.appendChild(styleEl);
    
    // Extract and set color variables
    if (theme.palette) {
      // Primary colors
      setVariable('--primary-main', theme.palette.primary?.main);
      setVariable('--primary-dark', theme.palette.primary?.dark);
      setVariable('--primary-light', theme.palette.primary?.light);
      setVariable('--primary-contrast', theme.palette.primary?.contrastText);
      
      // Secondary colors
      setVariable('--secondary-main', theme.palette.secondary?.main);
      setVariable('--secondary-dark', theme.palette.secondary?.dark);
      setVariable('--secondary-light', theme.palette.secondary?.light);
      setVariable('--secondary-contrast', theme.palette.secondary?.contrastText);
      
      // Background colors
      setVariable('--bg-default', theme.palette.background?.default);
      setVariable('--bg-paper', theme.palette.background?.paper);
      
      // Text colors
      setVariable('--text-primary', theme.palette.text?.primary);
      setVariable('--text-secondary', theme.palette.text?.secondary);
    }
    
    // Helper function to set a CSS variable if the value exists
    function setVariable(name, value) {
      if (value !== undefined && value !== null) {
        root.style.setProperty(name, value);
      }
    }
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};

/**
 * CSS Variables
 * 
 * This file exports CSS variables that sync with the theme
 * for consistent styling across both MUI and custom CSS components.
 */

// Create CSS variables function that accepts theme
export const createCssVariables = (theme) => {
  if (!theme) {
    console.warn('No theme provided to createCssVariables');
    return {};
  }
  
  // Extract layout values from theme
  const layoutVars = {
    maxContentWidth: theme.layout?.maxContentWidth || '1200px',
    contentPaddingXs: theme.layout?.contentPadding?.xs || '20px',
    contentPaddingSm: theme.layout?.contentPadding?.sm || '30px',
    contentPaddingMd: theme.layout?.contentPadding?.md || '40px',
    contentPaddingLg: theme.layout?.contentPadding?.lg || '50px',
  };
  
  // Create CSS variables object
  return {
    // Layout
    '--max-content-width': layoutVars.maxContentWidth,
    '--content-padding-xs': layoutVars.contentPaddingXs,
    '--content-padding-sm': layoutVars.contentPaddingSm,
    '--content-padding-md': layoutVars.contentPaddingMd,
    '--content-padding-lg': layoutVars.contentPaddingLg,
    
    // Center alignment helper
    '--layout-centered': {
      width: '100%',
      maxWidth: layoutVars.maxContentWidth,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    
    // Responsive padding helper
    '--content-padding': {
      paddingLeft: layoutVars.contentPaddingXs,
      paddingRight: layoutVars.contentPaddingXs,
      '@media (min-width: 600px)': {
        paddingLeft: layoutVars.contentPaddingSm,
        paddingRight: layoutVars.contentPaddingSm,
      },
      '@media (min-width: 900px)': {
        paddingLeft: layoutVars.contentPaddingMd,
        paddingRight: layoutVars.contentPaddingMd,
      },
      '@media (min-width: 1200px)': {
        paddingLeft: layoutVars.contentPaddingLg,
        paddingRight: layoutVars.contentPaddingLg,
      },
    },
    
    // Other existing variables...
  };
};

// Inject CSS variables into :root
export const injectCssVariables = (theme) => {
  if (!theme) {
    console.error('Theme is required to inject CSS variables');
    return;
  }
  
  const cssVars = createCssVariables(theme);
  const root = document.documentElement;
  
  // Convert JS object to CSS variables
  Object.entries(cssVars).forEach(([key, value]) => {
    // Skip complex objects - they're for JS use
    if (typeof value === 'string' || typeof value === 'number') {
      root.style.setProperty(key, value);
    }
  });
};

export default createCssVariables;
