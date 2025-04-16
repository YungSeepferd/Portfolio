import React, { createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../theme';

// Create the context
export const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
  theme: darkTheme
});

// NOTE: For future extensibility, you can add more theme actions/values here, e.g.:
// - setCustomPalette
// - syncWithSystemTheme
// - setPrimaryColor
// - etc.
// This will make it easier to add advanced theme features without refactoring consumers.

/**
 * Custom hook to use theme mode functionality
 * Returns the theme mode ('light' or 'dark') and a function to toggle it
 */
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return {
    mode: context.mode,
    toggleTheme: context.toggleTheme,
    theme: context.theme,
    isDarkMode: context.mode === 'dark',
    isLightMode: context.mode === 'light'
  };
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Use local storage for theme persistence, default to dark mode
  const [mode, setMode] = useState(() => {
    // Try to get saved theme
    const savedMode = localStorage.getItem('themeMode');
    
    if (savedMode) {
      return savedMode;
    }
    
    // Fall back to preferred color scheme or default to dark
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });
  
  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  }, []);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only change if user hasn't manually set preference
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
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
  
  // Get the appropriate theme object
  const theme = useMemo(() => {
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);
  
  // Context value
  const contextValue = useMemo(() => {
    return { mode, toggleTheme, theme };
  }, [mode, toggleTheme, theme]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;