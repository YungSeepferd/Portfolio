// Export all context providers and hooks
import { AppProviders } from './AppProviders';

// Theme Context
import { 
  ThemeContext, 
  ThemeProvider, 
  useTheme, 
  useThemeMode 
} from './ThemeContext';

// Accessibility Context
import { 
  AccessibilityContext, 
  AccessibilityProvider, 
  useAccessibility 
} from './AccessibilityContext';

// Modal Context
import { 
  ModalContext, 
  ModalProvider, 
  useModal, 
  useModalContext 
} from './ModalContext';

// Export everything
export {
  // Providers
  AppProviders,
  ThemeProvider,
  AccessibilityProvider,
  ModalProvider,
  
  // Contexts
  ThemeContext,
  AccessibilityContext,
  ModalContext,
  
  // Hooks
  useTheme,
  useThemeMode,
  useAccessibility,
  useModal,
  useModalContext
};

// Default export
export default AppProviders;
