import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

/**
 * Core accessibility state values
 */
export interface AccessibilityState {
  /**
   * Whether reduced motion is enabled
   */
  reducedMotion: boolean;
  
  /**
   * Whether high contrast mode is enabled
   */
  highContrast: boolean;
  
  /**
   * Whether large text mode is enabled
   */
  largeText: boolean;
  
  /**
   * Whether screen reader optimization is enabled
   */
  screenReaderOptimized: boolean;
}

/**
 * Context value including state and actions
 */
export interface AccessibilityContextValue extends AccessibilityState {
  /**
   * Toggle reduced motion preference
   */
  toggleReducedMotion: () => void;
  
  /**
   * Toggle high contrast preference
   */
  toggleHighContrast: () => void;
  
  /**
   * Toggle large text preference
   */
  toggleLargeText: () => void;
  
  /**
   * Toggle screen reader optimization preference
   */
  toggleScreenReaderOptimized: () => void;
  
  /**
   * Reset all preferences to their default values
   */
  resetToDefaults: () => void;
  
  /**
   * Set a specific accessibility preference
   */
  setPreference: <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => void;
}

/**
 * Provider props
 */
export interface AccessibilityProviderProps {
  /**
   * React children
   */
  children: ReactNode;
  
  /**
   * Whether to sync with system preferences
   */
  syncWithSystem?: boolean;
  
  /**
   * Initial accessibility state
   */
  initialState?: Partial<AccessibilityState>;
}

// Default state
const defaultState: AccessibilityState = {
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  screenReaderOptimized: false,
};

// Storage key for localStorage
const STORAGE_KEY = 'portfolio-a11y-preferences';

// Create the context with default values
export const AccessibilityContext = createContext<AccessibilityContextValue>({
  ...defaultState,
  toggleReducedMotion: () => {},
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleScreenReaderOptimized: () => {},
  resetToDefaults: () => {},
  setPreference: () => {},
});

/**
 * Accessibility Provider Component
 * Manages accessibility preferences and applies them to the document
 */
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
  syncWithSystem = true,
  initialState,
}) => {
  // Initialize state from localStorage, system preferences, or defaults
  const [state, setState] = useState<AccessibilityState>(() => {
    // Start with default state, override with initialState if provided
    let startState = { ...defaultState, ...(initialState || {}) };
    
    // Only run client-side
    if (typeof window !== 'undefined') {
      // First try to load from localStorage
      const savedPreferences = localStorage.getItem(STORAGE_KEY);
      if (savedPreferences) {
        try {
          startState = { ...startState, ...JSON.parse(savedPreferences) };
        } catch (e) {
          console.error('Failed to parse accessibility preferences', e);
        }
      } else if (syncWithSystem) {
        // If no saved preferences and syncWithSystem is true, check system preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          startState.reducedMotion = true;
        }
        
        // Could add other system preference checks here
        // e.g., prefers-contrast, prefers-color-scheme, etc.
      }
    }
    
    return startState;
  });

  // Save preferences to localStorage and apply CSS classes whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      
      // Apply CSS classes for global styling
      document.documentElement.classList.toggle('reduced-motion', state.reducedMotion);
      document.documentElement.classList.toggle('high-contrast', state.highContrast);
      document.documentElement.classList.toggle('large-text', state.largeText);
      document.documentElement.classList.toggle('screen-reader-optimized', state.screenReaderOptimized);
    }
  }, [state]);

  // Listen for system preference changes if syncWithSystem is true
  useEffect(() => {
    if (!syncWithSystem || typeof window === 'undefined') return;
    
    // Set up reduced motion listener
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e: any) => {
      setState(prev => ({
        ...prev,
        reducedMotion: e.matches,
      }));
    };
    
    // Add event listener
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    
    // Clean up
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, [syncWithSystem]);

  // Toggle functions
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
  
  // Generic function to set a specific preference
  const setPreference = useCallback(<K extends keyof AccessibilityState>(
    key: K, 
    value: AccessibilityState[K]
  ) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  // Create context value
  const value: AccessibilityContextValue = {
    ...state,
    toggleReducedMotion,
    toggleHighContrast,
    toggleLargeText,
    toggleScreenReaderOptimized,
    resetToDefaults,
    setPreference,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

/**
 * Custom hook to use accessibility context
 * @returns Accessibility context value
 */
export const useAccessibility = (): AccessibilityContextValue => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
