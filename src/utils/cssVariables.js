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

export default CSSVariables;
