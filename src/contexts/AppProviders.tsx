import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { AccessibilityProvider } from './AccessibilityContext';
import { ModalProvider } from './ModalContext';

interface AppProvidersProps {
  children: ReactNode;
  syncThemeWithSystem?: boolean;
  syncAccessibilityWithSystem?: boolean;
  initialThemeMode?: 'light' | 'dark';
  initialAccessibility?: {
    reducedMotion?: boolean;
    highContrast?: boolean;
    largeText?: boolean;
    screenReaderOptimized?: boolean;
  };
}

/**
 * Combines all context providers into a single provider component
 * The order of nesting is important:
 * - ThemeProvider (outermost) - provides theme context used by other components
 * - AccessibilityProvider - provides accessibility settings used by components
 * - ModalProvider (innermost) - depends on theme and accessibility settings
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ 
  children,
  syncThemeWithSystem = true,
  syncAccessibilityWithSystem = true,
  initialThemeMode,
  initialAccessibility,
}) => {
  return (
    <ThemeProvider 
      syncWithSystem={syncThemeWithSystem}
      initialMode={initialThemeMode}
    >
      <AccessibilityProvider 
        syncWithSystem={syncAccessibilityWithSystem}
        initialState={initialAccessibility}
      >
        <ModalProvider>
          {children}
        </ModalProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
