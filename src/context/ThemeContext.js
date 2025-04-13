import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createAppTheme from '../theme';

// Create context with default values
export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
  isDarkMode: false,
  theme: null
});

// Hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);

// Backward compatibility hook (for components using the old name)
export const useThemeMode = () => useContext(ThemeContext);

/**
 * Theme Provider Component
 * 
 * Manages theme state and provides theme context to the application
 */
export const ThemeProvider = ({ children }) => {
  // Initialize with system preference or saved preference
  const [mode, setMode] = useState(() => {
    try {
      // Try to get saved preference from localStorage
      const savedMode = localStorage.getItem('themeMode');
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        return savedMode;
      }
      
      // Default to system preference if available
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (error) {
      console.warn('Error accessing theme preferences:', error);
      // Fall through to default
    }
    
    // Default to light mode
    return 'light';
  });
  
  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => {
    console.log('Creating theme with mode:', mode);
    return createAppTheme(mode);
  }, [mode]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('themeMode', newMode);
      } catch (error) {
        console.warn('Error saving theme preference:', error);
      }
      return newMode;
    });
  };
  
  // Watch for system theme changes
  useEffect(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        try {
          // Only update if no user preference is saved
          if (!localStorage.getItem('themeMode')) {
            setMode(e.matches ? 'dark' : 'light');
          }
        } catch (error) {
          console.warn('Error accessing theme preferences:', error);
        }
      };
      
      // Add event listener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
      
      // Cleanup
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);
  
  // Context value
  const contextValue = {
    mode,
    toggleTheme,
    isDarkMode: mode === 'dark',
    theme // Include the theme object in the context
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