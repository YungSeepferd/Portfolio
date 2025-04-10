import React, { createContext, useState, useContext, useEffect } from 'react';
import createAppTheme from '../theme';

// Create the context
const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * 
 * Manages theme state (light/dark) and provides it to the entire application
 * through context. Syncs with local storage for persistence.
 */
export const ThemeProvider = ({ children }) => {
  // Check localStorage or system preference for initial theme
  const getInitialMode = () => {
    // Check if theme setting exists in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      return savedMode;
    }
    
    // If not, check user's system preference
    const prefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return prefersDark ? 'dark' : 'light';
  };
  
  // State for theme mode
  const [mode, setMode] = useState(getInitialMode);
  
  // Toggle theme function
  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Create the context value
  const contextValue = {
    mode,
    toggleTheme,
    // Use the createAppTheme function directly instead of importing themes
    theme: createAppTheme(mode)
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme mode
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

// Export ThemeContext as default
export default ThemeContext;