import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  ReactNode,
} from 'react';
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../../theme';

/**
 * Interface for the theme context value
 */
export interface ThemeContextValue {
  /**
   * Current theme mode ('light' or 'dark')
   */
  mode: 'light' | 'dark';
  
  /**
   * Function to toggle between light and dark theme
   */
  toggleTheme: () => void;
  
  /**
   * Current theme object from MUI
   */
  theme: Theme;
  
  /**
   * Set theme mode directly
   */
  setMode: (mode: 'light' | 'dark') => void;
  
  /**
   * Whether the current theme is dark mode
   */
  isDarkMode: boolean;
  
  /**
   * Whether the current theme is light mode
   */
  isLightMode: boolean;
}

/**
 * Props for the ThemeProvider component
 */
export interface ThemeProviderProps {
  /**
   * Children to be wrapped by the provider
   */
  children: ReactNode;
  
  /**
   * Initial theme mode (optional)
   */
  initialMode?: 'light' | 'dark';
  
  /**
   * Whether to sync with system theme (optional)
   */
  syncWithSystem?: boolean;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme provider component
 * Handles theme state management and provides the theme context to its children
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode,
  syncWithSystem = true,
}) => {
  // Use local storage for theme persistence, default to dark mode
  const [mode, setModeState] = useState<'light' | 'dark'>(() => {
    // If initialMode is provided, use that
    if (initialMode) {
      return initialMode;
    }
    
    // Try to get saved theme
    const savedMode = localStorage.getItem('themeMode');

    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }

    // Use system preference if syncWithSystem is true
    if (syncWithSystem && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    // Default to dark mode
    return 'dark';
  });

  // Wrapper for setMode that also updates localStorage
  const setMode = useCallback((newMode: 'light' | 'dark') => {
    localStorage.setItem('themeMode', newMode);
    setModeState(newMode);
  }, []);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setModeState((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  }, []);

  // Listen for system theme changes if syncWithSystem is true
  useEffect(() => {
    if (!syncWithSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: any) => {
      // Only change if user hasn't manually set preference
      if (!localStorage.getItem('themeMode')) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };

    // Add event listener
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [syncWithSystem]);

  // Get the appropriate theme object
  const theme = useMemo(() => {
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  // Derived properties
  const isDarkMode = mode === 'dark';
  const isLightMode = mode === 'light';

  // Context value
  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      theme,
      setMode,
      isDarkMode,
      isLightMode,
    }),
    [mode, toggleTheme, theme, setMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme functionality
 * Returns the theme mode, toggleTheme function, and more
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Legacy hooks for backward compatibility
export const useThemeMode = useTheme;
