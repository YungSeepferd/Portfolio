import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';
import CssBaseline from '@mui/material/CssBaseline';

// Create context for theme state
const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
  isDarkMode: false
});

/**
 * Custom ThemeProvider component
 * 
 * Provides theme context and MUI ThemeProvider with the current theme
 * Handles theme mode toggling and persistence
 */
export const ThemeProvider = ({ children, defaultMode = 'light' }) => {
  // Initialize theme from localStorage if available, otherwise use defaultMode and check system preference
  const [mode, setMode] = useState(() => {
    // Use our own implementation
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode');
      if (savedMode) {
        return savedMode;
      }
      
      // Check system preference if no saved mode
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    return defaultMode;
  });
  
  // Toggle theme mode
  const toggleTheme = useCallback(() => {
    // Use our own implementation
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  }, []);
  
  // Update theme if system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't explicitly chosen a theme
      if (!localStorage.getItem('theme-mode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener using the appropriate method based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Create theme object based on current mode
  // Use memoization to prevent unnecessary re-renders
  const theme = useMemo(() => {
    // Use the mode from MUI's colorScheme if available
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);
  
  // Create context value with mode, toggle function, and dark mode flag
  const contextValue = useMemo(() => {
    return {
      mode,
      toggleTheme,
      isDarkMode: mode === 'dark'
    };
  }, [mode, toggleTheme]);

  // Standard ThemeProvider
  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {/* Removed enableColorScheme prop which is causing errors */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// Export an alias for backward compatibility with components using the old name
export const useThemeMode = useThemeContext;

export default ThemeContext;