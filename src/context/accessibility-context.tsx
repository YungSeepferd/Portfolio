import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface AccessibilityContextState {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReaderOptimized: boolean;
}

interface AccessibilityContextValue extends AccessibilityContextState {
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleScreenReaderOptimized: () => void;
  resetToDefaults: () => void;
}

const defaultState: AccessibilityContextState = {
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  screenReaderOptimized: false,
};

const STORAGE_KEY = 'portfolio-a11y-preferences';

const AccessibilityContext = createContext<AccessibilityContextValue>({
  ...defaultState,
  toggleReducedMotion: () => {},
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleScreenReaderOptimized: () => {},
  resetToDefaults: () => {},
});

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [state, setState] = useState<AccessibilityContextState>(() => {
    // Load saved preferences from localStorage if available
    if (typeof window !== 'undefined') {
      const savedPreferences = localStorage.getItem(STORAGE_KEY);
      if (savedPreferences) {
        try {
          return JSON.parse(savedPreferences);
        } catch (e) {
          console.error('Failed to parse accessibility preferences', e);
        }
      }
      
      // Check for system preferences if no saved preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        return {
          ...defaultState,
          reducedMotion: true,
        };
      }
    }
    
    return defaultState;
  });

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      
      // Apply CSS classes to document for global styling
      document.documentElement.classList.toggle('reduced-motion', state.reducedMotion);
      document.documentElement.classList.toggle('high-contrast', state.highContrast);
      document.documentElement.classList.toggle('large-text', state.largeText);
      document.documentElement.classList.toggle('screen-reader-optimized', state.screenReaderOptimized);
    }
  }, [state]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleChange = (e: any) => {
        setState(prev => ({
          ...prev,
          reducedMotion: e.matches,
        }));
      };
      
      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Older browsers
        // @ts-ignore - Old API for Safari support
        mediaQuery.addListener(handleChange);
      }
      
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          // @ts-ignore - Old API for Safari support
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setState(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setState(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleLargeText = useCallback(() => {
    setState(prev => ({ ...prev, largeText: !prev.largeText }));
  }, []);

  const toggleScreenReaderOptimized = useCallback(() => {
    setState(prev => ({ ...prev, screenReaderOptimized: !prev.screenReaderOptimized }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState(defaultState);
  }, []);

  const value = {
    ...state,
    toggleReducedMotion,
    toggleHighContrast,
    toggleLargeText,
    toggleScreenReaderOptimized,
    resetToDefaults,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContext;
