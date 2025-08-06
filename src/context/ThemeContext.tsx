import React, { createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: Theme;
}

interface ThemeModeHook extends ThemeContextType {
  isDarkMode: boolean;
  isLightMode: boolean;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleTheme: () => {},
  theme: darkTheme
});

/**
 * Custom hook to use theme mode functionality
 * Returns the theme mode ('light' or 'dark') and a function to toggle it
 */
export const useThemeMode = (): ThemeModeHook => {
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
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use local storage for theme persistence, default to dark mode
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Try to get saved theme
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
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
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if user hasn't manually set preference
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Type assertion for older browsers
      (mediaQuery as any).addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Type assertion for older browsers
        (mediaQuery as any).removeListener(handleChange);
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
