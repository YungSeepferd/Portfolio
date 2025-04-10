import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '../theme';

// Create context
const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

/**
 * Custom hook to use the theme context
 */
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Theme Provider Component
 * 
 * Provides theme context and switching functionality to the entire app
 */
export const ThemeProvider = ({ children }) => {
  // Use localStorage to persist theme preference
  const [mode, setMode] = useState(() => {
    // Get saved preference or use system preference
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) {
      return savedMode;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'dark'; // Default to dark mode
  });
  
  // Toggle between light and dark modes
  const toggleTheme = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      // Save to localStorage
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };
  
  // Listen for system theme changes
  useEffect(() => {
    if (!window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme-mode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add listener for theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Get the appropriate theme based on mode
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  
  // Context value
  const value = {
    mode,
    toggleTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;