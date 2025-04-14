import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../theme';

// Create theme context
const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
  isDarkMode: false,
  theme: null
});

// Hook to use theme context - original name
export const useThemeContext = () => useContext(ThemeContext);

// Add new hook name that matches what's being imported in Header.js
// This is just an alias to useThemeContext for backward compatibility
export const useThemeMode = () => useContext(ThemeContext);

/**
 * Theme Provider Component
 * 
 * Manages theme state and provides theming to the application.
 * Handles theme mode switching and persistence.
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [mode, setMode] = useState(() => {
    // Try to get from localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && ['light', 'dark'].includes(savedMode)) {
      return savedMode;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  });
  
  // Memoize theme to prevent unnecessary renders
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };
  
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener (with browser compatibility)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Set up the context value
  const contextValue = {
    mode,
    toggleTheme,
    isDarkMode: mode === 'dark',
    theme
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;